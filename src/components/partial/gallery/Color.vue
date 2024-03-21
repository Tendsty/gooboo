<style scoped>
.color-label {
  min-width: 72px;
}
</style>

<template>
  <div class="bg-tile-default d-flex align-center justify-space-between rounded pa-2" :class="{'premium-glow': isPremium, 'elevation-2': !isPremium, 'flex-wrap': name==='beauty'}" style="min-height: 68px;">
    <template v-if="name !== 'beauty'">
      <!-- 油漆和鼓 -->
      <div class="d-flex flex-wrap align-center">
        <!-- 油漆 -->
        <currency :name="`gallery_${name}`" class="ma-1">
          <alert-text v-if="showAmountInfo" type="info">{{ $vuetify.lang.t('$vuetify.gallery.colorGainReduced') }}</alert-text>
        </currency>
        <v-spacer></v-spacer>
        <!-- 鼓 -->
        <div class="d-flex align-center">
          <currency :name="`gallery_${name}Drum`" class="ma-1"></currency>
          <div v-if="drumChance > 0" class="d-flex color-label ma-1 ml-3">
            <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.currency.gallery_${name}Drum.name`)">
              <template v-slot:activator="{ on, attrs }">
                <div :class="`${name}--text text--${themeModifier}`" v-bind="attrs" v-on="on">{{ $formatNum(drumChance * 100, true) }}%</div>
              </template>
              <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.chance') }}</div>
              <stat-breakdown :name="`gallery${statBaseName}DrumChance`"></stat-breakdown>
            </gb-tooltip>
          </div>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="d-flex flex-wrap align-center justify-end">
        <gb-tooltip :min-width="200">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-1" color="primary" :disabled="maxAfford < 1 || disabled" @click="convertMax" small v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.gooboo.max') }}</v-btn>
          </template>
          <div class="d-flex align-center mt-0">
            <price-tag class="ma-1" v-for="(amount, currency) in conversionPrice" :key="currency" :currency="currency" :amount="amount * maxAfford"></price-tag>
            <v-icon class="ma-1">mdi-transfer-right</v-icon>
            <price-tag class="ma-1" :currency="`gallery_${name}`" :amount="conversionMult * maxAfford" add></price-tag>
          </div>
        </gb-tooltip>
        <gb-tooltip :min-width="200">
          <template v-slot:activator="{ on, attrs }">
            <div class="ma-1" v-bind="attrs" v-on="on">
              <v-btn color="primary" :disabled="maxAfford < 1 || disabled" @click="convertOne">{{ $vuetify.lang.t('$vuetify.gooboo.convert') }}</v-btn>
            </div>
          </template>
          <div class="d-flex align-center mt-0">
            <price-tag class="ma-1" v-for="(amount, currency) in conversionPrice" :key="currency" :currency="currency" :amount="amount"></price-tag>
            <v-icon class="ma-1">mdi-transfer-right</v-icon>
            <price-tag class="ma-1" :currency="`gallery_${name}`" :amount="conversionMult" add></price-tag>
          </div>
        </gb-tooltip>
      </div>
    </template>
    <template v-else>
      <currency :name="`gallery_${name}`" class="ma-1" large>
        <alert-text v-if="showAmountInfo" type="info">{{ $vuetify.lang.t('$vuetify.gallery.colorGainReduced') }}</alert-text>
      </currency>
      <v-spacer></v-spacer>
      <currency name="gallery_converter" class="ma-1"></currency>
    </template>
  </div>
</template>

<script>
import { capitalize } from '../../../js/utils/format';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';

export default {
  components: { Currency, StatBreakdown, PriceTag, AlertText },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    colorGain() {
      return this.$store.getters['mult/get'](`currencyGallery${ this.statBaseName }Gain`);
    },
    showAmountInfo() {
      return this.name !== 'beauty' && this.$store.getters['currency/value'](`gallery_${ this.name }`) > 100;
    },
    drumChance() {
      if (this.name === 'beauty') {
        return 0;
      }
      return this.$store.getters['mult/get'](`gallery${ this.statBaseName }DrumChance`);
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'lighten-2' : 'darken-1';
    },
    statBaseName() {
      return capitalize(this.name);
    },
    maxAfford() {
      return this.$store.getters['gallery/maxAffordConversion'](this.name);
    },
    conversionPrice() {
      return this.$store.getters['gallery/conversionPrice'](this.name);
    },
    conversionMult() {
      return this.$store.getters['mult/get'](`gallery${ this.statBaseName }Conversion`);
    },
    isPremium() {
      if (this.name === 'beauty') {
        return false;
      }
      return this.$store.state.upgrade.item[`gallery_pretty${ this.statBaseName }`]?.level >= 1;
    }
  },
  methods: {
    convertOne() {
      this.$store.dispatch('gallery/convertColor', {toColor: this.name, max: false});
    },
    convertMax() {
      this.$store.dispatch('gallery/convertColor', {toColor: this.name, max: true});
    }
  }
}
</script>
