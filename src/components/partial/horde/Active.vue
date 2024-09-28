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
.active-row-shrink {
  width: fit-content;
}
</style>

<template>
  <div class="d-flex flex-column">
    <gb-tooltip>
      <template v-slot:activator="{ on, attrs }">
        <span>
          <div v-if="pretend || cooldownLeft > 0" class="balloon-text-dynamic active-container rounded d-flex justify-center align-center" :class="pretend ? activeColor : null" v-bind="attrs" v-on="on">
            <v-progress-linear class="active-cooldown rounded" height="36" :color="activeColor + ($vuetify.theme.dark ? ' darken-2' : ' lighten-2')" v-if="!pretend" :value="cooldownPercent"></v-progress-linear>
            <v-icon :class="{'opacity-half': !pretend}">{{ activeIcon }}</v-icon>
          </div>
          <v-badge
            v-else
            overlap
            bordered
            left
            bottom
            class="balloon-text-dynamic"
            :value="item.activeType === 'utility' && charges > 1"
            :color="activeColor"
            offset-x="40"
            offset-y="8"
          >
            <v-btn class="balloon-text-dynamic px-0" :class="[activeColor, {'selected-primary': chosenActive === name}]" min-width="36" @click="use" v-bind="attrs" v-on="on">
              <v-icon>{{ activeIcon }}</v-icon>
            </v-btn>
            <template v-slot:badge>
              <span :class="{'black--text': !$vuetify.theme.dark}">x{{ $formatNum(charges) }}</span>
            </template>
          </v-badge>
        </span>
      </template>
      <active-cost
        class="mt-0"
        :cooldown="cooldown / hasteMult"
        :cooldownLeft="cooldownLeft / hasteMult"
        :nextChargeTime="(!pretend && item.activeType === 'utility') ? nextChargeTime : null"
        :cost="activeCost"
      ></active-cost>
      <div v-if="item.usableInStun" class="text-center mt-0 mb-1">{{ $vuetify.lang.t(`$vuetify.horde.items.usableInStun`) }}</div>
      <alert-text v-if="!pretend && item.activeType === 'utility' && cooldownLeft <= 0" type="info" class="mb-1" style="width: 268px;">{{ $vuetify.lang.t(`$vuetify.horde.items.utilityOvertime`) }}</alert-text>
      <active-tooltip v-for="(elem, key) in effect" :key="`active-effect-${ key }`" class="mt-0" :effect="elem" :attack="playerAttack" :health="playerMaxHealth"></active-tooltip>
      <alert-text v-if="subfeature === 0 && cooldownLeft > 0 && (!item.equipped || item.passive)" type="info">{{ $vuetify.lang.t(`$vuetify.horde.items.inactive`, $formatNum(cooldownRecover * 100)) }}</alert-text>
    </gb-tooltip>
    <v-btn
      v-if="canSeeAutocast"
      class="mt-1"
      width="36"
      min-width="36"
      height="20"
      :color="isAutocasting ? 'success' : 'secondary'"
      :disabled="isFrozen || !isAutocasting && !canAutocast"
      @click="toggleAutocast"
    >
      <v-icon size="16">mdi-cached</v-icon>
      <span v-if="autocastPrio > 0" style="font-size: 10px;">{{ autocastPrio }}</span>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HORDE_INACTIVE_ITEM_COOLDOWN } from '../../../js/constants';
import { logBase } from '../../../js/utils/math';
import AlertText from '../render/AlertText.vue';
import ActiveCost from './ActiveCost.vue';
import ActiveTooltip from './ActiveTooltip.vue';

export default {
  components: { AlertText, ActiveTooltip, ActiveCost },
  props: {
    name: {
      type: String,
      required: true
    },
    pretend: {
      type: Boolean,
      required: false,
      default: false
    },
    showAutocast: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      playerStats: state => state.horde.player,
      chosenActive: state => state.horde.chosenActive,
      subfeature: state => state.system.features.horde.currentSubfeature,
      isFrozen: state => state.cryolab.horde.active,
    }),
    item() {
      if (this.subfeature === 1) {
        const split = this.name.split('_');
        if (split[0] === 'skill') {
          return this.$store.state.horde.fighterClass[this.$store.state.horde.selectedClass].skills[split[1]];
        } else if (split[0] === 'trinket') {
          return this.$store.state.horde.trinket[split[1]];
        }
      }
      return this.$store.state.horde.items[this.name];
    },
    cooldownLeft() {
      return this.subfeature === 1 ? this.$store.state.horde.skillActive[this.name] : this.item.cooldownLeft;
    },
    activeColor() {
      return this.subfeature === 1 ? this.item.color : this.item.activeColor;
    },
    activeIcon() {
      return this.subfeature === 1 ? this.item.icon : this.item.activeIcon;
    },
    itemLevel() {
      if (this.subfeature === 1) {
        const split = this.name.split('_');
        if (split[0] === 'skill') {
          return this.$store.state.horde.skillLevel[this.name.split('_')[1]] ?? 0;
        } else if (split[0] === 'trinket') {
          return this.$store.state.horde.trinket[split[1]].level;
        }
      }
      return this.item.level;
    },
    hasteMult() {
      return this.item.activeType === 'combat' ? (this.$store.state.horde.cachePlayerStats.haste * 0.01 + 1) : 1;
    },
    cooldown() {
      return Math.ceil(this.item.cooldown(this.itemLevel) / ((this.subfeature === 0 && this.item.masteryLevel >= 4) ? 2 : 1));
    },
    cooldownPercent() {
      return 100 * (1 - (this.cooldownLeft / this.cooldown));
    },
    effect() {
      return this.item.active(this.itemLevel);
    },
    activeCost() {
      return this.item.activeCost !== undefined ? this.item.activeCost(this.itemLevel) : {};
    },
    playerMaxHealth() {
      return this.$store.state.horde.cachePlayerStats.health;
    },
    playerAttack() {
      return this.$store.state.horde.cachePlayerStats.attack;
    },
    cooldownRecover() {
      return HORDE_INACTIVE_ITEM_COOLDOWN;
    },
    charges() {
      return Math.floor(logBase(2 - (this.cooldownLeft / this.cooldown), 2));
    },
    nextChargeTime() {
      return (0 - (2 - Math.pow(2, this.charges + 1) - this.cooldownLeft / this.cooldown)) * this.cooldown;
    },
    autocastPrio() {
      return this.$store.state.horde.autocast.findIndex(el => el === this.name) + 1;
    },
    isAutocasting() {
      return this.$store.state.horde.autocast.includes(this.name);
    },
    canAutocast() {
      return this.$store.state.horde.autocast.length < this.$store.getters['mult/get']('hordeAutocast');
    },
    canSeeAutocast() {
      return this.showAutocast && this.item.activeType === 'combat' && this.$store.getters['mult/get']('hordeAutocast') >= 1;
    }
  },
  methods: {
    use() {
      this.$store.dispatch('horde/useActive', this.name);
    },
    toggleAutocast() {
      this.$store.dispatch('horde/toggleAutocast', this.name);
    }
  }
}
</script>
