<style scoped>
.next-tile-card {
  display: inline-flex;
  vertical-align: middle;
  background-color: #80808008;
}
.next-tile-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.next-tile-icon {
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
}
.next-tile-text {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 12px;
}
</style>

<template>
  <v-card class="next-tile-card" :width="$vuetify.breakpoint.mdAndUp ? 160 : 88" :height="$vuetify.breakpoint.mdAndUp ? 100 : 55" v-on="$listeners">
    <div class="d-flex justify-center align-center next-tile-container">
      <v-icon color="secondary" :size="$vuetify.breakpoint.mdAndUp ? 96 : 48">mdi-lock</v-icon>
      <v-icon class="next-tile-icon" color="white" size="40">mdi-octagram</v-icon>
      <div class="secondary--text next-tile-text d-flex justify-center align-center">
        <span>{{ level }}</span>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
</script>
