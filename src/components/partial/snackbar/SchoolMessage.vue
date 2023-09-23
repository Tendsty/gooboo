<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">{{ $vuetify.lang.t(`$vuetify.message.school.get`) }}</v-card-title>
    <v-card-text class="pa-0 pb-2">
      <div>{{ $vuetify.lang.t(`$vuetify.message.school.score`, message.score) }}</div>
      <div v-if="message.grade > 0">{{ $vuetify.lang.t(`$vuetify.message.school.grade`, $formatNum(message.grade)) }}</div>
      <div v-if="message.dust > 0">{{ $vuetify.lang.t(`$vuetify.message.school.dust`, $formatNum(message.dust)) }}</div>
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
  }
}
</script>
