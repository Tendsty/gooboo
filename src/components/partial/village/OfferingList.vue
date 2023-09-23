<template>
  <v-row class="ma-1" no-gutters>
    <v-col class="pa-1" v-for="item in items" :key="item" :cols="cols">
      <offering-item :name="item" :disabled="isFrozen"></offering-item>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import OfferingItem from './OfferingItem.vue';

export default {
  components: { OfferingItem },
  props: {
    cols: {
      type: Number,
      required: false,
      default: 12
    }
  },
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.village.active
    }),
    items() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.village.offering)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          arr.push(key);
        }
      }
      return arr;
    }
  }
}
</script>
