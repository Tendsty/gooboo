<template>
  <status-template feature="horde" :prestigeGain="prestigeGain"></status-template>
</template>

<script>
import StatusTemplate from '../prestige/StatusTemplate.vue';

export default {
  components: { StatusTemplate },
  computed: {
    prestigeGain() {
      return this.$store.state.currency.horde_soulCorrupted.value > 0 ? {horde_soulEmpowered: this.$store.state.currency.horde_soulCorrupted.value} : {};
    }
  }
}
</script>
