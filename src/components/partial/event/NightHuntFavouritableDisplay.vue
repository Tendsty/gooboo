<template>
  <div v-if="name === 'copy'">{{ $vuetify.lang.t(`$vuetify.event.nightHunt.favouriteIngredient.copy`) }}</div>
  <div v-else class="d-flex align-center">
    <v-icon :color="colorIcon" class="mr-2">{{ ingredient.icon }}</v-icon>
    <div :class="colorText">{{ $vuetify.lang.t(`$vuetify.currency.event_${ name }.name`) }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ingredient() {
      return this.name === 'copy' ? {} : this.$store.state.currency['event_' + this.name];
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'lighten-2' : 'darken-1';
    },
    colorText() {
      return this.ingredient.color + '--text text--' + this.themeModifier;
    },
    colorIcon() {
      return this.ingredient.color ? (this.ingredient.color + ' ' + this.themeModifier) : null;
    }
  }
}
</script>
