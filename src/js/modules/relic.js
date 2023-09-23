import { buildArray } from "../utils/array";

export default {
    name: 'relic',
    unlockNeeded: 'relicFeature',
    unlock: ['relicFeature'],
    note: buildArray(1).map(() => 'g')
}
