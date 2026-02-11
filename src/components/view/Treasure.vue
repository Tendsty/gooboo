<style scoped>
.treasure-slot {
  touch-action: none;
}
.treasure-tier {
  font-size: 20px;
}
.treasure-dialog-close {
  position: absolute;
  top: 4px;
  right: 4px;
}
</style>

<template>
  <v-row no-gutters>
    <v-col :class="{'scroll-container': $vuetify.breakpoint.mdAndUp}" cols="12" md="8" lg="9">
      <chance-list></chance-list>
      <div class="d-flex flex-wrap justify-center align-center ma-1">
        <div class="d-flex flex-wrap justify-center align-center">
          <currency class="ma-1" name="treasure_fragment"></currency>
          <gb-tooltip :min-width="0">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-btn small class="ma-1 pa-1" data-cy="treasure-buy-fragment" color="success" min-width="32" min-height="32" :disabled="!canBuyFragments" @click="buyFragments"><v-icon>mdi-plus</v-icon></v-btn>
              </div>
            </template>
            <div class="mt-0">
              <span>{{ $vuetify.lang.t(`$vuetify.treasure.buyFragment.0`) }}</span>
              <price-tag class="ml-1" currency="treasure_fragment" :amount="fragmentGain" add></price-tag>
              <span>&nbsp;{{ $vuetify.lang.t(`$vuetify.treasure.buyFragment.1`) }}</span>
              <price-tag class="ml-1" currency="gem_emerald" :amount="fragmentPrice"></price-tag>
            </div>
          </gb-tooltip>
        </div>
        <v-btn class="ma-1" color="secondary" @click="performSort">{{ $vuetify.lang.t('$vuetify.gooboo.sort') }}</v-btn>
        <v-spacer></v-spacer>
        <buy-item class="ma-1" name="regular"></buy-item>
        <buy-item v-if="unlock.treasureDual.see" class="ma-1" name="dual"></buy-item>
        <buy-item v-if="unlock.treasurePrestigious.see" class="ma-1" name="prestigious"></buy-item>
        <item-slot
          class="ma-1 treasure-slot"
          id="treasure_-1"
          :slot-id="-1"
          :draggable="newItem !== null"
          @dragstart="drag($event, -1)"
          @touchend="touchdrop($event, -1)"
          @click="selectTreasure(-1)"
        ></item-slot>
        <v-btn small class="mt-auto mr-1 mb-1 px-1" min-width="0" color="error" :disabled="newItem === null" @click="quickDeleteTreasure"><v-icon>mdi-delete</v-icon></v-btn>
      </div>
      <div class="d-flex flex-wrap ma-1">
        <item-slot
          class="ma-1 treasure-slot"
          v-for="i in treasureSlots"
          :key="i"
          :id="'treasure_' + (i - 1)"
          :slot-id="i - 1"
          :draggable="(i - 1) < items.length && items[i - 1] !== null"
          @dragstart="drag($event, i - 1)"
          @drop="drop($event, i - 1)"
          @dragover="allowDrop"
          @touchend="touchdrop($event, i - 1)"
          @click="selectTreasure(i - 1)"
        ></item-slot>
        <item-slot
          class="ma-1 treasure-slot"
          v-for="i in lockedSlots"
          :key="treasureSlots + i"
          :id="'treasure_' + (treasureSlots + i - 1)"
          :slot-id="treasureSlots + i - 1"
          :draggable="items[treasureSlots + i - 1] !== null"
          locked
          @dragstart="drag($event, treasureSlots + i - 1)"
          @touchend="touchdrop($event, treasureSlots + i - 1)"
          @click="selectTreasure(treasureSlots + i - 1)"
        ></item-slot>
      </div>
    </v-col>
    <v-col :class="{'scroll-container': $vuetify.breakpoint.mdAndUp}" cols="12" md="4" lg="3">
      <stat-list></stat-list>
    </v-col>
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="default-card pa-2">
        <v-card-text v-if="selectedItem" class="pa-0">
          <div class="d-flex align-center mb-4">
            <treasure-icon class="ma-2 mr-4" :item-obj="selectedItem"></treasure-icon>
            <div class="flex-grow-1">
              <div class="treasure-tier">{{ $vuetify.lang.t('$vuetify.treasure.tier') }} {{ $formatInt(selectedItem.tier + 1) }}</div>
              <div>
                <span>{{ $vuetify.lang.t('$vuetify.treasure.level') }} {{ $formatInt(selectedItem.level) }}</span>
                <span v-if="selectedItemBonusLevels > 0">&nbsp;(+{{ $formatInt(selectedItemBonusLevels) }})</span>
              </div>
            </div>
          </div>
          <template v-for="(effect, index) in selectedItem.effect">
            <wildcard-slot
              v-if="effect === null"
              class="ma-1"
              :key="effect"
              :item-obj="selectedItem"
              :slot-id="selectedTreasure"
              :effect-index="index"
            ></wildcard-slot>
            <div v-else :key="effect" class="d-flex align-center mt-0 mx-1">
              <v-icon small class="mr-2">{{ featureIcon[effectObj[effect].feature].icon }}</v-icon>
              <display-row class="flex-grow-1" :name="effect" type="mult" :before="selectedItemValue[index]" :after="selectedItemValueNext[index]"></display-row>
            </div>
          </template>
          <div v-for="i in modifierEventStars" :key="`event-star-${ i }`" class="d-flex align-center mt-0 mx-1">
            <v-icon small class="mr-2">{{ featureIcon.event.icon }}</v-icon>
            <display-row class="flex-grow-1" name="eventPower" is-custom type="base" :before="eventStarPower" :after="eventStarPower + eventPowerGain"></display-row>
          </div>
          <div v-if="hasNoExpander" class="d-flex w-100 justify-end align-center">
            <price-tag class="ma-1" currency="treasure_fragment" :amount="upgradeCost"></price-tag>
            <v-btn data-cy="treasure-upgrade-button" class="ma-1" color="primary" @click="upgradeTreasure" :disabled="!canAffordUpgrade">{{ $vuetify.lang.t('$vuetify.gooboo.upgradeVerb') }}</v-btn>
          </div>
          <div class="d-flex justify-center align-center mt-4">
            <div class="mr-4">{{ $formatInt(selectedItem.modifier.length) }} / {{ $formatInt(treasureType[selectedItem.type].maxModifiers) }} {{ $vuetify.lang.t('$vuetify.treasure.modifiers') }}</div>
            <v-icon v-for="(item, key) in selectedItemModifierList" :key="`modifier-${ key }`">{{ item ? consumableObj['treasure_' + item].icon : 'mdi-circle-small' }}</v-icon>
          </div>
          <div class="d-flex flex-wrap justify-center align-center">
            <consumable
              v-for="item in modifierList"
              :key="`modifier-${ item }`"
              class="ma-1"
              :name="`treasure_${ item }`"
              :disabled="!canApplyModifiers || (item === 'expander' && !hasNoExpander)"
              @click="useModifier(item)"
            >
              <alert-text v-if="item === 'upArrow'" type="info">{{ $vuetify.lang.t('$vuetify.treasure.upArrowFragments', $formatNum(upArrowFragments)) }}</alert-text>
              <alert-text v-if="item === 'expander'" type="info">{{ $vuetify.lang.t('$vuetify.treasure.expanderFragments', $formatNum(expanderFragments)) }}</alert-text>
              <alert-text v-if="item === 'expander'" type="info">{{ $vuetify.lang.t('$vuetify.treasure.expanderEffect', ...expanderLevelsAtTime) }}</alert-text>
            </consumable>
          </div>
          <div class="d-flex w-100 justify-end align-center mt-4">
            <price-tag class="ma-1" currency="treasure_fragment" :amount="destroyValue" add></price-tag>
            <v-btn data-cy="treasure-delete-button" class="ma-1" color="error" @click="deleteTreasure"><v-icon>mdi-delete</v-icon></v-btn>
          </div>
        </v-card-text>
        <v-btn class="treasure-dialog-close" data-cy="treasure-dialog-close" @click="dialog = false" icon><v-icon>mdi-close</v-icon></v-btn>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { TREASURE_EVENT_POWER_PER_LEVEL, TREASURE_EVENT_POWER_PER_TIER, TREASURE_FRAGMENT_BUY_COST, TREASURE_FRAGMENT_BUY_GAIN } from '../../js/constants';
