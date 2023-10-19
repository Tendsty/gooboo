<style scoped>
.ingredient-container {
  position: relative;
  width: 96px;
  height: 96px;
}
.ingredient-container-mobile {
  width: 72px;
  height: 72px;
}
.ingredient-amount {
  position: absolute;
  right: 4px;
  bottom: 0px;
  font-size: 18px;
}
.ingredient-more {
  position: absolute;
  left: 4px;
  top: 4px;
  opacity: 0.75;
}
.ingredient-less {
  position: absolute;
  left: 4px;
  bottom: 4px;
  opacity: 0.75;
}
.ingredient-close {
  position: absolute;
  right: 4px;
  top: 4px;
  opacity: 0.75;
}
</style>

<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.currency.event_${ingredientName}.name`)">
    <template v-slot:activator="{ on, attrs }">
      <div class="ingredient-container rounded-lg d-flex justify-center align-center" @mouseover="hovered = true" @mouseleave="hovered = false" :class="[$vuetify.theme.dark ? 'darken-2' : 'lighten-2', {'ingredient-container-mobile': $vuetify.breakpoint.xsOnly}, currency.color, $vnode.data.staticClass]" v-bind="attrs" v-on="on">
        <v-icon :size="$vuetify.breakpoint.xsOnly ? 32 : 48">{{ currency.icon }}</v-icon>
        <div v-if="isBonus" class="ingredient-amount">{{ $formatNum(ingredientAmount) }}</div>
        <div v-else-if="potionLevel !== null" class="ingredient-amount">{{ $formatNum(potionLevel + 1) }}</div>
        <v-btn @click="addAmount" v-if="isBonus && hovered" :disabled="!canIncreaseAmount" class="ingredient-more px-0" small min-width="28" min-height="28"><v-icon small>mdi-arrow-up</v-icon></v-btn>
        <v-btn @click="removeAmount" v-if="isBonus && hovered" :disabled="!canDecreaseAmount" class="ingredient-less px-0" small min-width="28" min-height="28"><v-icon small>mdi-arrow-down</v-icon></v-btn>
        <v-btn @click="removeIngredient" v-if="hovered" class="ingredient-close px-0" color="error" small min-width="28" min-height="28"><v-icon small>mdi-close</v-icon></v-btn>
      </div>
    </template>
    <template v-if="isBonus">
      <display-row class="mt-0" v-for="(item, key) in ingredientStat" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :after="item.value"></display-row>
    </template>
  </gb-tooltip>
</template>

<script>
import { mapGetters } from 'vuex';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow },
  props: {
    keyName: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    hovered: false
  }),
  computed: {
    ...mapGetters({
      ritualRecipe: 'nightHunt/ritualRecipe',
      ritualPerformed: 'nightHunt/ritualPerformed'
    }),
    potionLevel() {
      if (this.ritualRecipe && this.ritualPerformed) {
        return this.$store.state.nightHunt.potion[this.ritualRecipe].level;
      }
      return null;
    },
    isBonus() {
      return this.keyName === 'bonusIngredients';
    },
    ingredient() {
      return this.$store.state.nightHunt[this.keyName][this.index];
    },
    ingredientAmount() {
      return this.isBonus ? this.ingredient.amount : 1;
    },
    ingredientName() {
      return this.isBonus ? this.ingredient.name : this.ingredient;
    },
    ingredientStat() {
      return this.$store.state.nightHunt.ingredientStat[this.ingredientName].effect.map(elem => {
        return {name: elem.name, type: elem.type, value: elem.type === 'mult' ? Math.pow(elem.value, this.ingredientAmount) : (elem.value * this.ingredientAmount)};
      });
    },
    currency() {
      return this.$store.state.currency['event_' + this.ingredientName];
    },
    canIncreaseAmount() {
      return this.ingredientAmount < this.$store.getters['mult/get']('nightHuntBonusIngredientAmount');
    },
    canDecreaseAmount() {
      return this.ingredientAmount > 1;
    }
  },
  methods: {
    addAmount() {
      this.$store.commit('nightHunt/updateIngredientKey', {key: this.keyName, index: this.index, subkey: 'amount', value: this.ingredient.amount + 1});
    },
    removeAmount() {
      this.$store.commit('nightHunt/updateIngredientKey', {key: this.keyName, index: this.index, subkey: 'amount', value: this.ingredient.amount - 1});
    },
    removeIngredient() {
      this.$store.commit('nightHunt/removeIngredient', {key: this.keyName, index: this.index});
    }
  }
}
</script>
