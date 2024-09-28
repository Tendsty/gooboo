<style>
@media (min-width: 960px) {
  html {
    overflow-y: hidden;
  }
}
.scroll-container {
  overflow-y: auto;
  max-height: calc(100vh - 64px);
}
.scroll-container-tab {
  overflow-y: auto;
  max-height: calc(100vh - 112px);
}
.mobile-tabs {
  position: sticky;
  top: 56px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  z-index: 3;
}
.w-100 {
  width: 100%;
}
.h-100 {
  height: 100%;
}
.bg-tile-default {
  background-color: #80808020;
}
.theme--dark .bg-tile-background {
  background-color: #12121280;
}
.theme--light .bg-tile-background {
  background-color: #FFFFFF80;
}
.css-shadow-2 .balloon-text-black, .css-shadow-2.theme--dark .balloon-text-dynamic, .css-shadow-2.theme--light .balloon-text-inverted {
  text-shadow: -1px 0 0 #000000, 1px 0 0 #000000, 0 -1px 0 #000000, 0 1px 0 #000000, 1px 1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, -1px -1px 0 #000000, 0 0 1px #000000, 0 0 2px #000000, 0 0 3px #000000, 0 0 4px #000000;
}
.css-shadow-2 .balloon-text-white, .css-shadow-2.theme--light .balloon-text-dynamic, .css-shadow-2.theme--dark .balloon-text-inverted {
  text-shadow: -1px 0 0 #FFFFFF, 1px 0 0 #FFFFFF, 0 -1px 0 #FFFFFF, 0 1px 0 #FFFFFF, 1px 1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, -1px -1px 0 #FFFFFF, 0 0 1px #FFFFFF, 0 0 2px #FFFFFF, 0 0 3px #FFFFFF, 0 0 4px #FFFFFF;
}
.css-shadow-1 .balloon-text-black, .css-shadow-1.theme--dark .balloon-text-dynamic, .css-shadow-1.theme--light .balloon-text-inverted {
  text-shadow: -2px 0 0 #000000, -1px -1px 0 #000000, 0 -2px 0 #000000, 1px -1px 0 #000000, 2px 0 0 #000000, 1px 1px 0 #000000, 0 2px 0 #000000, -1px 1px 0 #000000;
}
.css-shadow-1 .balloon-text-white, .css-shadow-1.theme--light .balloon-text-dynamic, .css-shadow-1.theme--dark .balloon-text-inverted {
  text-shadow: -2px 0 0 #FFFFFF, -1px -1px 0 #FFFFFF, 0 -2px 0 #FFFFFF, 1px -1px 0 #FFFFFF, 2px 0 0 #FFFFFF, 1px 1px 0 #FFFFFF, 0 2px 0 #FFFFFF, -1px 1px 0 #FFFFFF;
}
.selected-primary {
  /* create a fake border because vuetify forces border colors */
  box-shadow: 3px 3px 0 var(--v-primary-base), -3px 3px 0 var(--v-primary-base), 3px -3px 0 var(--v-primary-base), -3px -3px 0 var(--v-primary-base);
}

/** Adjust vuetify tabs */
.v-tab {
  min-width: unset;
}
.theme--dark .v-tab:not(.v-tab--active) .v-icon {
  color: rgba(255, 255, 255, 0.6);
}

/** Tooltip stuff */
.v-tooltip__content {
  padding: 4px 12px;
}
.theme--dark .v-tooltip__content {
  background-color: #404040;
}
.theme--light .v-tooltip__content {
  background-color: #D8D8D8;
  color: black;
}
.tooltip-text-container > :not(.tooltip-text-container) {
  margin-top: 4px;
}

/* Default chip icon sizes */
.v-chip.v-size--default .v-icon {
  font-size: 14px;
  height: 14px;
  width: 14px;
}
.v-chip.v-size--small .v-icon {
  font-size: 12px;
  height: 12px;
  width: 12px;
}

