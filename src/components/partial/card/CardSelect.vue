<template>
  <div class="d-flex flex-wrap ma-1">
    <v-select class="ma-1 w-100" outlined multiple clearable hide-details item-value="name" v-model="values" :items="cardList" v-on:input="limitCards" :no-data-text="$vuetify.lang.t('$vuetify.card.notFound')">
      <template v-slot:selection="{ item }"><card-select-display class="pa-1" style="width: 50%;" hide-amount show-disabled :item="item"></card-select-display></template>
      <template v-slot:item="{ item }"><card-select-display class="my-2" :item="item"></card-select-display></template>
    </v-select>
  </div>
</template>

<script>
import CardSelectDisplay from './CardSelectDisplay.vue';

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
    cardList() {
      let cards = [];
      for (const [key, elem] of Object.entries(this.$store.state.card.card)) {
        if (elem.feature === this.feature && (this.group === null || elem.group === null || this.group === elem.group) && elem.amount > 1) {
          cards.push({name: key, ...elem});
        }
      }
      return cards;
    },
    maxCards() {
      return this.$store.getters['mult/get'](this.feature + 'CardCap');
    },
    cardSelected() {
      return this.crop === null ? this.$store.state.card.feature[this.feature].cardSelected : this.$store.state.farm.crop[this.crop].cardSelected;
    }
  },
  methods: {
    limitCards(e) {
      if (e.length > this.maxCards) {
        e.pop();
      }
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
        if (this.crop === null) {
          this.$store.commit('card/updateKey', {type: 'feature', name: this.feature, crop: this.crop, key: 'cardSelected', value: newVal});
        } else {
          this.$store.commit('farm/updateCropKey', {name: this.crop, key: 'cardSelected', value: newVal});
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
