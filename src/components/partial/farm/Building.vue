<template>
  <gb-tooltip :title-text="isPremium ? $vuetify.lang.t(`$vuetify.farm.building.premium`, $vuetify.lang.t(`$vuetify.farm.building.${ name }.name`)) : $vuetify.lang.t(`$vuetify.farm.building.${ name }.name`)">
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex justify-center align-center" style="height: 100%" v-bind="attrs" v-on="on">
        <v-icon :class="{'premium-glow-text': isPremium}" :size="iconSize">{{ building.icon }}</v-icon>
      </div>
    </template>
    <div>{{ $vuetify.lang.t(`$vuetify.farm.building.${ name }.description${ isPremium ? 'Premium' : '' }`) }}</div>
  </gb-tooltip>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    isPremium: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    building() {
      return this.$store.state.farm.building[this.name];
    },
    iconSize() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 20;
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        return 30;
      }
      return 40;
    }
  }
}
</script>
