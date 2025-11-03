<style scoped>
.watering-can-container {
  position: relative;
  width: 64px;
  height: 64px;
}
.watering-can-container-mobile {
  width: 32px;
  height: 32px;
}
.watering-can-bg {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  right: 0;
}
.watering-can-bg-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.opacity-half {
  opacity: 0.5;
}
</style>

<template>
  <div class="d-flex justify-center" style="min-height: 76px;">
    <div>
      <div class="d-flex flex-wrap justify-center my-1" :class="{'mx-1': $vuetify.breakpoint.smAndUp}">
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn data-cy="farm-plant-all" class="ma-1" min-width="36" :disabled="!selectedCropName || isFrozen" :color="selectedColor ? selectedColor : 'primary'" @click="plantAll" v-bind="attrs" v-on="on"><v-icon>mdi-seed</v-icon></v-btn>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.farm.button.plantAll`, selectedCropName ? $vuetify.lang.t(`$vuetify.farm.crop.${ selectedCropName }`) : '') }}</div>
          <alert-text v-if="selectedColor" :type="selectedColor" icon-name="info">{{ $vuetify.lang.t(`$vuetify.farm.button.colorFilter`) }}</alert-text>
        </gb-tooltip>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn data-cy="farm-replant-all" class="ma-1" min-width="36" :disabled="isFrozen" :color="selectedColor ? selectedColor : 'primary'" @click="replantAll" v-bind="attrs" v-on="on"><v-icon>mdi-refresh</v-icon></v-btn>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.farm.button.replant`) }}</div>
          <div v-if="unlock.farmFertilizer.see">{{ $vuetify.lang.t(`$vuetify.farm.button.replantFertilizer`) }}</div>
          <alert-text v-if="selectedColor" :type="selectedColor" icon-name="info">{{ $vuetify.lang.t(`$vuetify.farm.button.colorFilter`) }}</alert-text>
        </gb-tooltip>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn data-cy="farm-harvest-all" class="ma-1" min-width="36" :disabled="isFrozen" :color="selectedColor ? selectedColor : 'primary'" @click="harvestAll" v-bind="attrs" v-on="on"><v-icon>mdi-basket</v-icon></v-btn>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.farm.button.harvestAll`) }}</div>
          <alert-text v-if="selectedColor" :type="selectedColor" icon-name="info">{{ $vuetify.lang.t(`$vuetify.farm.button.colorFilter`) }}</alert-text>
        </gb-tooltip>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn data-cy="farm-delete" class="ma-1" min-width="36" :disabled="isFrozen" :color="deleting ? 'error' : 'secondary'" @click="deleteMode" v-bind="attrs" v-on="on"><v-icon>mdi-delete</v-icon></v-btn>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.farm.button.delete`) }}</div>
          <div v-if="canSeeBuildings">{{ $vuetify.lang.t(`$vuetify.farm.button.deleteBuilding`) }}</div>
        </gb-tooltip>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-1" min-width="36" :color="selectedColor ? selectedColor : (selectedColor === 0 ? 'error' : 'secondary')" @click="toggleColors" v-bind="attrs" v-on="on"><v-icon>mdi-palette</v-icon></v-btn>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.farm.button.color`) }}</div>
        </gb-tooltip>
      </div>
      <div v-if="showColors" class="d-flex flex-wrap justify-center ma-1">
        <v-btn x-small min-width="24" v-for="color in colors" :key="color" class="mr-1" :color="color" @click="selectColor(color)"></v-btn>
        <v-btn x-small min-width="24" class="ml-2 px-0" :color="selectedColor === 0 ? 'error' : 'secondary'" @click="selectColor(0)"><v-icon small>mdi-delete</v-icon></v-btn>
      </div>
    </div>
    <gb-tooltip v-if="unlock.farmCare.use" :title-text="$vuetify.lang.t('$vuetify.farm.care.wateringCan')">
      <template v-slot:activator="{ on, attrs }">
        <div class="watering-can-container mx-2" :class="{'watering-can-container-mobile mt-2': $vuetify.breakpoint.xsOnly}" v-bind="attrs" v-on="on">
          <v-icon :size="wateringCanSize" color="secondary" class="watering-can-outline" :class="{'opacity-half': wateringCanFillLevel <= 0}">mdi-watering-can</v-icon>
          <div class="watering-can-bg" :style="`top: ${ wateringCanShift }px;`">
            <v-icon :size="wateringCanSize" :color="wateringCanColor" class="watering-can-bg-inner">mdi-watering-can</v-icon>
          </div>
        </div>
      </template>
      <div>{{ $vuetify.lang.t('$vuetify.farm.care.description1', $formatInt(maxCare)) }}</div>
      <div>{{ $vuetify.lang.t('$vuetify.farm.care.description2', $formatNum(rainwaterGain, true), $formatInt(rainwater.cap)) }}</div>
      <alert-text type="info">
        <span v-if="wateringCanFillLevel <= 0">{{ $vuetify.lang.t('$vuetify.farm.care.empty') }}</span>
        <span v-else-if="wateringCanFillLevel < 1">{{ $vuetify.lang.t('$vuetify.farm.care.low') }}</span>
        <span v-else-if="wateringCanFillLevel < 2">{{ $vuetify.lang.t('$vuetify.farm.care.mid') }}</span>
        <span v-else-if="wateringCanFillLevel < 3">{{ $vuetify.lang.t('$vuetify.farm.care.half') }}</span>
        <span v-else-if="wateringCanFillLevel < 4">{{ $vuetify.lang.t('$vuetify.farm.care.high') }}</span>
        <span v-else>{{ $vuetify.lang.t('$vuetify.farm.care.full') }}</span>
      </alert-text>
    </gb-tooltip>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AlertText from '../render/AlertText.vue';

