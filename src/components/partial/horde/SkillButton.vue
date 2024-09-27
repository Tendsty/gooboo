<style scoped>
.skill-container {
  position: relative;
}
.skill-bg-circle {
  opacity: 0.75;
  position: absolute;
  left: 1px;
  top: 1px;
}
.skill-btn {
  position: absolute;
  left: 0;
  top: 0;
}
.skill-disabled {
  opacity: 0.2;
}
.level-tag-container {
  position: absolute;
  bottom: -8px;
  left: -30px;
  right: -30px;
  pointer-events: none;
}
.level-tag {
  font-size: 10px;
}
</style>

<template>
  <gb-tooltip key="item-chance-full">
    <template v-slot:activator="{ on, attrs }">
      <div class="skill-container mb-4" v-bind="attrs" v-on="on" :class="[$vnode.data.staticClass, {'mx-1 mt-1': type !== 'active'}]">
        <v-icon :size="circleSize" class="skill-bg-circle" :class="{'skill-disabled': isFrozen || disabled}">{{ circleIcon }}</v-icon>
        <v-icon :size="circleOutlineSize" :color="(isFrozen || disabled) ? 'grey' : color" :class="{'skill-disabled': isFrozen || disabled}">{{ circleIcon }}-outline</v-icon>
        <v-btn icon :color="color" class="skill-btn" :width="circleOutlineSize" :height="circleOutlineSize" :disabled="isFrozen || disabled" @click="upgrade">
          <v-icon class="balloon-text-dynamic" :size="buttonSize">{{ icon }}</v-icon>
        </v-btn>
        <div class="level-tag-container d-flex justify-center">
          <div class="level-tag balloon-text-dynamic rounded px-1 elevation-2" :class="isMax ? 'success' : 'grey'">
            <span v-if="type !== 'stat' && max <= 5">
              <v-icon v-for="i in skillLevel" :key="`active-on-${ i }`" size="8">mdi-circle</v-icon>
              <v-icon v-for="i in (max - skillLevel)" :key="`active-off-${ i }`" size="8">mdi-circle-outline</v-icon>
            </span>
            <span v-else-if="isMax">{{ $vuetify.lang.t('$vuetify.gooboo.maxed') }}</span>
            <span v-else>{{ skillLevel }} / {{ max }}</span>
          </div>
        </div>
      </div>
    </template>
    <div v-if="!isMax" class="mt-0">{{ $vuetify.lang.t('$vuetify.horde.classes.skillPointCost', skill.cost) }}</div>
    <template v-if="type === 'active'">
      <active-cost
        class="mt-0"
        :cooldown="cooldown / hasteMult"
        :cost="activeCost"
      ></active-cost>
      <div v-for="(elem, key) in effect" :key="`active-effect-${ key }`">
        <active-tooltip v-if="elem.before !== null" class="mt-0" :effect="elem.before" :attack="playerAttack" :health="playerMaxHealth"></active-tooltip>
        <v-icon small class="ml-4" v-if="elem.before !== null && elem.after !== null">mdi-transfer-down</v-icon>
        <active-tooltip v-if="elem.after !== null" class="mt-0" :effect="elem.after" :attack="playerAttack" :health="playerMaxHealth"></active-tooltip>
      </div>
    </template>
    <display-row class="mt-0" v-for="(item, key) in statDiff" :key="key" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
  </gb-tooltip>
</template>

<script>
import { mapState } from 'vuex';
import DisplayRow from '../upgrade/DisplayRow.vue';
import ActiveCost from './ActiveCost.vue';
import ActiveTooltip from './ActiveTooltip.vue';

export default {
  components: { DisplayRow, ActiveTooltip, ActiveCost },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    max: {
      type: Number,
      required: true
    },
    skill: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.horde.active,
    }),
    circleIcon() {
      switch (this.type) {
        case 'stat':
          return 'mdi-circle';
        case 'passive':
          return 'mdi-decagram';
        case 'active':
          return 'mdi-square-rounded';
      }
      return 'mdi-circle';
    },
    circleSize() {
      switch (this.type) {
        case 'stat':
          return 30;
        case 'passive':
          return 44;
        case 'active':
          return 70;
      }
      return 30;
    },
    circleOutlineSize() {
      switch (this.type) {
        case 'stat':
          return 32;
        case 'passive':
          return 46;
        case 'active':
          return 72;
      }
      return 32;
    },
    buttonSize() {
      switch (this.type) {
        case 'stat':
          return 15;
        case 'passive':
          return 22;
        case 'active':
          return 35;
      }
      return 15;
    },
    buttonPadding() {
      return (this.circleOutlineSize - this.buttonSize) / 2;
    },
    skillLevel() {
      return this.$store.state.horde.skillLevel[this.name] ?? 0;
    },
    isMax() {
      return this.skillLevel >= this.max;
    },
    statDiff() {
      if (this.type === 'active') {
        if (this.skillLevel <= 0 || this.isMax) {
          return [];
        }
        return [{
          type: 'hordeCooldown',
          name: 'cooldown',
          before: this.skillLevel > 0 ? this.skill.cooldown(this.skillLevel) : null,
          after: this.isMax ? null : this.skill.cooldown(this.skillLevel + 1)}
        ].filter(elem => {
          return elem.before !== elem.after;
        });
      }
      return this.skill.effect.map(elem => {
        return {
          ...elem,
          before: this.skillLevel > 0 ? elem.value(this.skillLevel) : null,
          after: this.isMax ? null : elem.value(this.skillLevel + 1)
        };
      }).filter(elem => {
        return elem.before !== elem.after;
      });
    },
    effect() {
      if (this.type !== 'active') {
        return [];
      }
      const current = this.skillLevel <= 0 ? this.skill.active(1).map(() => null) : this.skill.active(this.skillLevel);
      const next = this.isMax ? this.skill.active(1).map(() => null) : this.skill.active(this.skillLevel + 1);
      return current.map((el, i) => {
        return {before: el, after: next[i]};
      });
    },
    hasteMult() {
      return this.skill.activeType === 'combat' ? (this.$store.state.horde.cachePlayerStats.haste * 0.01 + 1) : 1;
    },
    cooldown() {
      if (this.type !== 'active') {
        return 0;
      }
      return this.skill.cooldown(this.skillLevel);
    },
    activeCost() {
      if (this.type !== 'active') {
        return {};
      }
      return this.skill.activeCost(this.skillLevel);
    },
    playerMaxHealth() {
      return this.$store.state.horde.cachePlayerStats.health;
    },
    playerAttack() {
      return this.$store.state.horde.cachePlayerStats.attack;
    }
  },
  methods: {
    upgrade() {
      this.$store.dispatch('horde/upgradeSkill', this.name);
    }
  }
}
</script>
