<template>
  <v-card>
    <v-card-text class="text-center pa-1">
      <mini v-if="forge.type === 'buy'" class="ma-1" large :name="forge.relic"></mini>
      <div v-else-if="forge.type === 'upgrade'" class="d-flex justify-center align-center">
        <mini class="ma-1" :name="forge.relic" large :level="forge.upgradeLevel"></mini>
        <v-icon class="mt-auto ml-n1">mdi-roman-numeral-{{ forge.upgradeLevel }}</v-icon>
        <v-icon class="mx-4">mdi-transfer-right</v-icon>
        <mini class="ma-1" :name="forge.relic" large :level="forge.upgradeLevel + 1"></mini>
        <v-icon class="mt-auto ml-n1">mdi-roman-numeral-{{ forge.upgradeLevel + 1 }}</v-icon>
      </div>
    </v-card-text>
    <v-card-actions class="pa-1">
      <v-spacer></v-spacer>
      <price-tag class="ma-1" currency="gem_diamond" :amount="forge.price"></price-tag>
      <v-btn class="ma-1" color="primary" @click="buyForge">
        <span v-if="forge.type === 'buy'">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</span>
        <span v-else-if="forge.type === 'upgrade'">{{ $vuetify.lang.t('$vuetify.gooboo.upgradeVerb') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PriceTag from '../../render/PriceTag.vue';
import Mini from '../relic/Mini.vue';

export default {
  components: { PriceTag, Mini },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    forge() {
      return this.$store.state.gem.forge[this.name];
    }
  },
  methods: {
    buyForge() {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'buyDiamondForge',
          price: {gem_diamond: this.forge.price},
          name: this.name,
        }});
      } else {
        this.$store.dispatch('gem/buyForge', this.name);
      }
    }
  }
}
</script>
