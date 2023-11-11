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
    <card-select :key="`card-select-${ feature }-${ crop }`" :feature="feature" :crop="crop" :group="group"></card-select>
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
    },
    crop: {
      type: String,
      required: false,
      default: null
    },
    group: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState({
      cards: state => state.card.card
    }),
    cardsSelected() {
      return this.crop === null ? this.$store.state.card.feature[this.feature].cardSelected.length : this.$store.state.farm.crop[this.crop].cardSelected.length;
    },
    cardsEquipped() {
      return this.crop === null ? this.$store.state.card.feature[this.feature].cardEquipped : this.$store.state.farm.crop[this.crop].cardEquipped;
    },
    maxCards() {
      return this.$store.getters['mult/get'](this.feature + 'CardCap');
    }
  }
}
</script>
