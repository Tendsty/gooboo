<template>
  <v-card>
    <v-card-title class="pa-2 justify-center" :class="`${potion.color}--text`">{{ $vuetify.lang.t(`$vuetify.event.nightHunt.potion.${name}`) }}</v-card-title>
    <v-card-subtitle class="pa-1 text-center">{{ $vuetify.lang.t('$vuetify.gooboo.level') }} {{ potion.level }}</v-card-subtitle>
    <v-card-text>
      <div class="d-flex justify-center">
        <div @click="setToRecipe">
          <currency-icon large class="ma-1" v-for="(item, key) in potion.recipe" :key="`ingredient-${key}`" :name="`event_${item}`"></currency-icon>
        </div>
      </div>
      <display-row v-for="(item, key) in effect" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :after="item.value"></display-row>
    </v-card-text>
  </v-card>
</template>

<script>
import CurrencyIcon from '../../render/CurrencyIcon.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow, CurrencyIcon },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    potion() {
      return this.$store.state.nightHunt.potion[this.name];
    },
    effect() {
      return this.potion.effect.map(elem => {
        return {...elem, value: elem.value(this.potion.level)};
      });
    }
  },
  methods: {
    setToRecipe() {
      this.$store.dispatch('nightHunt/setToRecipe', this.name);
    }
  }
}
</script>
