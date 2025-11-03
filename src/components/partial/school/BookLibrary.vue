<style scoped>
.global-level-container {
  position: relative;
}
.global-level-icon {
  position: absolute;
  left: calc(50% - 18px);
  top: calc(50% - 18px);
}
.global-level-text {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 12px;
}
</style>

<template>
  <div>
    <div class="d-flex justify-center align-center flex-wrap ma-2">
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.mult.schoolBook')">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex justify-center align-center mr-4" v-bind="attrs" v-on="on">
            <v-icon class="mr-1">mdi-book</v-icon>
            <div>{{ $formatInt(booksLeft) }} / {{ $formatInt(maxBooks) }}</div>
          </div>
        </template>
        <stat-breakdown name="schoolBook"></stat-breakdown>
      </gb-tooltip>
      <div class="ma-1" style="width: 300px">
        <v-select class="w-100" dense outlined hide-details item-value="name" v-model="selectedFeature" :items="featureList">
          <template v-slot:selection="{ item }"><feature-select-display :item="item" is-simple></feature-select-display></template>
          <template v-slot:item="{ item }"><feature-select-display :item="item"></feature-select-display></template>
        </v-select>
      </div>
    </div>
    <v-row class="ma-1" no-gutters>
      <v-col v-for="book in bookList" :key="`book-${ book }`" cols="12" sm="6" md="4" lg="3" xl="2">
        <book-upgrade class="ma-1" :name="book"></book-upgrade>
      </v-col>
      <v-col v-if="requirementNext !== null" cols="12" sm="6" md="4" lg="3" xl="2">
        <v-card class="ma-1">
          <v-card-text class="d-flex justify-center align-center px-2 pt-1 pb-0" style="min-height: 108px;">
            <div class="global-level-container">
              <v-icon color="secondary" size="88">mdi-lock</v-icon>
              <v-icon class="global-level-icon" large>mdi-octagram</v-icon>
              <div class="global-level-text d-flex justify-center align-center">
                <span>{{ requirementNext }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StatBreakdown from '../../render/StatBreakdown.vue';
import BookUpgrade from './BookUpgrade.vue';
import FeatureSelectDisplay from './FeatureSelectDisplay.vue';

export default {
  components: { StatBreakdown, BookUpgrade, FeatureSelectDisplay },
  data: () => ({
    selectedFeature: 'mining_0',
  }),
  computed: {
    ...mapGetters({
      booksLeft: 'school/booksLeft'
    }),
    maxBooks() {
      return this.$store.getters['mult/get']('schoolBook');
    },
    bookList() {
      let arr = [];
      let [feature, subfeature] = this.selectedFeature.split('_');
      subfeature = parseInt(subfeature);
      const globalLevel = this.$store.state.meta.globalLevelParts[this.selectedFeature] ?? 0;
      for (const [key, elem] of Object.entries(this.$store.state.school.book)) {
        if (elem.feature === feature && elem.subfeature === subfeature && globalLevel >= elem.minGL) {
          arr.push(key);
        }
      }
      return arr;
    },
    featureList() {
      let arr = [];
      this.$store.getters['system/mainFeatures'].forEach(elem => {
        arr.push({feature: elem.name, subfeature: 0, icon: elem.icon, name: elem.name + '_0', hasBadge: this.$store.state.system.bookHint.findIndex(el => el === (elem.name + '_0')) !== -1});
        let hasSubfeature = false;
        elem.subfeatures.forEach((name, index) => {
          if (this.$store.state.unlock[name].see) {
            hasSubfeature = true;
            const name = elem.name + '_' + (index + 1);
            arr.push({feature: elem.name, subfeature: index + 1, icon: elem.icon, name, hasBadge: this.$store.state.system.bookHint.findIndex(el => el === name) !== -1});
          }
        });
        if (!hasSubfeature) {
          arr[arr.length - 1].subfeature = null;
        }
      });
      return arr.map(el => {
        const subfeature = el.subfeature ?? 0;
        const globalLevel = this.$store.state.meta.globalLevelParts[el.feature + '_' + subfeature];
        let books = 0;
        for (const [, elem] of Object.entries(this.$store.state.school.book)) {
          if (elem.feature === el.feature && elem.subfeature === subfeature && !elem.owned && globalLevel >= elem.minGL) {
            books++;
          }
        }
        return {...el, gl: globalLevel, books};
      });
    },
    requirementNext() {
      let next = null;
      const globalLevel = this.$store.state.meta.globalLevelParts[this.selectedFeature] ?? 0;
      let [feature, subfeature] = this.selectedFeature.split('_');
      subfeature = parseInt(subfeature);
      for (const [, book] of Object.entries(this.$store.state.school.book)) {
        if (book.feature === feature && book.subfeature === subfeature && book.minGL !== null && globalLevel < book.minGL && (next === null || book.minGL < next)) {
          next = book.minGL;
        }
      }
      return next;
    }
  },
  mounted() {
    this.$store.commit('system/removeBookHint', 'mining_0');
  },
  watch: {
    selectedFeature(newVal) {
      this.$store.commit('system/removeBookHint', newVal);
    }
  }
}
</script>
