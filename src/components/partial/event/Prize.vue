<template>
  <price-tag v-if="prize.type === 'currency'" add :currency="prize.item" :amount="amount"></price-tag>
  <div v-else-if="prize.type === 'consumable'" class="d-flex align-center">
    <consumable :name="prize.item" show-details></consumable>
    <div class="ml-2" v-if="amount > 1"><v-icon size="10">mdi-close</v-icon>{{ amount }}</div>
  </div>
  <div v-else-if="prize.type === 'cardPack'" class="d-flex align-center">
    <v-icon>mdi-cards</v-icon>
    <div class="mx-1">{{ $vuetify.lang.t(`$vuetify.card.pack.${ prize.item }`) }}</div>
    <v-chip class="px-2 mx-1" label small><v-icon class="mr-1">mdi-cards</v-icon>{{ cardPackAmount * amount }}</v-chip>
  </div>
  <mini v-else-if="prize.type === 'relic'" large :name="prize.item"></mini>
  <theme-item v-else-if="prize.type === 'theme'" :name="prize.item" hide-actions small></theme-item>
  <item-slot v-else-if="prize.type === 'treasure'" :item-obj="prize.data"></item-slot>
</template>

<script>
import Consumable from '../../render/Consumable.vue';
import PriceTag from '../../render/PriceTag.vue';
import Mini from '../relic/Mini.vue';
import ThemeItem from '../settings/ThemeItem.vue';
import ItemSlot from '../treasure/ItemSlot.vue';

export default {
  components: { Consumable, Mini, PriceTag, ThemeItem, ItemSlot },
  props: {
    pool: {
      type: String,
      required: true
    },
    prizeBase: {
      type: Object,
      required: true
    }
  },
  computed: {
    prize() {
      const prize = this.$store.state.event.prize[this.prizeBase.prize];
      return {...prize, ...prize.pool[this.pool], ...this.prizeBase};
    },
    amount() {
      return this.prize.amount * this.prize.amountMult();
    },
    cardPackAmount() {
      return this.prize.type === 'cardPack' ? this.$store.state.card.pack[this.prize.item].amount : 1;
    }
  }
}
</script>
