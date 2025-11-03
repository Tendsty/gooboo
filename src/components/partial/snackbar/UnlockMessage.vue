<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">{{ $vuetify.lang.t(`$vuetify.message.unlock.${ message.subtype }`) }}</v-card-title>
    <v-card-text class="pa-0 pb-2">
      <v-icon v-if="featureIcon" class="mr-2">{{ featureIcon }}</v-icon>
      <span v-if="message.subtype === 'card'">{{ $vuetify.lang.t(`$vuetify.card.pack.${ message.pack }`) }}</span>
      <span v-else-if="message.subtype === 'general'">{{ $vuetify.lang.t(`$vuetify.general.${ message.general }.name`) }}: {{ $vuetify.lang.t(`$vuetify.general.${ message.general }.${ message.questline }`) }}</span>
      <span v-else-if="message.subtype === 'treasure'"><mult-name :name="message.effect"></mult-name></span>
      <span v-else-if="message.subtype === 'book'">{{ $vuetify.lang.t(`$vuetify.feature.${ message.feature }`) }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
import MultName from '../../render/MultName.vue';

export default {
  components: { MultName },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    featureIcon() {
      return this.$store.state.system.features[this.message.feature]?.icon;
    }
  }
}
</script>
