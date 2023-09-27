<template>
  <v-row no-gutters>
    <v-col :class="{'scroll-container': $vuetify.breakpoint.mdAndUp}" cols="12" md="8" lg="9">
      <chance-list></chance-list>
      <div class="d-flex flex-wrap align-center ma-1">
        <currency class="ma-1" name="treasure_fragment"></currency>
        <v-spacer></v-spacer>
        <item-slot class="ma-1" :id="-1"></item-slot>
        <buy-item class="ma-1"></buy-item>
        <buy-item class="ma-1" name="regular"></buy-item>
        <buy-item v-if="unlock.treasureDual.see" class="ma-1" name="dual"></buy-item>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn data-cy="treasure-upgrade-button" class="ma-1" :color="upgrading ? 'warning' : 'secondary'" @click="toggleUpgrading" v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.gooboo.upgradeVerb') }}</v-btn>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.treasure.upgradeDescription`) }}</div>
        </gb-tooltip>
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn data-cy="treasure-delete-button" class="ma-1" :color="deleting ? 'error' : 'secondary'" @click="toggleDeleting" v-bind="attrs" v-on="on"><v-icon>mdi-delete</v-icon></v-btn>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.treasure.destroyDescription`) }}</div>
        </gb-tooltip>
      </div>
      <div class="d-flex flex-wrap ma-1">
        <item-slot class="ma-1" v-for="i in treasureSlots" :key="i" :id="i - 1"></item-slot>
      </div>
    </v-col>
    <v-col :class="{'scroll-container': $vuetify.breakpoint.mdAndUp}" cols="12" md="4" lg="3">
      <stat-list></stat-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import BuyItem from '../partial/treasure/BuyItem.vue';
import ChanceList from '../partial/treasure/ChanceList.vue';
import ItemSlot from '../partial/treasure/ItemSlot.vue';
import StatList from '../partial/treasure/StatList.vue';
import Currency from '../render/Currency.vue';

export default {
  components: { ChanceList, Currency, ItemSlot, StatList, BuyItem },
  computed: {
    ...mapState({
      upgrading: state => state.treasure.upgrading,
      deleting: state => state.treasure.deleting,
      treasureType: state => state.treasure.type,
      unlock: state => state.unlock
    }),
    treasureSlots() {
      return this.$store.getters['mult/get']('treasureSlots');
    },
    canAfford() {
      return this.$store.getters['currency/value']('gem_emerald') >= this.treasureType.regular.buyPrice;
    }
  },
  methods: {
    buyItem() {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'treasure',
          price: {gem_emerald: this.treasureType.regular.buyPrice},
        }});
      } else {
        this.$store.dispatch('treasure/buy', 'regular');
      }
    },
    toggleUpgrading() {
      this.$store.commit('treasure/updateKey', {key: 'deleting', value: false});
      this.$store.commit('treasure/updateKey', {key: 'upgrading', value: !this.$store.state.treasure.upgrading});
    },
    toggleDeleting() {
      this.$store.commit('treasure/updateKey', {key: 'upgrading', value: false});
      this.$store.commit('treasure/updateKey', {key: 'deleting', value: !this.$store.state.treasure.deleting});
    }
  }
}
</script>