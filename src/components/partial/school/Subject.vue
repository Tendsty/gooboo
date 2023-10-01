<style scoped>
.grade-text {
  width: 120px;
  height: 52px;
  font-weight: 700;
  font-size: 48px;
}
.subject-help {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>

<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.school.${ name }.name`) }}</v-card-title>
    <v-card-subtitle class="pa-1 text-center">{{ $vuetify.lang.t(`$vuetify.school.${ name }.subtitle`) }}</v-card-subtitle>
    <v-card-text class="pb-0">
      <div class="d-flex align-center">
        <v-btn icon :disabled="subject.currentGrade <= 0" @click="removeGrade"><v-icon>mdi-step-backward</v-icon></v-btn>
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.school.grade`)">
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex flex-shrink-0 justify-center align-center grade-text bg-tile-default rounded-lg elevation-4" :class="`${ gradeColor }--text`" style="width: 90px;" v-bind="attrs" v-on="on">{{ gradeName }}</div>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.school.gradeDescription`) }}</div>
        </gb-tooltip>
        <v-btn icon class="mr-2" :disabled="isMax" @click="addGrade"><v-icon>mdi-step-forward</v-icon></v-btn>
        <v-progress-linear v-if="isMax" class="rounded" height="18" :value="subject.progress * 100"></v-progress-linear>
        <div v-else class="d-flex flex-grow-1 justify-center align-center rounded success" style="height: 18px;"><v-icon small>mdi-check</v-icon></div>
      </div>
    </v-card-text>
    <v-card-actions class="justify-space-around">
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on" @click="practice">{{ $vuetify.lang.t(`$vuetify.school.practice`) }}</v-btn>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.school.practiceDescription`) }}</div>
      </gb-tooltip>
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on" @click="study">{{ $vuetify.lang.t(`$vuetify.school.study`) }}</v-btn>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.school.studyDescription`, $formatTime(studyTime), $formatNum(subject.scoreGoal / 2, true)) }}</div>
        <div v-if="subject.grade <= 0">{{ $vuetify.lang.t(`$vuetify.school.studyNoF`) }}</div>
      </gb-tooltip>
      <gb-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-btn color="primary" :disabled="!canAffordExam" @click="exam">
              <v-icon class="mr-2">mdi-ticket-account</v-icon>
              {{ $vuetify.lang.t(`$vuetify.school.takeExam`) }}
            </v-btn>
          </div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.school.takeExamDescription`, $formatTime(examTime), $formatNum(goldenDustMin), $formatNum(goldenDustMax), $formatNum(subject.scoreGoal)) }}</div>
        <div>
          <span>{{ $vuetify.lang.t(`$vuetify.school.takeExamCost`) }}&nbsp;</span>
          <price-tag currency="school_examPass" :amount="1"></price-tag>
        </div>
        <alert-text type="info" v-if="name === 'history'">{{ $vuetify.lang.t(`$vuetify.school.history.examInfo`) }}</alert-text>
        <alert-text type="error" v-if="goldenDust.value >= goldenDust.cap">{{ $vuetify.lang.t(`$vuetify.school.examDustFull`) }}</alert-text>
        <alert-text type="warning" v-else-if="(goldenDust.value + goldenDustMax) > goldenDust.cap">{{ $vuetify.lang.t(`$vuetify.school.examDustOvercap`) }}</alert-text>
        <alert-text type="error" v-if="subject.currentGrade <= 0">
          <span>{{ $vuetify.lang.t(`$vuetify.school.takeExamNoF`) }}</span>
          <span v-if="subject.grade <= 0">&nbsp;{{ $vuetify.lang.t(`$vuetify.school.takeExamNoFStudy`) }}</span>
        </alert-text>
      </gb-tooltip>
    </v-card-actions>
    <gb-tooltip :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="subject-help" small v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.school.${ name }.description`) }}</div>
    </gb-tooltip>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { SCHOOL_EXAM_DUST_MIN, SCHOOL_EXAM_TIME, SCHOOL_STUDY_TIME } from '../../../js/constants';
import { formatGrade } from '../../../js/utils/format';
import PriceTag from '../../render/PriceTag.vue';
import AlertText from '../render/AlertText.vue';

export default {
  components: { PriceTag, AlertText },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      curr: state => state.currency.school_book,
      goldenDust: state => state.currency.school_goldenDust
    }),
    subject() {
      return this.$store.state.school[this.name];
    },
    isMax() {
      return this.subject.currentGrade >= this.subject.grade;
    },
    gradeColor() {
      const gradeTier = Math.floor((this.subject.currentGrade + 2) / 3);
      switch (gradeTier) {
        case 0:
          return 'red';
        case 1:
          return 'orange';
        case 2:
          return 'amber';
        case 3:
          return 'light-green';
        case 4:
          return 'green';
        default:
          return 'blue';
      }
    },
    gradeName() {
      return formatGrade(this.subject.currentGrade);
    },
    canAffordExam() {
      return this.subject.currentGrade >= 1 && this.$store.getters['currency/value']('school_examPass') >= 1;
    },
    studyTime() {
      return SCHOOL_STUDY_TIME;
    },
    examTime() {
      return SCHOOL_EXAM_TIME;
    },
    goldenDustMin() {
      return Math.round(SCHOOL_EXAM_DUST_MIN * this.$store.getters['school/dustMult']);
    },
    goldenDustMax() {
      return this.$store.getters['school/examReward'](1, this.subject.currentGrade);
    }
  },
  methods: {
    practice() {
      this.$emit('practice');
    },
    study() {
      this.$emit('study');
    },
    exam() {
      this.$emit('exam');
    },
    addGrade() {
      this.$store.commit('school/updateKey', {name: this.name, key: 'currentGrade', value: Math.min(this.subject.currentGrade + 1, this.subject.grade)});
    },
    removeGrade() {
      this.$store.commit('school/updateKey', {name: this.name, key: 'currentGrade', value: Math.max(this.subject.currentGrade - 1, 0)});
    }
  }
}
</script>
