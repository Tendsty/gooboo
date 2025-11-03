<template>
  <v-row class="pa-1" no-gutters>
    <v-col class="pa-1" v-for="item in items" :key="item" cols="12" sm="6" md="3" lg="2">
      <heirloom-item :name="item"></heirloom-item>
    </v-col>
  </v-row>
</template>

<script>
import HeirloomItem from './HeirloomItem.vue';

export default {
  components: { HeirloomItem },
  computed: {
    items() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.horde.heirloom)) {
        if (elem.amount > 0) {
          arr.push(key);
        }
      }
      return arr;
    }
  }
}
</script>
