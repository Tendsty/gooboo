<template>
  <v-row no-gutters>
    <v-col cols="12" md="4" lg="3">
      <div v-if="pedestalData">
        <relic-pedestal v-for="id in pedestalList" class="ma-2" :id="id" :key="`pedestal-${ id }`" v-model="pedestalData[id]" :relic-list="relicList" :glyph-list="glyphList" :pedestal-list="pedestalData" :glyph-filter="glyphFilter"></relic-pedestal>
      </div>
      <div class="d-flex justify-center">
        <v-menu max-height="400" close-on-click>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group color="primary" v-model="glyphFilter">
              <v-list-item :value="null">
                <v-list-item-title>({{ $vuetify.lang.t('$vuetify.gooboo.noFilter') }})</v-list-item-title>
              </v-list-item>
              <v-list-item v-for="item in glyphList" :key="`glyph-list-${ item }`" :value="item">
                <v-list-item-title class="d-flex align-center">
                  <v-icon small class="mr-1" :color="glyphData[item].color">{{ glyphData[item].icon }}</v-icon>
                  <span>{{ $vuetify.lang.t(`$vuetify.relic.glyph.${ item }`) }}</span>
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <gb-tooltip key="edit-pedestals">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" @click="updatePedestals" :disabled="!isEdited" v-bind="attrs" v-on="on">
              <v-icon class="mr-1">mdi-pencil</v-icon>
              <span>{{ $vuetify.lang.t('$vuetify.relic.pedestal.modify') }}</span>
            </v-btn>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.relic.pedestal.modifyDescription') }}</div>
        </gb-tooltip>
      </div>
      <alert-text v-if="isEdited" class="ma-2" type="warning">{{ $vuetify.lang.t('$vuetify.relic.pedestal.unsavedChanges', $vuetify.lang.t('$vuetify.relic.pedestal.modify')) }}</alert-text>
    </v-col>
    <v-col cols="12" md="8" lg="9">
      <div class="d-flex justify-center flex-wrap ma-1">
        <glyph-bar v-for="name in glyphList" class="ma-1" :name="name" :key="`glyph-${ name }`" :glyph-stat="glyphStats[name]" :glyph-change="isEdited ? glyphStatsChange[name] : null"></glyph-bar>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import { RELIC_PEDESTAL_AMOUNT } from '../../../js/constants';
import AlertText from '../render/AlertText.vue';
import GlyphBar from './GlyphBar.vue';
import RelicPedestal from './RelicPedestal.vue';

export default {
  components: { RelicPedestal, GlyphBar, AlertText },
  data: () => ({
    pedestalData: null,
    glyphFilter: null,
  }),
  mounted() {
    let arr = [];
    this.$store.state.relic.pedestal.forEach(elem => {
      arr.push([...elem]);
    });
    this.pedestalData = arr;
  },
  computed: {
    ...mapState({
      glyphData: state => state.relic.glyph,
    }),
    glyphStats() {
      return this.$store.getters['relic/glyphStats']();
    },
    glyphStatsChange() {
      return this.$store.getters['relic/glyphStats'](this.pedestalData);
    },
    pedestalList() {
      let arr = [];
      for (let i = 0; i < RELIC_PEDESTAL_AMOUNT; i++) {
        if (this.$store.getters['mult/get'](`relicPedestal${ i }`) > 0) {
          arr.push(i);
        }
      }
      return arr;
    },
    relicList() {
      return this.$store.getters['relic/owned'].map(elem => {
        return {...this.$store.state.relic.item[elem], name: elem};
      });
    },
    glyphList() {
      let visible = [];
      this.relicList.forEach(relic => {
        for (const [key] of Object.entries(relic.glyph(relic.level))) {
          if (!visible.includes(key)) {
            visible.push(key);
          }
        }
      });
      let arr = [];
      for (const [key, elem] of Object.entries(this.glyphData)) {
        if (visible.includes(key) || elem.progress > 0 || elem.level > 0) {
          arr.push(key);
        }
      }
      return arr;
    },
    isEdited() {
      return JSON.stringify(this.$store.state.relic.pedestal) !== JSON.stringify(this.pedestalData);
    }
  },
  methods: {
    updatePedestals() {
      // Check if any glyphs have significant progress
      let hasProgress = false;
      for (const [, elem] of Object.entries(this.glyphData)) {
        if (elem.progress - (Math.floor(elem.progress)) >= 0.05) {
          hasProgress = true;
        }
      }

      if (hasProgress) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'relicGlyph',
          pedestals: this.pedestalData,
        }});
      } else {
        this.$store.dispatch('relic/changePedestals', this.pedestalData);
      }
    }
  }
}
</script>
