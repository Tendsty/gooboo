<style scoped>
.render-currency-small {
  width: 210px;
  font-size: 16px;
}
.render-currency-large {
  width: 380px;
  font-size: 16px;
}
.currency-border {
  width: 100%;
  border: 2px solid white;
}
.currency-text {
  z-index: 1;
  line-height: 1;
}
.currency-line {
  position: absolute;
  bottom: 0;
  border-left: 1px solid #FFFFFF30;
  border-right: 1px solid #FFFFFF30;
}
.currency-line--small {
  height: 10px;
}
.currency-line--medium {
  height: 16px;
}
.currency-line--large {
  height: 24px;
  left: 50%;
}
.currency-container {
  position: relative;
  height: 44px;
}
.render-currency-mobile {
  font-size: 80%;
  height: 40px;
}
.render-currency-mobile.render-currency-small {
  width: 160px;
}
.render-currency-mobile.render-currency-large {
  width: 288px;
}
.currency-clickable {
  cursor: pointer;
}
.currency-labels {
  position: absolute;
  font-size: 12px;
  bottom: -8px;
  left: 32px;
  right: 0;
}
.render-currency-mobile .currency-labels {
  font-size: 10px;
  bottom: -5px;
  left: 32px;
}
.currency-label {
  border: 2px solid white;
}
</style>

<template>
  <gb-tooltip v-if="alwaysShow || stat > 0" :title-text="$vuetify.lang.t(`$vuetify.currency.${ name }.name`)">
    <template v-slot:activator="{ on, attrs }">
      <div
        class="currency-container rounded d-flex flex-nowrap pa-2"
        :class="[transparent ? 'transparent' : currency.color, $vnode.data.class, $vnode.data.staticClass, {
          'render-currency-small': !large,
          'render-currency-large': large,
          'elevation-0': transparent,
          'darken-2': $vuetify.theme.dark,
          'render-currency-mobile': $vuetify.breakpoint.xsOnly,
          'mb-2': $vuetify.breakpoint.xsOnly && hasLabels,
          'mb-3': $vuetify.breakpoint.smAndUp && hasLabels
        }]"
        v-bind="attrs"
        v-on="{...$listeners, ...on}"
        @mouseover="handleHover"
      >
        <v-icon :color="transparent ? currency.color : undefined" class="mr-2">{{ icon }}</v-icon>
        <div class="currency-border rounded" :class="{'mt-n1 mb-1': hasLabels}">
          <v-progress-linear
            :background-color="transparent ? undefined : (currency.color + ($vuetify.theme.dark ? ' darken-4' : ' darken-2'))"
            :color="transparent ? undefined : (currency.color + ($vuetify.theme.dark ? '' : ' lighten-2'))"
            :value="percent"
            :height="$vuetify.breakpoint.xsOnly ? 20 : 24"
            style="overflow: visible;"
          >
            <span class="balloon-text-dynamic currency-text text-center">{{ $formatNum(currency.value) }}{{ finalCap !== null ? (' / ' + $formatNum(finalCap)) : '' }}</span>
            <template v-if="finalCap !== null">
              <div v-for="i in (large ? largeLinesSmall : smallLinesSmall)" :key="i" class="currency-line currency-line--small" :style="'left: ' + i + '%;'"></div>
              <div v-for="i in (large ? largeLinesMedium : smallLinesMedium)" :key="i" class="currency-line currency-line--medium" :style="'left: ' + i + '%;'"></div>
              <div class="currency-line currency-line--large"></div>
            </template>
          </v-progress-linear>
        </div>
        <div v-if="hasLabels" class="currency-labels d-flex justify-center">
          <div
            v-if="!currency.hideGainTag && gainTimerAmount > 0"
            class="currency-label balloon-text-dynamic rounded mx-1 px-1"
            :style="`background-color: var(--v-${ currency.color }-base);`"
          >+{{ currency.timerIsEstimate ? '~' : '' }}{{ $formatNum(gainTimerAmount, true) }}{{ gainUnit }}</div>
          <div
            v-if="capTimerNeeded !== null"
            class="currency-label balloon-text-dynamic rounded mx-1 px-1"
            :style="`background-color: var(--v-${ currency.color }-base);`"
          >{{ currency.timerIsEstimate ? '~' : '' }}{{ $formatTime(capTimerNeeded) }}</div>
        </div>
      </div>
    </template>
    <currency-tooltip :name="name" :gain-base="gainBase" :base-array="baseArray" :mult-array="multArray" :bonus-array="bonusArray">
      <slot></slot>
    </currency-tooltip>
  </gb-tooltip>
</template>

