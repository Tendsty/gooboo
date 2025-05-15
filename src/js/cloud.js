import axios from 'axios';

const instance = axios.create({
    baseURL: "https://gamesaves.ggff.eu.org",
    timeout: 30000
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {

        if (error.response) {
            return Promise.reject({
                ...error,
                data: error.response.data
            });
        } else {
            return Promise.reject(error);
        }
    }
);


export function loadSaveFile(saveId, userId, tokenId) {
    const gameId = window.location.hostname;

    const data = {
        userId: userId,
        tokenId: tokenId,
        gameId: gameId
    };

    return instance({
        url: '/download',
        method: 'post',
        data: {
            ...data,
            saveId: parseInt(saveId)
        }
    }).then(response => {
        if (response.success && response.save && response.save.save_data) {
            return response.save.save_data;
        } else {
            console.error("下载存档失败:", response);
            throw new Error("下载存档失败");
        }
    }).catch(error => {
        console.error("下载存档请求出错:", error);
        throw error;
    });
}


export async function getLatestData(userId, tokenId) {
    const gameId = window.location.hostname;

    const data = {
        userId: userId,
        tokenId: tokenId,
        gameId: gameId
    };

    try {
        const response = await instance({
            url: '/latest',
            method: 'post',
            data: data,
        });

        if (response.success && response.save && response.save.save_data) {
            return response.save;
        } else {
            return null;
        }
    } catch (error) {
        console.error("获取最新的存档失败:", error);
        throw error;
    }
}

export async function getLatestDataList(userId, tokenId) {
    const gameId = window.location.hostname;

    const data = {
        userId: userId,
        tokenId: tokenId,
        gameId: gameId
    };

    try {
        const response = await instance({
            url: '/list',
            method: 'post',
            data: data
        });
        if (response.success && response.saves && response.saves.length > 0) {
            return response.saves;
        } else {
            return [];
        }
    } catch (error) {
        console.error("获取最新的存档列表失败:", error);
        throw error;
    }

}


export function saveData(saveData, userId, tokenId) {
    const gameId = window.location.hostname;

    const data = {
        userId: userId,
        tokenId: tokenId,
        gameId: gameId,
        saveData: saveData
    };
    return instance({
        url: '/save',
        method: 'post',
        data: data
    });
}

export default instance;