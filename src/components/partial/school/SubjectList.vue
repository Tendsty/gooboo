<template>
  <div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <currency class="ma-1" name="school_book" :gain-base="subjectsBookGain">
        <alert-text type="info">{{ $vuetify.lang.t(`$vuetify.school.subjectBookGain`) }}</alert-text>
      </currency>
      <currency class="ma-1" name="school_examPass">
        <alert-text type="info">{{ $vuetify.lang.t(`$vuetify.school.passCapGain`, $formatTime(secondsUntilDailyReset)) }}</alert-text>
      </currency>
      <div v-if="canBuyPass" class="d-flex align-center full-h">
        <gb-tooltip :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-btn small class="ma-1 pa-1" color="success" min-width="32" min-height="32" :disabled="!canAffordPass" @click="buyPass"><v-icon>mdi-plus</v-icon></v-btn>
            </div>
          </template>
          <div class="d-flex align-center mt-0">
            <span>{{ $vuetify.lang.t(`$vuetify.school.buyPass`) }}</span>
            <price-tag class="ml-1" currency="gem_sapphire" :amount="passPrice"></price-tag>
          </div>
        </gb-tooltip>
      </div>
      <div v-if="dustMult < 1" class="d-flex align-center full-h">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.school.beginner.title`)">
          <template v-slot:activator="{ on, attrs }">
            <v-icon large class="ml-2" v-bind="attrs" v-on="on">mdi-head-question</v-icon>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.school.beginner.description`, $formatNum(dustMult * 100, true)) }}</div>
        </gb-tooltip>
      </div>
    </div>
    <v-row no-gutters>
      <v-col v-for="subject in subjects" :key="subject" cols="12" lg="6" xl="4">
        <subject
          :name="subject"
          class="ma-1"
          @practice="practice(subject)"
          @study="study(subject)"
          @exam="exam(subject)"
        ></subject>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SCHOOL_EXAM_PASS_PRICE, SECONDS_PER_DAY } from '../../../js/constants';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';
import AlertText from '../render/AlertText.vue';
import Subject from './Subject.vue';

export default {
  components: { Subject, Currency, AlertText, PriceTag },
  computed: {
    ...mapGetters({
      dustMult: 'school/dustMult',
      subjectsBookGain: 'school/subjectsBookGain'
    }),
    subjects() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.school)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          arr.push(key);
        }
      }
      return arr;
    },
    canBuyPass() {
      return this.$store.getters['currency/value']('school_examPass') <= 0;
    },
    canAffordPass() {
      return this.$store.getters['currency/value']('gem_sapphire') >= SCHOOL_EXAM_PASS_PRICE;
    },
    passPrice() {
      return SCHOOL_EXAM_PASS_PRICE;
    },
    secondsUntilDailyReset() {
      return SECONDS_PER_DAY - (this.$store.state.system.timestamp % SECONDS_PER_DAY);
    }
  },
  methods: {
    practice(name) {
      this.$emit('practice', name);
    },
    study(name) {
      this.$emit('study', name);
    },
    exam(name) {
      this.$emit('exam', name);
    },
    buyPass() {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'schoolExamPass',
          price: {gem_sapphire: SCHOOL_EXAM_PASS_PRICE},
          gain: {school_examPass: 1},
        }});
      } else {
        this.$store.dispatch('school/buyPass', this.name);
      }
    }
  }
}
</script>
