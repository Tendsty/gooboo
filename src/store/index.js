import Vue from 'vue';
import Vuex from 'vuex';
import system from './system';
import unlock from './unlock';
import currency from './currency';
import upgrade from './upgrade';
import mult from './mult';
import meta from './meta';
import mining from './mining';
import village from './village';
import horde from './horde';
import farm from './farm';
import gallery from './gallery';
import relic from './relic';
import gem from './gem';
import stat from './stat';
import achievement from './achievement';
import school from './school';
import card from './card';
import general from './general';
import event from './event';
import cinders from './cinders';
import bloom from './bloom';
import weatherChaos from './weatherChaos';
import summerFestival from './summerFestival';
import nightHunt from './nightHunt';
import snowdown from './snowdown';
import note from './note';
import treasure from './treasure';
import cryolab from './cryolab';
import consumable from './consumable';
import tag from './tag';

// store modules

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        system,
        unlock,
        currency,
        upgrade,
        mult,
        meta,
        mining,
        village,
        horde,
        farm,
        gallery,
        relic,
        gem,
        stat,
        achievement,
        school,
        card,
        general,
        event,
        cinders,
        bloom,
        weatherChaos,
        summerFestival,
        nightHunt,
        snowdown,
        note,
        treasure,
        cryolab,
        consumable,
        tag
    }
})
