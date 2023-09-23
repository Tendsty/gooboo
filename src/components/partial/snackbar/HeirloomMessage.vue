<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">{{ $vuetify.lang.t(`$vuetify.message.heirloom.get`) }}</v-card-title>
    <v-card-text class="pa-0">
      <div v-for="(item, key) in message.value" :key="key">{{ item }}x {{ $vuetify.lang.t(`$vuetify.horde.heirloom.${key}`) }}</div>
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
