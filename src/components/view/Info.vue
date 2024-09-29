<style scoped>
.scrollable-table {
  max-height: 307px;
  overflow-y: scroll;
  border: 2px solid black;
}
.scrollable-table-mobile {
  max-height: 211px;
}
.scrollable-table-dark {
  border: 2px solid white;
}
.text-superscript {
  margin-left: 1px;
  vertical-align: super;
  font-size: 66%;
}
</style>

<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
    <v-card class="ma-2">
      <v-card-title class="justify-center">
        <span>{{ $vuetify.lang.t('$vuetify.info.title') }} {{ version }}</span>
        <span v-if="isTestingVersion">-{{ $vuetify.lang.t('$vuetify.info.testing') }}</span>
      </v-card-title>
      <v-card-subtitle class="text-center">{{ $vuetify.lang.t('$vuetify.info.subtitle') }}</v-card-subtitle>
      <v-card-text>
        <div class="mb-2">{{ $vuetify.lang.t('$vuetify.info.text') }}</div>
        <div v-if="appEnv === 'desktop' || appEnv === 'offline'">
          <span>{{ $vuetify.lang.t(`$vuetify.info.updates.${ appEnv }.0`) }}</span>
          <a target="_blank" href="https://github.com/Tendsty/gooboo/releases">
            <span>{{ $vuetify.lang.t(`$vuetify.info.updates.${ appEnv }.1`) }}</span>
          </a>
          <span>{{ $vuetify.lang.t(`$vuetify.info.updates.${ appEnv }.2`) }}</span>
        </div>
        <div v-else>{{ $vuetify.lang.t(`$vuetify.info.updates.${ appEnv }`) }}</div>
        <alert-text v-if="isTestingVersion" class="mt-2">
          <div>
            <span>{{ $vuetify.lang.t('$vuetify.info.testingDescription.0') }}</span>
            <a target="_blank" href="https://tendsty.github.io/gooboo">
              <span>{{ $vuetify.lang.t('$vuetify.info.testingDescription.1') }}</span>
            </a>
            <span>{{ $vuetify.lang.t('$vuetify.info.testingDescription.2') }}</span>
          </div>
        </alert-text>
      </v-card-text>
      <v-card-actions class="flex-wrap justify-end">
        <v-spacer></v-spacer>
        <v-btn class="ma-1" color="primary" @click="toStatOverview"><v-icon class="mr-2">mdi-card-account-details</v-icon>{{ $vuetify.lang.t('$vuetify.info.statistics.name') }}</v-btn>
        <v-btn class="ma-1" color="primary" @click="toPatchnote"><v-icon class="mr-2">mdi-script-text</v-icon>{{ $vuetify.lang.t('$vuetify.info.viewPatchnotes') }}</v-btn>
        <v-btn class="ma-1" color="primary" target="_blank" href="https://github.com/Tendsty/gooboo"><v-icon class="mr-2">mdi-open-in-new</v-icon>{{ $vuetify.lang.t('$vuetify.info.socials.viewCode') }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ma-2">
      <v-card-title class="justify-center">{{ $vuetify.lang.t('$vuetify.info.socials.title') }}</v-card-title>
      <v-card-text>{{ $vuetify.lang.t('$vuetify.info.socials.text') }}</v-card-text>
      <v-card-actions class="flex-wrap justify-end">
        <v-btn class="ma-1" color="#ff4500" target="_blank" href="https://www.reddit.com/r/GoobooGame"><v-icon class="mr-2">mdi-open-in-new</v-icon>{{ $vuetify.lang.t('$vuetify.info.socials.reddit') }}</v-btn>
        <v-btn class="ma-1" color="#404eed" target="_blank" href="https://discord.gg/SQ2zFfrxXT"><v-icon class="mr-2">mdi-open-in-new</v-icon>{{ $vuetify.lang.t('$vuetify.info.socials.discord') }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="canSeePatreon" class="ma-2">
      <v-card-title class="justify-center">{{ $vuetify.lang.t('$vuetify.info.supportMe.title') }}</v-card-title>
      <v-card-text>{{ $vuetify.lang.t('$vuetify.info.supportMe.text') }}</v-card-text>
      <v-card-actions class="flex-wrap justify-end">
        <v-btn class="ma-1" color="#f1465a" target="_blank" href="https://patreon.com/Tendsty"><v-icon class="mr-2">mdi-open-in-new</v-icon>{{ $vuetify.lang.t('$vuetify.info.supportMe.patreon') }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ma-2">
      <v-card-title class="justify-center">{{ $vuetify.lang.t('$vuetify.info.numberFormatting') }}</v-card-title>
      <v-card-text>
        <div class="ma-1">{{ $vuetify.lang.t('$vuetify.info.numberFormattingDescription') }}</div>
        <v-row no-gutters>
          <v-col cols="6" md="4" class="pa-1">
            <v-simple-table dense class="scrollable-table" :class="{'scrollable-table-mobile': $vuetify.breakpoint.smAndDown, 'scrollable-table-dark': $vuetify.theme.dark}">
              <thead>
                <tr>
                  <th colspan="2" class="text-center">{{ $vuetify.lang.t('$vuetify.info.bigNumbers') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(num, key) in bigNumbers"
                  :key="`big-number-${ key }`"
                >
                  <td class="text-center">10<span class="text-superscript">{{ (key + 1) * 3 }}</span></td>
                  <td class="text-center">{{ num }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
          <v-col cols="6" md="4" class="pa-1">
            <v-simple-table dense class="scrollable-table" :class="{'scrollable-table-mobile': $vuetify.breakpoint.smAndDown, 'scrollable-table-dark': $vuetify.theme.dark}">
              <thead>
                <tr>
                  <th colspan="2" class="text-center">{{ $vuetify.lang.t('$vuetify.info.smallNumbers') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(num, key) in smallNumbers"
                  :key="`small-number-${ key }`"
                >
                  <td class="text-center">10<span class="text-superscript">-{{ (key + 1) * 3 }}</span></td>
                  <td class="text-center">{{ num }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
          <v-col cols="12" md="4" class="pa-1">
            <v-simple-table dense class="scrollable-table" :class="{'scrollable-table-mobile': $vuetify.breakpoint.smAndDown, 'scrollable-table-dark': $vuetify.theme.dark}">
              <thead>
                <tr>
                  <th colspan="2" class="text-center">{{ $vuetify.lang.t('$vuetify.info.timeUnits') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(num, key) in timeUnits"
                  :key="`time-unit-${ key }`"
                >
                  <td class="text-center">{{ $vuetify.lang.t(`$vuetify.info.timeUnit.${ num }`) }}</td>
                  <td class="text-center">{{ num }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="ma-2">
      <v-card-title class="justify-center">{{ $vuetify.lang.t('$vuetify.info.tech.title') }}</v-card-title>
      <v-card-text>
        <div v-for="(items, name, index) in tech" :key="`tech-${ name }`">
          <div :class="{'mt-4': index > 0}">{{ $vuetify.lang.t(`$vuetify.info.tech.${ name }`) }}:</div>
          <ul>
            <li v-for="(item, key) in items" :key="`techitem-${ name }-${ key }`">
              <span>{{ $vuetify.lang.t(`$vuetify.info.tech.${ key }`) }} (</span>
              <span v-for="(url, site, subindex) in item" :key="`techurl-${ name }-${ key }-${ site }`">
                <span v-if="subindex > 0">, </span>
                <a target="_blank" :href="url">
                  <span>{{ $vuetify.lang.t(`$vuetify.info.tech.${ site }`) }}</span>
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </a>
              </span>
              <span>)</span>
            </li>
          </ul>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { APP_ENV, APP_TESTING } from '../../js/constants';
import { numFormatters, numNegativeFormatters } from '../../js/utils/format';
import AlertText from '../partial/render/AlertText.vue';

export default {
  components: { AlertText },
  data: () => ({
    timeUnits: ['s', 'm', 'h', 'd'],
    tech: {
      web: {
        vue: {github: 'https://github.com/vuejs/vue', website: 'https://vuejs.org'},
        vuetify: {github: 'https://github.com/vuetifyjs/vuetify', website: 'https://vuetifyjs.com/en'},
        vuex: {github: 'https://github.com/vuejs/vuex', website: 'https://vuex.vuejs.org'},
        snackbars: {github: 'https://github.com/Aymkdn/v-snackbars'},
        color: {github: 'https://github.com/Qix-/color'},
        mdi: {github: 'https://github.com/Templarian/MaterialDesign-Webfont'},
        jsfiledownload: {github: 'https://github.com/kennethjiang/js-file-download'},
        seedrandom: {github: 'https://github.com/davidbau/seedrandom'}
      },
      fonts: {
        caveat: {googlefonts: 'https://fonts.google.com/specimen/Caveat'},
        roboto: {googlefonts: 'https://fonts.google.com/specimen/Roboto'},
        robotomono: {googlefonts: 'https://fonts.google.com/specimen/Roboto+Mono'}
      },
      testing: {
        cypress: {github: 'https://github.com/cypress-io/cypress', website: 'https://www.cypress.io'},
        jest: {github: 'https://github.com/jestjs/jest', website: 'https://jestjs.io'}
      }
    }
  }),
  computed: {
    ...mapState({
      version: state => state.system.version
    }),
    bigNumbers() {
      return numFormatters.slice(1);
    },
    smallNumbers() {
      return numNegativeFormatters;
    },
    canSeePatreon() {
      return APP_ENV !== 'STEAM';
    },
    appEnv() {
      return APP_ENV.toLowerCase();
    },
    isTestingVersion() {
      return APP_TESTING;
    }
  },
  methods: {
    toPatchnote() {
      this.$store.commit('system/updateKey', {key: 'screen', value: 'patchnote'});
    },
    toStatOverview() {
      this.$store.commit('system/updateKey', {key: 'screen', value: 'statOverview'});
    }
  }
}
</script>
