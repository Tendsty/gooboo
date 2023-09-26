<template>
  <div>
    <div v-if="cardsEquipped.length > 0" class="text-center">{{ $vuetify.lang.t(`$vuetify.card.active`) }}:</div>
    <div class="d-flex flex-wrap ma-1">
      <card-select-display class="text-center justify-center pa-1" style="min-width: 50%;" hide-amount v-for="(item, key) in cardsEquipped" :key="key" :item="{...cards[item], name: item}"></card-select-display>
    </div>
    <div class="text-center">
      <span>{{ cardsSelected }} / {{ maxCards }} {{ $vuetify.lang.t(`$vuetify.card.equipped`) }}</span>
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="ml-2" small v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.card.activeDescription`) }}</div>
      </gb-tooltip>
    </div>
    <card-select :feature="feature"></card-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CardSelect from './CardSelect.vue';
import CardSelectDisplay from './CardSelectDisplay.vue';

export default {
  components: { CardSelect, CardSelectDisplay },
  props: {
    feature: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      cards: state => state.card.card
    }),
    cardsSelected() {
      return this.$store.state.card.feature[this.feature].cardSelected.length;
    },
    cardsEquipped() {
      return this.$store.state.card.feature[this.feature].cardEquipped;
    },
    maxCards() {
      return this.$store.getters['mult/get'](this.feature + 'CardCap');
    }
  }
}
</script>
