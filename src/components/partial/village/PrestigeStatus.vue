<template>
  <status-template feature="village" :prestigeGain="prestigeGain"></status-template>
</template>

<script>
import StatusTemplate from '../prestige/StatusTemplate.vue';

export default {
  components: { StatusTemplate },
  computed: {
    prestigeGain() {
      return this.$store.state.currency.village_faith.value > 0 ? {village_blessing: this.$store.state.currency.village_faith.value} : {};
    }
  }
}
</script>
