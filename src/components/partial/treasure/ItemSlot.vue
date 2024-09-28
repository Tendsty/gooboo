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
</style>

<template>
  <div :data-cy="slotId !== null ? `treasure-slot-${ slotId }` : undefined" @click="handleClick" v-bind="$attrs" v-on="$listeners" class="treasure-item-slot bg-tile-default elevation-2 d-flex justify-center align-center rounded-lg" :class="{'treasure-item-slot-mobile': $vuetify.breakpoint.xsOnly}">
    <v-badge v-if="item" :value="itemType.icon" bordered :icon="itemType.icon" color="grey">
      <v-badge bordered overlap bottom :value="item.level > 0" :content="'+' + item.level" color="success">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.treasure.tierItem`, item.tier + 1)">
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="balloon-text-black" :size="$vuetify.breakpoint.xsOnly ? 24 : 40" :color="itemColor" v-bind="attrs" v-on="on">{{ effectObj[effectToFeature[item.effect[0]]][item.effect[0]].icon }}</v-icon>
          </template>
          <div class="d-flex align-center mt-0" v-for="(effect, index) in item.effect" :key="effect">
            <v-icon small class="mr-2">{{ featureIcon[effectToFeature[effect]].icon }}</v-icon>
            <display-row class="flex-grow-1" :name="effect" type="mult" :before="itemValue[index]" :after="(slotId !== null && upgrading) ? itemValueNext[index] : null"></display-row>
          </div>
        </gb-tooltip>
      </v-badge>
    </v-badge>
    <v-badge class="treasure-badge balloon-text-black" inline bordered left v-if="slotId !== null && upgrading && upgradeCost !== null" :content="'-' + $formatNum(upgradeCost)" color="amber"></v-badge>
    <v-badge class="treasure-badge balloon-text-black" inline bordered left v-if="slotId !== null && deleting && destroyValue !== null" :content="'+' + $formatNum(destroyValue)" color="amber"></v-badge>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow },
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
    }
  },
  computed: {
    ...mapState({
      upgrading: state => state.treasure.upgrading,
      deleting: state => state.treasure.deleting,
      effectToFeature: state => state.treasure.effectToFeature,
      effectObj: state => state.treasure.effect,
      featureIcon: state => state.system.features
    }),
    item() {
      if (this.itemObj !== null) {
        return this.itemObj;
      }
      return this.slotId === -1 ? this.$store.state.treasure.newItem : (this.slotId < this.$store.state.treasure.items.length ? this.$store.state.treasure.items[this.slotId] : null);
    },
    itemColor() {
      if (this.item === null) {
        return null;
      }
      return this.$store.state.treasure.tierColor[this.item.tier];
    },
    itemType() {
      if (this.item === null) {
        return null;
      }
      return this.$store.state.treasure.type[this.item.type];
    },
    itemValue() {
      if (this.item === null) {
        return [];
      }
      return this.item.valueCache.map(el => el + 1);
    },
    itemValueNext() {
      if (this.item === null) {
        return [];
      }
      return this.item.effect.map((el, i) => this.$store.getters['treasure/effectValue'](
        this.effectObj[this.effectToFeature[el]][el].value * this.itemType.slots[i].power,
        this.item.tier,
        this.item.level + 1,
        this.item.type
      ) + 1);
    },
    upgradeCost() {
      if (this.item === null) {
        return null;
      }
      return this.$store.getters['treasure/upgradeFragments'](this.item.tier, this.item.level, this.item.type);
    },
    fragmentIcon() {
      return this.$store.state.currency.treasure_fragment.icon;
    },
    destroyValue() {
      if (this.item === null) {
        return null;
      }
      return this.item.fragmentsSpent + this.$store.getters['treasure/destroyFragments'](this.item.tier, this.item.type);
    }
  },
  methods: {
    handleClick() {
      if (this.slotId !== null) {
        if (this.upgrading && this.upgradeCost !== null && (this.slotId === -1 ? this.$store.state.treasure.newItem : this.$store.state.treasure.items[this.slotId])) {
          this.$store.dispatch('treasure/upgradeItem', this.slotId);
        } else if (this.deleting && (this.slotId === -1 ? this.$store.state.treasure.newItem : this.$store.state.treasure.items[this.slotId])) {
          if (this.$store.state.system.settings.confirm.items.treasureDelete.value) {
            this.$store.commit('system/updateKey', {key: 'confirm', value: {
              type: 'treasureDelete',
              id: this.slotId,
              gain: {treasure_fragment: this.destroyValue},
            }});
          } else {
            this.$store.dispatch('treasure/deleteItem', this.slotId);
          }
        } else {
          if (this.slotId !== -1 && this.$store.state.treasure.newItem && !this.$store.state.treasure.items[this.slotId]) {
            this.$store.dispatch('treasure/moveItem', {from: -1, to: this.slotId});
          }
        }
      }
    }
  }
}
</script>
