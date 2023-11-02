<template>
  <div class="d-flex flex-wrap ma-1">
    <v-select class="ma-1 w-100" v-for="(i, key) in valuesShow" :key="key + '-' + i.id" outlined hide-details clearable item-value="name" v-model="values[key]" :items="cardList" :no-data-text="$vuetify.lang.t('$vuetify.card.notFound')">
      <template v-slot:selection="{ item }"><card-select-display show-disabled :item="item"></card-select-display></template>
      <template v-slot:item="{ item }"><card-select-display class="my-2" :item="item"></card-select-display></template>
    </v-select>
  </div>
</template>

<script>
import CardSelectDisplay from './CardSelectDisplay.vue';

// Trick vues reactivity system by generating a different key on each change
// Without it, if you have two of the same card and delete the first,
// both slots would show as empty, even though the first still has the card
function* gen() {
  let id = 0;
  while (true) {
    yield id;
    id++;
  }
}
const getId = gen();

export default {
  components: { CardSelectDisplay },
  data: () => ({
    values: []
  }),
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
    cardListBase() {
      let cards = [];

      for (const [key, elem] of Object.entries(this.$store.state.card.card)) {
        if (elem.feature === this.feature && (this.group === null || elem.group === null || this.group === elem.group) && elem.amount > 1) {
          cards.push({name: key, ...elem});
        }
      }

      return cards;
    },
    cardList() {
      return this.cardListBase.map(elem => {
        let cardCount = this.values.filter(el => el === elem.name).length;
        return {...elem, disabled: cardCount >= (elem.amount - 1)};
      });
    },
    maxCards() {
      return this.$store.getters['mult/get'](this.feature + 'CardCap');
    },
    valuesShow() {
      return (this.values.length < this.maxCards ? [...this.values, null] : this.values).map(elem => {
        return {name: elem, id: getId.next().value};
      });
    },
    cardSelected() {
      return this.crop === null ? this.$store.state.card.feature[this.feature].cardSelected : this.$store.state.farm.crop[this.crop].cardSelected;
    }
  },
  mounted() {
    this.values = [...this.cardSelected];
  },
  watch: {
    values: {
      deep: true,
      immediate: false,
      handler(newVal) {
        let arr = newVal.filter(elem => elem !== null);
        if (arr.length !== newVal.length) {
          this.$set(this, 'values', arr);
        } else {
          if (this.crop === null) {
            this.$store.commit('card/updateKey', {type: 'feature', name: this.feature, crop: this.crop, key: 'cardSelected', value: arr});
          } else {
            this.$store.commit('farm/updateCropKey', {name: this.crop, key: 'cardSelected', value: arr});
          }
        }
      }
    },
    cardSelected: {
      deep: true,
      immediate: false,
      handler(newVal) {
        // Fix cards not updating after prestige
        if (newVal.length <= 0 && this.values.length > 0) {
          this.values = [];
        }
      }
    }
  }
}
</script>
