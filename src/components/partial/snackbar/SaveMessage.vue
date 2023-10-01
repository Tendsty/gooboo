<template>
  <v-card color="transparent" flat>
    <template v-if="message.error">
      <div>
        <v-icon>mdi-alert</v-icon>
        {{ $vuetify.lang.t(`$vuetify.message.save.error`) }}
      </div>
      <div>{{ message.error.message }}</div>
    </template>
    <div v-else>{{ $vuetify.lang.t(`$vuetify.message.save.success`) }}</div>
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
