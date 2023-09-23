<style scoped>
.boss-count-chip {
  width: 120px;
}
.boss-count-chip >>> .v-chip__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>

<template>
  <div class="ma-1">
    <div class="d-flex justify-center align-center ma-1 mb-0">
      <div class="mr-4">{{ $vuetify.lang.t('$vuetify.horde.zone') }} {{ zone }}</div>
      <v-btn icon :disabled="zone <= 1 || isFrozen" @click="zoneMin"><v-icon>mdi-skip-backward</v-icon></v-btn>
      <v-btn icon :disabled="zone <= 1 || isFrozen" @click="zonePrev"><v-icon>mdi-step-backward</v-icon></v-btn>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.horde.${ bossState }.title`)">
        <template v-slot:activator="{ on, attrs }">
          <v-chip @click="fightBoss" class="mx-1 boss-count-chip" v-bind="attrs" v-on="on">
            <v-icon>mdi-skull</v-icon>
            <v-spacer></v-spacer>
            <div v-if="!isMaxZone">{{ $vuetify.lang.t(`$vuetify.horde.cleared`) }}</div>
            <div v-else-if="bossFight">{{ $vuetify.lang.t(`$vuetify.horde.fighting`) }}</div>
            <v-icon v-else-if="bossAvailable">mdi-check</v-icon>
            <div v-else>{{ combo }} / {{ comboRequired }}</div>
          </v-chip>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.horde.${ bossState }.description`, comboRequired) }}</div>
        <stat-breakdown v-if="bossState === 'reachBoss'" name="hordeBossRequirement" :base="comboRequiredBase"></stat-breakdown>
      </gb-tooltip>
      <v-btn icon :disabled="isMaxZone || isFrozen" @click="zoneNext"><v-icon>mdi-step-forward</v-icon></v-btn>
      <v-btn icon :disabled="isMaxZone || isFrozen" @click="zoneMax"><v-icon>mdi-skip-forward</v-icon></v-btn>
    </div>
    <v-card v-if="hasActiveItems" class="d-flex flex-wrap ma-1 pa-1">
      <active class="ma-1" v-for="(item, key) in itemsActiveList" :key="'active-' + key" :name="key" :pretend="isFrozen"></active>
    </v-card>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <player-status class="ma-1"></player-status>
      </v-col>
      <v-col cols="12" sm="6">
        <enemy-status class="ma-1"></enemy-status>
      </v-col>
    </v-row>
    <div class="d-flex flex-wrap justify-center">
      <currency large class="ma-1" name="horde_bone"></currency>
      <currency class="ma-1" name="horde_monsterPart"></currency>
      <currency class="ma-1" name="horde_corruptedFlesh"></currency>
      <currency class="ma-1" name="horde_mysticalShard" :customCap="maxMysticalShards > 0 ? maxMysticalShards : undefined"></currency>
      <currency class="ma-1" name="horde_soulCorrupted"></currency>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Currency from '../../render/Currency.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';
import Active from './Active.vue';
import EnemyStatus from './EnemyStatus.vue';
import PlayerStatus from './PlayerStatus.vue';

export default {
  components: { Active, PlayerStatus, EnemyStatus, Currency, StatBreakdown },
  computed: {
    ...mapState({
      combo: state => state.horde.combo,
      bossAvailable: state => state.horde.bossAvailable,
      zone: state => state.horde.zone,
      maxZone: state => state.stat.horde_maxZone.value,
      bossFight: state => state.horde.bossFight,
      respawn: state => state.horde.respawn,
      isFrozen: state => state.cryolab.horde.active
    }),
    ...mapGetters({
      comboRequired: 'horde/comboRequired',
      comboRequiredBase: 'horde/comboRequiredBase',
      itemsActiveList: 'horde/itemsActiveList',
      maxMysticalShards: 'horde/maxMysticalShards'
    }),
    isMaxZone() {
      return this.zone >= this.maxZone;
    },
    hasActiveItems() {
      return Object.keys(this.itemsActiveList).length > 0;
    },
    bossState() {
      if (this.bossFight) {
        return 'fleeBoss';
      } else if (!this.isMaxZone) {
        return 'defeatedBoss';
      } else if (this.bossAvailable) {
        return 'fightBoss';
      } else {
        return 'reachBoss';
      }
    }
  },
  methods: {
    fightBoss() {
      if (!this.isFrozen) {
        if (this.respawn <= 0) {
          if (this.isMaxZone && this.bossAvailable && !this.bossFight) {
            this.$store.dispatch('horde/fightBoss');
          } else if (this.bossFight) {
            this.$store.dispatch('horde/stopFightBoss');
          }
        }
      }
    },
    zoneMin() {
      if (this.zone > 1) {
        this.$store.dispatch('horde/updateZone', 1);
      }
    },
    zonePrev() {
      if (this.zone > 1) {
        this.$store.dispatch('horde/updateZone', this.zone - 1);
      }
    },
    zoneNext() {
      if (this.zone < this.maxZone) {
        this.$store.dispatch('horde/updateZone', this.zone + 1);
      }
    },
    zoneMax() {
      if (this.zone < this.maxZone) {
        this.$store.dispatch('horde/updateZone', this.maxZone);
      }
    }
  }
}
</script>
