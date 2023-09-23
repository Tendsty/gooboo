<style scoped>
.sparkline-vertical-text >>> text {
  writing-mode: vertical-rl;
}
</style>

<template>
  <div>
    <div class="d-flex align-center ma-1">
      <v-text-field class="ma-1" type="number" label="Max days" min="5" outlined hide-details v-model="maxDays"></v-text-field>
      <v-text-field class="ma-1" type="number" label="Interval" min="1" outlined hide-details v-model="dayInterval"></v-text-field>
    </div>
    <div v-if="autoplayData.length > 1">
      <div class="d-flex align-center ma-1">
        <v-select class="ma-1" label="Type" outlined hide-details :items="types" v-model="selectedType"></v-select>
        <v-autocomplete v-if="selectedType === 'stat'" class="ma-1" label="Type" outlined hide-details :items="stats" v-model="selectedStat"></v-autocomplete>
        <v-autocomplete v-if="selectedType === 'achievement'" class="ma-1" label="Type" outlined hide-details clearable :items="achievementFeatures" v-model="selectedAchievementFeature"></v-autocomplete>
        <v-autocomplete v-if="selectedType === 'upgrade'" class="ma-1" label="Type" outlined hide-details clearable :items="upgradeFeatures" v-model="selectedUpgradeFeature"></v-autocomplete>
        <v-select v-if="selectedType === 'upgrade'" class="ma-1" label="Type" outlined hide-details :items="upgradeTypes" v-model="selectedUpgradeType"></v-select>
        <v-autocomplete v-if="selectedType === 'cardFeature'" class="ma-1" label="Type" outlined hide-details clearable :items="cardFeatures" v-model="selectedCardFeature"></v-autocomplete>
        <v-autocomplete v-if="selectedType === 'cardCollection'" class="ma-1" label="Type" outlined hide-details :items="cardCollections" v-model="selectedCardCollection"></v-autocomplete>
      </div>
      <div class="d-flex sparkline-vertical-text align-center ma-1">
        <v-sparkline v-if="selectedType === 'globalLevel'" color="red" line-width="1" label-size="4" width="500" height="150" :value="globalLevelData" :labels="globalLevelDataFormatted"></v-sparkline>
        <v-sparkline v-if="selectedType === 'achievement' && selectedAchievementFeature === null" color="red" line-width="1" label-size="4" width="500" height="150" :value="achievementAllData" :labels="achievementAllDataFormatted"></v-sparkline>
        <v-sparkline v-if="selectedType === 'achievement' && selectedAchievementFeature !== null" color="red" line-width="1" label-size="4" width="500" height="150" :value="achievementData" :labels="achievementDataFormatted"></v-sparkline>
        <template v-if="selectedType === 'upgrade' && selectedUpgradeFeature === null">
          <v-sparkline color="red" line-width="1" label-size="4" width="250" height="150" :value="upgradeDataAllTotal" :labels="upgradeDataAllTotalFormatted"></v-sparkline>
          <v-sparkline color="blue" line-width="1" label-size="4" width="250" height="150" :value="upgradeDataAllUnique" :labels="upgradeDataAllUniqueFormatted"></v-sparkline>
        </template>
        <template v-if="selectedType === 'upgrade' && selectedUpgradeFeature !== null">
          <v-sparkline color="red" line-width="1" label-size="4" width="250" height="150" :value="upgradeDataTotal" :labels="upgradeDataTotalFormatted"></v-sparkline>
          <v-sparkline color="blue" line-width="1" label-size="4" width="250" height="150" :value="upgradeDataUnique" :labels="upgradeDataUniqueFormatted"></v-sparkline>
        </template>
        <template v-if="selectedType === 'stat' && selectedStat !== null">
          <v-sparkline color="red" line-width="1" label-size="4" width="250" height="150" :value="statDataValue" :labels="statDataValueFormatted"></v-sparkline>
          <v-sparkline color="blue" line-width="1" label-size="4" width="250" height="150" :value="statDataTotal" :labels="statDataTotalFormatted"></v-sparkline>
        </template>
        <v-sparkline v-if="selectedType === 'cardFeature' && selectedCardFeature === null" color="red" line-width="1" label-size="4" width="500" height="150" :value="cardFeatureAllData" :labels="cardFeatureAllDataFormatted"></v-sparkline>
        <v-sparkline v-if="selectedType === 'cardFeature' && selectedCardFeature !== null" color="red" line-width="1" label-size="4" width="500" height="150" :value="cardFeatureData" :labels="cardFeatureDataFormatted"></v-sparkline>
        <v-sparkline v-if="selectedType === 'cardCollection' && selectedCardCollection !== null" color="red" line-width="1" label-size="4" width="500" height="150" :value="cardCollectionData" :labels="cardCollectionDataFormatted"></v-sparkline>
        <v-timeline dense class="w-100" v-if="selectedType === 'unlock'">
          <v-timeline-item small v-for="item in unlockData" :key="item.day">
            <span>Day {{ item.day }}: </span>
            <span v-for="(name, key) in item.diff" :key="item.day + '-' + key">{{ key > 0 ? ', ' : '' }}{{ name }}</span>
          </v-timeline-item>
        </v-timeline>
        <v-timeline dense class="w-100" v-if="selectedType === 'relic'">
          <v-timeline-item small v-for="item in relicData" :key="item.day">
            <span>Day {{ item.day }}: </span>
            <span v-for="(name, key) in item.diff" :key="item.day + '-' + key">{{ key > 0 ? ', ' : '' }}{{ name }}</span>
          </v-timeline-item>
        </v-timeline>
      </div>
    </div>
    <div v-else>Not enough data.</div>
  </div>
