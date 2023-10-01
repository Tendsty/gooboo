<template>
  <div class="d-flex justify-center mt-n1 mb-1">
    <gb-tooltip :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-chip small class="ma-1" v-bind="attrs" v-on="on">
          <v-icon class="mr-1">mdi-domain</v-icon>
          {{ $formatNum(building) }}
        </v-chip>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t('$vuetify.village.buildingStat') }}</div>
    </gb-tooltip>
    <gb-tooltip :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-chip small class="ma-1" v-bind="attrs" v-on="on">
          <v-icon class="mr-1">mdi-home-analytics</v-icon>
          {{ $formatNum(housing) }}
        </v-chip>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t('$vuetify.village.housingStat') }}</div>
    </gb-tooltip>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      building: state => state.stat.village_maxBuilding.value,
      housing: state => state.stat.village_maxHousing.value
    })
  }
}
</script>
