<template>
  <v-card class="pa-1">
    <v-card-title class="pa-2 pt-0 justify-center">
      <v-icon class="mr-1" :color="heirloom.color">{{ heirloom.icon }}</v-icon>
      <span :class="`${ heirloom.color }--text`">{{ $vuetify.lang.t(`$vuetify.horde.heirloom.${ name }`) }}</span>
    </v-card-title>
    <v-card-subtitle class="pa-1 d-flex justify-center align-center">
      <span>Level {{ $formatNum(heirloom.level) }}</span>
      <template v-if="tillNext !== null">
        <v-icon size="12" class="mx-2">mdi-circle-medium</v-icon>
        <span>{{ $formatNum(heirloom.boost) }} / {{ $formatNum(tillNext) }}</span>
      </template>
      <v-icon v-if="gain !== null && tillNext !== null && gain >= (tillNext - heirloom.boost)" size="16" class="ml-1" color="success">mdi-arrow-up-circle</v-icon>
    </v-card-subtitle>
    <v-card-actions>
      <div>+{{ $formatNum(gain) }}</div>
      <v-spacer></v-spacer>
      <v-btn small color="success" @click="findHeirloomBoost">{{ $vuetify.lang.t(`$vuetify.gooboo.take`) }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    gain: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    heirloom() {
      return this.$store.state.horde.heirloom[this.name];
    },
    tillNext() {
      return [...this.$store.state.horde.heirloomAmountNeeded, null][this.heirloom.level];
    },
    displayLevel() {
      return Math.max(1, Math.min(10, this.heirloom.level));
    },
  },
  methods: {
    findHeirloomBoost() {
      this.$store.dispatch('horde/findHeirloomBoost', this.index);
    }
  }
}
</script>
