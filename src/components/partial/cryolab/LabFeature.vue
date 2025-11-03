<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.feature.${ name }`) }}</v-card-title>
    <v-card-text class="py-0">
      <div v-for="subfeature in subfeatures" :key="`subfeature-${ subfeature.subfeature }`" class="d-flex align-center bg-tile-default rounded mb-2 pa-2" :class="{'pl-0': subfeatures.length > 1}">
        <v-icon v-if="subfeatures.length > 1" class="mr-2" :color="subfeature.isCurrent ? 'primary' : undefined" x-large>mdi-roman-numeral-{{ subfeature.subfeature + 1 }}</v-icon>
        <div class="flex-grow-1">
          <gb-tooltip>
            <template v-slot:activator="{ on, attrs }">
              <v-progress-linear class="rounded" height="20" :value="subfeature.expPercent" v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.gooboo.level') }} {{ $formatInt(subfeature.level) }} ({{ $formatNum(subfeature.expPercent, true) }}%)</v-progress-linear>
            </template>
            <template v-if="subfeature.expGain > 0">
              <div>{{ $vuetify.lang.t(`$vuetify.cryolab.expDescription`, $formatNum(subfeature.exp), $formatNum(subfeature.expNeeded), $formatNum(subfeature.expGain)) }}</div>
              <div>{{ $vuetify.lang.t(`$vuetify.cryolab.expDescription2`, $formatInt(subfeature.expGL)) }}</div>
              <alert-text type="formula" v-if="showFormulas">{{ $vuetify.lang.t(`$vuetify.cryolab.expFormula`) }}</alert-text>
              <div v-if="subfeature.nextLevelTime">{{ $vuetify.lang.t(`$vuetify.cryolab.nextLevelTime`, $formatTime(subfeature.nextLevelTime)) }}</div>
            </template>
            <alert-text v-else type="error">{{ $vuetify.lang.t(`$vuetify.cryolab.expNoGain`) }}</alert-text>
            <div class="text-center">{{ $vuetify.lang.t(`$vuetify.cryolab.expNext`) }}</div>
            <div>
              <display-row v-for="(item, key) in subfeature.effect" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
            </div>
          </gb-tooltip>
          <div class="d-flex justify-center align-center mt-1">
            <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.cryolab.passiveTitle`)">
              <template v-slot:activator="{ on, attrs }">
                <div :class="{'primary--text': !(feature.active && subfeature.isCurrent)}" v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.cryolab.passive', $formatNum(subfeature.passiveMult * 100, true)) }}</div>
              </template>
              <div>{{ $vuetify.lang.t('$vuetify.cryolab.passiveDescription', $formatNum(subfeature.passiveMult * 100, true)) }}</div>
              <stat-breakdown :name="subfeature.passiveMultName"></stat-breakdown>
            </gb-tooltip>
            <v-icon>mdi-circle-small</v-icon>
            <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.cryolab.activeTitle`)">
              <template v-slot:activator="{ on, attrs }">
                <div :class="{'primary--text': feature.active && subfeature.isCurrent}" v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.cryolab.active', $formatNum(subfeature.activeMult * 100, true)) }}</div>
              </template>
              <div>{{ $vuetify.lang.t('$vuetify.cryolab.activeDescription', $formatNum(subfeature.activeMult * 100, true)) }}</div>
              <stat-breakdown :name="subfeature.activeMultName"></stat-breakdown>
            </gb-tooltip>
          </div>
        </div>
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
import { SECONDS_PER_DAY } from '../../../js/constants';
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
    subfeatures() {
      let arr = [];
      [this.$store.state.system.features[this.name].unlock, ...this.$store.state.system.features[this.name].subfeatures].forEach((unlock, index) => {
        if (unlock === null || this.$store.state.unlock[unlock].see) {
          const level = this.feature.level[index];
          const exp = this.feature.exp[index];
          const expNeeded = this.$store.getters['cryolab/expNeeded'](level);
          const passiveMultName = `${ this.name }CryolabPassive${ index }`;
          const activeMultName = `${ this.name }CryolabActive${ index }`;
          const expGain = this.$store.getters['cryolab/expGain'](this.name, index);
          const nextLevelTime = expGain > 0 ? Math.ceil(SECONDS_PER_DAY * (expNeeded - exp) / expGain) : null;
          arr.push({
            subfeature: index,
            isCurrent: this.$store.state.system.features[this.name].currentSubfeature === index,
            level,
            exp,
            expNeeded,
            expPercent: 100 * exp / expNeeded,
            passiveMultName,
            activeMultName,
            passiveMult: this.$store.getters['mult/get'](passiveMultName),
            activeMult: this.$store.getters['mult/get'](activeMultName),
            effect: this.feature.effect[index].map(elem => {
              return {
                ...elem,
                before: level > 0 ? elem.value(level) : null,
                after: elem.value(level + 1)
              };
            }),
            expGain,
            expGL: this.$store.state.meta.globalLevelParts[this.name + '_' + index] ?? 0,
            nextLevelTime,
          });
        }
      });
      return arr;
    },
    canFreeze() {
      return this.feature.active || this.$store.getters['cryolab/currentFrozen'] < this.$store.getters['mult/get']('cryolabMaxFeatures');
    },
    prestigeGain() {
      return this.$store.getters['cryolab/prestigeGain'](this.name);
    },
    showFormulas() {
      return this.$store.state.system.settings.general.items.showFormulas.value;
    },
  },
  methods: {
    toggleActive() {
      this.$store.dispatch('cryolab/toggleActive', this.name);
    }
  }
}
</script>
