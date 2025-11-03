<style scoped>
.treasure-item-slot {
  position: relative;
  width: 80px;
  height: 80px;
}
.treasure-item-slot-mobile {
  width: 64px;
  height: 64px;
}
.treasure-badge {
  position: absolute;
  left: 0;
  top: 4px;
}
.treasure-locked {
  position: absolute;
  pointer-events: none;
  opacity: 0.5;
}
</style>

<template>
  <div :data-cy="slotId !== null ? `treasure-slot-${ slotId }` : undefined" v-bind="$attrs" v-on="$listeners" class="treasure-item-slot d-flex justify-center align-center rounded-lg" :class="{'treasure-item-slot-mobile': $vuetify.breakpoint.xsOnly, 'bg-tile-default elevation-2': !locked}">
    <gb-tooltip v-if="item" :title-text="$vuetify.lang.t(`$vuetify.treasure.tierItem`, item.tier + 1)">
      <template v-slot:activator="{ on, attrs }">
        <treasure-icon :item-obj="item" v-bind="attrs" v-on="on"></treasure-icon>
      </template>
      <div class="d-flex align-center mt-0" v-for="(effect, index) in item.effect" :key="effect">
        <div v-if="effect === null">&lt;{{ $vuetify.lang.t('$vuetify.treasure.emptySlot') }}&gt;</div>
        <template v-else>
          <v-icon small class="mr-2">{{ featureIcon[effectObj[effect].feature].icon }}</v-icon>
          <display-row class="flex-grow-1" :name="effect" type="mult" :after="itemValue[index]"></display-row>
        </template>
      </div>
      <div v-for="i in modifierEventStars" :key="`event-star-${ i }`" class="d-flex align-center mt-0">
        <v-icon small class="mr-2">{{ featureIcon.event.icon }}</v-icon>
        <display-row class="flex-grow-1" name="eventPower" is-custom type="base" :after="eventStarPower"></display-row>
      </div>
    </gb-tooltip>
    <v-icon v-if="item && locked" class="treasure-locked balloon-text-dynamic" size="64" color="error">mdi-cancel</v-icon>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { TREASURE_EVENT_POWER_PER_LEVEL, TREASURE_EVENT_POWER_PER_TIER } from '../../../js/constants';
import DisplayRow from '../upgrade/DisplayRow.vue';
import TreasureIcon from './TreasureIcon.vue';

export default {
  components: { DisplayRow, TreasureIcon },
  props: {
    slotId: {
      type: Number,
      required: false,
      default: null
    },
    itemObj: {
      type: Object,
      required: false,
      default: null
    },
    locked: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      effectObj: state => state.treasure.effect,
      featureIcon: state => state.system.features
    }),
    item() {
      if (this.itemObj !== null) {
        return this.itemObj;
      }
      return this.slotId === -1 ? this.$store.state.treasure.newItem : (this.slotId < this.$store.state.treasure.items.length ? this.$store.state.treasure.items[this.slotId] : null);
    },
    itemValue() {
      if (this.item === null) {
        return [];
      }
      return this.item.valueCache.map((el, i) => {
        if (el === null) {
          return null;
        }
        const val = el + 1;
        return this.effectObj[this.item.effect[i]].scaling === 'divisive' ? (1 / val) : val;
      });
    },
    modifierEventStars() {
      return this.item === null ? 0 : this.item.modifier.filter(el => el === 'eventStar').length;
    },
    eventStarPower() {
      return this.item === null ? 0 : ((this.item.tier + 1) * TREASURE_EVENT_POWER_PER_TIER + this.item.level * TREASURE_EVENT_POWER_PER_LEVEL);
    },
  }
}
</script>
