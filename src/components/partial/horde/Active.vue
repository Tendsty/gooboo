<style scoped>
.opacity-half {
  opacity: 0.5;
}
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
      <span>
        <div v-if="pretend || item.cooldownLeft > 0" class="active-container rounded d-flex justify-center align-center" :class="[pretend ? item.activeColor : null, $vnode.data.staticClass]" v-bind="attrs" v-on="on">
          <v-progress-linear class="active-cooldown rounded" height="36" :color="item.activeColor + ($vuetify.theme.dark ? ' darken-2' : ' lighten-2')" v-if="!pretend" :value="cooldownPercent"></v-progress-linear>
          <v-icon :class="{'opacity-half': !pretend}">{{ item.activeIcon }}</v-icon>
        </div>
        <v-btn v-else class="px-0" :class="css" min-width="36" @click="use" v-bind="attrs" v-on="on">
          <v-icon>{{ item.activeIcon }}</v-icon>
        </v-btn>
      </span>
    </template>
    <div class="text-center mt-0"><v-icon small class="mr-1">mdi-timer</v-icon>{{ $formatTime(cooldown) }}</div>
    <div class="mt-0" v-for="(elem, key) in effect" :key="key">
      <span>{{ $vuetify.lang.t(`$vuetify.horde.active.${elem.type}.0`) }} </span>
      <span v-if="['stun', 'revive'].includes(elem.type)">{{ $formatNum(elem.value) }} </span>
      <span v-else>{{ $formatNum(elem.value * 100, true) }}% </span>
      <span v-if="elem.type === 'poison' || elem.type.substring(0, 6) === 'damage'">({{ $formatNum(elem.value * playerAttack) }}) </span>
      <span v-else-if="elem.type === 'heal'">({{ $formatNum(elem.value * playerMaxHealth) }}) </span>
      <span v-else-if="elem.type === 'bone'"> ({{ $formatNum(elem.value * highestBone) }}) </span>
      <span>{{ $vuetify.lang.t(`$vuetify.horde.active.${elem.type}.1`) }}</span>
    </div>
  </gb-tooltip>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    pretend: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      playerStats: state => state.horde.player
    }),
    item() {
      return this.$store.state.horde.items[this.name];
    },
    cooldown() {
      return Math.ceil(this.item.cooldown(this.item.level) / (this.item.masteryLevel >= 4 ? 2 : 1));
    },
    cooldownPercent() {
      return 100 * (1 - (this.item.cooldownLeft / this.cooldown));
    },
    effect() {
      return this.item.active(this.item.level);
    },
    css() {
      return [this.item.activeColor, this.$vnode.data.staticClass];
    },
    highestBone() {
      return this.$store.getters['mult/get']('currencyHordeBoneGain', this.$store.getters['horde/enemyBone'](this.$store.state.stat.horde_maxZone.value, 0));
    },
    playerMaxHealth() {
      return this.$store.getters['mult/get']('hordeHealth');
    },
    playerAttack() {
      return this.$store.getters['mult/get']('hordeAttack');
    }
  },
  methods: {
    use() {
      this.$store.dispatch('horde/useActive', this.name);
    }
  }
}
</script>
