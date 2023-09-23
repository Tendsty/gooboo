<template>
  <gb-tooltip>
    <template v-slot:activator="{ on, attrs }">
      <v-badge overlap dot :value="hasBadge">
        <v-btn width="48" height="48" min-width="0" @click="showNote" :class="[$vnode.data.staticClass, buttonColor, $vuetify.theme.dark ? 'darken-2' : 'lighten-2']" v-bind="attrs" v-on="on">#{{ id }}</v-btn>
      </v-badge>
    </template>
    <div>{{ $vuetify.lang.t(`$vuetify.note.text.${name}`) }}</div>
    <div class="text-right">~ {{ $vuetify.lang.t(`$vuetify.note.author.${author}`) }}</div>
  </gb-tooltip>
</template>

<script>
export default {
  props: {
    name: {
      required: true
    }
  },
  computed: {
    id() {
      return parseInt(this.name.split('_')[1]) + 1;
    },
    author() {
      return this.$store.state.note[this.name].author;
    },
    buttonColor() {
      return {
        g: 'pale-red',
        grobodal: 'pale-red',
        orladee: 'pale-orange',
        oppenschroe: 'pale-yellow',
        bellux: 'pale-green',
        onoclua: 'pale-blue',
        omnisolix: 'pale-purple'
      }[this.author];
    },
    hasBadge() {
      return this.$store.state.system.noteHint.findIndex(elem => elem === this.name) !== -1;
    }
  },
  methods: {
    showNote() {
      this.$store.commit('system/updateKey', {key: 'note', value: this.name});
      this.$store.commit('system/removeNoteHint', this.name);
    }
  }
}
</script>
