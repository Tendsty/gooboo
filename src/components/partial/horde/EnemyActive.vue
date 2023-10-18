<style scoped>
.active-container {
  position: relative;
  width: 36px;
  height: 36px;
}
.active-cooldown {
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
}
</style>

<template>
  <gb-tooltip>
    <template v-slot:activator="{ on, attrs }">
      <v-badge class="balloon-text-dynamic" overlap bordered left offset-x="44" :class="$vnode.data.staticClass" :color="hasUsesLeft ? sigil.color : 'grey'">
        <div class="active-container rounded d-flex justify-center align-center" v-bind="attrs" v-on="on">
          <v-progress-linear
            class="active-cooldown rounded"
            height="36"
            :color="(hasUsesLeft ? sigil.color : 'grey') + ($vuetify.theme.dark ? ' darken-2' : ' lighten-2')"
            :value="hasUsesLeft ? cooldownPercent : 0"
          ></v-progress-linear>
          <v-icon>{{ sigil.icon }}</v-icon>
        </div>
        <template v-slot:badge>
          <span :class="{'black--text': !$vuetify.theme.dark}">
            <v-icon :color="$vuetify.theme.dark ? 'white' : 'black'" class="mb-1" v-if="active.uses === null" x-small>mdi-infinity</v-icon>
            <span v-else>{{ active.uses }}</span>
          </span>
        </template>
      </v-badge>
    </template>
    <enemy-active-tooltip class="mt-0" :name="name" :level="sigilLevel"></enemy-active-tooltip>
  </gb-tooltip>
</template>

<script>
import EnemyActiveTooltip from './EnemyActiveTooltip.vue';

export default {
  components: { EnemyActiveTooltip },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    active() {
      return this.$store.state.horde.enemy.active[this.name];
    },
    sigil() {
      return this.$store.state.horde.sigil[this.name];
    },
    sigilLevel() {
      return this.$store.state.horde.enemy.sigil[this.name];
    },
    cooldown() {
      return Math.ceil(this.sigil.active.cooldown(this.sigilLevel, this.$store.state.horde.bossFight));
    },
    cooldownPercent() {
      return 100 * (1 - (this.active.cooldown / this.cooldown));
    },
    hasUsesLeft() {
      return this.active.uses === null || this.active.uses > 0;
    }
  }
}
</script>
