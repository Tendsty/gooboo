<style scoped>
.mini-relic-large {
  width: 36px;
  height: 36px;
}
.mini-relic-small {
  width: 24px;
  height: 24px;
}
</style>

<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.relic.${name}`)">
    <template v-slot:activator="{ on, attrs }">
      <v-chip class="pa-0 justify-center" :class="'mini-relic-' + (large ? 'large' : 'small')" :color="relic.color + ($vuetify.theme.dark ? ' darken-2' : ' lighten-2')" label v-bind="attrs" v-on="on">
        <v-icon :size="large ? 28 : 16">{{ relic.icon }}</v-icon>
      </v-chip>
    </template>
    <display-row class="mt-0" v-for="(item, key) in relic.effect" :key="key" :name="item.name" :type="item.type" :after="item.value"></display-row>
  </gb-tooltip>
</template>

<script>
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow },
  props: {
    name: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    relic() {
      return this.$store.state.relic[this.name];
    }
  }
}
</script>
