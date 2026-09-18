import store from "../store";
import { decodeFile, getSavefile, saveLocal } from "./savefile";
import { LOCAL_STORAGE_NAME } from "./constants";

const semverCompare = require("semver/functions/compare");

const REMOTE_CONFIG_STORAGE_NAME = "goobooRemoteSave";
const REMOTE_DEVICE_STORAGE_NAME = "goobooRemoteSaveDevice";
const REMOTE_SYNC_INTERVAL = 120000;
const REMOTE_REQUEST_TIMEOUT = 8000;

let remoteSyncTimer = null;
let visibilityHandler = null;
let activeSync = null;

export {
    clearRemoteConfig,
    getRemoteConfig,
    getRemoteSave,
    isRemoteConfigured,
    putRemoteSave,
    restoreRemoteSave,
    setRemoteConfig,
    startRemoteSync,
    stopRemoteSync,
    syncRemoteSave
};

function getRemoteConfig() {
    try {
        const config = JSON.parse(localStorage.getItem(REMOTE_CONFIG_STORAGE_NAME));
        return {
            url: config?.url ?? "",
            token: config?.token ?? ""
        };
    } catch {
        return {url: "", token: ""};
    }
}

function setRemoteConfig(url, token = "") {
    localStorage.setItem(REMOTE_CONFIG_STORAGE_NAME, JSON.stringify({
        url: url.trim(),
        token: token.trim()
    }));
}

function clearRemoteConfig() {
    localStorage.removeItem(REMOTE_CONFIG_STORAGE_NAME);
}

function isRemoteConfigured() {
    return getRemoteConfig().url !== "";
}

function getDeviceId() {
    let deviceId = localStorage.getItem(REMOTE_DEVICE_STORAGE_NAME);
    if (!deviceId) {
        if (window.crypto && typeof window.crypto.randomUUID === "function") {
            deviceId = window.crypto.randomUUID();
        } else {
            deviceId = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
        }
        localStorage.setItem(REMOTE_DEVICE_STORAGE_NAME, deviceId);
    }
    return deviceId;
}

function getRawSaveInfo(saveData) {
    if (!saveData || typeof saveData !== "string") {
        return null;
    }

    let raw = saveData;
    if (raw.charAt(0) !== "{") {
        try {
            raw = atob(raw);
        } catch {
            return null;
        }
    }

    try {
        const parsed = JSON.parse(raw);
        return {
            version: parsed.version ?? null,
            timestamp: Number(parsed.timestamp || 0),
            playerId: parsed.playerId ?? null
        };
    } catch {
        return null;
    }
}

async function remoteRequest(method, body = null) {
    const config = getRemoteConfig();
    if (!config.url) {
        throw new Error("Remote save is not configured");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REMOTE_REQUEST_TIMEOUT);
    const headers = {};

    if (config.token) {
        headers.Authorization = `Bearer ${config.token}`;
    }
    if (body !== null) {
        headers["Content-Type"] = "application/json";
    }

    try {
        return await fetch(config.url, {
            method,
            headers,
            body: body === null ? null : JSON.stringify(body),
            cache: "no-store",
            signal: controller.signal
        });
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Remote save request timed out");
        }
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}

