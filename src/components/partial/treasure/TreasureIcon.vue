<style scoped>
.treasure-outline {
  position: relative;
  width: 72px;
  height: 64px;
  border-radius: 12px;
}
.treasure-border {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 12px;
  opacity: 0.2;
}
.treasure-type-icon {
  opacity: 0.35;
}
.mt-05 {
  margin-top: 2px;
}
.treasure-level {
  font-size: 14px;
}
.theme--dark .treasure-level {
  color: #ffffff;
}
</style>

<template>
  <div class="treasure-outline d-flex flex-column justify-space-between align-center" v-on="$listeners">
    <div class="treasure-effect-list d-flex justify-center mt-05">
      <v-icon :color="itemColor" class="balloon-text-dynamic" v-for="(item, key) in itemObj.effect" :key="`effect-${ key }`">{{ item ? effectObj[item].icon : 'mdi-scan-helper' }}</v-icon>
    </div>
    <div class="d-flex w-100 px-2">
      <v-icon class="treasure-type-icon" v-if="itemType.icon">{{ itemType.icon }}</v-icon>
      <v-spacer></v-spacer>
      <div class="balloon-text-dynamic treasure-level" v-if="level > 0">+{{ $formatInt(level) }}</div>
    </div>
    <div class="treasure-modifier-list d-flex justify-center">
      <v-icon class="balloon-text-dynamic" v-for="(item, key) in modifierList" :key="`modifier-${ key }`" small>{{ item ? consumableObj['treasure_' + item].icon : 'mdi-circle-small' }}</v-icon>
    </div>
    <div class="treasure-border" :class="itemColor"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    itemObj: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState({
      effectObj: state => state.treasure.effect,
      consumableObj: state => state.consumable,
    }),
    itemColor() {
      return this.$store.state.treasure.tierColor[this.itemObj.tier];
    },
    itemType() {
      return this.$store.state.treasure.type[this.itemObj.type];
    },
    modifierList() {
      let arr = [...this.itemObj.modifier];
      while (arr.length < this.itemType.maxModifiers) {
        arr.push(null);
      }
      return arr;
    },
    level() {
      return this.itemObj.level + this.itemObj.modifier.filter(el => el === 'upArrow').length * 2;
    }
  }
}
</script>
