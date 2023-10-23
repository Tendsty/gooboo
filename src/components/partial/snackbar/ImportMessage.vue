<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">
      <v-icon class="mr-2">mdi-alert</v-icon>
      {{ $vuetify.lang.t(`$vuetify.message.import.message`) }}
    </v-card-title>
    <v-card-text class="pa-0 pb-2">
      {{ $vuetify.lang.t(`$vuetify.message.import.${ message.error }`, messageVersion, version) }}
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      version: state => state.system.version
    }),
    messageVersion() {
      return this.message.version ?? '?';
    }
  }
}
</script>
