<template>
  <v-card class="d-flex align-center pa-1">
    <div class="ma-1">{{ $vuetify.lang.t(`$vuetify.settings.keybinds.${name}.name`) }}</div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center" v-if="keybind !== null">
      <v-chip v-if="keybind.ctrl" label small class="ma-1 px-2">CTRL</v-chip>
      <v-chip v-if="keybind.alt" label small class="ma-1 px-2">ALT</v-chip>
      <v-chip v-if="keybind.shift" label small class="ma-1 px-2">SHIFT</v-chip>
      <div class="ma-1">{{ keybindCode }}</div>
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
    keybindCode() {
      return this.keybind.code.substring(0, 3) === 'Key' ? this.keybind.code.slice(3) : this.keybind.code;
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
