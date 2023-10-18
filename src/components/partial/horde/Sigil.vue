<style scoped>
.sigil-inactive {
  opacity: 0.25;
}
</style>

<template>
  <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.horde.sigil.name') + ': ' + $vuetify.lang.t(`$vuetify.horde.sigil.${name}`) + (tier <= 0 ? (' (' + $vuetify.lang.t('$vuetify.horde.sigil.inactive') + ')') : '')">
    <template v-slot:activator="{ on, attrs }">
      <v-badge overlap bordered left offset-x="44" :class="[$vnode.data.staticClass, {'sigil-inactive': tier <= 0, 'balloon-text-dynamic': tier > 0}]" :color="color" :value="tier !== 1">
        <v-avatar class="elevation-2" :size="small ? 28 : 40" :color="color" v-bind="attrs" v-on="on">
          <v-icon :small="small">{{ sigil.icon }}</v-icon>
        </v-avatar>
        <template v-slot:badge>
          <span :class="{'black--text': !$vuetify.theme.dark}">
            <v-icon v-if="tier <= 0" small>mdi-close</v-icon>
            <span v-else>{{ tier }}</span>
          </span>
        </template>
      </v-badge>
    </template>
    <display-row class="mt-0" v-for="(item, key) in stats" :key="key" :name="item.name" :type="item.type" :after="item.amount"></display-row>
    <template v-if="sigil.active">
      <div>{{ $vuetify.lang.t('$vuetify.horde.sigil.hasActive') }}:</div>
      <enemy-active-tooltip :name="name" :level="Math.max(tier, 1)" show-base></enemy-active-tooltip>
    </template>
    <alert-text v-if="sigil.minZone === Infinity" type="info">{{ $vuetify.lang.t(`$vuetify.horde.sigil.special`) }}</alert-text>
    <alert-text v-else-if="sigil.minZone > 0" type="info">{{ $vuetify.lang.t(`$vuetify.horde.sigil.min`, sigil.minZone) }}</alert-text>
  </gb-tooltip>
</template>

<script>
import { capitalize } from '../../../js/utils/format';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import EnemyActiveTooltip from './EnemyActiveTooltip.vue';

export default {
  components: { DisplayRow, AlertText, EnemyActiveTooltip },
  props: {
    name: {
      type: String,
      required: true
    },
    tier: {
      type: Number,
      required: false,
      default: 1
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    sigil() {
      return this.$store.state.horde.sigil[this.name];
    },
    color() {
      return this.tier >= 1 ? this.sigil.color : 'grey';
    },
    stats() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.sigil.stats(Math.max(this.tier, 1), this.$store.state.horde.bossFight))) {
        obj[key] = {type: elem.type, name: 'horde' + capitalize(key), amount: elem.amount};
      }
      return obj;
    }
  }
}
</script>
