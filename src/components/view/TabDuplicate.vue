<style scoped>
.text-400p {
  font-size: 400%;
  line-height: 1;
}
.text-300p {
  font-size: 300%;
  line-height: 1;
}
.text-200p {
  font-size: 200%;
}
.text-150p {
  font-size: 150%;
}
</style>

<template>
  <div class="d-flex flex-column justify-space-around h-100 pa-4">
    <div class="text-center" :class="$vuetify.breakpoint.smAndDown ? 'text-300p' : 'text-400p'">{{ $vuetify.lang.t('$vuetify.duplicateTab.title') }}</div>
    <div class="text-center" :class="$vuetify.breakpoint.smAndDown ? 'text-150p' : 'text-200p'">{{ $vuetify.lang.t('$vuetify.duplicateTab.description') }}</div>
  </div>
</template>

<script>
export default {
  methods: {
    exitGame() {
      window.close();
    }
  }
}
</script>
