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
  <v-card class="current-note pa-2">
    <div class="ma-2" :class="textClass">{{ $vuetify.lang.t(`$vuetify.note.text.${ name }`) }}</div>
    <div class="ma-2 text-right" :class="textClass">~ {{ $vuetify.lang.t(`$vuetify.note.author.${ author }`) }}</div>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    author() {
      return this.$store.state.note[this.name].author;
    },
    textClass() {
      return 'brown--text ' + (this.$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-2');
    }
  }
}
</script>
