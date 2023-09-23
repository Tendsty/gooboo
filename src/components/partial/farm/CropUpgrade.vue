<template>
  <gb-tooltip :min-width="0">
    <template v-slot:activator="{ on, attrs }">
      <div class="ml-2 rounded" v-bind="attrs" v-on="on">
        <v-btn small @click="choose" color="secondary" class="px-2" min-width="36">
          <v-icon small>{{ icons[upgrade] }}</v-icon>
        </v-btn>
      </div>
    </template>
    <div>{{ $vuetify.lang.t(`$vuetify.farm.cropUpgrade.${ upgrade }`) }}</div>
  </gb-tooltip>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    crop: {
      type: String,
      required: true
    },
    upgrade: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      icons: state => state.farm.cropUpgradeIcons
    }),
  },
  methods: {
    choose() {
      this.$store.dispatch('farm/applyCropUpgrade', {crop: this.crop, upgrade: this.upgrade});
    }
  }
}
</script>
