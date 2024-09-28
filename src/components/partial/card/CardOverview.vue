<template>
  <div>
    <div v-if="cardsEquipped.length > 0" class="text-center">{{ $vuetify.lang.t(`$vuetify.card.active`) }}:</div>
    <div v-if="cardsEquipped.length > 0" class="d-flex justify-center">
      <gb-tooltip key="card-power-equipped">
        <template v-slot:activator="{ on, attrs }">
          <div style="width: fit-content;" v-bind="attrs" v-on="on">{{ $vuetify.lang.t(`$vuetify.card.cardPowerValue`, $formatNum(cardPowerEquipped)) }}</div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.card.cardPowerDescription`) }}</div>
        <display-row :class="`mt-${ key > 0 ? '0' : '2' }`" v-for="(item, key) in cardPowerEquippedEffect" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :after="item.value"></display-row>
      </gb-tooltip>
    </div>
    <div v-if="cardsEquipped.length > 0" class="d-flex flex-wrap ma-1">
      <card-select-display class="text-center justify-center pa-1" style="min-width: 50%;" hide-amount v-for="(item, key) in cardsEquipped" :key="key" :item="{...cards[item], name: item}"></card-select-display>
    </div>
    <div class="text-center">
      <span>{{ cardsSelected.length }} / {{ maxCards }} {{ $vuetify.lang.t(`$vuetify.card.equipped`) }}</span>
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="ml-2" small v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.card.activeDescription`) }}</div>
      </gb-tooltip>
    </div>
    <div class="d-flex justify-center">
      <gb-tooltip key="card-power-selected">
        <template v-slot:activator="{ on, attrs }">
          <div style="width: fit-content;" v-bind="attrs" v-on="on">{{ $vuetify.lang.t(`$vuetify.card.cardPowerValue`, $formatNum(cardPowerSelected)) }}</div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.card.cardPowerDescription`) }}</div>
        <display-row :class="`mt-${ key > 0 ? '0' : '2' }`" v-for="(item, key) in cardPowerSelectedEffect" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :after="item.value"></display-row>
      </gb-tooltip>
    </div>
    <card-select :key="`card-select-${ feature }-${ crop }`" :feature="feature" :crop="crop" :group="group"></card-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DisplayRow from '../upgrade/DisplayRow.vue';
import CardSelect from './CardSelect.vue';
import CardSelectDisplay from './CardSelectDisplay.vue';

export default {
  components: { CardSelect, CardSelectDisplay, DisplayRow },
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
      return this.crop === null ? this.$store.state.card.feature[this.feature].cardSelected : this.$store.state.farm.crop[this.crop].cardSelected;
    },
    cardsEquipped() {
      return this.crop === null ? this.$store.state.card.feature[this.feature].cardEquipped : this.$store.state.farm.crop[this.crop].cardEquipped;
    },
    maxCards() {
      return this.$store.getters['mult/get'](this.feature + 'CardCap');
    },
    cardPowerEquipped() {
      return this.cardsEquipped.reduce((a, b) => a + this.cards[b].power, 0);
    },
    cardPowerSelected() {
      return this.cardsSelected.reduce((a, b) => a + this.cards[b].power, 0);
    },
    cardPowerEquippedEffect() {
      return this.cardPowerEquipped <= 0 ? [] : this.$store.state.card.feature[this.feature].powerReward.map(elem => {
        return {...elem, value: elem.value(this.cardPowerEquipped)};
      });
    },
    cardPowerSelectedEffect() {
      return this.cardPowerSelected <= 0 ? [] : this.$store.state.card.feature[this.feature].powerReward.map(elem => {
        return {...elem, value: elem.value(this.cardPowerSelected)};
      });
    }
  }
}
</script>
