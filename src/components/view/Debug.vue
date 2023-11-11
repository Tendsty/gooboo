<style scoped>
.css-preview {
  height: 200px;
  user-select: text;
}
.card-icons-preview {
  user-select: text;
  white-space: pre;
}
.css-preview:hover {
  height: 800px;
}
</style>

<template>
  <div>
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab>Manipulation</v-tab>
      <v-tab>Design</v-tab>
      <v-tab>Colors</v-tab>
      <v-tab>Card creator</v-tab>
      <v-tab>Date tester</v-tab>
      <v-tab>Stat viewer</v-tab>
      <v-tab>RNG tester</v-tab>
      <v-tab>Autoplay stats</v-tab>
    </v-tabs>
    <div class="scroll-container-tab" v-if="tab === 0">
      <div class="d-flex flex-wrap align-center ma-1">
        <v-btn class="ma-1" @click="advance(60)">
          <v-icon>mdi-clock</v-icon>1m
        </v-btn>
        <v-btn class="ma-1" @click="advance(600)">
          <v-icon>mdi-clock</v-icon>10m
        </v-btn>
        <v-btn class="ma-1" @click="advance(3600)">
          <v-icon>mdi-clock</v-icon>1h
        </v-btn>
        <v-btn class="ma-1" @click="advance(86400)">
          <v-icon>mdi-clock</v-icon>1d
        </v-btn>
        <v-btn class="ma-1" @click="deleteSave">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn class="ma-1" @click="cleanSave">
          <v-icon>mdi-broom</v-icon>
        </v-btn>
        <v-btn class="ma-1" @click="deleteAutoplayData">
          <v-icon>mdi-file-document-remove</v-icon>
        </v-btn>
        <v-btn class="ma-1" @click="causeError">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn class="ma-1" @click="maxSchool">
          <v-icon>mdi-school</v-icon>
        </v-btn>
        <v-btn class="ma-1" @click="maxCrop">
          <v-icon>mdi-sprout</v-icon>
        </v-btn>
        <div class="ma-1">Total time spent: {{ $formatTime(totalTime) }}</div>
        <div>Today is {{ currentDay }}</div>
      </div>
      <div class="d-flex align-center ma-1">
        <v-autocomplete data-cy="debug-unlock-input" class="ma-1" label="Unlock" outlined hide-details :items="unlocks" v-model="selectedUnlock"></v-autocomplete>
        <v-btn data-cy="debug-unlock-unlock" class="ma-1" color="primary" :disabled="!selectedUnlock" @click="triggerUnlock">{{ $vuetify.lang.t('$vuetify.gooboo.unlock') }}</v-btn>
        <v-btn class="ma-1" color="primary" :disabled="!selectedUnlock" @click="triggerLock">{{ $vuetify.lang.t('$vuetify.gooboo.lock') }}</v-btn>
      </div>
      <div class="d-flex align-center ma-1">
        <v-autocomplete data-cy="debug-mult-input" class="ma-1" label="Mult" outlined hide-details :items="mults" v-model="selectedMult"></v-autocomplete>
        <v-select data-cy="debug-mult-type" class="ma-1" label="Type" outlined hide-details :items="multTypes" v-model="selectedMultType"></v-select>
        <v-text-field data-cy="debug-mult-amount" class="ma-1" type="number" label="Amount" outlined hide-details v-model="selectedMultValue"></v-text-field>
        <v-btn data-cy="debug-mult-apply" class="ma-1" color="primary" :disabled="!selectedMult || isNaN(selectedMultValue)" @click="triggerMult">{{ $vuetify.lang.t('$vuetify.gooboo.apply') }}</v-btn>
        <v-btn class="ma-1" color="primary" :disabled="!selectedMult" @click="triggerMultReset">{{ $vuetify.lang.t('$vuetify.gooboo.reset') }}</v-btn>
      </div>
      <div class="d-flex align-center ma-1">
        <v-autocomplete data-cy="debug-currency-input" class="ma-1" label="Currency" outlined hide-details :items="currencies" v-model="selectedCurrency"></v-autocomplete>
        <v-text-field data-cy="debug-currency-amount" class="ma-1" type="number" label="Amount" outlined hide-details v-model="selectedCurrencyValue"></v-text-field>
        <v-btn data-cy="debug-currency-gain" class="ma-1" color="primary" :disabled="!selectedCurrency || isNaN(selectedCurrencyValue)" @click="triggerCurrency">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</v-btn>
      </div>
      <div class="d-flex align-center ma-1">
        <v-autocomplete class="ma-1" label="Consumable" outlined hide-details :items="consumables" v-model="selectedConsumable"></v-autocomplete>
        <v-text-field class="ma-1" type="number" label="Amount" outlined hide-details v-model="selectedConsumableValue"></v-text-field>
        <v-btn class="ma-1" color="primary" :disabled="!selectedConsumable || isNaN(selectedConsumableValue)" @click="triggerConsumable">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</v-btn>
      </div>
      <div class="d-flex align-center ma-1">
        <v-text-field class="ma-1" type="number" label="Days" min="1" outlined hide-details v-model="autoplayDays"></v-text-field>
        <v-btn class="ma-1" color="primary" :disabled="isNaN(autoplayDays)" @click="triggerAutoplay">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </div>
      <div class="d-flex align-center ma-1">
        <v-text-field class="ma-1" type="number" label="Global level" min="0" outlined hide-details v-model="globalLevelValue"></v-text-field>
        <v-btn class="ma-1" color="primary" :disabled="isNaN(globalLevelValue)" @click="triggerGlobalLevel">{{ $vuetify.lang.t('$vuetify.gooboo.gain') }}</v-btn>
      </div>
      <div class="d-flex align-center ma-1">
        <v-autocomplete class="ma-1" label="Event" outlined hide-details :items="eventList" v-model="selectedEvent"></v-autocomplete>
        <v-btn class="ma-1" color="primary" @click="triggerEvent">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </div>
      <v-text-field class="ma-2" type="number" label="Time mult" min="1" outlined hide-details v-model="timeMult"></v-text-field>
    </div>
    <div class="scroll-container-tab" v-else-if="tab === 1">
      <v-color-picker class="mx-auto my-1" v-model="selectedColor" mode="hsla"></v-color-picker>
      <div class="d-flex align-center ma-1">
        <v-text-field class="ma-1" type="number" step="1" min="0" max="180" label="Hue" outlined hide-details v-model="selectedColorH"></v-text-field>
        <v-text-field class="ma-1" type="number" step="0.01" min="0" max="1" label="Saturation" outlined hide-details v-model="selectedColorS"></v-text-field>
        <v-text-field class="ma-1" type="number" step="0.01" min="0" max="1" label="Luminosity" outlined hide-details v-model="selectedColorL"></v-text-field>
        <v-text-field class="ma-1" type="number" step="1" min="0" label="Amount" outlined hide-details v-model="selectedColorAmount"></v-text-field>
        <v-text-field class="ma-1" type="number" step="1" min="1" label="Minimum width" outlined hide-details v-model="selectedColorWidthMin"></v-text-field>
        <v-text-field class="ma-1" type="number" step="1" min="1" label="Maximum width" outlined hide-details v-model="selectedColorWidthMax"></v-text-field>
        <v-text-field class="ma-1" type="number" step="1" min="0" label="Blending" outlined hide-details v-model="selectedColorBlending"></v-text-field>
        <v-text-field class="ma-1" type="number" step="1" min="0" max="179" label="Rotation" outlined hide-details v-model="selectedColorDeg"></v-text-field>
        <v-text-field class="ma-1" type="number" step="0.01" min="0" max="1" label="Theme modifier" outlined hide-details v-model="selectedColorThemeModifier"></v-text-field>
        <v-btn class="ma-1" color="primary" @click="generateGradient">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </div>
      <div class="w-100">
        <div class="css-preview ma-2 pa-2" :style="`background: ${generatedCssGradientDark};`">{{ generatedCssGradientDark }}</div>
        <div class="css-preview ma-2 pa-2" :style="`background: ${generatedCssGradientLight};`">{{ generatedCssGradientLight }}</div>
      </div>
    </div>
    <div class="scroll-container-tab" v-else-if="tab === 2">
      <v-select clearable class="ma-1" label="Color" outlined hide-details :items="listColor" v-model="chosenColor"></v-select>
      <div style="user-select: text;" v-if="computedColor">
        <div class="d-flex justify-space-between balloon-text-dynamic" v-for="c in computedColor" :key="c.name" :style="`background-color: ${c.hex};`">
          <div>{{ c.name }}</div>
          <div>{{ c.hex }}</div>
          <div>{{ c.h }}</div>
          <div>{{ c.s }}%</div>
          <div>{{ c.l }}%</div>
        </div>
      </div>
      <div style="user-select: text;" v-else>
        <div class="d-flex" v-for="(cval, cname) in computedAllColor" :key="cname">
          <div class="d-flex w-100 balloon-text-dynamic" v-for="c in cval" :key="cname + '-' + c.name" :style="`background-color: ${c.hex};`">
            <div class="w-100 text-center">{{ c.h }}</div>
            <div class="w-100 text-center">{{ c.s }}%</div>
            <div class="w-100 text-center">{{ c.l }}%</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="tab === 3">
      <v-row no-gutters>
        <v-col class="scroll-container-tab" cols="6">
          <card-item class="my-1 mx-auto" id="XD-1337" :cardObject="cardObj"></card-item>
          <v-textarea class="ma-2 pa-2" v-if="cardIconImport" v-model="cardIconJson"></v-textarea>
          <div class="card-icons-preview ma-2 pa-2">{{ generatedCardIcons }}</div>
        </v-col>
        <v-col class="scroll-container-tab" cols="6">
          <div class="ma-1">
            <v-btn block color="primary" @click="importCardObj">Import</v-btn>
          </div>
          <div class="ma-1">
            <v-btn block color="primary" @click="addCardIcon">Add icon</v-btn>
          </div>
          <div class="ma-1 my-2">
            <v-select label="Color" outlined hide-details :items="colorList" v-model="cardColor"></v-select>
          </div>
          <div class="d-flex align-center ma-1" v-for="(singleIcon, key) in cardIcons" :key="'card-icon-' + key">
            <v-text-field class="ma-1" type="number" step="0.05" min="-1" max="1" label="X" outlined hide-details v-model="singleIcon.x"></v-text-field>
            <v-text-field class="ma-1" type="number" step="0.05" min="-1" max="1" label="Y" outlined hide-details v-model="singleIcon.y"></v-text-field>
            <v-text-field class="ma-1" type="number" step="5" label="Rotate (degrees)" outlined hide-details v-model="singleIcon.rotate"></v-text-field>
            <v-text-field class="ma-1" type="number" step="0.05" min="0.1" max="4" label="Size" outlined hide-details v-model="singleIcon.size"></v-text-field>
            <v-text-field class="ma-1" type="text" label="Icon" outlined hide-details v-model="singleIcon.icon"></v-text-field>
            <v-btn large icon @click="cloneCardIcon(singleIcon)"><v-icon>mdi-content-copy</v-icon></v-btn>
            <v-btn large icon @click="removeCardIcon(key)"><v-icon>mdi-close</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="scroll-container-tab" v-else-if="tab === 4">
      <div class="d-flex align-center ma-1">
        <v-text-field class="ma-1" type="number" label="Timestamp" outlined hide-details v-model="testingDate"></v-text-field>
        <v-btn class="ma-1" color="primary" @click="setToCurrentDate">Current</v-btn>
      </div>
      <div class="ma-1">
        <div v-for="(item, key) in testingDateGrid" :key="`date-${ key }`" class="ma-1">
          <span class="grey--text">{{ item.current }}</span> -
          <span class="red--text">{{ item.day }}</span>,
          <span class="amber--text">W{{ item.week }}</span>,
          <span class="green--text">Offset: {{ item.offset }}</span>
          (<span class="blue--text">{{ item.full }}</span>)
        </div>
      </div>
    </div>
    <div class="scroll-container-tab" v-else-if="tab === 5">
      <v-switch
        class="ma-1"
        v-model="includeEmptyStat"
        label="Include empty stats"
        hide-details
      ></v-switch>
      <v-text-field
        class="ma-1"
        v-model="statSearch"
        append-icon="mdi-magnify"
        label="Search"
        outlined
        single-line
        hide-details
      ></v-text-field>
      <v-data-table :headers="statHeaders" :items="statArray" :search="statSearch">
        <template v-slot:item.name="{ item }"><span :class="{'grey--text': item.total === item.default}">{{ item.name }}</span></template>
        <template v-slot:item.value="{ item }"><span :class="{'grey--text': item.value === item.default}">{{ item.display === 'time' ? $formatTime(item.value) : $formatNum(item.value) }}</span></template>
        <template v-slot:item.total="{ item }"><span :class="{'grey--text': item.total === item.default}">{{ item.display === 'time' ? $formatTime(item.total) : $formatNum(item.total) }}</span></template>
      </v-data-table>
    </div>
    <div class="scroll-container-tab" v-else-if="tab === 6">
      <div class="d-flex align-center ma-1">
        <div>{{ playerId }}</div>
        <v-text-field class="ma-1" label="Seed" outlined hide-details v-model="rngSeed"></v-text-field>
        <v-btn class="ma-1" color="primary" @click="seedRngData">Roll</v-btn>
      </div>
      <div v-for="(rngrow, key) in rngOutput" :key="`rngoutput-${ key }`">{{ rngrow }}</div>
    </div>
    <div class="scroll-container-tab" v-else-if="tab === 7">
      <autoplay-graph></autoplay-graph>
    </div>
  </div>
