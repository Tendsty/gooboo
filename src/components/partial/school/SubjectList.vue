<template>
  <div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <currency class="ma-1" name="school_book" :gain-base="subjectsBookGain">
        <alert-text type="info">{{ $vuetify.lang.t(`$vuetify.school.subjectBookGain`) }}</alert-text>
      </currency>
      <currency class="ma-1" name="school_examPass">
        <alert-text type="info">{{ $vuetify.lang.t(`$vuetify.school.passCapGain`) }}</alert-text>
        <alert-text type="info">{{ $vuetify.lang.t(`$vuetify.school.passAutoconvert`, $formatNum(goldenDustAuto)) }}</alert-text>
      </currency>
      <gb-tooltip v-if="dustMult < 1" :title-text="$vuetify.lang.t(`$vuetify.school.beginner.title`)">
        <template v-slot:activator="{ on, attrs }">
          <v-icon large class="ml-2" v-bind="attrs" v-on="on">mdi-head-question</v-icon>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.school.beginner.description`, $formatNum(dustMult * 100, true)) }}</div>
      </gb-tooltip>
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
import { SCHOOL_EXAM_DUST_MIN } from '../../../js/constants';
import Currency from '../../render/Currency.vue';
import AlertText from '../render/AlertText.vue';
import Subject from './Subject.vue';

export default {
  components: { Subject, Currency, AlertText },
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
    goldenDustAuto() {
      return Math.round(SCHOOL_EXAM_DUST_MIN * this.$store.getters['school/dustMult']);
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
    }
  }
}
</script>
