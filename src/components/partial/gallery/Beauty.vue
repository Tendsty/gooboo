<style scoped>
.render-currency-large {
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
    <div
    class="currency-container rounded d-flex flex-nowrap pa-2 ma-2 render-currency-large"
    :class="[currency.color, $vnode.data.class, $vnode.data.staticClass, {
        'darken-2': $vuetify.theme.dark,
        'render-currency-mobile': $vuetify.breakpoint.xsOnly
    }]"
    >
    <v-icon color="white" class="mr-2">{{ icon }}</v-icon>
    <div class="currency-border rounded mt-n1 mb-1">
        <v-progress-linear
            :background-color="currency.color + ($vuetify.theme.dark ? ' darken-4' : ' darken-2')"
            :color="currency.color + ($vuetify.theme.dark ? '' : ' lighten-2')"
            :value="percent"
            :height="$vuetify.breakpoint.xsOnly ? 20 : 24"
            style="overflow: visible;"
            >
            <span class="balloon-text-dynamic currency-text text-center">
                {{ $formatNum(totalBeauty) }} ( {{ globalLevel }} ) / {{ $formatNum(nextTotalBeauty) }} ( {{ globalLevel+1 }} )
            </span>
            <!-- 刻度线 -->
            <template>
                <div v-for="i in largeLinesSmall" :key="i" class="currency-line currency-line--small" :style="'left: ' + i + '%;'"></div>
                <div v-for="i in largeLinesMedium" :key="i" class="currency-line currency-line--medium" :style="'left: ' + i + '%;'"></div>
                <div class="currency-line currency-line--large"></div>
            </template>
        </v-progress-linear>
    </div>
    <div class="currency-labels d-flex justify-center">
        <div
        class="currency-label balloon-text-dynamic rounded mx-1 px-1"
        :style="`background-color: var(--v-${ currency.color }-base);`"
        >+{{ currency.timerIsEstimate ? '~' : '' }}{{ $formatNum(gainTimerAmount, true) }}{{ gainUnit }}</div>
        <div
        class="currency-label balloon-text-dynamic rounded mx-1 px-1"
        :style="`background-color: var(--v-${ currency.color }-base);`"
        >{{ currency.timerIsEstimate ? '~' : '' }}{{ $formatTime(capTimerNeeded) }}</div>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { logBase } from "../../../js/utils/math";

export default {
  data: (() => ({
    smallLinesMedium: [],
    largeLinesMedium: [25, 75],
    smallLinesSmall: [10, 20, 30, 40, 60, 70, 80, 90],
    largeLinesSmall: [5, 10, 15, 20, 30, 35, 40, 45, 55, 60, 65, 70, 80, 85, 90, 95],
    name: 'gallery_beauty'
  })),
  computed: {
    ...mapState({
      totalBeauty: state => state.stat.gallery_beauty.total
    }),
    currency() {
        return this.$store.state.currency[this.name];
    },
    icon() {
      return this.currency.icon;
    },
    globalLevel() {
      return Math.floor(logBase(this.totalBeauty, 5));
    },
    nextTotalBeauty() {
      return Math.exp((this.globalLevel+1)*Math.log(5));
    },
    percent() {
      return 100 * this.totalBeauty / this.nextTotalBeauty;
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
      return this.currency.showGainTimer ? this.gainAmount : this.timerFunction;
    },
    capTimerNeeded() {
      const gainAmount = this.currency.showGainTimer ? this.gainAmount : this.timerFunction;
      return Math.ceil((this.nextTotalBeauty - this.totalBeauty) * this.gainTimeMult / gainAmount);
    }
  }
}
</script>
