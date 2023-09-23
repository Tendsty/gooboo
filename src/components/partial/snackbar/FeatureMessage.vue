<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">
      <span v-if="message.subfeature">{{ $vuetify.lang.t(`$vuetify.message.feature.${ subfeature }`) }}</span>
      <span v-else>{{ $vuetify.lang.t(`$vuetify.message.feature.feature`) }}</span>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-icon class="mr-2">{{ feature.icon }}</v-icon>
      <span v-if="message.subfeature">{{ $vuetify.lang.t(`$vuetify.feature.${ message.subfeature }`) }} ({{ $vuetify.lang.t(`$vuetify.feature.${ message.name }`) }})</span>
      <span v-else>{{ $vuetify.lang.t(`$vuetify.feature.${ message.name }`) }}</span>
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
    feature() {
      return this.$store.state.system.features[this.message.name];
    },
    subfeature() {
      return ['school', 'general'].includes(this.message.name) ? this.message.name : 'subfeature';
    }
  }
}
</script>
