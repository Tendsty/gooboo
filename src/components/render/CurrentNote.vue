<style scoped>
.theme--dark.current-note {
  background: linear-gradient(#00000080, #00000080), url("/public/img/note.png"), linear-gradient(#DF9269, #DF9269);
}
.theme--light.current-note {
  background: url("/public/img/note.png"), linear-gradient(#DF9269, #DF9269);
}
.current-note {
  font-size: 150%;
  line-height: 100%;
  font-family: Caveat;
}
</style>

<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="current-note pa-2" v-if="note !== null">
      <div class="ma-2" :class="textClass">{{ $vuetify.lang.t(`$vuetify.note.text.${note}`) }}</div>
      <div class="ma-2 text-right" :class="textClass">~ {{ $vuetify.lang.t(`$vuetify.note.author.${author}`) }}</div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapState({
      note: state => state.system.note
    }),
    author() {
      if (this.note !== null) {
        return this.$store.state.note[this.note].author;
      }
      return null;
    },
    textClass() {
      return 'brown--text ' + (this.$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-2');
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
