<style scoped>
.render-currency-small {
  width: 200px;
  font-size: 16px;
}
.render-currency-large {
  width: 360px;
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
.render-currency-mobile {
  font-size: 80%;
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
</style>

<template>
  <gb-tooltip v-if="alwaysShow || stat > 0" :title-text="$vuetify.lang.t(`$vuetify.currency.${ name }.name`)">
    <template v-slot:activator="{ on, attrs }">
      <div v-if="currency" class="rounded d-flex flex-nowrap pa-2" :class="[transparent ? 'transparent' : currency.color, $vnode.data.class, $vnode.data.staticClass, {'render-currency-small': !large, 'render-currency-large': large, 'elevation-0': transparent, 'darken-2': $vuetify.theme.dark, 'render-currency-mobile': $vuetify.breakpoint.xsOnly}]" v-bind="attrs" v-on="{...$listeners, ...on}" @mouseover="handleHover">
        <v-icon :color="transparent ? currency.color : undefined" class="mr-2">{{ icon }}</v-icon>
        <div class="currency-border rounded">
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
      </div>
    </template>
    <currency-tooltip :name="name" :gain-base="gainBase" :base-array="baseArray" :mult-array="multArray">
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
      if (this.$store.state.nightHunt.changedCurrency[this.name] !== undefined) {
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
