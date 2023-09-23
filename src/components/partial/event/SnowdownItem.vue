<style scoped>
.snowdown-item {
  width: 64px;
  height: 64px;
}
.snowdown-item-mobile {
  width: 48px;
  height: 48px;
}
</style>

<template>
  <gb-tooltip :min-width="0">
    <template v-slot:activator="{ on, attrs }">
      <div class="snowdown-item bg-tile-default d-flex justify-center align-center rounded-lg elevation-2" :class="[{'snowdown-item-mobile': $vuetify.breakpoint.xsOnly}, $vnode.data.staticClass]" v-bind="attrs" v-on="{...$listeners, ...on}">
        <v-badge bottom color="secondary" :content="item.amount" :value="!hideAmount && item.amount > 1">
          <v-icon :size="$vuetify.breakpoint.xsOnly ? 20 : 24" :color="color">{{ item.icon }}</v-icon>
        </v-badge>
      </div>
    </template>
    <snowdown-fighter v-if="item.type === 'pet'" :stats="petStats"></snowdown-fighter>
    <template v-else>
      <h3 class="text-center mt-0">{{ $vuetify.lang.t(`$vuetify.event.snowdown.item.${name}.name`) }}</h3>
      <div>{{ $vuetify.lang.t(`$vuetify.event.snowdown.item.${name}.description`) }}</div>
      <display-row class="mt-0" v-for="(item, key) in display" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="owned ? undefined : item.after"></display-row>
    </template>
  </gb-tooltip>
</template>

<script>
import SnowdownFighter from './SnowdownFighter.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { SnowdownFighter, DisplayRow },
  props: {
    name: {
      type: String,
      required: true
    },
    hideAmount: {
      type: Boolean,
      required: false,
      default: false
    },
    owned: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    item() {
      return this.$store.state.snowdown.item[this.name];
    },
    display() {
      const isMax = this.item.max !== null && this.item.amount >= this.item.max;
      return this.item.effect.map(elem => {
        const lvl = this.item.amount;
        return {
          ...elem,
          before: lvl > 0 ? elem.value(lvl) : null,
          after: isMax ? null : elem.value(lvl + 1)
        };
      });
    },
    petStats() {
      if (this.item.type !== 'pet') {
        return null;
      }
      return {...this.$store.state.snowdown.pet[this.name], name: this.name};
    },
    color() {
      if (this.item.type === 'producer') {
        return 'red';
      } else if (this.item.type === 'pet') {
        return 'green';
      }
      return 'blue';
    }
  }
}
</script>
