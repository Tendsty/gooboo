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
        <v-badge
          v-else
          overlap
          bordered
          left
          bottom
          :class="$vnode.data.staticClass"
          :value="item.activeType === 'utility' && charges > 1"
          :content="'x' + $formatNum(charges)"
          :color="item.activeColor"
          offset-x="40"
          offset-y="8"
        >
          <v-btn class="px-0" :class="[item.activeColor, {'selected-primary': chosenActive === name}]" min-width="36" @click="use" v-bind="attrs" v-on="on">
            <v-icon>{{ item.activeIcon }}</v-icon>
          </v-btn>
        </v-badge>
      </span>
    </template>
    <div class="text-center mt-0">
      <v-icon small class="mr-1">mdi-timer</v-icon>
      <span>{{ $formatTime(cooldown) }}</span>
      <span v-if="item.cooldownLeft > 0">&nbsp;({{ $formatTime(Math.round(item.cooldownLeft)) }})</span>
      <span v-else-if="!pretend && item.activeType === 'utility'">&nbsp;({{ $formatTime(Math.round(nextChargeTime)) }})</span>
    </div>
    <div v-if="item.usableInStun" class="text-center mt-0 mb-1">{{ $vuetify.lang.t(`$vuetify.horde.items.usableInStun`) }}</div>
    <alert-text v-if="!pretend && item.activeType === 'utility' && item.cooldownLeft <= 0" type="info" class="mb-1" style="width: 268px;">{{ $vuetify.lang.t(`$vuetify.horde.items.utilityOvertime`) }}</alert-text>
    <div class="mt-0" v-for="(elem, key) in effect" :key="key">
      <span v-if="elem.value === null">{{ $vuetify.lang.t(`$vuetify.horde.active.${ elem.type }`) }}</span>
      <template v-else>
        <span v-if="elem.stat">{{ $vuetify.lang.t(`$vuetify.horde.active.${ elem.type }.0`, $vuetify.lang.t(`$vuetify.mult.${ elem.stat }`)) }} </span>
        <span v-else>{{ $vuetify.lang.t(`$vuetify.horde.active.${ elem.type }.0`) }} </span>
        <span v-if="['revive', 'divisionShield'].includes(elem.type)">{{ $formatNum(elem.value) }} </span>
        <span v-else-if="['stun', 'silence'].includes(elem.type)">{{ $formatTime(elem.value) }} </span>
        <span v-else>{{ $formatNum(elem.value * 100, true) }}% </span>
        <span v-if="elem.type === 'poison' || elem.type.substring(0, 6) === 'damage'">({{ $formatNum(elem.value * playerAttack) }}) </span>
        <span v-else-if="elem.type === 'heal'">({{ $formatNum(elem.value * playerMaxHealth) }}) </span>
        <span v-else-if="elem.type === 'bone'"> ({{ $formatNum(elem.value * highestBone) }}) </span>
        <span v-else-if="elem.type === 'monsterPart'"> ({{ $formatNum(elem.value * highestMonsterPart) }}) </span>
        <span>{{ $vuetify.lang.t(`$vuetify.horde.active.${ elem.type }.1`) }}</span>
      </template>
    </div>
    <alert-text v-if="item.cooldownLeft > 0 && (!item.equipped || item.passive)" type="info">{{ $vuetify.lang.t(`$vuetify.horde.items.inactive`, $formatNum(cooldownRecover * 100)) }}</alert-text>
  </gb-tooltip>
</template>

<script>
import { mapState } from 'vuex';
import { HORDE_INACTIVE_ITEM_COOLDOWN } from '../../../js/constants';
import { logBase } from '../../../js/utils/math';
import AlertText from '../render/AlertText.vue';

export default {
  components: { AlertText },
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
      playerStats: state => state.horde.player,
      chosenActive: state => state.horde.chosenActive,
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
    highestBone() {
      return this.$store.getters['mult/get']('currencyHordeBoneGain', this.$store.getters['horde/enemyBone'](this.$store.state.stat.horde_maxZone.value, 0));
    },
    highestMonsterPart() {
      return this.$store.getters['mult/get']('currencyHordeMonsterPartGain', this.$store.getters['horde/enemyMonsterPart'](this.$store.state.stat.horde_maxZone.value, 0));
    },
    playerMaxHealth() {
      return this.$store.getters['mult/get']('hordeHealth');
    },
    playerAttack() {
      return this.$store.getters['mult/get']('hordeAttack');
    },
    cooldownRecover() {
      return HORDE_INACTIVE_ITEM_COOLDOWN;
    },
    charges() {
      return Math.floor(logBase(2 - (this.item.cooldownLeft / this.cooldown), 2));
    },
    nextChargeTime() {
      return (0 - (2 - Math.pow(2, this.charges + 1) - this.item.cooldownLeft / this.cooldown)) * this.cooldown;
    }
  },
  methods: {
    use() {
      this.$store.dispatch('horde/useActive', this.name);
    }
  }
}
</script>
