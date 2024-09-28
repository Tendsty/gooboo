<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.farm.building.${ name }.name`) }}</v-card-title>
    <v-card-subtitle v-if="premium > 0" class="pa-2 text-center">{{ $vuetify.lang.t(`$vuetify.farm.building.premiumOwned`, premium) }}</v-card-subtitle>
    <v-card-subtitle v-else class="pa-2 text-center">{{ $vuetify.lang.t(`$vuetify.farm.building.owned`, owned) }}</v-card-subtitle>
    <v-card-text>{{ $vuetify.lang.t(`$vuetify.farm.building.${ name }.description${ premium > 0 ? 'Premium' : '' }`) }}</v-card-text>
  </v-card>
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
    building() {
      return this.$store.state.farm.building[this.name];
    },
    premium() {
      return this.building.maxPremium - this.building.cachePremium;
    },
    owned() {
      return this.building.max - this.building.cacheAmount;
    }
  }
}
</script>
