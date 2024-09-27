<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="default-card pa-2" v-if="confirm !== null">
      <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.confirm.title`) }}</v-card-title>
      <v-card-text>
        <div v-if="confirm.type === 'upgrade'">{{ $vuetify.lang.t(`$vuetify.confirm.upgrade.0`) }}"{{ $vuetify.lang.t(`$vuetify.upgrade.${confirm.name}`) }}"{{ confirm.amount > 1 ? ` x${confirm.amount}` : '' }}{{ $vuetify.lang.t(`$vuetify.confirm.upgrade.1`) }}</div>
        <div v-else-if="confirm.type === 'theme'">{{ $vuetify.lang.t(`$vuetify.confirm.theme.0`) }}"{{ $vuetify.lang.t(`$vuetify.theme.${confirm.name}`) }}"{{ $vuetify.lang.t(`$vuetify.confirm.theme.1`) }}</div>
        <div v-else-if="confirm.type === 'cardPack'">{{ $vuetify.lang.t(`$vuetify.confirm.cardPack.0`) }}"{{ $vuetify.lang.t(`$vuetify.card.pack.${confirm.name}`) }}"{{ confirm.amount > 1 ? ` x${confirm.amount}` : '' }}{{ $vuetify.lang.t(`$vuetify.confirm.cardPack.1`) }}</div>
        <div v-else-if="confirm.type === 'weatherChaosFishingRodBuy'">{{ $vuetify.lang.t(`$vuetify.confirm.weatherChaosFishingRodBuy`, $vuetify.lang.t(`$vuetify.event.weatherChaos.fishingRod.${ confirm.name }`)) }}</div>
        <div v-else-if="confirm.type === 'reset'">
          <div>{{ $vuetify.lang.t(`$vuetify.confirm.reset.text`, $vuetify.lang.t(`$vuetify.feature.${ confirm.feature }`)) }}</div>
        </div>
        <div v-else-if="confirm.type === 'prestige' && !hasGain">{{ $vuetify.lang.t(`$vuetify.confirm.prestigeNoGain`) }}</div>
        <div v-else>{{ $vuetify.lang.t(`$vuetify.confirm.${confirm.type}`) }}</div>
        <div v-if="hasGain" class="mt-2">
          <price-tag class="ma-1" v-for="(amount, currency, index) in confirm.gain" :key="currency + '-' + index" :currency="currency" :amount="amount" add></price-tag>
        </div>
        <div v-if="hasPrice" class="mt-2">
          <price-tag class="ma-1" v-for="(amount, currency, index) in confirm.price" :key="currency + '-' + index" :currency="currency" :amount="amount"></price-tag>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn data-cy="confirm-action-confirm" color="success" @click="confirmAction">{{ $vuetify.lang.t(`$vuetify.gooboo.confirm`) }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn data-cy="confirm-action-cancel" color="error" @click="cancelAction">{{ $vuetify.lang.t(`$vuetify.gooboo.cancel`) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import PriceTag from './PriceTag.vue';

export default {
  components: { PriceTag },
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapState({
      confirm: state => state.system.confirm
    }),
    hasGain() {
      return this.confirm && this.confirm.gain && Object.keys(this.confirm.gain).length > 0;
    },
    hasPrice() {
      return this.confirm && this.confirm.price && Object.keys(this.confirm.price).length > 0;
    }
  },
  methods: {
    confirmAction() {
      this.$store.dispatch('system/confirmAction');
      this.dialog = false;
    },
    cancelAction() {
      this.dialog = false;
    }
  },
  watch: {
    confirm(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dialog = newVal !== null;
      }
    },
    dialog(newVal, oldVal) {
      if (!newVal && newVal !== oldVal) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: null});
      }
    }
  }
}
</script>
