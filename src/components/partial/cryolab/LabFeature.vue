<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.feature.${ name }`) }}</v-card-title>
    <v-card-text class="py-0">
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear class="rounded" height="20" :value="expPercent" v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.gooboo.level') }} {{ level }} ({{ $formatNum(expPercent, true) }}%)</v-progress-linear>
        </template>
        <template v-if="expGain > 0">
          <div>{{ $vuetify.lang.t(`$vuetify.cryolab.expDescription`, $formatNum(exp), $formatNum(expNeeded), $formatNum(expGain)) }}</div>
          <div>{{ $vuetify.lang.t(`$vuetify.cryolab.expDescription2`) }}</div>
        </template>
        <alert-text v-else type="error">{{ $vuetify.lang.t(`$vuetify.cryolab.expNoGain`) }}</alert-text>
        <div class="text-center">{{ $vuetify.lang.t(`$vuetify.cryolab.expNext`) }}</div>
        <div>
          <display-row v-for="(item, key) in effect" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
        </div>
      </gb-tooltip>
      <div class="d-flex justify-center align-center ma-1">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.cryolab.passiveTitle`)">
          <template v-slot:activator="{ on, attrs }">
            <div :class="{'primary--text': !feature.active}" v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.cryolab.passive', $formatNum(passiveMult * 100, true)) }}</div>
          </template>
          <div>{{ $vuetify.lang.t('$vuetify.cryolab.passiveDescription', $formatNum(passiveMult * 100, true)) }}</div>
          <stat-breakdown :name="passiveMultName"></stat-breakdown>
        </gb-tooltip>
        <v-icon>mdi-circle-small</v-icon>
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.cryolab.activeTitle`)">
          <template v-slot:activator="{ on, attrs }">
            <div :class="{'primary--text': feature.active}" v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.cryolab.active', $formatNum(activeMult * 100, true)) }}</div>
          </template>
          <div>{{ $vuetify.lang.t('$vuetify.cryolab.activeDescription', $formatNum(activeMult * 100, true)) }}</div>
          <stat-breakdown :name="activeMultName"></stat-breakdown>
        </gb-tooltip>
      </div>
      <div class="d-flex flex-wrap mx-n1">
        <template v-for="(amount, currency) in prestigeGain">
          <gb-tooltip v-if="currency === 'farm_exp'" :key="`currency-gain-${ currency }`" :min-width="0">
            <template v-slot:activator="{ on, attrs }">
              <v-chip class="ma-1 px-2 balloon-text-dynamic" label small color="cyan" :class="$vuetify.theme.dark ? 'theme--dark darken-3' : 'theme--light lighten-3'" v-bind="attrs" v-on="on">
                <v-icon size="12" class="mr-2">mdi-star</v-icon>
                <span>+{{ $formatNum(amount) }}/d</span>
              </v-chip>
            </template>
            <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.cryolab.cropExp`) }}</div>
          </gb-tooltip>
          <price-tag v-else class="ma-1" :key="`currency-gain-${ currency }`" add :currency="currency" :amount="amount">
            <template slot="suffix">/d</template>
          </price-tag>
        </template>
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn :color="feature.active ? 'cyan' : 'secondary'" :disabled="!canFreeze" @click="toggleActive"><v-icon>mdi-snowflake</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { StatBreakdown, DisplayRow, PriceTag, AlertText },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    feature() {
      return this.$store.state.cryolab[this.name];
    },
    subfeature() {
      return this.$store.state.system.features[this.name].currentSubfeature;
    },
    level() {
      return this.feature.level[this.subfeature];
    },
    exp() {
      return this.feature.exp[this.subfeature];
    },
    expNeeded() {
      return this.$store.getters['cryolab/expNeeded'](this.level);
    },
    expPercent() {
      return 100 * this.exp / this.expNeeded;
    },
    passiveMultName() {
      return `${ this.name }CryolabPassive${ this.subfeature }`;
    },
    activeMultName() {
      return `${ this.name }CryolabActive${ this.subfeature }`;
    },
    passiveMult() {
      return this.$store.getters['mult/get'](this.passiveMultName);
    },
    activeMult() {
      return this.$store.getters['mult/get'](this.activeMultName);
    },
    effect() {
      return this.feature.effect[this.subfeature].map(elem => {
        return {
          ...elem,
          before: this.level > 0 ? elem.value(this.level) : null,
          after: elem.value(this.level + 1)
        };
      });
    },
    canFreeze() {
      return this.feature.active || this.$store.getters['cryolab/currentFrozen'] < this.$store.getters['mult/get']('cryolabMaxFeatures');
    },
    expGain() {
      return this.$store.getters['cryolab/expGain'](this.name);
    },
    prestigeGain() {
      return this.$store.getters['cryolab/prestigeGain'](this.name);
    }
  },
  methods: {
    toggleActive() {
      this.$store.dispatch('cryolab/toggleActive', this.name);
    }
  }
}
</script>
