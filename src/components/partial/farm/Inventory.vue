<template>
  <div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <currency v-for="(item, key) in currencies" class="ma-1" :key="'currency-' + key" :name="'farm_' + item"></currency>
    </div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <template v-for="(item, key) in crops">
        <v-btn :data-cy="`farm-crop-${ key }`" v-if="item.found" class="ma-1 px-2" :class="{'selected-primary': selectedCropName === key}" min-width="0" :key="'crop-' + key" :color="item.color" @click="selectCrop(key)">
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </template>
    </div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <template v-for="(item, key) in buildings">
        <v-btn v-if="item.max > 0 && item.cacheAmount < item.max" class="ma-1 px-2" min-width="0" :key="'building-' + key" @click="selectBuilding(key)">
          <v-icon class="mr-2">{{ item.icon }}</v-icon>
          <div>{{ $formatNum(item.max - item.cacheAmount) + ' / ' + $formatNum(item.max) }}</div>
        </v-btn>
      </template>
    </div>
    <div v-if="unlock.farmFertilizer.see && selectedCropName" class="d-flex flex-wrap justify-center ma-1">
      <consumable v-for="(item, key) in fertilizers" class="ma-1" :key="'fertilizer-' + key" :name="`farm_${key}`" :is-selected="selectedFertilizerName === key" @click="selectFertilizer(key)">
        <fertilizer-card :name="key"></fertilizer-card>
      </consumable>
    </div>
    <crop-card class="ma-1" v-if="selectedCropName" :name="selectedCropName"></crop-card>
    <building-card class="ma-1" v-if="selectedBuildingName" :name="selectedBuildingName"></building-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Consumable from '../../render/Consumable.vue';
import Currency from '../../render/Currency.vue';
import BuildingCard from './BuildingCard.vue';
import CropCard from './CropCard.vue';
import FertilizerCard from './FertilizerCard.vue';

export default {
  components: { Currency, CropCard, FertilizerCard, Consumable, BuildingCard },
  data: () => ({
    currencies: ['vegetable', 'fruit', 'grain', 'flower', 'gold', 'seedHull', 'grass', 'petal', 'bug', 'butterfly', 'ladybug', 'spider', 'bee', 'mysteryStone', 'goldenPetal']
  }),
  computed: {
    ...mapState({
      crops: state => state.farm.crop,
      buildings: state => state.farm.building,
      selectedCropName: state => state.farm.selectedCropName,
      selectedBuildingName: state => state.farm.selectedBuildingName,
      selectedFertilizerName: state => state.farm.selectedFertilizerName,
      unlock: state => state.unlock,
      consumable: state => state.consumable
    }),
    fertilizers() {
      let obj = {};

      const selectedCropType = this.selectedCropName ? this.crops[this.selectedCropName].type : null;

      for (const [key, elem] of Object.entries(this.$store.state.farm.fertilizer)) {
        if (this.consumable[`farm_${key}`].found && (elem.type === 'all' || elem.type === selectedCropType)) {
          obj[key] = elem;
        }
      }

      return obj;
    }
  },
  methods: {
    selectCrop(name) {
      this.$store.commit('farm/updateKey', {key: 'selectedBuildingName', value: null});
      this.$store.commit('farm/updateKey', {key: 'selectedFertilizerName', value: null});
      this.$store.commit('farm/updateKey', {key: 'deleting', value: false});
      this.$store.commit('farm/updateKey', {key: 'selectedCropName', value: this.selectedCropName === name ? null : name});
    },
    selectBuilding(name) {
      this.$store.commit('farm/updateKey', {key: 'selectedCropName', value: null});
      this.$store.commit('farm/updateKey', {key: 'selectedFertilizerName', value: null});
      this.$store.commit('farm/updateKey', {key: 'deleting', value: false});
      this.$store.commit('farm/updateKey', {key: 'selectedBuildingName', value: this.selectedBuildingName === name ? null : name});
    },
    selectFertilizer(name) {
      this.$store.commit('farm/updateKey', {key: 'selectedBuildingName', value: null});
      this.$store.commit('farm/updateKey', {key: 'deleting', value: false});
      this.$store.commit('farm/updateKey', {key: 'selectedFertilizerName', value: this.selectedFertilizerName === name ? null : name});
    }
  }
}
</script>
