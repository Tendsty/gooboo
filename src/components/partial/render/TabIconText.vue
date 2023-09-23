<template>
  <div>
    <v-icon v-if="finalIcon !== null">{{ finalIcon }}</v-icon>
    <span :class="{'ml-2': finalIcon !== null}" v-if="finalText !== null">{{ finalText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: null
    },
    text: {
      type: String,
      required: false,
      default: null
    },
    icon: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    finalText() {
      if (this.displaySetting === 'icon') {
        return null;
      } else if (this.text !== null) {
        return this.text;
      } else {
        switch (this.name) {
          case 'upgrades':
            return this.$vuetify.lang.t('$vuetify.gooboo.upgrades');
          case 'upgradesPrestige':
            return this.$vuetify.lang.t('$vuetify.gooboo.upgradesPrestige');
          case 'inventory':
            return this.$vuetify.lang.t('$vuetify.gooboo.inventory');
          default:
            return null;
        }
      }
    },
    finalIcon() {
      if (this.displaySetting === 'text') {
        return null;
      } else if (this.icon !== null) {
        return this.icon;
      } else {
        switch (this.name) {
          case 'upgrades':
            return 'mdi-arrow-up-bold';
          case 'upgradesPrestige':
            return 'mdi-arrow-up-bold-box';
          case 'inventory':
            return 'mdi-inbox';
          default:
            return null;
        }
      }
    },
    displaySetting() {
      return this.$store.state.system.settings.general.items[this.$vuetify.breakpoint.smAndDown ? 'tabDisplayMobile' : 'tabDisplayDesktop'].value;
    }
  }
}
</script>
