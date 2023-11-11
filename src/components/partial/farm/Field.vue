<style scoped>
/* mobile view */
.field-table-xs {
  border-spacing: 4px;
}
.field-table-xs .field-cell {
  border-radius: 4px;
  width: 44px;
  height: 44px;
}

/* tablet view */
.field-table-sm {
  border-spacing: 8px;
}
.field-table-sm .field-cell {
  border-radius: 8px;
  width: 80px;
  height: 80px;
}

/* desktop view */
.field-table-lg {
  border-spacing: 16px;
}
.field-table-lg .field-cell {
  border-radius: 8px;
  width: 96px;
  height: 96px;
}

.field-cell-filled {
  cursor: pointer;
}

/* make sure cell colors work */
.field-cell {
  position: relative;
}
.field-cell-colored {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.25;
}
</style>

<template>
  <table :class="{
    'field-table-xs': $vuetify.breakpoint.smAndDown,
    'field-table-sm': $vuetify.breakpoint.md || $vuetify.breakpoint.lg,
    'field-table-lg': $vuetify.breakpoint.xlOnly
  }">
    <tr v-for="(row, y) in field" :key="'field-row-' + y">
      <td class="field-cell text-center" :class="{'field-cell-filled bg-tile-default elevation-2': cell !== null}" v-for="(cell, x) in row" :key="'field-cell-' + y + '-' + x" @click="selectTile(x, y)">
        <div v-if="cell && cell.color" class="field-cell field-cell-colored" :class="cell.color"></div>
        <crop v-if="cell && cell.type === 'crop'" :item="cell"></crop>
        <building v-if="cell && cell.type === 'building'" :name="cell.building" :is-premium="cell.premium"></building>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from 'vuex';
import Building from './Building.vue';
import Crop from './Crop.vue';

export default {
  components: { Crop, Building },
  computed: {
    ...mapState({
      field: state => state.farm.field,
      selectedCropName: state => state.farm.selectedCropName,
      selectedBuildingName: state => state.farm.selectedBuildingName,
      selectedFertilizerName: state => state.farm.selectedFertilizerName,
      selectedColor: state => state.farm.selectedColor,
      deleting: state => state.farm.deleting,
      isFrozen: state => state.cryolab.farm.active
    })
  },
  methods: {
    selectTile(x, y) {
      const field = this.field[y][x];
      if (field !== null) {
        if (this.isFrozen) {
          // Still allow cell recolor in freeze mode
          if (this.selectedColor !== null) {
            this.colorCell(x, y);
          }
        } else {
          if (this.deleting && field.type !== null) {
            this.$store.dispatch('farm/deleteTile', {x, y});
          } else if (this.selectedColor !== null) {
            this.colorCell(x, y);
          } else if (this.selectedBuildingName && field.type === null) {
            this.$store.dispatch('farm/placeBuilding', {x, y, name: this.selectedBuildingName});
          } else if (this.selectedCropName && field.type === null) {
            const price = this.$store.getters['farm/plantPrice']({x, y}, false);
            if (
              (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](price, 'gem')) ||
              (this.$store.state.system.settings.confirm.items.farmRareResources.value && this.$store.getters['currency/contains'](price, 'farmRareResource'))
            ) {
              this.$store.commit('system/updateKey', {key: 'confirm', value: {
                type: 'farmCrop',
                mode: 'plantSingle',
                x,
                y,
                crop: this.selectedCropName,
                fertilizer: this.selectedFertilizerName,
                price: price,
              }});
            } else {
              this.$store.dispatch('farm/plantCrop', {x, y, crop: this.selectedCropName, fertilizer: this.selectedFertilizerName});
            }
          } else if (field.type === 'crop' && field.grow >= 1) {
            this.$store.dispatch('farm/harvestCrop', {x, y, crop: this.selectedCropName});
          }
        }
      }
    },
    colorCell(x, y) {
      this.$store.commit('farm/updateFieldKey', {x, y, key: 'color', value: this.selectedColor ? this.selectedColor : null});
    }
  }
}
</script>
