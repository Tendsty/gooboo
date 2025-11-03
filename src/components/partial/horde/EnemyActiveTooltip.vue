<template>
  <div>
    <div class="text-center">
      <v-icon small class="mr-1">mdi-timer</v-icon>
      <span>{{ $formatTime(cooldown) }}</span>
      <span v-if="showBase">&nbsp;({{ $formatTime(Math.ceil(startCooldown)) }})</span>
      <span v-else-if="active.cooldown > 0 && hasUsesLeft">&nbsp;({{ $formatTime(Math.ceil(active.cooldown)) }})</span>
      <template v-if="maxUses !== null">
        <v-icon small>mdi-circle-small</v-icon>
        <span v-if="showBase">{{ $formatNum(maxUses) }}</span>
        <span v-else>{{ $formatNum(active.uses) }} / {{ $formatNum(maxUses) }}</span>
      </template>
    </div>
    <active-tooltip v-for="(elem, key) in effect" :key="`active-effect-${ key }`" class="mt-0" :effect="elem" :attack="enemyAttack" :health="enemyMaxHealth" is-enemy></active-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ActiveTooltip from './ActiveTooltip.vue';

export default {
  components: { ActiveTooltip },
  props: {
    name: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: false,
      default: 1
    },
    showBase: {
      type: Boolean,
      required: false,
      default: false
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      currentElement: 'horde/currentElement',
    }),
    hasElement() {
      return this.$store.state.horde.currentTower === null && !this.$store.state.horde.raidboss && this.currentElement !== null && !this.small;
    },
    active() {
      return this.$store.state.horde.enemy ? this.$store.state.horde.enemy.active[this.name] : {power: 0, cooldown: 0, uses: 0};
    },
    sigil() {
      return this.hasElement ? null : this.$store.state.horde.sigil[this.name];
    },
    element() {
      return this.hasElement ? this.$store.state.horde.element[this.currentElement] : null;
    },
    elementActive() {
      return this.hasElement ? this.element.enemyActives(this.active.power, this.$store.state.horde.bossFight)[this.name] : null;
    },
    cooldown() {
      return this.hasElement ? this.elementActive.cooldown : Math.ceil(this.sigil.active.cooldown(this.level, this.$store.state.horde.bossFight));
    },
    startCooldown() {
      return this.hasElement ? this.elementActive.startCooldown : Math.ceil(this.sigil.active.startCooldown(this.level, this.$store.state.horde.bossFight));
    },
    effect() {
      return this.hasElement ? this.elementActive.effect : this.sigil.active.effect(this.level, this.$store.state.horde.bossFight);
    },
    enemyMaxHealth() {
      return this.$store.state.horde.enemy?.maxHealth;
    },
    enemyAttack() {
      return this.$store.state.horde.enemy?.attack;
    },
    maxUses() {
      return this.hasElement ? this.elementActive.uses : this.sigil.active.uses(this.level, this.$store.state.horde.bossFight);
    },
    hasUsesLeft() {
      return this.active.uses === null || this.active.uses > 0;
    }
  }
}
</script>
