<style scoped>
.price-tag-highlight {
  box-shadow: 0 1px 8px var(--v-amber-base);
}
</style>

<template>
  <gb-tooltip v-if="add || curr.alwaysVisible || stat.total > 0" :title-text="$vuetify.lang.t(`$vuetify.currency.${ currency }.name`)">
    <template v-slot:activator="{ on, attrs }">
      <v-badge dot overlap bordered :color="curr.color" :value="multWarning">
        <div class="v-chip v-chip--label v-size--small px-2 balloon-text-dynamic" :class="[{'price-tag-highlight': highlight}, $vuetify.theme.dark ? 'theme--dark darken-3' : 'theme--light lighten-3', curr.color, $vnode.data.staticClass]" v-bind="attrs" v-on="on">
          <v-icon size="16" class="mr-2" :aria-label="$vuetify.lang.t(`$vuetify.currency.${ currency }.name`)">{{ curr.icon }}</v-icon>
          <span :class="costClass">{{ (add && amount >= 0) ? '+' : '' }}{{ $formatNum(amount) }}<slot name="suffix"></slot></span>
        </div>
      </v-badge>
    </template>
    <currency-tooltip :name="currency" :needed="add ? null : amount" hide-details :show-mult-warning="multWarning"></currency-tooltip>
    <slot></slot>
  </gb-tooltip>
  <v-chip v-else small label>
    <v-icon>mdi-help</v-icon>
  </v-chip>
</template>

<script>
import CurrencyTooltip from '../partial/render/CurrencyTooltip.vue';

export default {
  components: { CurrencyTooltip },
  inheritAttrs: false,
  props: {
    currency: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    add: {
      type: Boolean,
      required: false,
      default: false
    },
    highlight: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    curr() {
      return this.$store.state.currency[this.currency];
    },
    stat() {
      return this.$store.state.stat[this.currency];
    },
    costClass() {
      if (this.add) {
        return null;
      } else if (this.curr.cap !== null && this.amount > this.curr.cap) {
        return 'orange--text ' + (this.$vuetify.theme.dark ? 'text--lighten-2' : 'text--darken-4');
      } else if (this.amount > this.curr.value) {
        return 'red--text ' + (this.$vuetify.theme.dark ? 'text--lighten-2' : 'text--darken-4');
      }
      return null;
    },
    multWarning() {
      if (this.add || this.curr.currencyMult === null) {
        return false;
      } else if (this.curr.cap === null || (this.curr.value - this.amount) < this.curr.cap) {
        return true;
      }
      return false;
    }
  }
}
</script>
