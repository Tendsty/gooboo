<template>
  <div>
    <div class="text-center">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.building.${ placedBuilding.type }.name`) }}</div>
    <div class="d-flex align-center">
      <div class="ma-1">
        <span v-if="placedBuilding.level > 0">{{ $vuetify.lang.t('$vuetify.gooboo.level') }} {{ placedBuilding.level }}</span>
        <template v-if="isConstructing">
          <span v-if="placedBuilding.level > 0">&nbsp;(</span>
          <span>{{ $vuetify.lang.t(`$vuetify.event.summerFestival.${
            isConstructingFirst ? (placedBuilding.level > 0 ? 'upgrading' : 'constructing') : 'inQueue'
          }`) }}</span>
          <v-icon>mdi-circle-small</v-icon>
          <span>{{ $formatTime(timeNeeded) }}</span>
          <span v-if="placedBuilding.level > 0">)</span>
        </template>
        <template v-if="isDeleting">
          <span>&nbsp;(</span>
          <span>{{ $vuetify.lang.t(`$vuetify.event.summerFestival.${ isDeletingFirst ? 'deleting' : 'inDeletionQueue' }`) }}</span>
          <v-icon>mdi-circle-small</v-icon>
          <span>{{ $formatTime(timeNeeded) }}</span>
          <span>)</span>
        </template>
      </div>
      <v-spacer></v-spacer>
      <template v-if="hasNextLevel">
        <gb-tooltip v-if="isConstructing || isDeleting" :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-btn class="ma-1" color="primary" :disabled="!canSkip" @click="skipBuilding">{{ $vuetify.lang.t('$vuetify.gooboo.skip') }}</v-btn>
            </div>
          </template>
          <price-tag class="mt-0" :amount="cocktailCost" currency="event_cocktail"></price-tag>
        </gb-tooltip>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-btn class="ma-1" color="primary" :disabled="!canUpgrade" @click="performUpgrade">{{ $vuetify.lang.t('$vuetify.gooboo.upgradeVerb') }}</v-btn>
            </div>
          </template>
          <div class="d-flex flex-wrap ma-n1">
            <price-tag class="ma-1" v-for="(amount, currency) in price" :key="currency" :amount="amount" :currency="currency"></price-tag>
          </div>
          <div>
            <v-icon small>mdi-timer</v-icon>
            {{ $formatTime(buildingType.timeNeeded(effectiveLevel)) }}
          </div>
        </gb-tooltip>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-btn class="ma-1" color="error" :disabled="!canDelete" @click="performDeletion"><v-icon>mdi-delete</v-icon></v-btn>
            </div>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.summerFestival.deleteDescription') }}</div>
          <div>
            <v-icon small>mdi-timer</v-icon>
            {{ $formatTime(buildingType.timeNeeded(0)) }}
          </div>
        </gb-tooltip>
      </template>
    </div>
    <div class="text-center">{{ $vuetify.lang.t(`$vuetify.event.summerFestival.building.${ placedBuilding.type }.description`) }}</div>
    <div v-if="Object.keys(actions).length > 0" class="d-flex justify-centar">
      <gb-tooltip v-for="(item, key) in actions" :key="`action-${key}`" :title-text="$vuetify.lang.t(`$vuetify.event.summerFestival.building.${ placedBuilding.type }.action.${ key }`)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn :color="placedBuilding.selectedAction === key ? 'primary' : 'secondary'" class="ma-1 px-0" min-width="36" v-bind="attrs" v-on="on" @click="setAction(key)"><v-icon>{{ item.icon }}</v-icon></v-btn>
        </template>
        <div class="d-flex flex-wrap justify-space-between align-center mx-n1 mb-n1">
          <div>
            <price-tag class="ma-1" v-for="(amount, currency) in item.input" :key="`input-${ key }-${ currency }`" :currency="currency" :amount="amount"></price-tag>
          </div>
          <v-icon class="mx-2">mdi-transfer-right</v-icon>
          <div>
            <price-tag class="ma-1" v-for="(amount, currency) in item.output" :key="`output-${ key }-${ currency }`" :currency="currency" :amount="amount" add></price-tag>
          </div>
        </div>
        <div>
          <v-icon small>mdi-timer</v-icon>
          {{ $formatTime(1 / item.speed(placedBuilding.level)) }}
        </div>
      </gb-tooltip>
    </div>
    <display-row class="ma-1" v-for="(item, key) in effect" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PriceTag from '../../render/PriceTag.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { PriceTag, DisplayRow },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      buildQueue: state => state.summerFestival.buildQueue
    }),
    placedBuilding() {
      return this.$store.state.summerFestival.placedBuilding[this.id];
    },
    buildingType() {
      return this.$store.state.summerFestival.building[this.placedBuilding.type];
    },
    isConstructing() {
      return this.buildQueue.includes(this.id);
    },
    isConstructingFirst() {
      return this.buildQueue.length > 0 && this.buildQueue[0] === this.id;
    },
    isDeleting() {
      return this.buildQueue.includes(0 - this.id);
    },
    isDeletingFirst() {
      return this.buildQueue.length > 0 && this.buildQueue[0] === (0 - this.id);
    },
    effectiveLevel() {
      return this.placedBuilding.level + (this.isConstructing ? 1 : 0);
    },
    hasNextLevel() {
      return this.buildingType.maxLevel === null || this.effectiveLevel < this.buildingType.maxLevel;
    },
    price() {
      return this.buildingType.price(this.effectiveLevel);
    },
    effect() {
      return this.buildingType.effect.map(elem => {
        const lvl = this.placedBuilding.level;
        return {
          ...elem,
          before: lvl > 0 ? elem.value(lvl - 1) : null,
          after: this.hasNextLevel ? elem.value(lvl) : null
        };
      });
    },
    timeNeeded() {
      return this.placedBuilding.timeLeft / this.$store.getters['mult/get']('summerFestivalBuildQueueSpeed');
    },
    cocktailCost() {
      return this.$store.getters['summerFestival/timeSkipCost'](this.timeNeeded);
    },
    actions() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.buildingType.action)) {
        if (this.placedBuilding.level >= elem.minLevel) {
          obj[key] = elem;
        }
      }
      return obj;
    },
    canUpgrade() {
      return !this.isConstructing && !this.isDeleting && this.$store.getters['summerFestival/canUpgradeBuilding'](this.id);
    },
    canDelete() {
      return !this.isConstructing && !this.isDeleting;
    },
    canSkip() {
      return this.$store.getters['currency/value']('event_cocktail') >= this.cocktailCost;
    }
  },
  methods: {
    performUpgrade() {
      this.$store.dispatch('summerFestival/upgradeBuilding', this.id);
    },
    performDeletion() {
      this.$store.dispatch('summerFestival/destroyBuilding', this.id);
    },
    skipBuilding() {
      this.$store.dispatch('summerFestival/skipBuilding', this.id);
    },
    setAction(name) {
      this.$store.commit('summerFestival/updatePlacedBuildingKey', {id: this.id, key: 'selectedAction', value: this.placedBuilding.selectedAction !== name ? name : null});
      this.$store.commit('summerFestival/updatePlacedBuildingKey', {id: this.id, key: 'actionTime', value: 0});
    }
  }
}
</script>
