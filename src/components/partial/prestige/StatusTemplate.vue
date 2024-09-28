<template>
  <div>
    <slot name="header"></slot>
    <div class="d-flex justify-center align-center ma-1">
      <price-tag class="ma-1" v-for="(item, currencyName) in prestigeGain" :key="currencyName" :currency="currencyName" :amount="item.total" add>
        <alert-text type="info" v-if="item.showDescription">{{ $vuetify.lang.t(`$vuetify.prestigeDescription.${ currencyName }`) }}</alert-text>
        <template v-if="item.gainMult">
          <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</div>
          <stat-breakdown :name="item.gainMult" :base="item.base ? item.base : null"></stat-breakdown>
        </template>
      </price-tag>
    </div>
    <card-overview v-if="canSeeCards" :feature="feature"></card-overview>
    <div class="d-flex justify-center align-center ma-1">
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="flex-shrink-0 ma-1" v-bind="attrs" v-on="on"><v-icon class="mr-2">mdi-clock</v-icon>{{ $formatTime(timeThisPrestige) }}</v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.gooboo.prestigeTime`) }}</div>
      </gb-tooltip>
      <v-select v-if="subfeatures.length > 1" class="ma-1" :label="$vuetify.lang.t('$vuetify.feature.subfeature')" :disabled="isFrozen" outlined hide-details :items="subfeatures" v-model="selectedSubfeature">
        <template v-slot:selection="{ item }"><div :class="`${subfeatureColor[item]}--text`">{{ $vuetify.lang.t(`$vuetify.subfeature.${feature}.${item}`) }}</div></template>
        <template v-slot:item="{ item }"><div :class="`${subfeatureColor[item]}--text`">{{ $vuetify.lang.t(`$vuetify.subfeature.${feature}.${item}`) }}</div></template>
      </v-select>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.gooboo.prestige`)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-1" :color="hasPrestigeGain ? 'primary' : 'error'" :disabled="isFrozen" @click="prestige" v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.gooboo.prestige') }}</v-btn>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.gooboo.prestigeDescription`) }}</div>
      </gb-tooltip>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import CardOverview from '../card/CardOverview.vue';
import AlertText from '../render/AlertText.vue';

export default {
  components: { CardOverview, PriceTag, StatBreakdown, AlertText },
  data: () => ({
    subfeatureColor: ['light-green', 'yellow', 'orange', 'red', 'purple'],
    selectedSubfeature: 0
  }),
  props: {
    feature: {
      type: String,
      required: true
    },
    prestigeGain: {
      type: Object,
      required: false,
      default: () => {return {};}
    }
  },
  mounted() {
    this.selectedSubfeature = this.$store.state.system.features[this.feature].nextSubfeature;
  },
  computed: {
    ...mapState({
      currency: state => state.currency,
      canSeeCards: state => state.unlock.cardFeature.see
    }),
    timeThisPrestige() {
      return this.$store.state.stat[`${this.feature}_timeSpent`].value;
    },
    subfeatures() {
      return [0, ...this.$store.state.system.features[this.feature].subfeatures.map((unlock, key) => {
        return {unlock, key: key + 1};
      }).filter(elem => this.$store.state.unlock[elem.unlock].see).map(elem => elem.key)];
    },
    hasPrestigeGain() {
      return Object.keys(this.prestigeGain).length > 0;
    },
    isFrozen() {
      return this.$store.state.cryolab[this.feature].active;
    }
  },
  methods: {
    prestige() {
      if (this.$store.state.system.settings.confirm.items.prestige.value) {
        let gain = {};
        for (const [key, elem] of Object.entries(this.prestigeGain)) {
          gain[key] = elem.total;
        }
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'prestige',
          feature: this.feature,
          subfeature: this.selectedSubfeature,
          gain
        }});
      } else {
        this.$store.dispatch(`${this.feature}/prestige`, this.selectedSubfeature);
      }
    }
  },
  watch: {
    selectedSubfeature(newVal) {
      this.$store.commit('system/updateNextSubfeature', {key: this.feature, value: newVal});
      this.$emit('updateSelectedSubfeature', newVal);
    }
  }
}
</script>
