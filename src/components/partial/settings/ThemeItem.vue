<style scoped>
.theme-item {
  width: 250px;
  height: 270px;
}
.theme-item-small {
  width: 250px;
  height: 204px;
}
.theme-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 4px;
}
.theme-item-small .theme-box {
  height: 28px;
}
.theme-box-wide {
  width: 64px;
}
.theme-color {
  width: 16px;
  height: 16px;
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
.theme--dark.background-theme-polar {
  background: repeating-linear-gradient(105deg, #126C6B 0.001px 45px, #1D504A 145px 189px, #1C956C 289px 320px, #2A5575 420px 464px, #264D48 564px 613px, #314E72 713px 785px, #3B636B 885px 908px, #335E69 1008px 1043px, #277B69 1143px 1223px, #212E3B 1323px 1396px, #114149 1496px 1549px, #1C4E5E 1649px 1723px, #2B747A 1823px 1881px, #326D6B 1981px 2012px, #209770 2112px 2192px, #38547C 2292px 2359px, #126B48 2459px 2498px, #125A4B 2598px 2623px, #1D2E44 2723px 2788px, #244244 2888px 2937px, #126C6B 3037px 3037px);
}
.theme--light.background-theme-polar {
  background: repeating-linear-gradient(105deg, #2BDBD9 0.001px 45px, #3DA79A 145px 189px, #89E8C7 289px 320px, #7BACCF 420px 464px, #4F9F96 564px 613px, #89A7CC 713px 785px, #93BCC4 885px 908px, #80B5C2 1008px 1043px, #7BD5C2 1143px 1223px, #455F7A 1323px 1396px, #248797 1496px 1549px, #39A3C4 1649px 1723px, #83CED3 1823px 1881px, #83C6C4 1981px 2012px, #93E8CC 2112px 2192px, #A2B7D5 2292px 2359px, #2ADA95 2459px 2498px, #26BC9C 2598px 2623px, #3D5F8D 2723px 2788px, #4B898E 2888px 2937px, #2BDBD9 3037px 3037px);
}
.theme--dark.background-theme-prismatic {
  background: radial-gradient(#C0C0C0 1%, transparent 10% 25%, #12121280 60%, #121212),
              conic-gradient(#C00000, #C0C000, #00C000, #00C0C0, #0000C0, #C000C0, #C00000);
}
.theme--light.background-theme-prismatic {
  background: radial-gradient(#FFFFFF 1%, transparent 10% 25%, #FFFFFF80 60%, #FFFFFF),
              conic-gradient(#FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000);
}
.theme--dark.background-theme-candlelight {
  background: radial-gradient(circle at 50% 99%, #FFFFE0, #FFFF80 1%, #FFFF00 2%, #FFC000 3%, #C09000 4%, #806000 6%, #403000 9%, #201809 12%, #161512 15%, #121212 18%);
}
.theme--light.background-theme-candlelight {
  background: radial-gradient(circle at 50% 99%, #FFFFE0, #FFFF80 1%, #FFFF00 2%, #FFC000 3%, #FFA820 4%, #FFB840 6%, #FFD080 9%, #FFE8C0 12%, #FFF4E0 15%, #FFFFFF 18%);
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
}
</style>

<template>
  <v-card class="d-flex flex-column default-card pa-2 elevation-4" :style="`border: 4px solid ${this.$vuetify.theme.dark ? '#121212' : '#FFFFFF'};`" :class="[`background-theme-${name}`, {'theme-item': !small, 'theme-item-small': small}]">
    <v-card-title class="pa-0 justify-center" :class="{'mb-2': !small}">{{ $vuetify.lang.t(`$vuetify.theme.${name}`) }}</v-card-title>
    <div class="d-flex flex-wrap justify-center">
      <div class="theme-box theme-box-wide rounded elevation-1" :style="`background-color: ${themeCurrent.primary}`">1</div>
      <div class="theme-box theme-box-wide rounded elevation-1" :style="`background-color: ${themeCurrent.secondary}`">2</div>
      <div class="theme-box theme-box-wide rounded elevation-1" :style="`background-color: ${themeCurrent.accent}`">3</div>
    </div>
    <div class="d-flex flex-wrap justify-center">
      <div class="theme-box rounded elevation-1" :style="`background-color: ${themeCurrent.success}`"><v-icon :small="small">mdi-check</v-icon></div>
      <div class="theme-box rounded elevation-1" :style="`background-color: ${themeCurrent.warning}`"><v-icon :small="small">mdi-exclamation-thick</v-icon></div>
      <div class="theme-box rounded elevation-1" :style="`background-color: ${themeCurrent.error}`"><v-icon :small="small">mdi-alert</v-icon></div>
      <div class="theme-box rounded elevation-1" :style="`background-color: ${themeCurrent.info}`"><v-icon :small="small">mdi-information</v-icon></div>
    </div>
    <div class="d-flex flex-wrap justify-center">
      <template v-for="(icon, iname) in icons">
        <gb-tooltip v-if="theme[iname]" :key="'icon-' + iname" :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="ma-1" v-bind="attrs" v-on="on">{{ icon }}</v-icon>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.theme.icon.${ iname }`) }}</div>
        </gb-tooltip>
      </template>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex flex-wrap justify-center align-center mx-8 mb-2 elevation-2">
      <div class="theme-color" v-for="color in colors" :key="'color-' + color" :style="`background-color: ${themeCurrent[color].base}`"></div>
    </div>
    <div v-if="!hideActions" class="d-flex justify-center align-center">
      <v-btn v-if="theme.owned" :color="themeCurrent.primary" @click="apply" :disabled="name === themeActive">{{ $vuetify.lang.t('$vuetify.gooboo.apply') }}</v-btn>
      <template v-else-if="theme.price !== null">
        <price-tag class="mr-2" currency="gem_amethyst" :amount="theme.price"></price-tag>
        <v-btn :color="themeCurrent.primary" @click="buy" :disabled="!canAfford">{{ $vuetify.lang.t('$vuetify.gooboo.buy') }}</v-btn>
      </template>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import PriceTag from '../../render/PriceTag.vue';

export default {
  components: { PriceTag },
  data: () => ({
    icons: {
      hasCustomNavbar: 'mdi-application',
      hasCustomBackground: 'mdi-image-area',
      hasCustomColors: 'mdi-palette',
      hasCustomUI: 'mdi-widgets',
      hasAnimations: 'mdi-movie-star',
      hasParticles: 'mdi-shimmer',
    },
    colors: [
      'red',
      'deep-orange',
      'orange-red',
      'orange',
      'amber',
      'yellow',
      'lime',
      'light-green',
      'green',
      'teal',

      // last half is reverted to form a circle
      'red-pink',
      'pink',
      'pink-purple',
      'purple',
      'deep-purple',
      'indigo',
      'dark-blue',
      'blue',
      'light-blue',
      'cyan',
    ]
  }),
  props: {
    name: {
      type: String,
      required: true
    },
    hideActions: {
      type: Boolean,
      required: false,
      default: false
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      themeActive: state => state.system.theme
    }),
    theme() {
      return this.$store.state.system.themes[this.name];
    },
    themeCurrent() {
      const brightness = [this.$vuetify.theme.dark ? 'dark' : 'light'];
      return {...this.$store.state.system.themes.default[brightness], ...this.theme[brightness]};
    },
    canAfford() {
      return this.theme.price !== null && this.$store.getters['currency/value']('gem_amethyst') >= this.theme.price;
    }
  },
  methods: {
    apply() {
      ['light', 'dark'].forEach(brightness => {
        for (const [key, elem] of Object.entries({...this.$store.state.system.themes.default[brightness], ...this.$store.state.system.themes[this.name][brightness]})) {
          this.$vuetify.theme.themes[brightness][key] = elem;
        }
      });
      this.$store.commit('system/updateKey', {key: 'theme', value: this.name});
    },
    buy() {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'theme',
          name: this.name,
          price: {gem_amethyst: this.theme.price},
        }});
      } else {
        this.$store.dispatch('system/buyTheme', this.name);
      }
    }
  }
}
</script>
