<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">
      <v-icon>mdi-trophy</v-icon>
      <div>{{ $vuetify.lang.t(`$vuetify.message.achievement.get`) }}</div>
    </v-card-title>
    <v-card-text class="pa-0">
      <div>
        <span>{{ $vuetify.lang.t(`$vuetify.stat.${ message.name }.achievement`) }}</span>
        <span v-if="achievement.cap !== 1">&nbsp;#{{ message.value }}</span>
        <span v-if="hasMultiple">&nbsp;({{ message.value - message.oldValue }} {{ $vuetify.lang.t(`$vuetify.message.achievement.gained`) }})</span>
      </div>
      <div v-for="relic in relics" :key="relic.name">
        <span>{{ $vuetify.lang.t(`$vuetify.message.achievement.relicGained`) }}: </span>
        <span class="balloon-text-inverted" :class="`${relic.color}--text`">{{ $vuetify.lang.t(`$vuetify.relic.${ relic.name }`) }}</span>
        <v-icon class="balloon-text-inverted ml-1" :color="relic.color">{{ relic.icon }}</v-icon>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    achievement() {
      return this.$store.state.achievement[this.message.name];
    },
    hasMultiple() {
      return this.message.value > (this.message.oldValue + 1);
    },
    relics() {
      let arr = [];

      for (let i = this.message.oldValue; i < this.message.value; i++) {
        let name = this.achievement.relic[i];
        if (name) {
          arr.push({...this.$store.state.relic.item[name], name});
        }
      }

      return arr;
    }
  }
}
</script>
