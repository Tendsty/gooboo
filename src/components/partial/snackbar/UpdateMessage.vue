<template>
  <v-card color="transparent" flat>
    <v-card-text class="pa-0 pb-2">{{ $vuetify.lang.t(`$vuetify.message.update.get`) }}</v-card-text>
    <v-card-actions class="pa-0">
      <v-btn color="secondary" @click="applyUpdate">{{ $vuetify.lang.t(`$vuetify.message.update.apply`) }}</v-btn>
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
  },
  methods: {
    applyUpdate() {
      location.reload(true);
    }
  }
}
</script>
