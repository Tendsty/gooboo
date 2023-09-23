<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.event.bloom.flower.${item.type}`)">
    <template v-slot:activator="{ on, attrs }">
      <v-badge :class="$vnode.data.staticClass" overlap bordered :color="tierColor" :content="item.tier.toString()">
        <v-badge :value="item.gene.length" bottom left overlap offset-x="44" bordered color="success">
          <template v-slot:badge>
            <v-icon x-small class="mr-1">mdi-dna</v-icon>
            <v-icon x-small v-for="gene in item.gene" :key="gene">{{ geneIcon[gene].icon }}</v-icon>
          </template>
          <v-icon large :color="flower.color" v-bind="attrs" v-on="on">{{ flower.icon }}</v-icon>
        </v-badge>
      </v-badge>
    </template>
    <div>{{ $vuetify.lang.t(`$vuetify.event.bloom.tier`) }} {{ item.tier }}</div>
    <div>
      <span>{{ $vuetify.lang.t(`$vuetify.event.bloom.canSell`, $formatNum(flowerValue)) }}</span>
      <currency-icon name="event_blossom"></currency-icon>
    </div>
    <div v-if="item.gene.length">
      <div>{{ $vuetify.lang.t(`$vuetify.event.bloom.genes`) }}:</div>
      <ul>
        <li v-for="gene in item.gene" :key="'list-' + gene">
          <v-icon class="mr-1">{{ geneIcon[gene].icon }}</v-icon>
          <span>{{ $vuetify.lang.t(`$vuetify.event.bloom.gene.${gene}.name`) }}: {{ $vuetify.lang.t(`$vuetify.event.bloom.gene.${gene}.description`) }}</span>
        </li>
      </ul>
    </div>
  </gb-tooltip>
</template>

<script>
import { mapState } from 'vuex';
import CurrencyIcon from '../../render/CurrencyIcon.vue';

const colors = ['green', 'light-green', 'lime', 'amber', 'orange', 'orange-red', 'red', 'red-pink', 'pink', 'pink-purple', 'purple', 'deep-purple', 'indigo', 'blue', 'cyan', 'teal'];

export default {
  components: { CurrencyIcon },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      geneIcon: state => state.bloom.gene
    }),
    flower() {
      return this.$store.state.bloom.flower[this.item.type];
    },
    flowerValue() {
      return this.$store.getters['bloom/flowerValue'](this.item.type, this.item.tier, this.item.gene);
    },
    tierColor() {
      return colors[this.item.tier % colors.length];
    }
  }
}
</script>
