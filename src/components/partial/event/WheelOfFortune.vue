<style scoped>
.wheel-container {
  height: 500px;
  width: 500px;
  position: relative;
  overflow: hidden;
}
.wheel-pointer {
  position: absolute;
  top: -12px;
  left: 230px;
  z-index: 1;
}
.wheel-background {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 100%;
}
.wheel-point {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #181818;
  border-radius: 100%;
  top: 245px;
  left: 245px;
}
.wheel-segment {
  transition: transform 3s;
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 100%;
  clip: rect(0px, 500px, 500px, 250px);
}
.wheel-inner {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 100%;
  clip: rect(0px, 250px, 500px, 0px);
  text-align: center;
}

.wheel-mobile {
  height: 250px;
  width: 250px;
}
.wheel-mobile .wheel-pointer {
  left: 105px;
}
.wheel-mobile .wheel-background {
  width: 250px;
  height: 250px;
}
.wheel-mobile .wheel-point {
  top: 120px;
  left: 120px;
}
.wheel-mobile .wheel-segment {
  width: 250px;
  height: 250px;
  clip: rect(0px, 250px, 250px, 125px);
}
.wheel-mobile .wheel-inner {
  width: 250px;
  height: 250px;
  clip: rect(0px, 125px, 250px, 0px);
}
</style>

<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container-tab' : ''">
    <div :class="{'d-flex': $vuetify.breakpoint.mdAndUp}">
      <div class="flex-shrink-0 wheel-container" :class="{'wheel-mobile': $vuetify.breakpoint.xsOnly, 'mx-auto': $vuetify.breakpoint.smAndDown}">
        <v-icon class="wheel-pointer" size="40">mdi-chevron-up</v-icon>
        <div class="wheel-background elevation-2"></div>
        <div v-for="(item, key) in segments" :key="key" class="wheel-segment" :style="`transform: rotate(${item.offset + rotation}deg);`">
          <div class="wheel-inner" :class="item.color" :style="`transform: rotate(${item.width}deg);`"></div>
        </div>
        <div class="wheel-point elevation-2"></div>
      </div>
      <v-row style="height: min-content;" no-gutters>
        <v-col v-for="(item, key) in segments" :key="'prize-' + key" class="pa-1" cols="12" md="6" lg="4" xl="3">
          <v-card :color="key === wheelSegment ? 'secondary' : undefined">
            <v-card-title class="justify-center pa-1 pb-0" :class="`${ item.color }--text`">{{ $formatNum(item.width / 3.6) }}%</v-card-title>
            <v-card-text class="pa-2 pt-0">
              <prize :pool="'wheelOfFortune' + item.rarity" :prizeBase="item.prize"></prize>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex justify-center ma-1">
      <div class="d-flex align-center bg-tile-default rounded ma-1 pa-1">
        <price-tag class="ma-1" currency="gem_topaz" :amount="wheelCost"></price-tag>
        <v-btn class="primary ma-1" :disabled="!canAffordWheel" @click="buy">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { CASINO_WHEEL_COST } from '../../../js/constants';
import PriceTag from '../../render/PriceTag.vue';
import Prize from './Prize.vue';

export default {
  components: { Prize, PriceTag },
  data: () => ({
    rarityColors: ['red', 'orange', 'amber', 'yellow', 'light-green', 'green', 'teal', 'light-blue', 'blue', 'indigo', 'purple', 'pink']
  }),
  computed: {
    ...mapState({
      rotation: state => state.event.casino_wheel_rotation
    }),
    ...mapGetters({
      wheelSegment: 'event/getWheelSegment'
    }),
    segments() {
      let offset = 0;
      return this.$store.state.event.casino_wheel_segments.map((elem, index) => {
        let offsetNew = offset;
        offset += elem.width;
        return {
          ...elem,
          offset: offsetNew,
          color: this.rarityColors[index]
        };
      });
    },
    wheelCost() {
      return CASINO_WHEEL_COST;
    },
    canAffordWheel() {
      return this.$store.getters['currency/value']('gem_topaz') >= CASINO_WHEEL_COST;
    }
  },
  methods: {
    buy() {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'casinoWheelSpin',
          price: {gem_topaz: CASINO_WHEEL_COST},
        }});
      } else {
        this.$store.dispatch('event/casinoWheelSpin');
      }
    }
  }
}
</script>
