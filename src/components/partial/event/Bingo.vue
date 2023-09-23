<style scoped>
.bingo-card-container {
  width: 400px;
}
.bingo-card-column {
  width: 80px;
}
.bingo-draw {
  width: 40px;
  height: 40px;
}

.bingo-card-mobile {
  width: 300px;
}
.bingo-card-mobile .bingo-card-column {
  width: 60px;
}
.bingo-draw-mobile {
  width: 28px;
  height: 28px;
}
</style>

<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container-tab' : ''">
    <div class="d-flex flex-wrap justify-center">
      <div class="d-flex align-center rounded blue ma-1 pa-1">
        <v-icon>mdi-trophy-award</v-icon>
        <span class="mr-1">{{ $vuetify.lang.t(`$vuetify.event.casino.bingo.1`) }}:</span>
        <prize pool="bingo2" :prizeBase="bingoPrize1"></prize>
      </div>
      <div class="d-flex align-center rounded purple ma-1 pa-1">
        <v-icon>mdi-trophy-award</v-icon>
        <span class="mr-1">{{ $vuetify.lang.t(`$vuetify.event.casino.bingo.2`) }}:</span>
        <prize pool="bingo3" :prizeBase="bingoPrize2"></prize>
      </div>
      <div class="d-flex align-center rounded orange ma-1 pa-1">
        <v-icon>mdi-trophy-award</v-icon>
        <span class="mr-1">{{ $vuetify.lang.t(`$vuetify.event.casino.bingo.3`) }}:</span>
        <prize pool="bingo4" :prizeBase="bingoPrize3"></prize>
      </div>
    </div>
    <div v-if="bingoCard !== null" class="d-flex flex-wrap mx-auto bingo-card-container" :class="{'bingo-card-mobile': $vuetify.breakpoint.xsOnly}">
      <div v-for="(column, y) in bingoCard" :key="y" class="bingo-card-column">
        <bingo-cell v-for="(cell, x) in column" :key="y + '-' + x" :cell="cell" :drawn="bingoDraws.includes(cell.value)" @click="applyMultiplier(cell.value)"></bingo-cell>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-center">
      <template v-if="isBought">
        <div class="d-flex justify-center align-center rounded-circle bingo-draw ma-1" :class="{'primary': singleDraw !== null, 'secondary': singleDraw === null, 'bingo-draw-mobile': $vuetify.breakpoint.xsOnly}" v-for="(singleDraw, key) in allDraws" :key="'draw-' + key">
          <span v-if="singleDraw !== null">{{ singleDraw }}</span>
        </div>
        <v-spacer></v-spacer>
        <v-badge class="ma-1 mr-4" v-if="multiplierNext !== null" bottom overlap :content="`x${multiplierNext}`">
          <v-icon>mdi-cursor-default-click</v-icon>
        </v-badge>
        <v-btn v-if="isFinished" class="primary ma-1" @click="reset">{{ $vuetify.lang.t('$vuetify.gooboo.finish') }}</v-btn>
        <v-btn v-else class="primary ma-1" @click="draw">{{ $vuetify.lang.t('$vuetify.gooboo.draw') }}</v-btn>
      </template>
      <div v-else class="d-flex align-center bg-tile-default rounded ma-1 pa-1">
        <price-tag class="ma-1" currency="gem_topaz" :amount="bingoCardCost"></price-tag>
        <v-btn class="primary ma-1" :disabled="!canAffordCard" @click="buy">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { CASINO_BINGO_CARD_COST } from '../../../js/constants';
import { buildArray } from '../../../js/utils/array';
import PriceTag from '../../render/PriceTag.vue';
import BingoCell from './BingoCell.vue';
import Prize from './Prize.vue';

export default {
  components: { Prize, BingoCell, PriceTag },
  computed: {
    ...mapState({
      bingoDraws: state => state.event.casino_bingo_draws,
      bingoPrize1: state => state.event.casino_bingo_prize_1,
      bingoPrize2: state => state.event.casino_bingo_prize_2,
      bingoPrize3: state => state.event.casino_bingo_prize_3,
      isBought: state => state.event.casino_bingo_bought
    }),
    ...mapGetters({
      multiplierNext: 'event/casinoMultiplierNext'
    }),
    bingoCard() {
      if (this.$store.state.event.casino_bingo_card === null) {
        return null;
      }
      return this.$store.state.event.casino_bingo_card.map(column => {
        return [...column].map(cell => {
          const boostIndex = this.$store.state.event.casino_bingo_boosts.findIndex(boost => boost === cell.value);
          return {...cell, multiplier: boostIndex === -1 ? null : Math.floor(boostIndex / 2 + 3)};
        });
      });
    },
    bingoCardCost() {
      return CASINO_BINGO_CARD_COST;
    },
    isFinished() {
      return this.bingoDraws.length > 22;
    },
    canAffordCard() {
      return this.$store.getters['currency/value']('gem_topaz') >= CASINO_BINGO_CARD_COST;
    },
    allDraws() {
      return buildArray(25).map(elem => {
        return this.bingoDraws.length >= (elem + 1) ? this.bingoDraws[elem] : null;
      });
    }
  },
  methods: {
    draw() {
      this.$store.dispatch('event/casinoBingoCardDraw');
    },
    reset() {
      this.$store.commit('event/updateKey', {key: 'casino_bingo_bought', value: false});
      this.$store.dispatch('event/casinoBingoCardGenerate');
    },
    applyMultiplier(num) {
      this.$store.dispatch('event/casinoApplyMultiplier', num);
    },
    buy() {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'casinoBingoBuy',
          price: {gem_topaz: CASINO_BINGO_CARD_COST},
        }});
      } else {
        this.$store.dispatch('event/casinoBingoBuy');
      }
    }
  }
}
</script>
