<template>
  <div>
    <stat-row v-for="(item, key) in list" :key="key" :name="item.name" :value="item.value" :type="item.type" :total="item.total" :final="key >= (list.length - 1)" :mult="name"></stat-row>
  </div>
</template>

<script>
import StatRow from '../partial/render/StatRow.vue';
export default {
  components: { StatRow },
  props: {
    name: {
      type: String,
      required: true
    },
    base: {
      type: Number,
      required: false,
      default: null
    },
    baseArray: {
      type: Array,
      required: false,
      default: (() => [])
    },
    multArray: {
      type: Array,
      required: false,
      default: (() => [])
    },
    bonusArray: {
      type: Array,
      required: false,
      default: (() => [])
    }
  },
  computed: {
    mult() {
      return this.$store.state.mult.items[this.name];
    },
    baseValue() {
      if (this.base !== null) {
        return this.base;
      } else if (this.mult.baseValue > 0) {
        return this.mult.baseValue;
      }
      return null;
    },
    list() {
      let arr = [];
      let total = 0;

      // base value
      if (this.base !== null) {
        total = this.base;
        arr.push({name: null, value: this.base, type: 'base', total});
      } else if (this.mult.baseValue > 0) {
        total = this.mult.baseValue;
        arr.push({name: null, value: this.mult.baseValue, type: 'base', total});
      }

      // list base values
      for (const [key, elem] of Object.entries(this.mult.baseValues)) {
        total += elem;
        arr.push({name: key, value: elem, type: 'base', total});
      }
      this.baseArray.forEach(elem => {
        total += elem.value;
        arr.push({...elem, type: 'base', total});
      });

      // list mult values
      for (const [key, elem] of Object.entries(this.mult.multValues)) {
        total *= elem;
        arr.push({name: key, value: elem, type: 'mult', total});
      }
      this.multArray.forEach(elem => {
        total *= elem.value;
        arr.push({...elem, type: 'mult', total});
      });

      // list bonus values
      for (const [key, elem] of Object.entries(this.mult.bonusValues)) {
        total += elem;
        arr.push({name: key, value: elem, type: 'bonus', total});
      }
      this.bonusArray.forEach(elem => {
        total += elem.value;
        arr.push({...elem, type: 'bonus', total});
      });

      if (arr.length > 0) {
        // Show min/max if needed
        if (this.mult.min !== null && arr[arr.length - 1].total < this.mult.min) {
          arr.push({name: 'min', type: 'special', total: this.mult.min});
        }
        if (this.mult.max !== null && arr[arr.length - 1].total > this.mult.max) {
          arr.push({name: 'max', type: 'special', total: this.mult.max});
        }

        // round last value if the mult has round enabled
        if (this.mult.round) {
          arr[arr.length - 1].total = Math.round(arr[arr.length - 1].total);
        }
      }

      return arr;
    }
  }
}
</script>
