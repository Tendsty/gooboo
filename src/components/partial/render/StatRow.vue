<style scoped>
.base-stat {
  background-color: #00ff0030;
}
.mult-stat {
  background-color: #ff800030;
}
.bonus-stat {
  background-color: #20a0ff30;
}
.special-stat {
  background-color: #ff00ff30;
}
</style>

<template>
  <v-row class="rounded px-1 darken-4" style="min-width: 275px;" :class="[type + '-stat', {'mb-1': !final}]" no-gutters>
    <v-col cols="6">
      <span v-if="splitName === null">{{ $vuetify.lang.t('$vuetify.statBreakdown.base') }}</span>
      <span v-else-if="splitName[0] === 'upgrade'"><v-icon small class="mr-1">mdi-chevron-double-up</v-icon>{{ $vuetify.lang.t(`$vuetify.upgrade.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'currencyMult'">{{ $vuetify.lang.t(`$vuetify.currency.${splitName[1]}.name`) }}</span>
      <span v-else-if="splitName[0] === 'item'"><v-icon small class="mr-1">mdi-sack</v-icon>{{ $vuetify.lang.t(`$vuetify.horde.items.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'trinket'"><v-icon small class="mr-1">mdi-sack</v-icon>{{ $vuetify.lang.t(`$vuetify.horde.trinket.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'villageJob'">{{ $vuetify.lang.t(`$vuetify.village.job.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'villageFood'"><v-icon small class="mr-1">mdi-cached</v-icon>{{ $vuetify.lang.t(`$vuetify.currency.village_${splitName[1]}.name`) }}</span>
      <span v-else-if="splitName[0] === 'villageHappiness'">{{ $vuetify.lang.t(`$vuetify.mult.villageHappiness`) }}</span>
      <span v-else-if="splitName[0] === 'villagePollution'"><v-icon small class="mr-1">mdi-smoke</v-icon>{{ $vuetify.lang.t(`$vuetify.mult.villagePollution`) }}</span>
      <span v-else-if="splitName[0] === 'villagePower'"><v-icon small class="mr-1">mdi-lightning-bolt</v-icon>{{ $vuetify.lang.t(`$vuetify.mult.villagePower`) }}</span>
      <span v-else-if="splitName[0] === 'villageSpecialCraft'"><v-icon small class="mr-1">mdi-hammer</v-icon>{{ $vuetify.lang.t(`$vuetify.village.crafting.${ splitName[1] }`) }}</span>
      <span v-else-if="splitName[0] === 'hordeHeirloom'"><v-icon small class="mr-1">mdi-necklace</v-icon>{{ $vuetify.lang.t(`$vuetify.horde.heirloom.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'hordeTower'"><v-icon small class="mr-1">mdi-office-building</v-icon>{{ $vuetify.lang.t(`$vuetify.horde.tower.${ name.split('_')[1] }`) }} ({{ name.split('_')[2] }})</span>
      <span v-else-if="splitName[0] === 'hordeSkill'"><v-icon small class="mr-1">mdi-star</v-icon>{{ $vuetify.lang.t(`$vuetify.horde.classes.skill`) }}</span>
      <span v-else-if="splitName[0] === 'farmGardenGnome'"><v-icon small class="mr-1">mdi-human-child</v-icon>{{ $vuetify.lang.t(`$vuetify.farm.building.gardenGnome.name`) }}</span>
      <span v-else-if="splitName[0] === 'farmGene'"><v-icon small class="mr-1">mdi-dna</v-icon>{{ $vuetify.lang.t(`$vuetify.farm.gene.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'farmGeneUpgrade'"><v-icon small class="mr-n1">mdi-dna</v-icon><v-icon small class="mr-1">mdi-chevron-double-up</v-icon>{{ $vuetify.lang.t(`$vuetify.farm.gene.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'farmFertilizer'"><v-icon small class="mr-1">mdi-sack</v-icon>{{ $vuetify.lang.t(`$vuetify.consumable.farm_${splitName[1]}.name`) }}</span>
      <span v-else-if="splitName[0] === 'galleryIdea'"><v-icon small class="mr-1">mdi-lightbulb</v-icon>{{ $vuetify.lang.t(`$vuetify.gallery.idea.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'card'"><v-icon small class="mr-1">mdi-cards</v-icon>{{ $vuetify.lang.t(`$vuetify.card.card.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'cardCollection'"><v-icon small class="mr-1">mdi-cards</v-icon>{{ $vuetify.lang.t(`$vuetify.card.collection.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'cardPower'"><v-icon small class="mr-1">mdi-cards-playing</v-icon>{{ $vuetify.lang.t(`$vuetify.card.cardPower`) }}</span>
      <span v-else-if="splitName[0] === 'treasure'"><v-icon small class="mr-1">mdi-treasure-chest</v-icon>{{ $vuetify.lang.t(`$vuetify.statBreakdown.treasure`) }}</span>
      <span v-else-if="splitName[0] === 'relic'"><v-icon small class="mr-1">mdi-ring</v-icon>{{ $vuetify.lang.t(`$vuetify.relic.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'miningEnhancement'"><v-icon small class="mr-1">mdi-package-up</v-icon>{{ $vuetify.lang.t(`$vuetify.mining.enhancement.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'miningBeacon'"><v-icon small class="mr-1">mdi-spotlight</v-icon>{{ $vuetify.lang.t(`$vuetify.mining.beacon.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'bankProject'"><v-icon small class="mr-1">mdi-bank</v-icon>{{ $vuetify.lang.t(`$vuetify.event.bank.project.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'villagePolicy'"><v-icon small class="mr-1">mdi-gavel</v-icon>{{ $vuetify.lang.t(`$vuetify.village.policy.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'weatherChaosLocation'">{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.location.${ splitName[1] }`) }}</span>
      <span v-else-if="splitName[0] === 'weatherChaosFishingRod'">{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.fishingRod.name`) }}: {{ $vuetify.lang.t(`$vuetify.event.weatherChaos.fishingRod.${ splitName[1] }`) }}</span>
      <span v-else-if="splitName[0] === 'weatherChaosBait'">{{ $vuetify.lang.t(`$vuetify.event.weatherChaos.bait.${ splitName[1] }`) }}</span>
      <span v-else-if="splitName[0] === 'summerFestivalBuilding'">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.building.${ name.split('_')[1] }.name`) }}</span>
      <span v-else-if="splitName[0] === 'nightHuntPotion'"><v-icon small class="mr-1">mdi-flask-round-bottom</v-icon>{{ $vuetify.lang.t(`$vuetify.event.nightHunt.potion.${splitName[1]}`) }}</span>
      <span v-else-if="splitName[0] === 'snowdownItem'"><v-icon small class="mr-1">mdi-sack</v-icon>{{ $vuetify.lang.t(`$vuetify.event.snowdown.item.${splitName[1]}.name`) }}</span>
      <span v-else>{{ $vuetify.lang.t(`$vuetify.statBreakdown.${splitName[0]}`) }}</span>
    </v-col>
    <v-col class="text-center" cols="3">
      <mult-stat v-if="value !== null" hide-bonus-star :mult="mult" :type="type" :value="value"></mult-stat>
    </v-col>
    <v-col class="text-center" :class="{'font-weight-black text-decoration-underline': final}" cols="3">
      <mult-stat hide-bonus-star v-if="total !== null" :mult="mult" type="base" :value="total" hide-prefix></mult-stat>
    </v-col>
  </v-row>
</template>

<script>
import MultStat from './MultStat.vue';

export default {
  components: { MultStat },
  props: {
    name: {
      type: String,
      required: false,
      default: null
    },
    value: {
      type: Number,
      required: false,
      default: null
    },
    total: {
      type: Number,
      required: false,
      default: null
    },
    type: {
      type: String,
      required: true
    },
    final: {
      type: Boolean,
      required: false,
      default: false
    },
    mult: {
      type: String,
      required: true
    }
  },
  computed: {
    splitName() {
      if (this.name === null) {
        return null;
      }
      return [this.name.split('_')[0], this.name.slice(this.name.split('_')[0].length + 1)];
    }
  }
}
</script>
