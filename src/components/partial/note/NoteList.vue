<template>
  <div class="d-flex align-center pa-2 elevation-1 rounded">
    <v-icon large class="ma-1 mr-4">{{ featureIcon }}</v-icon>
    <div class="d-flex flex-wrap" style="min-height: 56px;">
      <show-button class="ma-1" v-for="item in list" :key="item" :name="item"></show-button>
    </div>
  </div>
</template>

<script>
import ShowButton from './ShowButton.vue';

export default {
  components: { ShowButton },
  props: {
    feature: {
      type: String,
      required: false
    }
  },
  computed: {
    list() {
      return this.$store.getters['note/list'](this.feature);
    },
    featureIcon() {
      return this.feature === 'meta' ? 'mdi-earth' : this.$store.state.system.features[this.feature].icon;
    }
  }
}
</script>
