<template>
  <v-dialog v-model="dialog" max-width="400">
    <template v-if="note !== null">
      <note-system v-if="author === 'system'" :name="note"></note-system>
      <note-simple v-else :name="note"></note-simple>
    </template>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import NoteSimple from './NoteSimple.vue';
import NoteSystem from './NoteSystem.vue';

export default {
  components: { NoteSimple, NoteSystem },
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapState({
      note: state => state.system.note
    }),
    author() {
      if (this.note === null) {
        return null;
      }
      return this.$store.state.note[this.note].author;
    }
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
