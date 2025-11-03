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
      const groupableName = ['hordeTower', 'cardCollection', 'cards', 'cardsShiny', 'treasure', 'relic', 'relicGlyph'];
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
      let groupableUpgrades = 0;
      for (const [key] of Object.entries(this.mult.baseValues)) {
        const nameBase = key.split('_')[0];
        if (groupableName.includes(nameBase)) {
          groupableUpgrades++;
        } else if (nameBase === 'upgrade') {
          const upgrade = this.$store.state.upgrade.item[key.slice(key.split('_')[0].length + 1)];
          if (upgrade.cap !== null && upgrade.level >= upgrade.cap) {
            groupableUpgrades++;
          }
        }
      }
      let upgradeBase = 0;
      for (const [key, elem] of Object.entries(this.mult.baseValues)) {
        const nameBase = key.split('_')[0];
        const upgrade = nameBase === 'upgrade' ? this.$store.state.upgrade.item[key.slice(key.split('_')[0].length + 1)] : null;
        if (groupableUpgrades >= 5 && (groupableName.includes(nameBase) || upgrade && upgrade.cap !== null && upgrade.level >= upgrade.cap)) {
          upgradeBase += elem;
        } else {
          total += elem;
          arr.push({name: key, value: elem, type: 'base', total});
        }
      }
      if (upgradeBase !== 0) {
        total += upgradeBase;
        arr.push({name: `grouped_${ groupableUpgrades }`, value: upgradeBase, type: 'base', total});
      }
      this.baseArray.forEach(elem => {
        total += elem.value;
        arr.push({...elem, type: 'base', total});
      });

      // list mult values
      groupableUpgrades = 0;
      for (const [key] of Object.entries(this.mult.multValues)) {
        const nameBase = key.split('_')[0];
        if (groupableName.includes(nameBase)) {
          groupableUpgrades++;
        } else if (key.split('_')[0] === 'upgrade') {
          const upgrade = this.$store.state.upgrade.item[key.slice(key.split('_')[0].length + 1)];
          if (upgrade.cap !== null && upgrade.level >= upgrade.cap) {
            groupableUpgrades++;
          }
        }
      }
      let upgradeMult = 1;
      for (const [key, elem] of Object.entries(this.mult.multValues)) {
        const nameBase = key.split('_')[0];
        const upgrade = nameBase === 'upgrade' ? this.$store.state.upgrade.item[key.slice(key.split('_')[0].length + 1)] : null;
        if (groupableUpgrades >= 5 && (groupableName.includes(nameBase) || upgrade && upgrade.cap !== null && upgrade.level >= upgrade.cap)) {
          upgradeMult *= elem;
        } else {
          total *= elem;
          arr.push({name: key, value: elem, type: 'mult', total});
        }
      }
      if (upgradeMult !== 1) {
        total *= upgradeMult;
        arr.push({name: `grouped_${ groupableUpgrades }`, value: upgradeMult, type: 'mult', total});
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
