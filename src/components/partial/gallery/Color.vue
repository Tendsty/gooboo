<style scoped>
.color-label {
  min-width: 284px;
}
.color-generate-arrow {
  position: absolute;
  left: 116px;
  top: -16px;
}
.compounded-drum-chance {
  font-size: 12px;
}
</style>

<template>
  <div class="bg-tile-default d-flex flex-wrap align-center rounded pa-2" :class="{'premium-glow': isPremium, 'elevation-2': !isPremium}" style="position: relative; min-height: 76px;">
    <currency :name="`gallery_${name}`" class="ma-1" :large="name === 'beauty'">
      <alert-text v-if="showAmountInfo" type="info">{{ $vuetify.lang.t('$vuetify.gallery.colorGainReduced') }}</alert-text>
    </currency>
    <v-spacer></v-spacer>
    <template v-if="name !== 'beauty'">
      <div class="d-flex align-center color-label">
        <currency :name="`gallery_${name}Drum`" class="ma-1"></currency>
        <v-spacer></v-spacer>
        <div class="d-flex justify-center align-end flex-column">
          <gb-tooltip key="color-drum" v-if="drumChance > 0" :title-text="$vuetify.lang.t(`$vuetify.currency.gallery_${name}Drum.name`)">
            <template v-slot:activator="{ on, attrs }">
              <div :class="`${ name }--text text--${ themeModifier }`" v-bind="attrs" v-on="on">{{ $formatNum(drumChance * 100, true) }}%</div>
            </template>
            <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.chance') }}</div>
            <stat-breakdown :name="`gallery${ statBaseName }DrumChance`"></stat-breakdown>
          </gb-tooltip>
          <gb-tooltip key="color-drum-compounding" v-if="compoundedDrumChance < drumChance">
            <template v-slot:activator="{ on, attrs }">
              <div class="compounded-drum-chance" :class="`${ name }--text text--${ themeModifierCompounded }`" v-bind="attrs" v-on="on">{{ $formatNum(compoundedDrumChance * 100, true) }}%</div>
            </template>
            <div class="mt-0">{{ $vuetify.lang.t('$vuetify.gallery.drumCompounding') }}</div>
          </gb-tooltip>
        </div>
      </div>
      <v-spacer></v-spacer>
    </template>
    <template v-if="canSeeCanvas && name === 'beauty'">
      <gb-tooltip key="color-canvas" :title-text="$vuetify.lang.t('$vuetify.gallery.canvas.name')">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center" v-bind="attrs" v-on="on">
            <v-icon class="mr-2">mdi-artboard</v-icon>
            <div>{{ canvasSpaceContent.length }} / {{ canvasSpaceMax }}</div>
          </div>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.gallery.canvas.description') }}</div>
        <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.galleryCanvasSize') }}</h3>
        <stat-breakdown name="galleryCanvasSize"></stat-breakdown>
      </gb-tooltip>
      <v-spacer></v-spacer>
    </template>
    <template v-if="canSeeCanvas && !isLast && name !== 'beauty'">
      <gb-tooltip key="color-canvaslevel" :title-text="$vuetify.lang.t('$vuetify.gallery.canvas.level')">
        <template v-slot:activator="{ on, attrs }">
          <v-progress-circular rotate="270" :color="name" :value="canvasPercent * 100" v-bind="attrs" v-on="on">{{ canvasLevel }}</v-progress-circular>
        </template>
        <div v-if="canvasUntilNext !== null" class="mb-2">{{ $vuetify.lang.t('$vuetify.gallery.canvas.untilNextLevel', $formatTime(canvasUntilNext)) }}</div>
        <display-row class="mt-0" v-for="(item, key) in canvasDisplay" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
        <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.galleryCanvasSpeed') }}</h3>
        <stat-breakdown name="galleryCanvasSpeed" :base="canvasSpeedBase" :mult-array="canvasSpeedMult"></stat-breakdown>
      </gb-tooltip>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center align-center" style="min-width: 80px;">
        <v-icon small class="mr-1">mdi-artboard</v-icon>
        <div>{{ canvasSpace }}</div>
        <div class="d-flex flex-column mx-1 my-n1">
          <v-btn small icon :disabled="disabled || !canUseCanvas || canvasSpaceContent.length >= canvasSpaceMax" @click="addCanvasSpace"><v-icon large>mdi-menu-up</v-icon></v-btn>
          <v-btn small icon :disabled="disabled || canvasSpace <= 0" @click="removeCanvasSpace"><v-icon large>mdi-menu-down</v-icon></v-btn>
        </div>
      </div>
      <v-spacer></v-spacer>
    </template>
    <template v-if="name !== 'beauty'">
      <gb-tooltip key="color-convert" :min-width="200">
        <template v-slot:activator="{ on, attrs }">
          <div class="ma-1" v-bind="attrs" v-on="on">
            <v-btn color="primary" :disabled="!canAfford || disabled" @click="convertOne">{{ $vuetify.lang.t('$vuetify.gooboo.convert') }}</v-btn>
          </div>
        </template>
        <div class="d-flex justify-center align-center mt-0">
          <price-tag class="ma-1" v-for="(amount, currency) in conversionPrice" :key="currency" :currency="currency" :amount="amount"></price-tag>
          <v-icon class="ma-1">mdi-transfer-right</v-icon>
          <price-tag class="ma-1" :currency="`gallery_${name}`" :amount="conversionGain" add></price-tag>
        </div>
        <alert-text type="info">{{ $vuetify.lang.t('$vuetify.gallery.allConverterInfo') }}</alert-text>
        <alert-text v-if="canAfford && converterOverload > 1" type="info">{{ $vuetify.lang.t('$vuetify.gallery.converterOverload', $formatNum(converterOverload, true)) }}</alert-text>
      </gb-tooltip>
      <v-icon v-if="showTransferArrow" class="color-generate-arrow">mdi-transfer-up</v-icon>
    </template>
    <currency v-else name="gallery_converter" class="ma-1" :bonus-array="converterBonus"></currency>
  </div>
