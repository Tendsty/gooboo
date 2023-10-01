<template>
  <status-template feature="horde" :prestigeGain="prestigeGain"></status-template>
</template>

<script>
import StatusTemplate from '../prestige/StatusTemplate.vue';

export default {
  components: { StatusTemplate },
  computed: {
    prestigeGain() {
      return this.$store.getters['currency/value']('horde_soulCorrupted') > 0 ? {horde_soulEmpowered: this.$store.getters['currency/value']('horde_soulCorrupted') * this.$store.getters['horde/currentSoulMult']} : {};
    }
  }
}
</script>
