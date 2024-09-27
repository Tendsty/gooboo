<template>
  <div>
    <div class="d-flex flex-wrap justify-center ma-1">
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
      isFrozen: state => state.cryolab.farm.active
    }),
    canSeeBuildings() {
      return this.$store.state.upgrade.item.farm_gardenGnome.level >= 1;
    }
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
