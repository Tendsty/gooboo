<style scoped>
.alert-text-container {
  position: relative;
}
.alert-text-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.2;
  pointer-events: none;
}
</style>

<template>
  <div class="alert-text-container d-flex align-center pa-1 pr-2" :class="`${ type }--text text--${ themeCss }`">
    <div class="alert-text-bg rounded-lg" :class="type"></div>
    <v-icon :color="`${ type } ${ themeCss }`" small class="ma-1 mr-2">{{ icon }}</v-icon>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'warning'
    },
    iconName: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    icon() {
      const iconName = this.iconName ?? this.type;
      if (iconName === 'success') {
        return 'mdi-check';
      } else if (iconName === 'info') {
        return 'mdi-information';
      }
      return 'mdi-alert';
    },
    themeCss() {
      return this.$vuetify.theme.dark ? 'lighten-4' : 'darken-4';
    }
  }
}
</script>
