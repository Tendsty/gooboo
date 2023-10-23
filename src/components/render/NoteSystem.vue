<style scoped>
.theme--dark .current-note {
  font-family: "Roboto Mono";
  border: 4px solid var(--v-blue-grey-darken4);
  background-color: var(--v-blue-grey-darken2) !important;
}
.theme--light .current-note {
  font-family: "Roboto Mono";
  border: 4px solid var(--v-blue-grey-lighten4);
  background-color: var(--v-blue-grey-lighten2) !important;
}
.note-terminal {
  position: absolute;
  top: 8px;
  left: 8px;
  opacity: 0.5;
}
.note-cogs {
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0.5;
}
</style>

<template>
  <v-card class="current-note">
    <v-card-title class="pa-2 justify-center" style="font-size: 150%;">{{ $vuetify.lang.t(`$vuetify.note.text.${ name }.title`) }}</v-card-title>
    <v-card-text class="pa-2">
      <div class="bg-tile-background pa-2 rounded" style="font-size: 125%;" :class="textClass">{{ $vuetify.lang.t(`$vuetify.note.text.${ name }.text`) }}</div>
    </v-card-text>
    <v-icon class="note-terminal">mdi-console-line</v-icon>
    <v-icon large class="note-cogs">mdi-cogs</v-icon>
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
    textClass() {
      return 'blue-grey--text ' + (this.$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4');
    }
  }
}
</script>
