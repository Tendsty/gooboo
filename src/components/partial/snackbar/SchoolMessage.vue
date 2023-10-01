<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">{{ $vuetify.lang.t(`$vuetify.message.school.${ message.isExam ? 'getExam' : 'get' }`) }}</v-card-title>
    <v-card-text class="pa-0 pb-2">
      <div>
        <span>{{ $vuetify.lang.t(`$vuetify.message.school.score`, Math.floor(message.score)) }}</span>
        <span v-if="message.perfectScore">&nbsp;{{ $vuetify.lang.t(`$vuetify.message.school.perfectScore`) }}</span>
      </div>
      <div v-if="message.gradePlus">{{ $vuetify.lang.t(`$vuetify.message.school.gradePlus`) }}</div>
      <div v-if="message.grade > 0 || message.grade < 0">
        <span v-if="message.grade > 0">+</span>
        <span>{{ $vuetify.lang.t(`$vuetify.message.school.grade`, $formatNum(message.grade * 100)) }}</span>
      </div>
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
