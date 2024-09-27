<style scoped>
.relic-name-mobile {
  font-size: 12px;
}
.relic-feature-list {
  position: absolute;
  left: 0;
  right: 4px;
  bottom: -12px;
}
</style>

<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.gooboo.effect`)">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        class="d-flex flex-column justify-center align-center mb-3"
        :width="$vuetify.breakpoint.smAndUp ? 160 : 104"
        :height="$vuetify.breakpoint.smAndUp ? 96 : 72"
        :color="relic.color + ($vuetify.theme.dark ? ' darken-2' : ' lighten-2')"
        :class="$vnode.data.staticClass"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon :x-large="$vuetify.breakpoint.smAndUp">{{ relic.icon }}</v-icon>
        <div class="text-center" :class="{'relic-name-mobile': $vuetify.breakpoint.xsOnly}">{{ $vuetify.lang.t(`$vuetify.relic.${name}`) }}</div>
        <div class="relic-feature-list d-flex flex-wrap justify-end">
          <div v-for="item in relic.feature" :key="'feature-' + item" :class="relic.color + ($vuetify.theme.dark ? ' darken-2' : ' lighten-2')" class="rounded-circle mr-1" :style="`border: 2px solid ${ $vuetify.theme.dark ? '#121212' : '#FFFFFF' } !important;`">
            <v-icon class="ma-1" small>{{ features[item].icon }}</v-icon>
          </div>
        </div>
      </v-card>
    </template>
    <display-row class="mt-0" v-for="(item, key) in relic.effect" :key="key" :name="item.name" :type="item.type" :after="item.value" show-icon></display-row>
  </gb-tooltip>
</template>

<script>
import { mapState } from 'vuex';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      features: state => state.system.features
    }),
    relic() {
      return this.$store.state.relic.item[this.name];
    }
  }
}
</script>
