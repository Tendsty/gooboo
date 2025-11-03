<template>
  <v-card class="d-flex align-center pa-1">
    <div class="ma-1">{{ $vuetify.lang.t(`$vuetify.settings.keybinds.${name}.name`) }}</div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center" v-if="keybind !== null">
      <v-chip v-if="keybind.ctrl" label small class="ma-1 px-2">CTRL</v-chip>
      <v-chip v-if="keybind.alt" label small class="ma-1 px-2">ALT</v-chip>
      <v-chip v-if="keybind.shift" label small class="ma-1 px-2">SHIFT</v-chip>
      <v-icon v-if="keybindIcon !== null" class="ma-1">{{ keybindIcon }}</v-icon>
      <div v-else class="ma-1">{{ keybindText }}</div>
    </div>
    <v-btn v-if="keybind !== null" icon @click="clearKeybind"><v-icon>mdi-close</v-icon></v-btn>
    <v-btn class="ma-1" :color="name === keybindCurrent ? 'warning' : 'success'" @click="assignKeybind"><v-icon>mdi-keyboard</v-icon></v-btn>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      keybindCurrent: state => state.system.keybindCurrent
    }),
    keybind() {
      return this.$store.state.system.keybinds[this.name];
    },
    keybindIcon() {
      if (this.keybind.code.substring(0, 5) === 'Arrow') {
        return `mdi-arrow-${ this.keybind.code.slice(5).toLowerCase() }-bold-box-outline`;
      } else if (this.keybind.code === 'Space') {
        return 'mdi-keyboard-space';
      } else if (this.keybind.code === 'Escape') {
        return 'mdi-keyboard-esc';
      } else if (this.keybind.code === 'Enter') {
        return 'mdi-keyboard-return';
      } else if (this.keybind.code === 'Backspace') {
        return 'mdi-keyboard-backspace';
      } else if (this.keybind.code === 'CapsLock') {
        return 'mdi-keyboard-caps';
      } else if (this.keybind.code === 'Tab') {
        return 'mdi-keyboard-tab';
      } else if (this.keybind.code.length === 2 && this.keybind.code.substring(0, 1) === 'F' || this.keybind.code.length === 3 && this.keybind.code.substring(0, 2) === 'F1') {
        return `mdi-keyboard-f${ this.keybind.code.slice(1) }`;
      }
      return null;
    },
    keybindText() {
      if (this.keybind.code.substring(0, 3) === 'Key') {
        return this.keybind.code.slice(3).toUpperCase();
      } else if (this.keybind.code.substring(0, 5) === 'Digit') {
        return this.keybind.code.slice(5);
      }
      return this.keybind.code;
    }
  },
  methods: {
    assignKeybind() {
      this.$store.commit('system/updateKey', {key: 'keybindCurrent', value: this.name === this.keybindCurrent ? null : this.name});
    },
    clearKeybind() {
      this.$store.commit('system/updateKeybind', {name: this.name, value: null});
    }
  }
}
</script>
