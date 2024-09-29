<style scoped>
.item-collapse {
  position: absolute;
  top: 8px;
  right: 8px;
}
.mastery-unreached {
  opacity: 0.5;
}
</style>

<template>
  <v-card class="d-flex align-center pa-1" v-if="item.collapse">
    <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.horde.items.${name}`)">
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="ma-1" v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
      </template>
      <div class="mt-0" v-for="(elem, key) in stats" :key="key">
        <span v-if="elem.type === 'tag'">{{ $vuetify.lang.t(`$vuetify.tag.${ elem.name }`, ...elem.value) }}</span>
        <template v-else>
          <mult-stat :mult="elem.name" :type="elem.type" :value="elem.value"></mult-stat>
          <span>&nbsp;<mult-name :name="elem.name"></mult-name></span>
        </template>
      </div>
    </gb-tooltip>
    <active class="ma-1" :pretend="isPretend" :name="name"></active>
    <gb-tooltip key="item-upgrade-collapse" v-if="found && canUpgrade">
      <template v-slot:activator="{ on, attrs }">
        <div class="ma-1 rounded" v-bind="attrs" v-on="on">
          <v-btn small @click="upgradeItem(name)" :disabled="!canBuy || disabled" color="secondary" class="px-2" min-width="36">
            <v-icon small>mdi-chevron-double-up</v-icon>
            {{ $formatNum(upgradePrice) }}
          </v-btn>
        </div>
      </template>
      <display-row class="mt-0" v-for="(item, key) in statDiff" :key="key" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
      <price-tag currency="horde_monsterPart" :amount="upgradePrice"></price-tag>
    </gb-tooltip>
    <v-chip key="item-max-collapse" disabled label small class="ma-1 px-2" style="text-transform: uppercase;" v-else-if="isMaxed">{{ $vuetify.lang.t('$vuetify.gooboo.maxed') }}</v-chip>
    <v-spacer></v-spacer>
    <template v-if="found">
      <v-btn class="ma-1 px-2" v-if="item.masteryLevel >= 2" color="primary" min-width="36" :disabled="disabled" @click="togglePassive"><v-icon>{{ item.passive ? 'mdi-sleep-off' : 'mdi-sleep' }}</v-icon></v-btn>
      <v-btn class="ma-1 px-2" v-if="!item.equipped" color="primary" @click="equipItem(name)" :disabled="itemsFull || disabled">{{ $vuetify.lang.t('$vuetify.gooboo.equip') }}</v-btn>
      <v-btn class="ma-1 px-2" v-else color="error" :disabled="disabled" @click="unequipItem(name)">{{ $vuetify.lang.t('$vuetify.gooboo.unequip') }}</v-btn>
    </template>
    <div v-else-if="zone < item.findZone">{{ $vuetify.lang.t('$vuetify.horde.zone') }} {{ item.findZone }}+</div>
    <gb-tooltip key="item-chance-collapse" v-else>
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">{{ $formatNum(findChance * 100, true) }}%</div>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t('$vuetify.horde.itemFindDescription') }}</div>
      <stat-breakdown name="hordeItemChance" :base="item.findChance" :multArray="findChanceArray"></stat-breakdown>
    </gb-tooltip>
    <v-btn class="ma-1" icon @click="toggleCollapse"><v-icon>mdi-arrow-expand</v-icon></v-btn>
  </v-card>
  <v-card v-else>
    <v-card-title class="pa-2 justify-center"><v-icon class="mr-2">{{ item.icon }}</v-icon>{{ $vuetify.lang.t(`$vuetify.horde.items.${name}`) }}</v-card-title>
    <v-card-subtitle v-if="canSeeMastery" class="pa-2 d-flex justify-center align-center">
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on"><div><v-icon>mdi-seal</v-icon>{{ item.masteryLevel }}</div></div>
        </template>
        <div class="mb-2">{{ $vuetify.lang.t(`$vuetify.horde.itemMastery.bonuses`) }}:</div>
        <div
          class="mt-0"
          v-for="i in Math.min(5, item.masteryLevel + 1)"
          :key="'mastery-' + i"
          :class="{'mastery-unreached': i > item.masteryLevel}"
        >
          <span>{{ $vuetify.lang.t(`$vuetify.horde.itemMastery.name`) }} {{ i }}:&nbsp;</span>
          <span v-if="i === 2 || i === 4">{{ $vuetify.lang.t(`$vuetify.horde.itemMastery.${i}`, $formatNum(item.masteryBoost * 100), $formatNum(item.masteryBoost * 200)) }}</span>
          <span v-else-if="i === 5">{{ $vuetify.lang.t(`$vuetify.horde.itemMastery.${i}`, shardCurrent, shardIncrement) }}</span>
          <span v-else>{{ $vuetify.lang.t(`$vuetify.horde.itemMastery.${i}`) }}</span>
        </div>
      </gb-tooltip>
      <v-icon>mdi-circle-small</v-icon>
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">{{ $formatNum(masteryPercent) }}%</div>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.horde.itemMastery.description`, masteryZoneNeeded) }}</div>
        <div>{{ $vuetify.lang.t(`$vuetify.horde.itemMastery.current`, $formatNum(item.masteryPoint), $formatNum(masteryNeeded)) }}</div>
        <h3 class="text-center">{{ $vuetify.lang.t(`$vuetify.gooboo.gain`) }}</h3>
        <template v-if="masteryGainBase > 0">
          <div>{{ $vuetify.lang.t(`$vuetify.horde.itemMastery.gain`, $formatNum(masteryGainBoss, true), $formatNum(masteryMinibossMult * 100), $formatNum(masteryGainMiniboss, true)) }}</div>
          <stat-breakdown name="hordeItemMasteryGain" :base="masteryGainBase"></stat-breakdown>
        </template>
      </gb-tooltip>
    </v-card-subtitle>
    <v-card-text class="px-4 py-0">
      <div v-for="(elem, key) in stats" :key="key">
        <span v-if="elem.type === 'tag'">{{ $vuetify.lang.t(`$vuetify.tag.${ elem.name }`, ...elem.value) }}</span>
        <template v-else>
          <mult-stat :mult="elem.name" :type="elem.type" :value="elem.value"></mult-stat>&nbsp;<mult-name :name="elem.name"></mult-name>
        </template>
      </div>
    </v-card-text>
    <v-card-actions>
      <active :pretend="isPretend" :name="name"></active>
      <gb-tooltip key="item-upgrade-full" v-if="found && canUpgrade">
        <template v-slot:activator="{ on, attrs }">
          <div class="ml-2 rounded" v-bind="attrs" v-on="on">
            <v-btn small @click="upgradeItem(name)" :disabled="!canBuy || disabled" color="secondary" class="px-2" min-width="36">
              <v-icon small>mdi-chevron-double-up</v-icon>
              {{ $formatNum(upgradePrice) }}
            </v-btn>
          </div>
        </template>
        <display-row class="mt-0" v-for="(item, key) in statDiff" :key="key" :name="item.name" :type="item.type" :before="item.before" :after="item.after" :is-buff="item.isBuff"></display-row>
        <price-tag currency="horde_monsterPart" :amount="upgradePrice"></price-tag>
      </gb-tooltip>
      <v-chip key="item-max-full" disabled label small class="ml-2 px-2" style="text-transform: uppercase;" v-else-if="isMaxed">{{ $vuetify.lang.t('$vuetify.gooboo.maxed') }}</v-chip>
      <v-spacer></v-spacer>
      <template v-if="found">
        <v-btn v-if="item.masteryLevel >= 2" color="primary" min-width="36" :disabled="disabled" @click="togglePassive"><v-icon>{{ item.passive ? 'mdi-sleep-off' : 'mdi-sleep' }}</v-icon></v-btn>
        <v-btn v-if="!item.equipped" color="primary" @click="equipItem(name)" :disabled="itemsFull || disabled">{{ $vuetify.lang.t('$vuetify.gooboo.equip') }}</v-btn>
        <v-btn v-else color="error" :disabled="disabled" @click="unequipItem(name)">{{ $vuetify.lang.t('$vuetify.gooboo.unequip') }}</v-btn>
      </template>
      <div v-else-if="zone < item.findZone">{{ $vuetify.lang.t('$vuetify.horde.zone') }} {{ item.findZone }}+</div>
      <gb-tooltip key="item-chance-full" v-else>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">{{ $formatNum(findChance * 100, true) }}%</div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t('$vuetify.horde.itemFindDescription') }}</div>
        <stat-breakdown name="hordeItemChance" :base="item.findChance" :multArray="findChanceArray"></stat-breakdown>
      </gb-tooltip>
    </v-card-actions>
    <v-btn class="item-collapse" icon @click="toggleCollapse"><v-icon>mdi-arrow-collapse</v-icon></v-btn>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { HORDE_MASTERY_MINIBOSS_MULT, HORDE_SHARD_INCREMENT, HORDE_SHARD_PER_EQUIP } from '../../../js/constants';
