<template>
  <v-card color="transparent" flat>
    {{ $vuetify.lang.t(`$vuetify.message.save.success`) }}
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
