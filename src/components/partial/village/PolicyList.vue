<template>
  <div>
    <policy-item v-for="item in list" :key="item" :name="item" :disabled="isFrozen"></policy-item>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PolicyItem from './PolicyItem.vue';

export default {
  components: { PolicyItem },
  computed: {
    ...mapState({
      isFrozen: state => state.cryolab.village.active
    }),
    list() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.village.policy)) {
        if (this.$store.getters['mult/get'](elem.mult) > 0) {
          arr.push(key);
        }
      }
      return arr;
    }
  }
}
</script>
