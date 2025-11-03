<style scoped>
.global-level-container {
  position: relative;
}
.global-level-text {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 12px;
}
.book-empty {
  opacity: 0.2;
}
</style>

<template>
  <div class="d-flex align-center flex-grow-1 w-100">
    <v-icon class="mr-2" :color="color">{{ item.icon }}</v-icon>
    <div class="flex-grow-1" v-if="item.subfeature !== null" :class="`${ color }--text`">{{ $vuetify.lang.t(`$vuetify.subfeature.${ item.feature }.${ item.subfeature }`) }}</div>
    <div class="flex-grow-1" v-else :class="`${ color }--text`">{{ $vuetify.lang.t(`$vuetify.feature.${ item.feature }`) }}</div>
    <div class="global-level-container">
      <v-icon large>mdi-octagram</v-icon>
      <div class="global-level-text d-flex justify-center align-center">
        <span>{{ item.gl }}</span>
      </div>
    </div>
    <v-badge dot overlap :value="item.hasBadge">
      <div class="global-level-container ml-2" :class="{'book-empty': item.books <= 0}">
        <v-icon size="28">mdi-book</v-icon>
        <div v-if="item.books > 0" class="global-level-text d-flex justify-center align-center">
          <span class="mt-2">{{ $formatInt(item.books) }}</span>
        </div>
      </div>
    </v-badge>
  </div>
</template>

<script>
export default {
  data: () => ({
    subfeatureColor: ['light-green', 'yellow', 'orange', 'red', 'purple']
  }),
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    color() {
      return this.item.subfeature === null ? null : ['light-green', 'yellow', 'orange', 'red', 'purple'][this.item.subfeature];
    }
  }
}
</script>
