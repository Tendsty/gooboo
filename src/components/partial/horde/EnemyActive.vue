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
      <v-badge overlap bordered :class="$vnode.data.staticClass" :color="hasUsesLeft ? sigil.color : 'grey'">
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
          <v-icon class="mb-1" v-if="active.uses === null" x-small>mdi-infinity</v-icon>
          <span v-else>{{ active.uses }}</span>
        </template>
      </v-badge>
    </template>
    <div class="text-center mt-0">
      <v-icon small class="mr-1">mdi-timer</v-icon>
      <span>{{ $formatTime(cooldown) }}</span>
      <span v-if="active.cooldown > 0 && hasUsesLeft">&nbsp;({{ $formatTime(Math.ceil(active.cooldown)) }})</span>
      <template v-if="active.uses !== null">
        <v-icon small>mdi-circle-small</v-icon>
        <span>{{ $formatNum(active.uses) }} / {{ $formatNum(maxUses) }}</span>
      </template>
    </div>
    <div class="mt-0" v-for="(elem, key) in effect" :key="key">
      <span v-if="elem.value === null">{{ $vuetify.lang.t(`$vuetify.horde.active.${ elem.type }`) }}</span>
      <template v-else>
        <span>{{ $vuetify.lang.t(`$vuetify.horde.active.${ elem.type }.0`) }} </span>
        <span v-if="['revive', 'divisionShield'].includes(elem.type)">{{ $formatNum(elem.value) }} </span>
        <span v-else-if="['stun', 'silence'].includes(elem.type)">{{ $formatTime(elem.value) }} </span>
        <span v-else>{{ $formatNum(elem.value * 100, true) }}% </span>
        <span v-if="elem.type === 'poison' || elem.type.substring(0, 6) === 'damage'">({{ $formatNum(elem.value * enemyAttack) }}) </span>
        <span v-else-if="elem.type === 'heal'">({{ $formatNum(elem.value * enemyMaxHealth) }}) </span>
        <span>{{ $vuetify.lang.t(`$vuetify.horde.active.${ elem.type }.1`) }}</span>
      </template>
    </div>
  </gb-tooltip>
</template>

<script>
export default {
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
      return Math.ceil(this.sigil.active.cooldown(this.sigilLevel));
    },
    cooldownPercent() {
      return 100 * (1 - (this.active.cooldown / this.cooldown));
    },
    effect() {
      return this.sigil.active.effect(this.sigilLevel);
    },
    enemyMaxHealth() {
      return this.$store.state.horde.enemy.maxHealth;
    },
    enemyAttack() {
      return this.$store.state.horde.enemy.attack;
    },
    maxUses() {
      return this.sigil.active.uses(this.sigilLevel);
    },
    hasUsesLeft() {
      return this.active.uses === null || this.active.uses > 0;
    }
  }
}
</script>
