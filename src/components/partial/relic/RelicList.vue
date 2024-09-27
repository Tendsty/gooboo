<template>
  <div class="d-flex flex-wrap ma-1 pb-2">
    <item class="ma-1" v-for="(item, key) in owned" :key="key" :name="item"></item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Item from './Item.vue';

export default {
  components: { Item },
  computed: {
    ...mapGetters({
      owned: 'relic/owned'
    })
  }
}
</script>
