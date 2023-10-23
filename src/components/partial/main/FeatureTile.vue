<style scoped>
.feature-tile-text {
  max-width: 160px;
  white-space: normal;
}
.feature-tile-text-mobile {
  max-width: 88px;
  white-space: normal;
  font-size: 9px;
}
.feature-tile-container {
  position: relative;
}
.feature-tile-container >>> .v-btn__content {
  width: 100%;
  height: 100%;
}
.feature-tile-inside {
  position: absolute;
  top: 4px;
  left: 4px;
}
.feature-tile-inside-text {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: initial;
  text-transform: none;
}
.feature-tile-mobile {
  top: 0;
  left: 0;
}
.feature-tile-mobile .feature-tile-inside-text {
  font-size: 10px;
}
.feature-tile-frozen {
  position: absolute;
  top: 4px;
  right: 4px;
}
.feature-tile-frozen-mobile {
  top: 0;
  right: 0;
}
</style>

<template>
  <v-btn class="feature-tile-container pa-0" :width="$vuetify.breakpoint.mdAndUp ? 160 : 88" :height="$vuetify.breakpoint.mdAndUp ? 100 : 55" v-on="$listeners">
    <div class="d-flex flex-column justify-center align-center">
      <v-badge overlap dot :value="hasBadge">
        <v-icon :class="{'ma-2': $vuetify.breakpoint.mdAndUp, 'ma-1': $vuetify.breakpoint.smAndDown}" :x-large="$vuetify.breakpoint.mdAndUp">{{ icon }}</v-icon>
      </v-badge>
      <div
        class="text-center"
        :class="{'feature-tile-text': $vuetify.breakpoint.mdAndUp, 'feature-tile-text-mobile': $vuetify.breakpoint.smAndDown}"
      >{{ $vuetify.lang.t(`$vuetify.feature.${ name }`) }}</div>
    </div>
    <div v-if="subfeatureLevel !== null" class="d-flex justify-center align-center feature-tile-inside" :class="{'feature-tile-mobile': $vuetify.breakpoint.smAndDown}">
      <v-icon color="white" :size="$vuetify.breakpoint.mdAndUp ? 40 : 30">mdi-octagram</v-icon>
      <div class="secondary--text feature-tile-inside-text d-flex justify-center align-center">
        <span>{{ subfeatureLevel }}</span>
      </div>
    </div>
    <div v-if="isFrozen" class="feature-tile-frozen" :class="{'feature-tile-frozen-mobile': $vuetify.breakpoint.smAndDown}">
      <v-icon color="cyan" :size="$vuetify.breakpoint.mdAndUp ? 24 : 18">mdi-snowflake</v-icon>
    </div>
  </v-btn>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    subfeatureLevel: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    hasBadge() {
      return (this.name === 'note' && this.$store.state.system.noteHint.length > 0) ||
             (this.name === 'farm' && this.$store.state.system.farmHint);
    },
    isFrozen() {
      return !!this.$store.state.cryolab[this.name] && this.$store.state.cryolab[this.name].active;
    }
  }
}
</script>
