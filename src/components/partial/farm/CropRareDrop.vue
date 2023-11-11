<template>
  <div class="d-flex flex-wrap align-center">
    <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.gooboo.chance')">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">{{ $formatNum(dropChance * 100, true) }}%</div>
      </template>
      <stat-breakdown name="farmRareDropChance" :base="item.chance" :baseArray="baseArray" :multArray="multArray"></stat-breakdown>
    </gb-tooltip>
    <v-icon>mdi-circle-small</v-icon>
    <div v-if="item.type === 'consumable'">{{ $formatNum(item.value) }}x {{ $vuetify.lang.t(`$vuetify.consumable.${item.name}.name`) }}</div>
    <div v-else-if="item.type === 'currency'">{{ $formatNum(item.value) }}x {{ $vuetify.lang.t(`$vuetify.currency.${item.name}.name`) }}</div>
  </div>
</template>

<script>
import StatBreakdown from '../../render/StatBreakdown.vue';

export default {
  components: { StatBreakdown },
  props: {
    item: {
      type: Object,
      required: true
    },
    baseArray: {
      type: Array,
      required: false,
      default: () => []
    },
    multArray: {
      type: Array,
      required: false,
      default: () => []
    },
    dropBase: {
      type: Number,
      required: false,
      default: 0
    },
    dropMult: {
      type: Number,
      required: false,
      default: 1
    }
  },
  computed: {
    dropChance() {
      return this.$store.getters['mult/get']('farmRareDropChance', this.item.chance + this.dropBase, this.dropMult);
    },
  }
}
</script>
