<template>
  <div v-if="list.length > 0">
    <div class="ma-2 d-flex justify-center align-center">
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.hordeMaxTrinkets`)">
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ trinketsEquipped }} / {{ maxTrinkets }} {{ $vuetify.lang.t(`$vuetify.horde.trinket.equipped`) }}</span>
        </template>
        <stat-breakdown name="hordeMaxTrinkets"></stat-breakdown>
      </gb-tooltip>
    </div>
    <v-row class="ma-1" no-gutters>
      <v-col v-for="trinket in list" :key="`trinket-${ trinket }`" cols="12" sm="6" md="12" lg="6" xl="4">
        <trinket-item class="ma-1" :name="trinket"></trinket-item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StatBreakdown from '../../render/StatBreakdown.vue';
import TrinketItem from './TrinketItem.vue';

export default {
  components: { TrinketItem, StatBreakdown },
  computed: {
    ...mapGetters({
      trinketsEquipped: 'horde/trinketsEquipped'
    }),
    list() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.horde.trinket)) {
        if (elem.level >= 1) {
          arr.push(key);
        }
      }
      return arr;
    },
    maxTrinkets() {
      return this.$store.getters['mult/get']('hordeMaxTrinkets');
    }
  }
}
</script>