/** Special effect for premium upgrades */
@keyframes premium-glow-shadow {
  0%   {box-shadow: 0 1px 6px var(--v-red-base);}
  10%   {box-shadow: 0 2px 12px var(--v-red-base);}
  20% {box-shadow: 0 1px 6px var(--v-deep-orange-base);}
  30% {box-shadow: 0 2px 12px var(--v-deep-orange-base);}
  40%   {box-shadow: 0 1px 6px var(--v-red-base);}
  50%   {box-shadow: 0 2px 12px var(--v-red-base);}
  60%   {box-shadow: 0 1px 6px var(--v-red-pink-base);}
  70%   {box-shadow: 0 2px 12px var(--v-red-pink-base);}
  80%   {box-shadow: 0 1px 6px var(--v-red-base);}
  90%   {box-shadow: 0 2px 12px var(--v-red-base);}
  100%   {box-shadow: 0 1px 6px var(--v-red-base);}
}
@keyframes premium-glow-text-shadow {
  0%   {text-shadow: 0 1px 6px var(--v-red-base);}
  10%   {text-shadow: 0 2px 12px var(--v-red-base);}
  20% {text-shadow: 0 1px 6px var(--v-deep-orange-base);}
  30% {text-shadow: 0 2px 12px var(--v-deep-orange-base);}
  40%   {text-shadow: 0 1px 6px var(--v-red-base);}
  50%   {text-shadow: 0 2px 12px var(--v-red-base);}
  60%   {text-shadow: 0 1px 6px var(--v-red-pink-base);}
  70%   {text-shadow: 0 2px 12px var(--v-red-pink-base);}
  80%   {text-shadow: 0 1px 6px var(--v-red-base);}
  90%   {text-shadow: 0 2px 12px var(--v-red-base);}
  100%   {text-shadow: 0 1px 6px var(--v-red-base);}
}
.premium-glow {
  animation: premium-glow-shadow 15s linear infinite;
}
.premium-glow-text {
  animation: premium-glow-text-shadow 15s linear infinite;
}
</style>
<style scoped>
@keyframes tutorial-arrow-color {
  0%   {color: var(--v-red-base);}
  100% {color: var(--v-orange-base);}
}
.game-app {
  user-select: none;
  background-attachment: fixed !important;
}
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
.theme--dark >>> .global-level-text {
  color: #121212;
}
.theme--light >>> .global-level-text {
  color: #FFFFFF;
}
.snackbars-close-all-top >>> .v-snack {
  top: 54px;
}
.snackbars-close-all-bottom >>> .v-snack {
  bottom: 54px;
}
.hourglass-container {
  position: relative;
  width: 24px;
  height: 24px;
}
.hourglass-bg {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  right: 0;
}
.hourglass-bg-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.hourglass-outline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}
.tutorial-arrow {
  position: absolute;
  font-size: 72px;
  text-shadow: 0 0 8px var(--v-yellow-base);
  z-index: 9;
  pointer-events: none;
  animation: tutorial-arrow-color 2s alternate infinite;
}
.game-app >>> .v-card:not(.default-card) {
  background-color: #80808020;
}
.game-app >>> .v-expansion-panel:not(.default-card) {
  background-color: #80808020;
}
.theme--dark >>> .v-text-field--enclosed {
  background-color: #121212;
}
.theme--light >>> .v-text-field--enclosed {
  background-color: #FFFFFF;
}