import MultName from '../../render/MultName.vue';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import MultStat from '../render/MultStat.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import Active from './Active.vue';
export default {
  components: { Active, MultStat, DisplayRow, MultName, PriceTag, StatBreakdown },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    activeDisabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      zone: state => state.horde.zone,
    }),
    item() {
      return this.$store.state.horde.items[this.name];
    },
    found() {
      return this.item.found;
    },
    findChance() {
      return this.$store.getters['mult/get']('hordeItemChance', this.item.findChance * (1 + this.zone - this.item.findZone));
    },
    findChanceArray() {
      return this.zone > this.item.findZone ? [{name: 'zone', value: 1 + this.zone - this.item.findZone}] : [];
    },
    stats() {
      let obj = this.item.stats(this.item.level);
      if (this.item.passive) {
        obj = obj.map(elem => {
          let value = elem.value;
          if (elem.isPositive) {
            const masteryMult = (this.item.masteryLevel >= 4 ? 2 : 1) * this.item.masteryBoost + 1;
            if (elem.type === 'base' || elem.type === 'bonus') {
              value *= masteryMult;
              if (elem.name === 'hordeDivisionShield' || elem.name === 'hordeRevive') {
                value = Math.round(value);
              }
            } else if (elem.type === 'mult' && elem.value > 0) {
              value = Math.pow(value, masteryMult);
            } else if (elem.type === 'tag') {
              value = value.map(el => el * masteryMult);
            }
          }
          return {...elem, value};
        });
      }
      obj = obj.map(elem => {
        if (elem.type === 'tag') {
          const types = this.$store.state.tag[elem.name].params;
          return {...elem, value: elem.value.map((el, i) => {
            switch (types[i]) {
              case 'number':
                return this.$formatNum(el, true);
              case 'time':
                return this.$formatTime(el);
              case 'percent':
                return this.$formatNum(el * 100, true) + '%';
              case 'perSecond':
                return this.$formatNum(el, true) + '/s';
              case 'mult':
                return this.$formatNum(el, true) + 'x';
              default:
                return el;
            }
          })};
        } else {
          return elem;
        }
      });
      return obj;
    },
    itemsFull() {
      return this.$store.getters['horde/itemsEquipped'] >= this.$store.getters['mult/get']('hordeMaxItems');
    },
    canUpgrade() {
      return this.$store.state.stat.horde_monsterPart.total > 0 && (this.item.cap === null || this.item.level < this.item.cap);
    },
    isMaxed() {
      return this.item.cap !== null && this.item.level >= this.item.cap;
    },
    canBuy() {
      return this.$store.getters['currency/value']('horde_monsterPart') >= this.upgradePrice;
    },
    upgradePrice() {
      return this.item.price(this.item.level);
    },
    statDiff() {
      let after = [...this.item.stats(this.item.level + 1), ...this.item.active(this.item.level + 1), {value: this.item.cooldown(this.item.level + 1)}];
      let buffs = [];
      const stats = [...this.item.stats(this.item.level), ...this.item.active(this.item.level).map(elem => {
        return {...elem, type: elem.type === 'buff' ? 'hordeBuff' : 'hordeActive', name: elem.type};
      }), {type: 'hordeCooldown', name: 'cooldown', value: this.item.cooldown(this.item.level)}].map((elem, key) => {
        if (elem.type === 'hordeBuff') {
          elem.effect.forEach((buff, bindex) => {
            buffs.push({type: buff.type, name: buff.name, before: buff.value, after: after[key].effect[bindex].value, isBuff: true});
          });
        } else if (elem.type === 'hordeActive' && elem.canCrit !== undefined) {
          buffs.push({type: 'hordeActiveCrit', name: elem.name, before: elem.canCrit, after: after[key].canCrit, isBuff: false});
        }
        return {type: elem.type, name: elem.name, before: elem.value, after: after[key].value, isBuff: false};
      });
      return [...stats, ...buffs].filter(elem => elem.before !== elem.after);
    },
    masteryZoneNeeded() {
      return Math.max(75, this.item.findZone + 25);
    },
    masteryNeeded() {
      return this.$store.getters['horde/masteryRequired'](this.name, this.item.masteryLevel);
    },
    masteryPercent() {
      const before = this.item.masteryLevel > 0 ? this.$store.getters['horde/masteryRequired'](this.name, this.item.masteryLevel - 1) : 0;
      return 100 * (this.item.masteryPoint - before) / (this.masteryNeeded - before);
    },
    canUseActive() {
      return this.item.equipped && !this.item.passive;
    },
    canSeeMastery() {
      return this.$store.state.unlock.hordeItemMastery.see;
    },
    isPretend() {
      return (!this.canUseActive && this.item.cooldownLeft <= 0) || this.activeDisabled;
    },
    shardIncrement() {
      return HORDE_SHARD_INCREMENT;
    },
    shardCurrent() {
      return Math.max(this.item.masteryLevel - 5, 0) * HORDE_SHARD_INCREMENT + HORDE_SHARD_PER_EQUIP;
    },
    masteryGainBase() {
      return this.$store.getters['horde/masteryBaseGain'](this.name);
    },
    masteryGainBoss() {
      return this.$store.getters['mult/get']('hordeItemMasteryGain', this.masteryGainBase);
    },
    masteryGainMiniboss() {
      return this.masteryGainBoss * HORDE_MASTERY_MINIBOSS_MULT;
    },
    masteryMinibossMult() {
      return HORDE_MASTERY_MINIBOSS_MULT;
    }
  },
  methods: {
    ...mapActions({
      equipItem: 'horde/equipItem',
      unequipItem: 'horde/unequipItem',
      upgradeItem: 'horde/upgradeItem'
    }),
    toggleCollapse() {
      this.$store.commit('horde/updateItemKey', {name: this.name, key: 'collapse', value: !this.item.collapse});
    },
    togglePassive() {
      this.$store.dispatch('horde/toggleItemPassive', this.name);
    }
  }
}
</script>
