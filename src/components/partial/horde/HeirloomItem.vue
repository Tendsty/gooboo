<template>
  <gb-tooltip>
    <template v-slot:activator="{ on, attrs }">
      <v-card :class="{'premium-glow': isPremium}" v-bind="attrs" v-on="on">
        <v-card-title class="justify-space-between align-center">
          <v-icon :color="heirloom.color">{{ heirloom.icon }}</v-icon>
          <div>{{ $vuetify.lang.t(`$vuetify.horde.heirloom.${ name }`) }}</div>
          <div>x{{ $formatNum(heirloom.amount) }}</div>
        </v-card-title>
        <v-card-text>
          <display-row v-for="(item, key) in display" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :after="item.current"></display-row>
        </v-card-text>
      </v-card>
    </template>
    <h3 class="text-center mt-0">{{ $vuetify.lang.t('$vuetify.gooboo.effect') }}</h3>
    <stat-breakdown :name="`${ name }HeirloomEffect`" :base="1"></stat-breakdown>
    <alert-text v-if="heirloom.minZone === Infinity" class="mt-2" type="info">{{ $vuetify.lang.t(`$vuetify.horde.heirloom.special`) }}</alert-text>
    <alert-text v-else-if="heirloom.minZone > 0" class="mt-2" type="info">{{ $vuetify.lang.t(`$vuetify.horde.heirloom.min`, heirloom.minZone) }}</alert-text>
  </gb-tooltip>
</template>

<script>
import { capitalize } from '../../../js/utils/format';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow, AlertText, StatBreakdown },
  props: {
    name: {
      type: String,
      required: false
    }
  },
  computed: {
    heirloom() {
      return this.$store.state.horde.heirloom[this.name];
    },
    display() {
      return this.heirloom.effect.map(elem => {
        return {
          ...elem,
          current: elem.value(this.$store.getters['mult/get'](`${ this.name }HeirloomEffect`, this.heirloom.amount))
        };
      });
    },
    isPremium() {
      return this.$store.state.upgrade.item[`horde_ancient${ capitalize(this.name) }`]?.level >= 1;
    }
  }
}
</script>
