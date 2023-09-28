<style scoped>
.text-600p {
  font-size: 600%;
}
.text-400p {
  font-size: 400%;
}
.text-300p {
  font-size: 300%;
}
.text-200p {
  font-size: 200%;
}
.text-150p {
  font-size: 150%;
}
</style>

<template>
  <div class="d-flex flex-column justify-space-around h-100 pa-4" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
    <div class="text-center" :class="$vuetify.breakpoint.smAndDown ? 'text-400p' : 'text-600p'">{{ $vuetify.lang.t('$vuetify.info.title') }}</div>
    <div>
      <v-row no-gutters>
        <v-col cols="12" sm="5" md="4" lg="3" xl="2" offset-sm="1" offset-lg="2" offset-xl="3">
          <setting-item category="general" name="lang"></setting-item>
        </v-col>
        <v-col cols="12" sm="5" md="4" lg="3" xl="2" offset-sm="1" offset-md="2" offset-lg="2" offset-xl="2">
          <setting-item category="general" name="dark"></setting-item>
        </v-col>
      </v-row>
    </div>
    <div class="text-center">
      <v-btn :height="$vuetify.breakpoint.smAndDown ? 56 : 72" :class="$vuetify.breakpoint.smAndDown ? 'px-6' : 'px-8'" color="primary" @click="startNewGame">
        <span :class="$vuetify.breakpoint.smAndDown ? 'text-200p' : 'text-300p'">{{ $vuetify.lang.t('$vuetify.gooboo.newGame') }}</span>
      </v-btn>
    </div>
    <div class="text-center" :class="$vuetify.breakpoint.smAndDown ? '' : 'text-150p'">
      <span>{{ $vuetify.lang.t('$vuetify.gooboo.playedBefore.0') }}</span>
      <label for="gooboo-savefile-input"><a>{{ $vuetify.lang.t('$vuetify.gooboo.playedBefore.1') }}</a></label>
    </div>
  </div>
</template>

<script>
import SettingItem from '../partial/settings/Item.vue';

export default {
  components: { SettingItem },
  methods: {
    startNewGame() {
      this.$store.dispatch('system/updateSetting', {category: 'general', name: 'pause', value: false});
      this.$store.commit('system/resetAutosaveTimer');
      this.$store.commit('system/updateKey', {key: 'screen', value: 'mining'});
    }
  }
}
</script>
