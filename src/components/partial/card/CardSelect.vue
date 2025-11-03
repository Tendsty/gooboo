<template>
  <div class="d-flex align-center ma-1">
    <v-select class="ma-1 w-100" outlined multiple clearable hide-details item-value="name" v-model="values" :items="cardListSorted" v-on:input="limitCards" :no-data-text="$vuetify.lang.t('$vuetify.card.notFound')">
      <template v-slot:selection="{ item }"><card-select-display class="pa-1" style="width: 50%;" hide-amount show-disabled :item="item"></card-select-display></template>
      <template v-slot:item="{ item }"><card-select-display class="my-2" :item="item"></card-select-display></template>
    </v-select>
    <div style="width: 36px;">
      <v-menu max-height="400" close-on-click>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group color="primary" v-model="statFilter">
            <v-list-item :value="null">
              <v-list-item-title>({{ $vuetify.lang.t('$vuetify.gooboo.noFilter') }})</v-list-item-title>
            </v-list-item>
            <v-list-item v-for="item in statList" :key="`stat-list-${ item }`" :value="item">
              <v-list-item-title>
                <mult-name v-if="item.split('_')[0] === 'stat'" :name="item.slice(5)"></mult-name>
                <div v-else-if="item.split('_')[0] === 'raredrop'">{{ $vuetify.lang.t(`$vuetify.farm.addRareDrop`, $vuetify.lang.t(`$vuetify.currency.${ item.slice(9) }.name`)) }}</div>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-menu close-on-click>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-sort</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group color="primary" v-model="sortMode">
            <v-list-item :value="0">
              <v-list-item-title>{{ $vuetify.lang.t('$vuetify.card.sort.number') }}</v-list-item-title>
            </v-list-item>
            <v-list-item :value="1">
              <v-list-item-title>{{ $vuetify.lang.t('$vuetify.card.sort.power') }}</v-list-item-title>
            </v-list-item>
            <v-list-item :value="2">
              <v-list-item-title>{{ $vuetify.lang.t('$vuetify.card.sort.owned') }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import MultName from '../../render/MultName.vue';
import CardSelectDisplay from './CardSelectDisplay.vue';

export default {
  components: { CardSelectDisplay, MultName },
  data: () => ({
    values: [],
    statFilter: null,
    sortMode: 0,
  }),
  props: {
    feature: {
      type: String,
      required: true
    },
    crop: {
      type: String,
      required: false,
      default: null
    },
    group: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    cardList() {
      let cards = [];
      for (const [key, elem] of Object.entries(this.$store.state.card.card)) {
        if (elem.feature === this.feature && (this.group === null || elem.group === null || this.group === elem.group) && elem.amount > 1) {
          cards.push({name: key, ...elem});
        }
      }
      return cards;
    },
    statList() {
      let arr = [];
      this.cardList.forEach(card => {
        card.reward.forEach(reward => {
          if (['base', 'mult', 'bonus'].includes(reward.type) && !arr.includes('stat_' + reward.name)) {
            arr.push('stat_' + reward.name);
          } else if (reward.type === 'addRareDrop') {
            arr.push('raredrop_' + reward.name);
          }
        });
      });
      return arr.sort();
    },
    cardListSorted() {
      let arr = [...this.cardList];
      if (this.sortMode === 1) {
        arr.sort((a, b) => (b.power === 'adaptive' ? this.adaptivePower : b.power) - (a.power === 'adaptive' ? this.adaptivePower : a.power));
      } else if (this.sortMode === 2) {
        arr.sort((a, b) => b.amount - a.amount);
      }
      if (this.statFilter !== null) {
        const cardFilterFunction = (i) => {
          let statName = null;
          if (['base', 'mult', 'bonus'].includes(i.type)) {
            statName = 'stat_' + i.name;
          } else if (i.type === 'addRareDrop') {
            statName = 'raredrop_' + i.name;
          }
          return statName === this.statFilter;
        };
        // Show cards that meet the filter conditions first
        arr.sort((a, b) => (b.reward.find(cardFilterFunction) !== undefined ? 1 : 0) - (a.reward.find(cardFilterFunction) !== undefined ? 1 : 0));
      }
      return arr;
    },
    maxCards() {
      return this.$store.getters['mult/get'](this.feature + 'CardCap');
    },
    cardSelected() {
      return this.crop === null ? this.$store.state.card.feature[this.feature].cardSelected : this.$store.state.farm.crop[this.crop].cardSelected;
    },
    adaptivePower() {
      return this.$store.getters['card/adaptivePower'](this.feature);
    }
  },
  methods: {
    limitCards(e) {
      if (e.length > this.maxCards) {
        e.pop();
      }
    }
  },
  mounted() {
    this.values = [...this.cardSelected];
  },
  watch: {
    values: {
      deep: true,
      immediate: false,
      handler(newVal) {
        if (this.crop === null) {
          this.$store.commit('card/updateKey', {type: 'feature', name: this.feature, crop: this.crop, key: 'cardSelected', value: newVal});
        } else {
          this.$store.commit('farm/updateCropKey', {name: this.crop, key: 'cardSelected', value: newVal});
        }
      }
    },
    cardSelected: {
      deep: true,
      immediate: false,
      handler(newVal) {
        // Fix cards not updating after prestige
        if (newVal.length <= 0 && this.values.length > 0) {
          this.values = [];
        }
      }
    }
  }
}
</script>
