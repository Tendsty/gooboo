<template>
  <v-card color="transparent" flat>
    <v-card-text class="pa-0 pb-2">{{ $vuetify.lang.t(`$vuetify.message.note.get`, noteNumber) }}</v-card-text>
    <v-card-actions class="pa-0">
      <v-btn color="secondary" @click="read">{{ $vuetify.lang.t(`$vuetify.message.note.read`) }}</v-btn>
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
  computed: {
    noteNumber() {
      return parseInt(this.message.name.split('_')[1]) + 1;
    }
  },
  methods: {
    read() {
      this.$store.commit('system/updateKey', {key: 'note', value: this.message.name});
      this.$store.commit('system/removeNoteHint', this.message.name);
    }
  }
}
</script>
