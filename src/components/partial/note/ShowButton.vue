<template>
  <v-badge overlap dot :value="hasBadge">
    <v-btn
      width="48"
      height="48"
      min-width="0"
      @click="clickNote"
      @mouseenter="hoverNote"
      @mouseleave="unhoverNote"
      :class="[buttonColor, $vuetify.theme.dark ? 'darken-2' : 'lighten-2', {'selected-primary': clicked === name}]"
    >#{{ id }}</v-btn>
  </v-badge>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    clicked: {
      type: String,
      required: false,
      default: null
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
        omnisolix: 'pale-purple',
        system: 'blue-grey'
      }[this.author];
    },
    hasBadge() {
      return this.$store.state.system.noteHint.findIndex(elem => elem === this.name) !== -1;
    }
  },
  methods: {
    clickNote() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.$emit('clickNote', this.name);
      } else {
        this.$store.commit('system/updateKey', {key: 'note', value: this.name});
      }
      this.$store.commit('system/removeNoteHint', this.name);
    },
    hoverNote() {
      this.$emit('hoverNote', this.name);
      this.$store.commit('system/removeNoteHint', this.name);
    },
    unhoverNote() {
      this.$emit('unhoverNote');
    }
  }
}
</script>