/* All theme-specific backgrounds */
.theme--dark.background-theme-factory {
  background: repeating-linear-gradient(135deg, #121212 0.001px 46px, #383812 48px 94px, #121212 96px);
}
.theme--light.background-theme-factory {
  background: repeating-linear-gradient(135deg, #484848 0.001px 46px, #a0a048 48px 94px, #484848 96px);
}
.theme--dark.background-theme-forest {
  background: radial-gradient(30% 20% at 25% 0%, #0A430A80 90%, transparent 100%),
              radial-gradient(25% 20% at 75% 5%, #0A430A80 90%, transparent 100%),
              radial-gradient(45% 20% at 50% 0%, #10701080 90%, transparent 100%),
              radial-gradient(30% 20% at -5% 5%, #0D590D 90%, transparent 100%),
              radial-gradient(40% 20% at 40% 0%, #0D590D 90%, transparent 100%),
              radial-gradient(20% 20% at 65% 5%, #0D590D 90%, transparent 100%),
              radial-gradient(30% 20% at 95% 0%, #0D590D 90%, transparent 100%),
              repeating-linear-gradient(90deg, #7D440C 0.001px 29px, #543210 29px 54px, #68390B 54px 72px, #75420F 72px 91px, #673B0F 91px 115px, #6B3B0C 115px 151px, #502F0E 151px 177px, #693E12 177px 201px, #57320C 201px 211px, #53300C 211px 238px, #54300C 238px 263px, #55310D 263px 299px, #75420E 299px 315px, #78430E 315px 348px, #61370C 348px 379px, #6C3F11 379px 408px, #6C3D0E 408px 447px, #67390A 447px 486px, #523110 486px 515px, #714112 515px 542px);
}
.theme--light.background-theme-forest {
  background: radial-gradient(30% 20% at 25% 0%, #1AB21A80 90%, transparent 100%),
              radial-gradient(25% 20% at 75% 5%, #1AB21A80 90%, transparent 100%),
              radial-gradient(45% 20% at 50% 0%, #20DF2080 90%, transparent 100%),
              radial-gradient(30% 20% at -5% 5%, #1DC81D 90%, transparent 100%),
              radial-gradient(40% 20% at 40% 0%, #1DC81D 90%, transparent 100%),
              radial-gradient(20% 20% at 65% 5%, #1DC81D 90%, transparent 100%),
              radial-gradient(30% 20% at 95% 0%, #1DC81D 90%, transparent 100%),
              repeating-linear-gradient(90deg, #EB8E32 0.001px 29px, #AF6821 29px 54px, #D87716 54px 72px, #E4892E 72px 91px, #D77B1F 91px 115px, #DE7C19 115px 151px, #A6621E 151px 177px, #DA8026 177px 201px, #B56719 201px 211px, #AD631A 211px 238px, #AF6419 238px 263px, #B1661C 263px 299px, #E6882A 299px 315px, #E78C31 315px 348px, #CA7119 348px 379px, #DD8227 379px 408px, #DF7E1C 408px 447px, #D77616 447px 486px, #AB6621 486px 515px, #DF8730 515px 542px);
}
.theme--dark.background-theme-cherry {
  background: linear-gradient(#BF40A9 0%, #602055 88%, #302010 90%);
}
.theme--light.background-theme-cherry {
  background: linear-gradient(#F9D2F2 0%, #EF8FDF 88%, #8A6542 90%);
}
.theme--dark.background-theme-sky {
  background: linear-gradient(#000000, #101060);
}
.theme--light.background-theme-sky {
  background: linear-gradient(#C0E0FF, #60B0FF);
}
.theme--dark.background-theme-sky >>> .main-app-bar {
  background: linear-gradient(transparent, #00000080 75%, #000000C0),
              url("/public/theme/sky/navbar.png"),
              linear-gradient(#000000, #000000);
  background-repeat: repeat;
}
.theme--light.background-theme-sky >>> .main-app-bar {
  background: radial-gradient(circle at 30% 10px, #FFFFE0, #FFFF80 35px, #FFFF00 45px, #FFC000 50px, #C0E0FF 80px);
}
.theme--dark.background-theme-polar {
  background: repeating-linear-gradient(105deg, #126C6B 0.001px 45px, #1D504A 145px 189px, #1C956C 289px 320px, #2A5575 420px 464px, #264D48 564px 613px, #314E72 713px 785px, #3B636B 885px 908px, #335E69 1008px 1043px, #277B69 1143px 1223px, #212E3B 1323px 1396px, #114149 1496px 1549px, #1C4E5E 1649px 1723px, #2B747A 1823px 1881px, #326D6B 1981px 2012px, #209770 2112px 2192px, #38547C 2292px 2359px, #126B48 2459px 2498px, #125A4B 2598px 2623px, #1D2E44 2723px 2788px, #244244 2888px 2937px, #126C6B 3037px 3037px);
}
.theme--light.background-theme-polar {
  background: repeating-linear-gradient(105deg, #2BDBD9 0.001px 45px, #3DA79A 145px 189px, #89E8C7 289px 320px, #7BACCF 420px 464px, #4F9F96 564px 613px, #89A7CC 713px 785px, #93BCC4 885px 908px, #80B5C2 1008px 1043px, #7BD5C2 1143px 1223px, #455F7A 1323px 1396px, #248797 1496px 1549px, #39A3C4 1649px 1723px, #83CED3 1823px 1881px, #83C6C4 1981px 2012px, #93E8CC 2112px 2192px, #A2B7D5 2292px 2359px, #2ADA95 2459px 2498px, #26BC9C 2598px 2623px, #3D5F8D 2723px 2788px, #4B898E 2888px 2937px, #2BDBD9 3037px 3037px);
}
@keyframes prismatic-navbar {
  0%   {background-position-x: 0vw;}
  100% {background-position-x: 100vw;}
}
.theme--dark.background-theme-prismatic {
  background: radial-gradient(#C0C0C0 1%, transparent 10% 25%, #12121280 60%, #121212),
              conic-gradient(#C00000, #C0C000, #00C000, #00C0C0, #0000C0, #C000C0, #C00000);
}
.theme--light.background-theme-prismatic {
  background: radial-gradient(#FFFFFF 1%, transparent 10% 25%, #FFFFFF80 60%, #FFFFFF),
              conic-gradient(#FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000);
}
.theme--dark.background-theme-prismatic >>> .main-app-bar {
  background: linear-gradient(transparent, #12121280 75%, #121212C0),
              linear-gradient(90deg, #C00000, #C0C000, #00C000, #00C0C0, #0000C0, #C000C0, #C00000);
  animation: prismatic-navbar 20s linear infinite;
}
.theme--light.background-theme-prismatic >>> .main-app-bar {
  background: linear-gradient(transparent, #FFFFFF80 75%, #FFFFFFC0),
              linear-gradient(90deg, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000);
  animation: prismatic-navbar 20s linear infinite;
}
.theme--dark.background-theme-candlelight {
  background: radial-gradient(circle at 50% 99%, #FFFFE0, #FFFF80 1%, #FFFF00 2%, #FFC000 3%, #C09000 4%, #806000 6%, #403000 9%, #201809 12%, #161512 15%, #121212 18%);
}
.theme--light.background-theme-candlelight {
  background: radial-gradient(circle at 50% 99%, #FFFFE0, #FFFF80 1%, #FFFF00 2%, #FFC000 3%, #FFA820 4%, #FFB840 6%, #FFD080 9%, #FFE8C0 12%, #FFF4E0 15%, #FFFFFF 18%);
}
.theme--dark.background-theme-rain >>> .main-app-bar {
  background: linear-gradient(90deg, #1536C2, #156BC2, #2481A5, #3B5496, #1536C2);
  animation: prismatic-navbar 20s linear infinite;
}
.theme--light.background-theme-rain >>> .main-app-bar {
  background: linear-gradient(90deg, #7A90F1, #7AB5F1, #7DC6E3, #95A7D5, #7A90F1);
  animation: prismatic-navbar 20s linear infinite;
}
.theme--dark.background-theme-waves {
  background: radial-gradient(circle at 0% 0%, #204080, #204080 24%, transparent 24%),
              radial-gradient(circle at 20% 0%, #204080, #204080 28%, transparent 28%),
              radial-gradient(circle at 40% 0%, #204080, #204080 34%, transparent 34%),
              radial-gradient(circle at 60% 0%, #204080, #204080 34%, transparent 34%),
              radial-gradient(circle at 80% 0%, #204080, #204080 28%, transparent 28%),
              radial-gradient(circle at 100% 0%, #204080, #204080 24%, transparent 24%),
              radial-gradient(circle at 0% 0%, #183060, #183060 30%, transparent 30%),
              radial-gradient(circle at 25% 0%, #183060, #183060 38%, transparent 38%),
              radial-gradient(circle at 50% 0%, #183060, #183060 46%, transparent 46%),
              radial-gradient(circle at 75% 0%, #183060, #183060 38%, transparent 38%),
              radial-gradient(circle at 100% 0%, #183060, #183060 30%, transparent 30%),
              linear-gradient(#102040, #102040);
  animation: prismatic-navbar 20s linear infinite;
}
.theme--light.background-theme-waves {
  background: radial-gradient(circle at 0% 0%, #E0F0FF, #E0F0FF 24%, transparent 24%),
              radial-gradient(circle at 20% 0%, #E0F0FF, #E0F0FF 28%, transparent 28%),
              radial-gradient(circle at 40% 0%, #E0F0FF, #E0F0FF 34%, transparent 34%),
              radial-gradient(circle at 60% 0%, #E0F0FF, #E0F0FF 34%, transparent 34%),
              radial-gradient(circle at 80% 0%, #E0F0FF, #E0F0FF 28%, transparent 28%),
              radial-gradient(circle at 100% 0%, #E0F0FF, #E0F0FF 24%, transparent 24%),
              radial-gradient(circle at 0% 0%, #B0D8FF, #B0D8FF 30%, transparent 30%),
              radial-gradient(circle at 25% 0%, #B0D8FF, #B0D8FF 38%, transparent 38%),
              radial-gradient(circle at 50% 0%, #B0D8FF, #B0D8FF 46%, transparent 46%),
              radial-gradient(circle at 75% 0%, #B0D8FF, #B0D8FF 38%, transparent 38%),
              radial-gradient(circle at 100% 0%, #B0D8FF, #B0D8FF 30%, transparent 30%),
              linear-gradient(#80C0FF, #80C0FF);
  animation: prismatic-navbar 20s linear infinite;
}
</style>

<template>
  <v-app class="game-app" :class="`background-theme-${ currentTheme } css-shadow-${ cssShadows }`">
    <v-app-bar v-if="screen !== 'newGame' && screen !== 'tab-duplicate'" class="px-lg-2 main-app-bar" app :color="$vuetify.theme.dark ? 'primary' : 'primary lighten-1'">
      <v-menu min-width="296" :max-width="$vuetify.breakpoint.xsOnly ? 296 : ($vuetify.breakpoint.smOnly ? 488 : 896)" open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="px-2 ml-n2" text :icon="$vuetify.breakpoint.xsOnly" v-bind="attrs" v-on="on">
            <v-badge overlap color="secondary" :content="featureBadges" :value="featureBadges > 0">
              <v-icon>mdi-apps</v-icon>
            </v-badge>
            <span class="ml-2" v-if="$vuetify.breakpoint.smAndUp">{{ $vuetify.lang.t('$vuetify.gooboo.features') }}</span>
          </v-btn>
        </template>
        <v-card data-cy="feature-list" class="default-card" :class="`pa-${marginSize}`">
          <feature-tile
            v-for="(item, key) in mainFeatures"
            :class="`ma-${marginSize}`"
            :key="'main-' + key"
            :name="item.name"
            :icon="item.icon"
            :subfeatureLevel="(nextFeature && nextFeature.type === 'subfeature' && nextFeature.feature === item.name) ? nextFeature.globalLevel : null"
            @click="changeScreen(item.name, true)"
          ></feature-tile>
          <next-tile :class="`ma-${marginSize}`" v-if="nextFeature && nextFeature.type === 'main'" :level="nextFeature.globalLevel"></next-tile>
          <v-divider :class="`my-${marginSize}`"></v-divider>
          <feature-tile
            v-for="(item, key) in sideFeatures"
            :class="`ma-${marginSize}`"
            :key="'side-' + key"
            :name="item.name"
            :icon="item.icon"
            :subfeatureLevel="(nextFeature && nextFeature.type === 'subfeature' && nextFeature.feature === item.name) ? nextFeature.globalLevel : null"
            @click="changeScreen(item.name, true)"
          ></feature-tile>
          <next-tile :class="`ma-${marginSize}`" v-if="nextFeature && nextFeature.type === 'side'" :level="nextFeature.globalLevel"></next-tile>
        </v-card>
      </v-menu>
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.globalLevel.name')">
        <template v-slot:activator="{ on, attrs }">
          <div class="global-level-container mx-2" v-bind="attrs" v-on="on">
            <v-icon x-large>mdi-octagram</v-icon>
            <div class="global-level-text d-flex justify-center align-center">
              <span>{{ globalLevel }}</span>
            </div>
          </div>
        </template>
        <div class="text-center mb-2">{{ $vuetify.lang.t('$vuetify.globalLevel.description') }}</div>
        <div class="d-flex justify-space-between mt-0" v-for="(item, key) in globalLevelParts" :key="'globalLevel-' + key">
          <div>{{ $vuetify.lang.t(`$vuetify.feature.${key.split('_')[0]}`) }}: {{ $vuetify.lang.t(`$vuetify.globalLevel.${key}`) }}</div>
          <div>{{ item }}</div>
        </div>
      </gb-tooltip>
      <gb-tooltip v-if="canSeeHourglass" key="ancient-hourglass" :title-text="$vuetify.lang.t('$vuetify.hourglass.title')">
        <template v-slot:activator="{ on, attrs }">
          <div class="hourglass-container mx-2" @click="openDustDialog" v-bind="attrs" v-on="on">
            <v-icon color="secondary" class="hourglass-outline">mdi-timer-sand-full</v-icon>
            <div class="hourglass-bg" :style="`top: ${ hourglassShift }px;`">
              <v-icon color="amber" class="hourglass-bg-inner">mdi-timer-sand-full</v-icon>
            </div>
            <v-icon class="hourglass-outline">mdi-timer-sand-empty</v-icon>
          </div>
        </template>
        <div v-if="isOnMainFeature" class="text-center">{{ $vuetify.lang.t('$vuetify.hourglass.subtitle') }}</div>
        <div class="d-flex justify-center">
          <currency name="school_goldenDust"></currency>
        </div>
      </gb-tooltip>
      <gb-tooltip v-if="featureIsFrozen" key="frozen-feature" :title-text="$vuetify.lang.t('$vuetify.cryolab.frozenFeature.title')">
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="mx-2" v-bind="attrs" v-on="on">mdi-snowflake</v-icon>
        </template>
        <div class="text-center">{{ $vuetify.lang.t('$vuetify.cryolab.frozenFeature.description') }}</div>
      </gb-tooltip>
      <gb-tooltip v-if="isEndOfFeature" key="end-of-content" :title-text="$vuetify.lang.t('$vuetify.endOfContent.name')">
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="ml-2" v-bind="attrs" v-on="on">mdi-sign-caution</v-icon>
        </template>
        <div class="text-center">{{ $vuetify.lang.t('$vuetify.endOfContent.description') }}</div>
      </gb-tooltip>
      <v-spacer></v-spacer>
      <v-btn icon @click="changeScreen('info')">
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <v-menu bottom open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-badge :value="backupHint" color="red" overlap dot>
              <v-icon>mdi-content-save</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="localSave">
            <v-list-item-title>
              <span>{{ $vuetify.lang.t('$vuetify.gooboo.saveManual') + (autosaveTimer !== null ? (' (' + $formatTime(autosaveTimer) + ')') : '') }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="exportSave">
            <v-badge :value="backupHint" color="red" dot>
              <v-list-item-title>{{ $vuetify.lang.t('$vuetify.gooboo.saveExport') }}</v-list-item-title>
            </v-badge>
          </v-list-item>
          <label for="gooboo-savefile-input">
            <v-list-item class="v-list-item--link" role="menuitem">
              <v-list-item-title>{{ $vuetify.lang.t('$vuetify.gooboo.saveImport') }}</v-list-item-title>
            </v-list-item>
          </label>
          <v-list-item @click="changeScreen('resetProgress')">
            <v-list-item-title>{{ $vuetify.lang.t('$vuetify.gooboo.resetProgress') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn data-cy="settings-button" icon @click="changeScreen('settings')">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <component :is="screen"></component>
    </v-main>
    <v-snackbars
      :class="{'snackbars-close-all-top': showCloseAll && snackbarTop, 'snackbars-close-all-bottom': showCloseAll && snackbarBottom}"
      :objects.sync="messages"
      :top="snackbarTop"
      :right="snackbarRight"
      :bottom="snackbarBottom"
      :left="snackbarLeft"
    >
      <template v-slot:default="{ message }">
        <achievement-message v-if="message.type === 'achievement'" :message="message"></achievement-message>
        <feature-message v-else-if="message.type === 'feature'" :message="message"></feature-message>
        <save-message v-else-if="message.type === 'save'" :message="message"></save-message>
        <import-message v-else-if="message.type === 'import'" :message="message"></import-message>
        <note-message v-else-if="message.type === 'note'" :message="message"></note-message>
        <error-message v-else-if="message.type === 'error'" :message="message"></error-message>
        <card-pack-message v-else-if="message.type === 'cardPack'" :message="message"></card-pack-message>
        <heirloom-message v-else-if="message.type === 'heirloom'" :message="message"></heirloom-message>
        <prize-message v-else-if="message.type === 'prize'" :message="message"></prize-message>
        <school-message v-else-if="message.type === 'school'" :message="message"></school-message>
        <update-message v-else-if="message.type === 'update'" :message="message"></update-message>
      </template>
      <template v-slot:action="{ close }">
        <v-btn icon @click="close()"><v-icon>mdi-close</v-icon></v-btn>
      </template>
    </v-snackbars>
    <v-snackbar
      :timeout="-1"
      :value="showCloseAll"
      :top="snackbarTop"
      :right="snackbarRight"
      :bottom="snackbarBottom"
      :left="snackbarLeft"
    >
      {{ $vuetify.lang.t('$vuetify.gooboo.closeAll') }}
      <template v-slot:action>
        <v-btn @click="closeAllMessages" icon><v-icon>mdi-close</v-icon></v-btn>
      </template>
    </v-snackbar>
    <particle-spawner></particle-spawner>
    <current-note></current-note>
    <current-confirm></current-confirm>
    <v-dialog v-model="dialogDust" max-width="400">
      <golden-dust-menu @cancel="dialogDust = false"></golden-dust-menu>
    </v-dialog>
    <input @change="importSave" type="file" accept="text/plain, application/json" id="gooboo-savefile-input" style="display: none;"/>
    <v-icon v-if="activeTutorialCss !== null" class="tutorial-arrow" :style="activeTutorialCss">mdi-arrow-up-bold</v-icon>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import FeatureTile from './components/partial/main/FeatureTile.vue';
import NewGame from './components/view/NewGame.vue';
import OfflineSummary from './components/view/OfflineSummary.vue';
import ResetProgress from './components/view/ResetProgress.vue';
import Mining from './components/view/Mining.vue';
import Info from './components/view/Info.vue';
import StatOverview from './components/view/StatOverview.vue';
import TabDuplicate from './components/view/TabDuplicate.vue';
import Patchnote from './components/view/Patchnote.vue';
import Settings from './components/view/Settings.vue';
import Village from './components/view/Village.vue';
import Horde from './components/view/Horde.vue';
import Farm from './components/view/Farm.vue';
import Gallery from './components/view/Gallery.vue';
import Relic from './components/view/Relic.vue';
import Gem from './components/view/Gem.vue';
import Achievement from './components/view/Achievement.vue';
import School from './components/view/School.vue';
import Debug from './components/view/Debug.vue';
import Note from './components/view/Note.vue';
import Card from './components/view/Card.vue';
import General from './components/view/General.vue';
import Event from './components/view/Event.vue';
import Treasure from './components/view/Treasure.vue';
import Cryolab from './components/view/Cryolab.vue';
import { cleanStore, decodeFile, exportFile, saveLocal } from './js/savefile';
import NextTile from './components/partial/main/NextTile.vue';
import VSnackbars from 'v-snackbars'
import AchievementMessage from './components/partial/snackbar/AchievementMessage.vue';
import FeatureMessage from './components/partial/snackbar/FeatureMessage.vue';
import SaveMessage from './components/partial/snackbar/SaveMessage.vue';
import NoteMessage from './components/partial/snackbar/NoteMessage.vue';
import CurrentNote from './components/render/CurrentNote.vue';
import ErrorMessage from './components/partial/snackbar/ErrorMessage.vue';
import CardPackMessage from './components/partial/snackbar/CardPackMessage.vue';
import HeirloomMessage from './components/partial/snackbar/HeirloomMessage.vue';
import CurrentConfirm from './components/render/CurrentConfirm.vue';
import { loadGame } from './js/init';
import ParticleSpawner from './components/render/ParticleSpawner.vue';
import PrizeMessage from './components/partial/snackbar/PrizeMessage.vue';
import SchoolMessage from './components/partial/snackbar/SchoolMessage.vue';
import GoldenDustMenu from './components/render/GoldenDustMenu.vue';
import Currency from './components/render/Currency.vue';
import UpdateMessage from './components/partial/snackbar/UpdateMessage.vue';
import { APP_ENV } from './js/constants';
import ImportMessage from './components/partial/snackbar/ImportMessage.vue';
const semverCompare = require('semver/functions/compare');

export default {
  components: {
    NewGame,
    OfflineSummary,
    ResetProgress,
    Mining,
    Info,
    StatOverview,
    TabDuplicate,
    Patchnote,
    Settings,
    Village,
    Horde,
    Farm,
    Gallery,
    Relic,
    Gem,
    Achievement,
    School,
    Debug,
    Note,
    Card,
    General,
    Event,
    Treasure,
    Cryolab,
    FeatureTile,
    NextTile,
    VSnackbars,
    AchievementMessage,
    FeatureMessage,
    SaveMessage,
    NoteMessage,
    CurrentNote,
    ErrorMessage,
    CardPackMessage,
    HeirloomMessage,
    CurrentConfirm,
    ParticleSpawner,
    PrizeMessage,
    SchoolMessage,
    GoldenDustMenu,
    Currency,
    UpdateMessage,
    ImportMessage
  },
  data: () => ({
    dialogDust: false,
    intervalId: null
  }),
  computed: {
    ...mapState({
      globalLevel: state => state.meta.globalLevel,
      screen: state => state.system.screen,
      dark: state => state.system.settings.general.items.dark.value,
      lang: state => state.system.settings.general.items.lang.value,
      autosaveTimer: state => state.system.autosaveTimer,
      currentTheme: state => state.system.theme,
      snackbarPosition: state => state.system.settings.notification.items.position.value,
      cssShadows: state => state.system.settings.performance.items.cssShadows.value,
      goldenDust: state => state.currency.school_goldenDust,
      updateCheckValue: state => state.system.settings.notification.items.updateCheck.value
    }),
    ...mapGetters({
      mainFeatures: 'system/mainFeatures',
      sideFeatures: 'system/sideFeatures',
      nextFeature: 'system/nextFeature',
      globalLevelParts: 'meta/globalLevelParts',
      backupHint: 'system/backupHint',
      isEndOfFeature: 'system/isEndOfFeature',
      isOnMainFeature: 'system/isOnMainFeature',
      featureIsFrozen: 'cryolab/featureIsFrozen'
    }),
    marginSize() {
      return this.$vuetify.breakpoint.mdAndUp ? 2 : 1;
    },
    hourglassShift() {
      return (1 - Math.max(0, Math.min(1, this.goldenDust.value / this.goldenDust.cap))) * 16 + 4;
    },
    messages: {
      get() {
        return this.$store.state.system.notification;
      },
      set(value) {
        this.$store.commit('system/setNotification', value);
      }
    },
    showCloseAll() {
      return this.messages.length >= 2;
    },
    snackbarTop() {
      return [0, 1, 2].includes(this.snackbarPosition);
    },
    snackbarRight() {
      return [2, 3].includes(this.snackbarPosition);
    },
    snackbarBottom() {
      return [3, 4, 5].includes(this.snackbarPosition);
    },
    snackbarLeft() {
      return [5, 0].includes(this.snackbarPosition);
    },
    canSeeHourglass() {
      return this.screen === 'school' || (this.$store.state.stat.school_goldenDust.total > 0 && this.isOnMainFeature && !this.featureIsFrozen);
    },
    canSeeUpdates() {
      return APP_ENV === 'WEB';
    },
    activeTutorialCss() {
      const activeTutorial = this.$store.getters['system/activeTutorial'];
      if (activeTutorial) {
        const tutorialData = this.$store.state.system.tutorial[activeTutorial];
        if (this.$vuetify.breakpoint.xlOnly) {
          return tutorialData.cssDesktop;
        } else if (this.$vuetify.breakpoint.mdAndUp) {
          return tutorialData.cssTablet;
        } else {
          return tutorialData.cssMobile;
        }
      }
      return null;
    },
    featureBadges() {
      let badges = 0;
      if (this.$store.state.system.noteHint.length > 0) {
        badges++;
      }
      if (this.$store.state.system.farmHint) {
        badges++;
      }
      return badges;
    }
  },
  created() {
    let that = this;
    document.addEventListener('keydown', function (e) {
      that.$store.dispatch('system/processKeyPress', e);
    });
  },
  mounted() {
    // Workaround to show notifications
    const notifications = [...this.$store.state.system.notification];
    this.messages = [];
    setTimeout(() => {
      notifications.forEach(elem => {
        this.$store.commit('system/addNotification', elem);
      });
    }, 100);
    if (this.updateCheckValue && this.canSeeUpdates) {
      this.intervalStart();
    }
  },
  methods: {
    localSave() {
      saveLocal();
      this.$store.commit('system/resetAutosaveTimer');
    },
    exportSave() {
      this.$store.commit('system/updateKey', {key: 'backupTimer', value: 0});
      exportFile();
    },
    importSave() {
      let file = document.getElementById('gooboo-savefile-input').files[0];
      if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        let that = this;
        reader.onload = function (e) {
          const data = decodeFile(e.target.result);
          if (data) {
            cleanStore();
            if (loadGame(e.target.result)) {
              // Apply theme
              ['light', 'dark'].forEach(brightness => {
                for (const [key, elem] of Object.entries({...that.$store.state.system.themes.default[brightness], ...that.$store.state.system.themes[data.theme][brightness]})) {
                  that.$vuetify.theme.themes[brightness][key] = elem;
                }
              });
            }
          }
        }
      }
    },
    changeScreen(name, finishTutorial = false) {
      this.$store.commit('system/updateKey', {key: 'screen', value: name});
      if (finishTutorial) {
        this.$store.commit('system/updateTutorialKey', {name: 'viewFeature', key: 'completed', value: true});
      }
    },
    closeAllMessages() {
      while (this.messages.length > 0) {
        this.messages.splice(0, 1);
      }
    },
    updateCheck() {
      let that = this;
      let xhttp = new XMLHttpRequest();
      const oldVersion = this.$store.state.system.version;
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const newVersion = xhttp.responseText;
          if (semverCompare(oldVersion, newVersion) === -1) {
            that.$store.commit('system/addNotification', {color: 'success', timeout: -1, message: {
              type: 'update'
            }});
            that.intervalStop();
          }
        }
      };
      xhttp.open('GET', `version.txt?t=${ Date.now() }`, true);
      xhttp.send();
    },
    intervalStart() {
      this.intervalId = setInterval(this.updateCheck, 600000);
    },
    intervalStop() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    openDustDialog() {
      this.dialogDust = true;
    }
  },
  watch: {
    dark: {
      handler(newVal) {
        this.$vuetify.theme.dark = newVal;
      },
      immediate: true
    },
    lang: {
      handler(newVal) {
        this.$vuetify.lang.current = newVal;
      },
      immediate: true
    },
    updateCheckValue: {
      handler(newVal) {
        this.intervalStop();
        if (newVal && this.canSeeUpdates) {
          this.intervalStart();
        }
      },
      immediate: false
    }
  }
}
</script>