<script>
import CurrencyTooltip from '../partial/render/CurrencyTooltip.vue';

export default {
  components: { CurrencyTooltip },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    },
    transparent: {
      type: Boolean,
      required: false,
      default: false
    },
    alwaysShow: {
      type: Boolean,
      required: false,
      default: false
    },
    customCap: {
      type: Number,
      required: false,
      default: null
    },
    customFloor: {
      type: Number,
      required: false,
      default: null
    },
    customPercent: {
      type: Number,
      required: false,
      default: null
    },
    gainBase: {
      type: Number,
      required: false,
      default: null
    },
    baseArray: {
      type: Array,
      required: false,
      default: (() => [])
    },
    multArray: {
      type: Array,
      required: false,
      default: (() => [])
    },
    bonusArray: {
      type: Array,
      required: false,
      default: (() => [])
    },
    hideLabels: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: (() => ({
    smallLinesMedium: [],
    largeLinesMedium: [25, 75],
    smallLinesSmall: [10, 20, 30, 40, 60, 70, 80, 90],
    largeLinesSmall: [5, 10, 15, 20, 30, 35, 40, 45, 55, 60, 65, 70, 80, 85, 90, 95]
  })),
  computed: {
    currency() {
      return this.$store.state.currency[this.name];
    },
    icon() {
      if (this.$store.state.nightHunt.changedCurrency[this.name] === 'sack') {
        return 'mdi-sack';
      } else if (this.$store.state.nightHunt.changedCurrency[this.name] !== undefined) {
        return this.$store.state.currency['event_' + this.$store.state.nightHunt.changedCurrency[this.name]].icon;
      }
      return this.currency.icon;
    },
    finalCap() {
      return this.customCap !== null ? this.customCap : this.currency.cap;
    },
    finalFloor() {
      return this.customFloor !== null ? this.customFloor : 0;
    },
    percent() {
      return this.customPercent ?? (this.finalCap === null ? 100 : (100 * (this.currency.value - this.finalFloor) / (this.finalCap - this.finalFloor)));
    },
    stat() {
      return this.$store.state.stat[this.name].total;
    },
    showTimer() {
      return (this.currency.showGainTimer && this.gainAmount !== null && this.gainAmount > 0) ||
        (this.timerFunction !== null && this.timerFunction > 0);
    },
    gainName() {
      return this.currency.showGainMult ? this.$store.getters['currency/gainMultName'](...this.name.split('_')) : null;
    },
    gainAmount() {
      return this.gainName === null ? null : this.$store.getters['mult/get'](this.gainName);
    },
    gainDisplay() {
      return this.gainName === null ? null : this.$store.state.mult.items[this.gainName].display;
    },
    gainTimeMult() {
      switch (this.gainDisplay) {
        case 'perSecond':
          return 1;
        case 'perHour':
          return 3600;
        default:
          return 1;
      }
    },
    gainUnit() {
      switch (this.gainDisplay) {
        case 'perSecond':
          return '/s';
        case 'perHour':
          return '/h';
        default:
          return '/s';
      }
    },
    timerFunction() {
      return this.currency.gainTimerFunction === null ? null : this.currency.gainTimerFunction();
    },
    gainTimerAmount() {
      return (this.currency.showGainTimer ? this.gainAmount : this.timerFunction) * this.overcapMult;
    },
    isOvercap() {
      return this.currency.cap !== null && this.currency.value >= this.currency.cap;
    },
    overcapStage() {
      if (!this.isOvercap) {
        return 0;
      }
      return Math.floor(this.currency.value / this.currency.cap);
    },
    overcapMult() {
      if (!this.isOvercap) {
        return 1;
      }
      return this.currency.overcapMult * Math.pow(this.currency.overcapScaling, this.overcapStage - 1);
    },
    capTimerNeeded() {
      if (this.currency.cap === null || this.overcapMult <= 0) {
        return null;
      }
      const gainAmount = this.currency.showGainTimer ? this.gainAmount : this.timerFunction;
      return Math.ceil((this.currency.cap * (this.overcapStage + 1) - this.currency.value) * this.gainTimeMult / (gainAmount * this.overcapMult));
    },
    hasLabels() {
      return !this.hideLabels && this.$store.state.system.settings.experiment.items.currencyLabel.value && this.showTimer && ((!this.currency.hideGainTag && this.gainTimerAmount > 0) || this.capTimerNeeded !== null);
    }
  },
  methods: {
    handleHover() {
      if (this.$store.state.nightHunt.changedCurrency[this.name] !== undefined) {
        this.$store.dispatch('nightHunt/claimChangedCurrency', this.name);
      }
    }
  }
}
</script>