</template>

<script>
import { tick } from '../../js/tick';
import { autoplay } from '../../js/autoplay';
import AutoplayGraph from '../partial/debug/AutoplayGraph.vue';
import { randomFloat, randomInt } from '../../js/utils/random';
import colors from '../../js/theme/colors';
import CardItem from '../partial/card/CardItem.vue';
import { buildNum, capitalize } from '../../js/utils/format';
import { getDay, getWeek } from '../../js/utils/date';
import { mapState } from 'vuex';
import seedrandom from 'seedrandom';
import { encodeFile } from '../../js/savefile';
import { LOCAL_STORAGE_NAME } from '../../js/constants';

const Color = require('color');
const colorVariants = ['lighten5', 'lighten4', 'lighten3', 'lighten2', 'lighten1', 'base', 'darken1', 'darken2', 'darken3', 'darken4'];

export default {
  components: { AutoplayGraph, CardItem },
  data: () => ({
    selectedUnlock: null,
    selectedMult: null,
    selectedMultType: 'mult',
    selectedMultValue: 1,
    selectedCurrency: null,
    selectedCurrencyValue: 0,
    selectedConsumable: null,
    selectedConsumableValue: 0,
    multTypes: ['base', 'mult', 'bonus'],
    autoplayDays: 5,
    globalLevelValue: 0,
    selectedEvent: 'null',
    selectedColor: '#FF0000',
    selectedColorH: 0,
    selectedColorS: 0.1,
    selectedColorL: 0.2,
    selectedColorAmount: 10,
    selectedColorWidthMin: 20,
    selectedColorWidthMax: 40,
    selectedColorBlending: 0,
    selectedColorDeg: 90,
    selectedColorThemeModifier: 0.35,
    generatedCssGradientDark: '#000000',
    generatedCssGradientLight: '#ffffff',
    tab: 0,
    listColor: [],
    chosenColor: null,
    timeMult: null,
    cardIcons: [],
    cardIconImport: false,
    cardIconJson: '',
    cardColor: 'red',
    testingDate: 0,
    statHeaders: [
      {text: 'Name', value: 'name'},
      {text: 'Value', value: 'value'},
      {text: 'Total', value: 'total'},
    ],
    statSearch: '',
    includeEmptyStat: false,
    rngSeed: 'test',
    rngOutput: []
  }),
  computed: {
    ...mapState({
      currentDay: state => state.system.currentDay,
      playerId: state => state.system.playerId,
    }),
    statArray() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.stat)) {
        if (this.includeEmptyStat || elem.total !== elem.default) {
          arr.push({...elem, name: key});
        }
      }
      return arr;
    },
    unlocks() {
      return Object.keys(this.$store.state.unlock);
    },
    mults() {
      return Object.keys(this.$store.state.mult.items);
    },
    currencies() {
      return Object.keys(this.$store.state.currency);
    },
    consumables() {
      return Object.keys(this.$store.state.consumable);
    },
    eventList() {
      return ['null', ...Object.keys(this.$store.state.event.big), ...this.$store.state.event.small];
    },
    totalTime() {
      return this.$store.state.stat.mining_timeSpent.total;
    },
    computedColor() {
      if (!this.chosenColor) {
        return null;
      }
      const col = colors[this.chosenColor];
      if (typeof(col) !== 'object') {
        return [{
          name: 'base',
          hex: col,
          h: Math.round(Color(col).hue()),
          s: Math.round(Color(col).saturationl()),
          l: Math.round(Color(col).luminosity() * 100)
        }];
      }
      return colorVariants.map(el => {
        const colorObj = Color(col[el]);
        return {
          name: el,
          hex: col[el],
          h: Math.round(colorObj.hue()),
          s: Math.round(colorObj.saturationl()),
          l: Math.round(colorObj.luminosity() * 100)
        };
      });
    },
    computedAllColor() {
      let obj = {};
      for (const [name, col] of Object.entries(colors)) {
        obj[name] = typeof(col) !== 'object' ? [{
          name: 'base',
          hex: col,
          h: Math.round(Color(col).hue()),
          s: Math.round(Color(col).saturationl()),
          l: Math.round(Color(col).luminosity() * 100)
        }] : colorVariants.map(el => {
          const colorObj = Color(col[el]);
          return {
            name: el,
            hex: col[el],
            h: Math.round(colorObj.hue()),
            s: Math.round(colorObj.saturationl()),
            l: Math.round(colorObj.luminosity() * 100)
          };
        });
      }
      return obj;
    },
    cardObj() {
      return {feature: 'mining', color: this.cardColor, amount: 70, icons: this.cardIcons};
    },
    generatedCardIcons() {
      let text = '';
      this.cardIcons.forEach((i, key) => {
        text += `{"x": ${i.x}, "y": ${i.y}, "rotate": ${i.rotate}, "size": ${i.size}, "icon": "${i.icon}"}`;
        if ((key + 1) < this.cardIcons.length) {
          text += ',\n';
        }
      });
      return text;
    },
    colorList() {
      return Object.keys(colors);
    },
    testingDateGrid() {
      let arr = [];
      const c = new Date().getTime();
      for (let i = 0; i < 24; i++) {
        const d = new Date(parseInt(this.testingDate) + i * 3600000);
        const cd = new Date(c + i * 3600000);
        arr.push({
          current: cd.toLocaleDateString() + ' ' + cd.toLocaleTimeString(),
          day: getDay(d),
          week: getWeek(d),
          offset: d.getTimezoneOffset(),
          full: d.toISOString()
        });
      }
      return arr;
    }
  },
  mounted() {
    this.listColor = Object.keys(colors);
    this.timeMult = this.$store.state.system.timeMult;
  },
  methods: {
    advance(seconds) {
      tick(seconds, 0);
    },
    deleteSave() {
      localStorage.removeItem(LOCAL_STORAGE_NAME);
      location.reload();
    },
    cleanSave() {
      // Creates a clean savefile with autoplay-friendly settings
      localStorage.setItem(LOCAL_STORAGE_NAME, encodeFile({
        version: "1.3.4",
        timestamp: this.$store.state.system.timestamp,
        theme: "default",
        unlock: {
          debugFeature: true
        },
        settings: {
          general: {
            pause: true,
            dark: true,
            autosaveTimer: null
          },
          notification: {
            note: false,
            achievement: false,
            heirloom: false
          },
          automation: {
            progressMining: 90,
            fightHordeBoss: true
          }
        },
        subfeature: {},
        currency: {},
        stat: {},
        upgrade: {},
        upgradeQueue: {},
        relic: [],
        globalLevel: {},
        keybinds: {},
        note: [],
        consumable: {},
        rng: {},
        cachePage: {}
      }));
      location.reload();
    },
    causeError() {
      let a = {};
      a.push(1);
    },
    triggerUnlock() {
      if (this.selectedUnlock) {
        this.$store.commit('unlock/unlock', this.selectedUnlock);
      }
    },
    triggerLock() {
      if (this.selectedUnlock) {
        this.$store.commit('unlock/lock', this.selectedUnlock);
      }
    },
    triggerMult() {
      if (this.selectedMult && !isNaN(this.selectedMultValue)) {
        this.$store.dispatch('mult/set' + capitalize(this.selectedMultType), {
          name: this.selectedMult,
          key: 'debug',
          value: parseFloat(this.selectedMultValue)
        });
      }
    },
    triggerMultReset() {
      if (this.selectedMult) {
        this.$store.dispatch('mult/removeKey', {
          name: this.selectedMult,
          type: this.selectedMultType,
          key: 'debug'
        });
      }
    },
    triggerCurrency() {
      if (this.selectedCurrency && !isNaN(this.selectedCurrencyValue)) {
        this.$store.commit('currency/add', {
          feature: this.selectedCurrency.split('_')[0],
          name: this.selectedCurrency.split('_')[1],
          amount: parseFloat(this.selectedCurrencyValue)
        });
      }
    },
    triggerConsumable() {
      if (this.selectedConsumable && !isNaN(this.selectedConsumableValue)) {
        this.$store.dispatch('consumable/gain', {
          name: this.selectedConsumable,
          amount: parseFloat(this.selectedConsumableValue)
        });
      }
    },
    triggerAutoplay() {
      autoplay(this.autoplayDays);
    },
    triggerGlobalLevel() {
      this.$store.dispatch('meta/globalLevelPart', {key: 'debug', amount: Number(this.globalLevelValue)});
    },
    triggerEvent() {
      const currentEvent = this.$store.getters['event/currentEvent'];
      if (currentEvent !== null) {
        this.$store.dispatch('event/end', currentEvent);
      }
      this.$store.commit('event/updateKey', {key: 'force_event', value: this.selectedEvent !== 'null' ? this.selectedEvent : null});
      const nextEvent = this.$store.getters['event/currentEvent'];
      if (this.selectedEvent !== 'null') {
        if (this.$store.getters['event/eventIsBig'](this.selectedEvent)) {
          this.$store.dispatch('currency/reset', {feature: 'event', type: 'token'});
        }
        this.$store.dispatch('event/start', this.selectedEvent);
      } else if (nextEvent !== null) {
        this.$store.dispatch('event/start', nextEvent);
      }
    },
    generateGradient() {
      let gradientDark = `repeating-linear-gradient(${this.selectedColorDeg}deg`;
      let gradientLight = `repeating-linear-gradient(${this.selectedColorDeg}deg`;
      let pixels = 0;
      const hue = parseInt(this.selectedColorH);
      const saturation = parseFloat(this.selectedColorS);
      const luminosity = parseFloat(this.selectedColorL);
      const pixelsMin = parseInt(this.selectedColorWidthMin);
      const pixelsMax = parseInt(this.selectedColorWidthMax);
      const blend = parseInt(this.selectedColorBlending);
      const themeModifier = parseFloat(this.selectedColorThemeModifier);
      let firstColor = null;
      for (let i = 0; i < this.selectedColorAmount; i++) {
        const addPixels = randomInt(pixelsMin, pixelsMax);
        let color = Color(this.selectedColor).rotate(randomInt(0 - hue, hue)).saturate(randomFloat(0 - saturation, saturation)).lighten(randomFloat(0 - luminosity, luminosity));
        if (i === 0) {
          firstColor = color;
        }
        gradientDark += `, ${color.darken(themeModifier).hex()} ${pixels}px ${pixels + addPixels}px`;
        gradientLight += `, ${color.lighten(themeModifier).hex()} ${pixels}px ${pixels + addPixels}px`;
        pixels += addPixels + blend;
        if (blend > 0 && (i + 1) >= this.selectedColorAmount) {
          gradientDark += `, ${firstColor.darken(themeModifier).hex()} ${pixels}px ${pixels}px`;
          gradientLight += `, ${firstColor.lighten(themeModifier).hex()} ${pixels}px ${pixels}px`;
        }
      }
      gradientDark += ')';
      gradientLight += ')';
      this.generatedCssGradientDark = gradientDark;
      this.generatedCssGradientLight = gradientLight;
    },
    addCardIcon() {
      this.cardIcons.push({x: 0, y: 0, rotate: 0, size: 1, icon: 'mdi-circle'});
    },
    cloneCardIcon(obj) {
      this.cardIcons.push({...obj});
    },
    removeCardIcon(index) {
      this.cardIcons.splice(index, 1);
    },
    importCardObj() {
      if (this.cardIconImport) {
        try {
          const iconJson = JSON.parse(`{"arr":[${this.cardIconJson}]}`);
          this.$set(this, 'cardIcons', iconJson.arr);
          this.cardIconImport = false;
          this.cardIconJson = '';
        } catch (e) {
          console.log(e);
        }
      } else {
        this.cardIconImport = true;
      }
    },
    deleteAutoplayData() {
      this.$store.commit('system/updateKey', {key: 'autoplayData', value: []});
    },
    setToCurrentDate() {
      this.testingDate = this.$store.state.system.timestamp * 1000;
    },
    maxSchool() {
      for (const [key, elem] of Object.entries(this.$store.state.school)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          this.$store.commit('school/updateKey', {name: key, key: 'grade', value: 100});
        }
      }
    },
    maxCrop() {
      for (const [key, elem] of Object.entries(this.$store.state.farm.crop)) {
        if (elem.found) {
          this.$store.dispatch('farm/getCropExp', {crop: key, value: buildNum(1, 'M')});
        }
      }
    },
    seedRngData() {
      let myrng = seedrandom(this.rngSeed, {state: true});
      this.rngOutput = [];
      for (let i = 0; i < 20; i++) {
        this.rngOutput.push(myrng());
      }
      console.log(JSON.stringify(myrng.state()));
    }
  },
  watch: {
    timeMult(newVal, oldVal) {
      if (oldVal !== newVal && !isNaN(newVal) && newVal >= 1) {
        this.$store.commit('system/updateKey', {key: 'timeMult', value: newVal});
      }
    }
  }
}
</script>
