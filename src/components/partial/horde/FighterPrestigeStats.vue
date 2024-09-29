<style scoped>
.class-description {
  font-size: 12px;
}
.class-label {
  height: 20px;
  padding: 0 6px;
}
</style>

<template>
  <div>
    <div>{{ $vuetify.lang.t(`$vuetify.horde.classes.${ item.name }.name`) }}</div>
    <div class="class-description">{{ $vuetify.lang.t(`$vuetify.horde.classes.${ item.name }.description`) }}</div>
    <div class="mx-n1">
      <v-chip color="red" class="balloon-text-dynamic class-label ma-1" label small><v-icon size="12" class="mr-1">mdi-sword-cross</v-icon>{{ $formatNum(item.baseStats.attack, true) }}</v-chip>
      <v-chip color="green" class="balloon-text-dynamic class-label ma-1" label small><v-icon size="12" class="mr-1">mdi-heart</v-icon>{{ $formatNum(item.baseStats.health) }}</v-chip>
      <v-chip v-if="item.baseStats.energy !== undefined" color="amber" class="balloon-text-dynamic class-label ma-1" label small><v-icon size="12" class="mr-1">mdi-lightning-bolt</v-icon>{{ $formatNum(item.baseStats.energy) }}</v-chip>
      <v-chip v-if="item.baseStats.mana !== undefined" color="dark-blue" class="balloon-text-dynamic class-label ma-1" label small><v-icon size="12" class="mr-1">mdi-water</v-icon>{{ $formatNum(item.baseStats.mana) }}</v-chip>
    </div>
    <div class="mx-n1">
      <v-chip color="light-blue" class="balloon-text-dynamic class-label ma-1" label small><v-icon size="12" class="mr-1">mdi-timer</v-icon>{{ $formatTime(expBase) }} (x{{ $formatNum(expIncrement, true) }})</v-chip>
      <v-chip color="orange" class="balloon-text-dynamic class-label ma-1" label small><v-icon size="12" class="mr-1">mdi-ghost</v-icon>x{{ $formatNum(item.courageMult, true) }}</v-chip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    expBase() {
      return Math.ceil(this.$store.getters['mult/get']('hordeExpBase', this.$store.state.horde.fighterClass[this.item.name].exp.base));
    },
    expIncrement() {
      return this.$store.getters['horde/expIncrement'](this.item.name);
    },
  }
}
</script>
