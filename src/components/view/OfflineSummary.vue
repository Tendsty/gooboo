<template>
  <div class="pa-4" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
    <div class="text-center ma-2">{{ $vuetify.lang.t(`$vuetify.gooboo.offlineSummary.title`, $formatTime(offlineTime)) }}</div>
    <div v-if="isNewVersion" class="text-center ma-2">
      <span>{{ $vuetify.lang.t(`$vuetify.gooboo.offlineSummary.newVersion`) }}</span>
      <span>{{ oldSavefile.version }}</span>
      <v-icon class="ma-1" small>mdi-transfer-right</v-icon>
      <span>{{ newVersion }}</span>
    </div>
    <div v-if="isNewVersion && oldSavefile" class="text-center ma-2"><v-btn color="primary" @click="downloadBackup">{{ $vuetify.lang.t(`$vuetify.gooboo.offlineSummary.downloadBackup`) }}</v-btn></div>
    <div v-if="startEvent" class="text-center ma-2">
      <span>{{ $vuetify.lang.t(`$vuetify.gooboo.offlineSummary.eventEnded`) }}:&nbsp;</span>
      <span>{{ $vuetify.lang.t(`$vuetify.event.${ startEvent }.name`) }}</span>
    </div>
    <div v-if="endEvent" class="text-center ma-2">
      <span>{{ $vuetify.lang.t(`$vuetify.gooboo.offlineSummary.eventStarted`) }}:&nbsp;</span>
      <span>{{ $vuetify.lang.t(`$vuetify.event.${ endEvent }.name`) }}</span>
    </div>
    <patchnote v-if="isNewVersion" :oldVersion="oldSavefile.version"></patchnote>
    <v-row no-gutters>
      <v-col class="pa-1" v-for="feature in featureList" :key="feature.name" cols="12" md="6" lg="4" xl="3">
        <offline-feature class="h-100" :name="feature.name"></offline-feature>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { encodeFile, getSavefileName } from '../../js/savefile';
import { getDay } from '../../js/utils/date';
import { download } from '../../js/utils/file';
import OfflineFeature from '../render/OfflineFeature.vue';
import Patchnote from './Patchnote.vue';

const semverCompare = require('semver/functions/compare');

export default {
  components: { OfflineFeature, Patchnote },
  data: () => ({
    startEvent: null,
    endEvent: null
  }),
  computed: {
    ...mapState({
      offlineTime: state => state.system.offlineTime,
      oldSavefile: state => state.system.oldSavefile,
      newVersion: state => state.system.version
    }),
    ...mapGetters({
      mainFeatures: 'system/mainFeatures',
      sideFeatures: 'system/sideFeatures',
    }),
    featureList() {
      return [
        ...this.mainFeatures.filter(elem => elem.name !== 'farm'),
        ...this.sideFeatures.filter(elem => ['gem', 'school', 'event'].includes(elem.name) && (elem.name !== 'event' || this.$store.getters['event/eventIsBig'](this.$store.getters['event/currentEvent'])))
      ];
    },
    isNewVersion() {
      return this.oldSavefile && semverCompare(this.oldSavefile.version, this.newVersion) === -1;
    }
  },
  mounted() {
    this.calculateStats();
  },
  methods: {
    downloadBackup() {
      download(encodeFile(this.oldSavefile), getSavefileName(), 'text/plain');
    },
    calculateStats() {
      const oldDate = new Date(this.oldSavefile.timestamp * 1000);
      const newDate = new Date(this.$store.state.system.timestamp * 1000);
      const oldDay = getDay(oldDate);
      const newDay = getDay(newDate);
      const stats = this.$store.getters['event/dayStats'](oldDay, newDay);

      if (this.$store.state.unlock.eventFeature.see && !stats.isSameEvent) {
        this.startEvent = stats.startEvent;
        this.endEvent = stats.endEvent;
      } else {
        this.startEvent = null;
        this.endEvent = null;
      }
    }
  },
  destroyed() {
    this.$store.commit('system/updateKey', {key: 'oldSavefile', value: null});
  },
  watch: {
    oldSavefile() {
      this.calculateStats();
    }
  }
}
</script>