export default {
  components: { AlertText },
  computed: {
    ...mapState({
      selectedCropName: state => state.farm.selectedCropName,
      selectedFertilizerName: state => state.farm.selectedFertilizerName,
      selectedColor: state => state.farm.selectedColor,
      deleting: state => state.farm.deleting,
      showColors: state => state.farm.showColors,
      unlock: state => state.unlock,
      isFrozen: state => state.cryolab.farm.active,
      rainwater: state => state.currency.farm_rainwater,
    }),
    canSeeBuildings() {
      return this.$store.state.upgrade.item.farm_gardenGnome.level >= 1;
    },
    wateringCanFillLevel() {
      if (this.rainwater.value < 2) {
        return 0;
      }
      const filled = this.rainwater.value / this.rainwater.cap;
      if (filled <= 1) {
        return filled;
      } else if (filled <= 3) {
        return (filled - 1) / 2 + 1;
      } else if (filled <= 7) {
        return (filled - 3) / 4 + 2;
      } else {
        return Math.min((filled - 7) / 8 + 3, 4);
      }
    },
    wateringCanShift() {
      return ((1 - this.wateringCanFillLevel / 4) * 47 + 11) * this.wateringCanSize / 64;
    },
    wateringCanSize() {
      return this.$vuetify.breakpoint.xsOnly ? 32 : 64;
    },
    wateringCanColor() {
      const filled = this.rainwater.value / this.rainwater.cap;
      if (filled < 1) {
        return 'light-blue';
      } else if (filled < 3) {
        return 'blue';
      } else if (filled < 7) {
        return 'dark-blue';
      } else {
        return 'indigo';
      }
    },
    maxCare() {
      return this.$store.getters['mult/get']('farmMaxCare');
    },
    rainwaterGain() {
      return this.$store.getters['mult/get']('currencyFarmRainwaterGain');
    },
  },
  data: () => ({
    colors: ['brown', 'green', 'light-green', 'yellow', 'orange', 'red', 'pink', 'purple', 'indigo', 'blue']
  }),
  methods: {
    deleteMode() {
      this.$store.commit('farm/updateKey', {key: 'selectedBuildingName', value: null});
      this.$store.commit('farm/updateKey', {key: 'selectedCropName', value: null});
      this.$store.commit('farm/updateKey', {key: 'selectedFertilizerName', value: null});
      this.$store.commit('farm/updateKey', {key: 'deleting', value: !this.deleting});
    },
    plantAll() {
      if (this.selectedCropName) {
        const price = this.$store.getters['farm/plantPrice'](null, false);
        if (
          (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](price, 'gem')) ||
          (this.$store.state.system.settings.confirm.items.farmRareResources.value && this.$store.getters['currency/contains'](price, 'farmRareResource'))
        ) {
          this.$store.commit('system/updateKey', {key: 'confirm', value: {
            type: 'farmCrop',
            mode: 'plantAll',
            crop: this.selectedCropName,
            fertilizer: this.selectedFertilizerName,
            price: price,
          }});
        } else {
          this.$store.dispatch('farm/plantAll', {crop: this.selectedCropName, fertilizer: this.selectedFertilizerName});
        }
      }
    },
    harvestAll() {
      this.$store.dispatch('farm/harvestAll');
    },
    replantAll() {
      const price = this.$store.getters['farm/plantPrice'](null, true);
      if (
        (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](price, 'gem')) ||
        (this.$store.state.system.settings.confirm.items.farmRareResources.value && this.$store.getters['currency/contains'](price, 'farmRareResource'))
      ) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'farmCrop',
          mode: 'replantAll',
          price: price,
        }});
      } else {
        this.$store.dispatch('farm/replantAll');
      }
    },
    selectColor(name) {
      this.$store.commit('farm/updateKey', {key: 'selectedColor', value: this.selectedColor === name ? null : name});
    },
    toggleColors() {
      this.$store.commit('farm/updateKey', {key: 'showColors', value: !this.showColors});
    }
  }
}
</script>
