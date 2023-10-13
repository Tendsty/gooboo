<template>
  <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.horde.sigil.name') + ': ' + $vuetify.lang.t(`$vuetify.horde.sigil.${name}`)">
    <template v-slot:activator="{ on, attrs }">
      <v-badge overlap bordered :class="$vnode.data.staticClass" :content="tier" :color="sigil.color" :value="tier > 1">
        <v-avatar class="elevation-2" size="40" :color="sigil.color" v-bind="attrs" v-on="on">
          <v-icon>{{ sigil.icon }}</v-icon>
        </v-avatar>
      </v-badge>
    </template>
    <display-row class="mt-0" v-for="(item, key) in stats" :key="key" :name="item.name" :type="item.type" :after="item.amount"></display-row>
    <div v-if="sigil.active">{{ $vuetify.lang.t('$vuetify.horde.sigil.hasActive') }}</div>
    <alert-text v-if="sigil.minZone === Infinity" type="info">{{ $vuetify.lang.t(`$vuetify.horde.sigil.special`) }}</alert-text>
    <alert-text v-else-if="sigil.minZone > 0" type="info">{{ $vuetify.lang.t(`$vuetify.horde.sigil.min`, sigil.minZone) }}</alert-text>
  </gb-tooltip>
</template>

<script>
import { capitalize } from '../../../js/utils/format';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow, AlertText },
  props: {
    name: {
      type: String,
      required: true
    },
    tier: {
      type: Number,
      required: false,
      default: 1
    }
  },
  computed: {
    sigil() {
      return this.$store.state.horde.sigil[this.name];
    },
    stats() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.sigil.stats(this.tier))) {
        obj[key] = {type: elem.type, name: 'horde' + capitalize(key), amount: elem.amount};
      }
      return obj;
    }
  }
}
</script>