</template>

<script>
import { GALLERY_CONVERTER_EXPONENT } from '../../../js/constants';
import { capitalize } from '../../../js/utils/format';
import { getSequence } from '../../../js/utils/math';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { Currency, StatBreakdown, PriceTag, AlertText, DisplayRow },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    isLast: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    showAmountInfo() {
      return this.name !== 'beauty' && this.$store.getters['currency/value'](`gallery_${ this.name }`) > 100;
    },
    showTransferArrow() {
      return this.$store.getters['currency/value'](`gallery_${ this.name }`) > 0;
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
    themeModifierCompounded() {
      return this.$vuetify.theme.dark ? 'lighten-4' : 'darken-3';
    },
    statBaseName() {
      return capitalize(this.name);
    },
    conversionPrice() {
      return this.$store.getters['gallery/conversionPrice'](this.name);
    },
    canAfford() {
      return this.$store.getters['currency/canAfford'](this.conversionPrice);
    },
    converterOverload() {
      return this.$store.getters['gallery/converterOverload'](this.name);
    },
    conversionGain() {
      return this.canAfford ? this.$store.getters['gallery/conversionGain'](this.name) : this.$store.getters['mult/get'](`gallery${ capitalize(this.name) }Conversion`);
    },
    isPremium() {
      if (this.name === 'beauty') {
        return false;
      }
      return this.$store.state.upgrade.item[`gallery_pretty${ this.statBaseName }`]?.level >= 1;
    },
    converterBonus() {
      let arr = [];
      const amount = this.$store.getters['currency/value'](`gallery_converter`);
      if (amount > 0) {
        arr.push({name: 'interest', value: amount * GALLERY_CONVERTER_EXPONENT});
      }
      return arr;
    },
    canvasLevel() {
      return this.name !== 'beauty' ? Math.floor(this.$store.state.gallery.colorData[this.name].progress) : 0;
    },
    canvasPercent() {
      return this.name !== 'beauty' ? (this.$store.state.gallery.colorData[this.name].progress - this.canvasLevel) : 0;
    },
    canvasSpace() {
      return this.name !== 'beauty' ? this.$store.state.gallery.colorData[this.name].cacheSpace : 0;
    },
    canvasSpaceContent() {
      return this.$store.state.gallery.canvasSpace;
    },
    canvasSpaceMax() {
      return this.$store.getters['mult/get']('galleryCanvasSize');
    },
    canSeeCanvas() {
      return this.$store.state.unlock.galleryCanvas.see;
    },
    canUseCanvas() {
      return this.$store.state.unlock.galleryCanvas.use;
    },
    canvasSpeedBase() {
      return this.name !== 'beauty' ? (getSequence(10, this.$store.state.gallery.colorData[this.name].cacheSpace) * 0.1) : 0;
    },
    canvasSpeedMult() {
      return this.canvasSpeedMultAmount <= 1 ? [] : [{name: `currencyMult_gallery_${ this.name }Drum`, value: this.canvasSpeedMultAmount}];
    },
    canvasSpeedMultAmount() {
      return this.name === 'beauty' ? 1 : (1 + this.$store.getters['currency/value'](`gallery_${ this.name }Drum`) * 0.1);
    },
    canvasDisplay() {
      const level = this.canvasLevel;
      const nextLevel = this.canvasLevel + 1;
      return [
        {type: 'mult', name: `currencyGallery${ capitalize(this.name) }Gain`, before: level > 0 ? Math.pow(2, level) : null, after: Math.pow(2, nextLevel)},
        {type: 'mult', name: `gallery${ capitalize(this.name) }Conversion`, before: level > 0 ? Math.pow(2, level) : null, after: Math.pow(2, nextLevel)},
        {type: 'base', name: `currencyGallery${ capitalize(this.name) }DrumCap`, before: level > 0 ? (10 * level) : null, after: 10 * nextLevel}
      ];
    },
    canvasUntilNext() {
      const speed = this.$store.getters['mult/get']('galleryCanvasSpeed', this.canvasSpeedBase, this.canvasSpeedMultAmount);
      const difficulty = this.$store.getters['gallery/canvasDifficulty'](this.name, this.canvasLevel);
      return speed > 0 ? ((1 - this.canvasPercent) * difficulty / speed) : null;
    },
    compoundedDrumChance() {
      if (this.name === 'beauty') {
        return 0;
      }
      let chance = 1;
      const colorId = this.$store.state.gallery.color.findIndex(elem => elem === this.name);
      this.$store.state.gallery.color.slice(0, colorId + 1).forEach(elem => {
        chance *= this.$store.getters['mult/get'](`gallery${ capitalize(elem) }DrumChance`);
      });
      return chance;
    }
  },
  methods: {
    convertOne() {
      this.$store.dispatch('gallery/convertColor', {toColor: this.name, max: false});
    },
    addCanvasSpace() {
      this.$store.dispatch('gallery/addCanvasSpace', this.name);
    },
    removeCanvasSpace() {
      this.$store.dispatch('gallery/removeCanvasSpace', this.name);
    }
  }
}
</script>