</template>

<script>
import { formatNum } from '../../../js/utils/format';
export default {
  data: () => ({
    maxDays: 50,
    dayInterval: 1,
    selectedType: 'globalLevel',
    selectedStat: null,
    selectedAchievementFeature: null,
    selectedUpgradeFeature: null,
    selectedUpgradeType: 'regular',
    selectedCardFeature: null,
    selectedCardCollection: null,
    types: ['globalLevel', 'achievement', 'upgrade', 'stat', 'cardFeature', 'cardCollection', 'unlock', 'relic']
  }),
  computed: {
    autoplayDataSource() {
      return this.$store.state.system.autoplayData.map((item, key) => {
        return {...item, day: key + 1};
      });
    },
    autoplayData() {
      const dataLength = this.autoplayDataSource.length;

      if (dataLength <= this.maxDays && this.dayInterval <= 1) {
        return this.autoplayDataSource;
      } else {
        const source = this.autoplayDataSource.slice(Math.max(dataLength - this.maxDays, 0));
        if (this.dayInterval <= 1) {
          return source;
        } else {
          const sourceLength = source.length;
          const interval = parseInt(this.dayInterval);
          let arr = [];
          for (let i = interval - 1; i < sourceLength; i += interval) {
            arr.push(source[i]);
          }
          return arr;
        }
      }
    },
    stats() {
      return Object.keys(this.autoplayData[0].stat);
    },
    achievementFeatures() {
      return Object.keys(this.autoplayData[0].achievement);
    },
    upgradeFeatures() {
      return Object.keys(this.autoplayData[0].upgrade);
    },
    upgradeTypes() {
      return this.selectedUpgradeFeature !== null ? Object.keys(this.autoplayData[0].upgrade[this.selectedUpgradeFeature]) : ['regular', 'premium', 'prestige'];
    },
    cardFeatures() {
      return Object.keys(this.autoplayData[0].cardFeature);
    },
    cardCollections() {
      return Object.keys(this.autoplayData[0].cardCollection);
    },
    globalLevelData() {
      return this.autoplayData.map(elem => elem.globalLevel);
    },
    globalLevelDataFormatted() {
      return this.globalLevelData.map(elem => formatNum(elem));
    },
    achievementData() {
      return this.autoplayData.map(elem => elem.achievement[this.selectedAchievementFeature]);
    },
    achievementDataFormatted() {
      return this.achievementData.map(elem => formatNum(elem));
    },
    achievementAllData() {
      return this.autoplayData.map(el => {
        let amount = 0;
        for (let [, elem] of Object.entries(el.achievement)) {
          amount += elem;
        }
        return amount;
      });
    },
    achievementAllDataFormatted() {
      return this.achievementAllData.map(elem => formatNum(elem));
    },
    statDataValue() {
      return this.autoplayData.map(elem => elem.stat[this.selectedStat].value);
    },
    statDataValueFormatted() {
      return this.statDataValue.map(elem => formatNum(elem));
    },
    statDataTotal() {
      return this.autoplayData.map(elem => elem.stat[this.selectedStat].total);
    },
    statDataTotalFormatted() {
      return this.statDataTotal.map(elem => formatNum(elem));
    },
    upgradeDataAllTotal() {
      return this.autoplayData.map(el => {
        let amount = 0;
        for (let [, elem] of Object.entries(el.upgrade)) {
          amount += elem[this.selectedUpgradeType].total;
        }
        return amount;
      });
    },
    upgradeDataAllTotalFormatted() {
      return this.upgradeDataAllTotal.map(elem => formatNum(elem));
    },
    upgradeDataAllUnique() {
      return this.autoplayData.map(el => {
        let amount = 0;
        for (let [, elem] of Object.entries(el.upgrade)) {
          amount += elem[this.selectedUpgradeType].unique;
        }
        return amount;
      });
    },
    upgradeDataAllUniqueFormatted() {
      return this.upgradeDataAllUnique.map(elem => formatNum(elem));
    },
    upgradeDataTotal() {
      return this.autoplayData.map(elem => elem.upgrade[this.selectedUpgradeFeature][this.selectedUpgradeType].total);
    },
    upgradeDataTotalFormatted() {
      return this.upgradeDataTotal.map(elem => formatNum(elem));
    },
    upgradeDataUnique() {
      return this.autoplayData.map(elem => elem.upgrade[this.selectedUpgradeFeature][this.selectedUpgradeType].unique);
    },
    upgradeDataUniqueFormatted() {
      return this.upgradeDataUnique.map(elem => formatNum(elem));
    },
    cardFeatureData() {
      return this.autoplayData.map(elem => elem.cardFeature[this.selectedCardFeature]);
    },
    cardFeatureDataFormatted() {
      return this.cardFeatureData.map(elem => formatNum(elem));
    },
    cardFeatureAllData() {
      return this.autoplayData.map(el => {
        let amount = 0;
        for (let [, elem] of Object.entries(el.cardFeature)) {
          amount += elem;
        }
        return amount;
      });
    },
    cardFeatureAllDataFormatted() {
      return this.cardFeatureAllData.map(elem => formatNum(elem));
    },
    cardCollectionData() {
      return this.autoplayData.map(elem => elem.cardCollection[this.selectedCardCollection]);
    },
    cardCollectionDataFormatted() {
      return this.cardCollectionData.map(elem => formatNum(elem));
    },
    unlockData() {
      let newUnlocks = [];
      return this.autoplayData.map(elem => {
        const diff = elem.unlock.filter(el => !newUnlocks.includes(el));
        newUnlocks = elem.unlock;
        return {day: elem.day, diff};
      }).filter(elem => elem.diff.length > 0);
    },
    relicData() {
      let newRelics = [];
      return this.autoplayData.map(elem => {
        const diff = elem.relic.filter(el => !newRelics.includes(el));
        newRelics = elem.relic;
        return {day: elem.day, diff};
      }).filter(elem => elem.diff.length > 0);
    }
  },
  watch: {
    selectedUpgradeFeature() {
      this.selectedUpgradeType = 'regular';
    }
  }
}
</script>