import AlertText from '../partial/render/AlertText.vue';
import BuyItem from '../partial/treasure/BuyItem.vue';
import ChanceList from '../partial/treasure/ChanceList.vue';
import ItemSlot from '../partial/treasure/ItemSlot.vue';
import StatList from '../partial/treasure/StatList.vue';
import TreasureIcon from '../partial/treasure/TreasureIcon.vue';
import WildcardSlot from '../partial/treasure/WildcardSlot.vue';
import DisplayRow from '../partial/upgrade/DisplayRow.vue';
import Consumable from '../render/Consumable.vue';
import Currency from '../render/Currency.vue';
import PriceTag from '../render/PriceTag.vue';

export default {
  components: { ChanceList, Currency, ItemSlot, StatList, BuyItem, PriceTag, Consumable, TreasureIcon, DisplayRow, WildcardSlot, AlertText },
  data: () => ({
    dialog: false,
    selectedTreasure: -1,
  }),
  computed: {
    ...mapState({
      upgrading: state => state.treasure.upgrading,
      deleting: state => state.treasure.deleting,
      treasureType: state => state.treasure.type,
      unlock: state => state.unlock,
      newItem : state => state.treasure.newItem,
      items: state => state.treasure.items,
      effectObj: state => state.treasure.effect,
      consumableObj: state => state.consumable,
      featureIcon: state => state.system.features
    }),
    ...mapGetters({
      fragmentGain: 'treasure/fragmentGain'
    }),
    treasureSlots() {
      return this.$store.getters['mult/get']('treasureSlots');
    },
    lockedSlots() {
      return Math.max(this.items.length - this.treasureSlots, 0);
    },
    canBuyFragments() {
      return this.$store.getters['currency/value']('gem_emerald') >= TREASURE_FRAGMENT_BUY_COST;
    },
    fragmentPrice() {
      return TREASURE_FRAGMENT_BUY_COST;
    },
    selectedItem() {
      return this.selectedTreasure === -1 ? this.newItem : this.items[this.selectedTreasure];
    },
    upgradeCost() {
      if (this.selectedItem === null) {
        return null;
      }
      return this.$store.getters['treasure/upgradeFragments'](this.selectedItem.tier, this.selectedItem.level, this.selectedItem.type);
    },
    destroyValue() {
      if (this.selectedItem === null) {
        return null;
      }
      return this.selectedItem.fragmentsSpent + this.$store.getters['treasure/destroyFragments'](this.selectedItem.tier, this.selectedItem.type);
    },
    selectedItemValue() {
      if (this.selectedItem === null) {
        return [];
      }
      return this.selectedItem.valueCache.map((el, i) => {
        if (el === null) {
          return null;
        }
        const val = el + 1;
        return this.effectObj[this.selectedItem.effect[i]].scaling === 'divisive' ? (1 / val) : val;
      });
    },
    selectedItemValueNext() {
      if (this.selectedItem === null) {
        return [];
      }
      return this.selectedItem.effect.map((el, i) => {
        if (el === null) {
          return null;
        }
        const val = this.$store.getters['treasure/effectValue'](
          el,
          this.selectedItem.tier,
          this.selectedItem.level + this.selectedItemBonusLevels + 1,
          this.treasureType[this.selectedItem.type].slots[i].power
        ) + 1;
        return this.effectObj[el].scaling === 'divisive' ? (1 / val) : val;
      });
    },
    hasNoExpander() {
      return this.selectedItemModifierList.findIndex(el => el === 'expander') === -1;
    },
    canAffordUpgrade() {
      return this.upgradeCost !== null && this.$store.getters['currency/canAfford']({treasure_fragment: this.upgradeCost});
    },
    selectedItemModifierList() {
      if (this.selectedItem === null) {
        return [];
      }
      let arr = [...this.selectedItem.modifier];
      while (arr.length < this.treasureType[this.selectedItem.type].maxModifiers) {
        arr.push(null);
      }
      return arr;
    },
    modifierEventStars() {
      return this.selectedItemModifierList.filter(el => el === 'eventStar').length;
    },
    eventStarPower() {
      return this.selectedItem === null ? 0 : ((this.selectedItem.tier + 1) * TREASURE_EVENT_POWER_PER_TIER + this.selectedItem.level * TREASURE_EVENT_POWER_PER_LEVEL);
    },
    eventPowerGain() {
      return TREASURE_EVENT_POWER_PER_LEVEL;
    },
    modifierList() {
      return Object.keys(this.$store.state.treasure.modifier);
    },
    canApplyModifiers() {
      return this.selectedItem.modifier.length < this.treasureType[this.selectedItem.type].maxModifiers;
    },
    selectedItemBonusLevels() {
      if (this.selectedItem === null) {
        return 0;
      }
      return this.selectedItem.modifier.filter(el => el === 'upArrow').length * 2;
    },
    upArrowFragments() {
      return Math.round(this.$store.getters['treasure/averageFragments'] * TREASURE_FRAGMENT_BUY_GAIN * this.$store.state.consumable.treasure_upArrow.price.gem_emerald / this.$store.getters['treasure/treasurePrice']('regular'));
    },
    expanderFragments() {
      return Math.round(this.$store.getters['treasure/averageFragments'] * TREASURE_FRAGMENT_BUY_GAIN * this.$store.state.consumable.treasure_expander.price.gem_emerald / this.$store.getters['treasure/treasurePrice']('regular'));
    },
    expanderLevelsAtTime() {
      if (this.selectedItem === null) {
        return [];
      }
      return [
        this.$store.getters['treasure/levelAtDay'](this.selectedItem.type, this.selectedItem.tier, this.selectedItem.days + 30),
        this.$store.getters['treasure/levelAtDay'](this.selectedItem.type, this.selectedItem.tier, this.selectedItem.days + 365),
      ];
    },
  },
  methods: {
    drag(ev, id) {
      ev.dataTransfer.setData("text", id);
    },
    drop(ev, id) {
      ev.preventDefault();
      const startId = parseInt(ev.dataTransfer.getData("text"));
      const endId = parseInt(id);
      if (startId !== endId) {
        this.$store.dispatch('treasure/moveItem', {from: startId, to: endId});
      }
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    touchdrop(ev, draggedId) {
      const elemList = document.elementsFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
      if (elemList) {
        const endElem = elemList.find(el => el.id.slice(0, 9) === 'treasure_');
        if (endElem) {
          const startId = parseInt(draggedId);
          const endId = parseInt(endElem.id.slice(9));
          if (startId !== endId && endId !== -1 && endId < this.treasureSlots) {
            this.$store.dispatch('treasure/moveItem', {from: startId, to: endId});
          }
        }
      }
    },
    buyFragments() {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'treasureFragment',
          price: {gem_emerald: TREASURE_FRAGMENT_BUY_COST},
          gain: {treasure_fragment: this.fragmentGain},
        }});
      } else {
        this.$store.dispatch('treasure/buyFragments');
      }
    },
    performSort() {
      this.$store.commit('treasure/sortItems', this.treasureSlots);
    },
    selectTreasure(id) {
      if (id !== -1 && this.newItem && !this.items[id]) {
        this.$store.dispatch('treasure/moveItem', {from: -1, to: id});
      } else if (id === -1 ? this.newItem : this.items[id]) {
        this.dialog = true;
        this.selectedTreasure = id;
      }
    },
    upgradeTreasure() {
      this.$store.dispatch('treasure/upgradeItem', this.selectedTreasure);
    },
    deleteTreasure() {
      if (this.$store.state.system.settings.confirm.items.treasureDelete.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'treasureDelete',
          id: this.selectedTreasure,
          gain: {treasure_fragment: this.destroyValue},
        }});
      } else {
        this.$store.dispatch('treasure/deleteItem', this.selectedTreasure);
      }
      this.dialog = false;
    },
    quickDeleteTreasure() {
      if (this.$store.state.system.settings.confirm.items.treasureDelete.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'treasureDelete',
          id: -1,
          gain: {treasure_fragment: this.destroyValue},
        }});
      } else {
        this.$store.dispatch('treasure/deleteItem', -1);
      }
    },
    useModifier(name) {
      const consumables = {[`treasure_${ name }`]: 1};
      const price = this.$store.getters['consumable/priceMultiple'](consumables).price;
      if (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](price, 'gem')) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'consumable',
          subtype: 'useTreasureModifier',
          consumable: consumables,
          price: this.$store.getters['currency/filterPrice'](price, 'gem'),
          treasure: this.selectedTreasure,
          modifier: name,
        }});
      } else {
        this.$store.dispatch('treasure/useModifier', {id: this.selectedTreasure, modifier: name});
      }
    }
  }
}
</script>
