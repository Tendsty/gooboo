<template>
  <v-row class="ma-1" no-gutters>
    <v-col v-for="item in forgeList" :key="item" cols="12" sm="6">
      <forge-item class="ma-1" :name="item"></forge-item>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import ForgeItem from './ForgeItem.vue';

export default {
  components: { ForgeItem },
  computed: {
    ...mapGetters({
      forgeList: 'gem/forgeList'
    })
  }
}
</script>
