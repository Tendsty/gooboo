import store from "../../store";
import { buildArray } from "../utils/array";
import glyph from "./relic/glyph";

export default {
    name: 'relic',
    unlockNeeded: 'relicFeature',
    unlock: ['relicFeature', 'relicMuseum'],
    note: buildArray(1).map(() => 'g'),
    init() {
        for (const [key, elem] of Object.entries(glyph)) {
            store.commit('relic/initGlyph', {name: key, ...elem});
        }
    }
}
