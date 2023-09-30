<style scoped>
.active-container {
  width: 36px;
  height: 36px;
}
</style>

<template>
  <div class="d-flex justify-space-between align-center w-100">
    <v-icon class="mr-1">{{ item.icon }}</v-icon>
    <div class="d-flex align-center flex-grow-1" :class="{'flex-column': $vuetify.breakpoint.xsOnly, 'justify-space-between': $vuetify.breakpoint.smAndUp}">
      <div>{{ $vuetify.lang.t(`$vuetify.horde.items.${ name }`) }}</div>
      <v-chip class="mx-1 px-2" :class="{'error--text': item.cooldownLeft > 0}" small label>
        <v-icon small class="mr-1">mdi-timer</v-icon>
        <span>{{ $formatTime(cooldown) }}</span>
        <span v-if="item.cooldownLeft > 0">&nbsp;({{ $formatTime(Math.ceil(item.cooldownLeft)) }})</span>
      </v-chip>
    </div>
    <div class="active-container rounded d-flex justify-center align-center" :class="item.activeColor">
      <v-icon>{{ item.activeIcon }}</v-icon>
    </div>
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
    item() {
      return this.$store.state.horde.items[this.name];
    },
    cooldown() {
      return Math.ceil(this.item.cooldown(this.item.level) / (this.item.masteryLevel >= 4 ? 2 : 1));
    }
  }
}
</script>
