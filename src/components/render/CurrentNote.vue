<template>
  <v-dialog v-model="dialog" max-width="400">
    <note-simple v-if="note !== null" :name="note"></note-simple>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import NoteSimple from './NoteSimple.vue';

export default {
  components: { NoteSimple },
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapState({
      note: state => state.system.note
    })
  },
  watch: {
    note(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dialog = newVal !== null;
      }
    },
    dialog(newVal, oldVal) {
      if (!newVal && newVal !== oldVal) {
        this.$store.commit('system/updateKey', {key: 'note', value: null});
      }
    }
  }
}
</script>
