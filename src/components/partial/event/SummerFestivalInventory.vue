<template>
  <div>
    <div class="d-flex flex-wrap justify-center pa-1">
      <currency v-for="item in currencies" :key="`currency-${ item }`" class="ma-1" :name="`event_${ item }`"></currency>
    </div>
    <v-card class="ma-2">
      <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t('$vuetify.event.summerFestival.quest.name') }} #{{ questNumber }}</v-card-title>
      <v-card-text class="pa-0">
        <ul>
          <li v-for="(item, key) in currentQuest" :key="`task-${ key }`">
            <template v-if="item.type === 'currency'">
              <span>{{ $vuetify.lang.t(`$vuetify.event.summerFestival.quest.currency`, $formatNum(item.amount)) }}</span>
              <currency-icon :name="item.name"></currency-icon>
            </template>
            <template v-else-if="item.type === 'building'">{{
              $vuetify.lang.t(
                `$vuetify.event.summerFestival.quest.building`,
                item.amount,
                item.level,
                $vuetify.lang.t(`$vuetify.event.summerFestival.building.${ item.name }.name`)
              )
            }}</template>
          </li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <price-tag class="ma-1" currency="event_summerFestivalToken" :amount="questTokenGain" add></price-tag>
        <v-btn class="ma-1" color="primary" :disabled="!questIsComplete" @click="completeQuest">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.complete`) }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Currency from '../../render/Currency.vue';
import CurrencyIcon from '../../render/CurrencyIcon.vue';
import PriceTag from '../../render/PriceTag.vue';

export default {
  components: { Currency, PriceTag, CurrencyIcon },
  data: () => ({
    currencies: [
      'cocktail', 'summerFestivalToken',
      'log', 'stoneBlock', 'coconut', 'shell',
      'music', 'sand', 'freshWater', 'coal', 'metalPart', 'pearl', 'salt', 'pepper', 'honey', 'vegetable', 'citrusFruit', 'rawFish', 'cookedFish', 'rawMeat', 'cookedMeat',
      'solidPlate', 'sandstone', 'hardSteel', 'compositePlate',
      'coconutSalad', 'saltyShell', 'lemonCandy', 'steak', 'fishSticks'
    ]
  }),
  computed: {
    ...mapGetters({
      currentQuest: 'summerFestival/currentQuest',
      questTokenGain: 'summerFestival/questTokenGain',
      questIsComplete: 'summerFestival/questIsComplete'
    }),
    questNumber() {
      return this.$store.state.summerFestival.questsCompleted + 1;
    }
  },
  methods: {
    completeQuest() {
      this.$store.dispatch('summerFestival/completeQuest');
    }
  }
}
</script>