async function readJson(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

async function getRemoteSave() {
    const response = await remoteRequest("GET");
    if (response.status === 404) {
        return {exists: false, revision: 0};
    }

    const data = await readJson(response);
    if (!response.ok) {
        throw new Error(data.error || `Remote save request failed (HTTP ${response.status})`);
    }

    return data;
}

async function putRemoteSave(saveData, baseRevision) {
    const saveInfo = getRawSaveInfo(saveData);
    if (!saveInfo) {
        throw new Error("Local savefile is invalid");
    }

    const response = await remoteRequest("PUT", {
        saveData,
        timestamp: saveInfo.timestamp,
        baseRevision,
        deviceId: getDeviceId()
    });
    const data = await readJson(response);

    if (response.status === 409) {
        return {conflict: true, ...data};
    }
    if (!response.ok) {
        throw new Error(data.error || `Remote save request failed (HTTP ${response.status})`);
    }

    return {conflict: false, ...data};
}

function useRemoteSave(remote) {
    localStorage.setItem(LOCAL_STORAGE_NAME, remote.saveData);
    window.location.reload();
}

function checkRemoteVersion(remoteInfo) {
    if (!remoteInfo?.version) {
        return true;
    }

    try {
        return semverCompare(remoteInfo.version, store.state.system.version) !== 1;
    } catch {
        return true;
    }
}

async function restoreRemoteSave() {
    const remote = await getRemoteSave();
    if (!remote.exists || !remote.saveData) {
        return {status: "empty"};
    }

    const remoteInfo = getRawSaveInfo(remote.saveData);
    if (!remoteInfo) {
        throw new Error("Remote savefile is invalid");
    }
    if (!checkRemoteVersion(remoteInfo)) {
        return {status: "version-mismatch", version: remoteInfo.version};
    }

    useRemoteSave(remote);
    return {status: "downloaded"};
}

async function performSync() {
    if (!isRemoteConfigured()) {
        return {status: "disabled"};
    }
    if (store.state.system.screen === "tab-duplicate") {
        return {status: "skipped"};
    }

    // Read the persisted save before saveLocal() advances the current runtime timestamp.
    // This makes an occasionally-used stale device prefer a newer remote save instead of
    // overwriting it after offline progress has been calculated locally.
    const persistedLocalSave = localStorage.getItem(LOCAL_STORAGE_NAME);
    const persistedLocalInfo = getRawSaveInfo(persistedLocalSave);
    const remote = await getRemoteSave();

    if (!remote.exists) {
        saveLocal();
        const localSave = getSavefile();
        const uploaded = await putRemoteSave(localSave, 0);
        return uploaded.conflict ? {status: "conflict"} : {status: "created"};
    }

    const remoteInfo = getRawSaveInfo(remote.saveData);
    if (!remoteInfo) {
        throw new Error("Remote savefile is invalid");
    }
    if (!checkRemoteVersion(remoteInfo)) {
        return {status: "version-mismatch", version: remoteInfo.version};
    }

    if (
        persistedLocalInfo &&
        (!persistedLocalInfo.playerId || !remoteInfo.playerId || persistedLocalInfo.playerId === remoteInfo.playerId) &&
        remoteInfo.timestamp > persistedLocalInfo.timestamp
    ) {
        useRemoteSave(remote);
        return {status: "downloaded"};
    }

    saveLocal();
    const localSave = getSavefile();
    const localInfo = decodeFile(localSave, false);
    const remoteFile = decodeFile(remote.saveData, false);

    if (!localInfo) {
        throw new Error("Local savefile is invalid");
    }
    if (!remoteFile) {
        throw new Error("Remote savefile is invalid");
    }

    if (localInfo.playerId && remoteFile.playerId && localInfo.playerId !== remoteFile.playerId) {
        return {status: "different-save"};
    }

    const localTimestamp = Number(localInfo.timestamp || 0);
    const remoteTimestamp = Number(remote.timestamp || remoteFile.timestamp || 0);

    if (remoteTimestamp > localTimestamp) {
        useRemoteSave(remote);
        return {status: "downloaded"};
    }

    if (localTimestamp > remoteTimestamp) {
        const uploaded = await putRemoteSave(localSave, remote.revision ?? 0);
        return uploaded.conflict ? {status: "conflict"} : {status: "uploaded"};
    }

    return {status: "up-to-date"};
}

function syncRemoteSave() {
    if (activeSync) {
        return activeSync;
    }

    activeSync = performSync().finally(() => {
        activeSync = null;
    });
    return activeSync;
}

function startRemoteSync(syncImmediately = true) {
    if (!isRemoteConfigured()) {
        return;
    }

    if (remoteSyncTimer === null) {
        remoteSyncTimer = setInterval(() => {
            syncRemoteSave().catch(() => {});
        }, REMOTE_SYNC_INTERVAL);
    }

    if (visibilityHandler === null) {
        visibilityHandler = () => {
            if (document.visibilityState === "hidden") {
                syncRemoteSave().catch(() => {});
            }
        };
        document.addEventListener("visibilitychange", visibilityHandler);
    }

    if (syncImmediately) {
        syncRemoteSave().catch(() => {});
    }
}

function stopRemoteSync() {
    if (remoteSyncTimer !== null) {
        clearInterval(remoteSyncTimer);
        remoteSyncTimer = null;
    }
    if (visibilityHandler !== null) {
        document.removeEventListener("visibilitychange", visibilityHandler);
        visibilityHandler = null;
    }
}
