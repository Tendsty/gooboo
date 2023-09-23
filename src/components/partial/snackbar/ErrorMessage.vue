<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">{{ $vuetify.lang.t(`$vuetify.error.title`, $vuetify.lang.t(`$vuetify.error.tech.${ message.tech }`)) }}</v-card-title>
    <v-card-text class="pa-0 pb-2">
      <div>{{ message.message }}</div>
      <div>{{ $vuetify.lang.t(`$vuetify.error.source`, message.source) }}</div>
      <div>{{ $vuetify.lang.t(`$vuetify.error.position`, message.line, message.column) }}</div>
    </v-card-text>
    <v-card-actions class="pa-0">
      <v-btn color="secondary" target="_blank" href="https://github.com/Tendsty/gooboo/issues/new/choose">{{ $vuetify.lang.t(`$vuetify.error.reportBug`) }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
