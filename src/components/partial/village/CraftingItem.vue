<style scoped>
.crafting-badge-item >>> .v-badge__badge {
  pointer-events: none;
}
</style>

<template>
  <v-badge class="crafting-badge-item" overlap bordered offset-x="16" offset-y="16" bottom :value="crafting.isSelling" :color="crafting.color">
    <v-badge overlap bordered offset-x="16" offset-y="16" :value="crafting.isCrafting" :color="crafting.color">
      <v-badge overlap bordered offset-x="16" offset-y="16" bottom left :value="crafting.isSpecial" :color="crafting.color">
        <v-btn width="108" class="justify-start balloon-text-dynamic px-2" :color="crafting.color" v-on="$listeners">
          <v-icon class="mr-1">{{ crafting.icon }}</v-icon>
          {{ $formatNum(crafting.owned) }}
        </v-btn>
        <template v-slot:badge>
          <v-icon x-small>mdi-star</v-icon>
        </template>
      </v-badge>
      <template v-slot:badge>
        <v-icon x-small>mdi-hammer</v-icon>
      </template>
    </v-badge>
    <template v-slot:badge>
      <v-icon x-small>mdi-currency-usd</v-icon>
    </template>
  </v-badge>
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
    crafting() {
      return this.$store.state.village.crafting[this.name];
    }
  }
}
</script>
