<style scoped>
.scoreboard-text {
  font-size: 28px;
}
.large-label-icon {
  width: 36px !important;
  height: 36px !important;
}
@keyframes score-add-dark {
  0%   {color: var(--v-success-base);}
  100% {color: #FFFFFF;}
}
@keyframes score-remove-dark {
  0%   {color: var(--v-error-base);}
  100% {color: #FFFFFF;}
}
@keyframes score-add-light {
  0%   {color: var(--v-success-base);}
  100% {color: rgba(0, 0, 0, 0.54);}
}
@keyframes score-remove-light {
  0%   {color: var(--v-error-base);}
  100% {color: rgba(0, 0, 0, 0.54);}
}
.score-add-dark {
  animation: score-add-dark 1s cubic-bezier(0.85, 0, 1.0, 1.0);
}
.score-remove-dark {
  animation: score-remove-dark 1s cubic-bezier(0.85, 0, 1.0, 1.0);
}
.score-add-light {
  animation: score-add-light 1s cubic-bezier(0.85, 0, 1.0, 1.0);
}
.score-remove-light {
  animation: score-remove-light 1s cubic-bezier(0.85, 0, 1.0, 1.0);
}
</style>

<template>
  <div v-if="playing !== null">
    <div class="text-center ma-2">
      <v-chip class="px-4" large>
        <v-icon class="large-label-icon mr-2" large>mdi-timer</v-icon>
        <span class="scoreboard-text">{{ $formatTime(minigameTimer) }}</span>
      </v-chip>
      <v-icon>mdi-circle-small</v-icon>
      <v-chip class="px-4" large>
        <v-icon id="score-marker" class="large-label-icon mr-2" large>mdi-marker-check</v-icon>
        <span class="scoreboard-text">{{ Math.floor(score) }}</span>
        <span v-if="mode === 'exam'" class="scoreboard-text">&nbsp;/&nbsp;{{ currentSubject.scoreGoal }}</span>
      </v-chip>
      <v-btn class="ma-2" v-if="mode === 'practice'" color="error" @click="leaveSchool">Leave</v-btn>
    </div>
    <template v-if="canSeeMinigame">
      <math-minigame v-if="playing === 'math'" @score="updateScore"></math-minigame>
      <literature-minigame v-else-if="playing === 'literature'" @score="updateScore"></literature-minigame>
      <history-minigame v-else-if="playing === 'history'" :school-mode="mode" @score="updateScore" @stop="finishSchool"></history-minigame>
      <art-minigame v-else-if="playing === 'art'" @score="updateScore"></art-minigame>
    </template>
    <div v-else class="text-center scoreboard-text">{{ $vuetify.lang.t(`$vuetify.school.${ mode === 'exam' ? 'beginExam' : 'begin' }`) }}</div>
  </div>
  <div v-else-if="$vuetify.breakpoint.mdAndUp">
    <v-row no-gutters>
      <v-col cols="6" xl="9" class="scroll-container">
        <subject-list @practice="startPractice" @study="startStudy" @exam="startExam"></subject-list>
      </v-col>
      <v-col cols="6" xl="3" class="scroll-container">
        <book-upgrades></book-upgrades>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#school"><tab-icon-text :text="$vuetify.lang.t('$vuetify.school.school')" icon="mdi-school"></tab-icon-text></v-tab>
      <v-tab href="#library"><tab-icon-text :text="$vuetify.lang.t('$vuetify.school.library')" icon="mdi-book"></tab-icon-text></v-tab>
    </v-tabs>
    <subject-list v-if="tab === 'school'" @practice="startPractice" @study="startStudy" @exam="startExam"></subject-list>
    <book-upgrades v-else-if="tab === 'library'"></book-upgrades>
  </div>
</template>

<script>
import MathMinigame from '../partial/school/MathMinigame.vue';
import LiteratureMinigame from '../partial/school/LiteratureMinigame.vue';
import BookUpgrades from '../partial/school/BookUpgrades.vue';
import SubjectList from '../partial/school/SubjectList.vue';
import TabIconText from '../partial/render/TabIconText.vue';
import HistoryMinigame from '../partial/school/HistoryMinigame.vue';
import ArtMinigame from '../partial/school/ArtMinigame.vue';
import { SCHOOL_EXAM_TIME, SCHOOL_STUDY_TIME } from '../../js/constants';

export default {
  components: { MathMinigame, LiteratureMinigame, BookUpgrades, SubjectList, TabIconText, HistoryMinigame, ArtMinigame },
  data: () => ({
    timer: 0,
    playing: null,
    mode: null,
    intervalId: null,
    score: 0,
    tab: 'school'
  }),
  computed: {
    canSeeMinigame() {
      return (this.mode === 'exam' && this.timer <= SCHOOL_EXAM_TIME) || (this.mode === 'study' && this.timer <= SCHOOL_STUDY_TIME) || this.mode === 'practice';
    },
    minigameTimer() {
      if (this.mode === 'exam') {
        return Math.min(this.timer, SCHOOL_EXAM_TIME);
      } else if (this.mode === 'study') {
        return Math.min(this.timer, SCHOOL_STUDY_TIME);
      } else {
        return this.timer;
      }
    },
    currentSubject() {
      return this.playing ? this.$store.state.school[this.playing] : null;
    }
  },
  methods: {
    startPractice(name) {
      this.timer = 0;
      this.score = 0;
      this.playing = name;
      this.mode = 'practice';
      this.intervalId = setInterval(this.tickTimer, 1000);
    },
    startStudy(name) {
      this.timer = SCHOOL_STUDY_TIME + 1;
      this.score = 0;
      this.playing = name;
      this.mode = 'study';
      this.intervalId = setInterval(this.tickTimer, 1000);
    },
    startExam(name) {
      if (this.$store.getters['currency/value']('school_examPass') >= 1) {
        this.$store.dispatch('currency/spend', {feature: 'school', name: 'examPass', amount: 1});
        this.timer = SCHOOL_EXAM_TIME + 1;
        this.score = 0;
        this.playing = name;
        this.mode = 'exam';
        this.intervalId = setInterval(this.tickTimer, 1000);
      }
    },
    tickTimer() {
      if (this.mode === 'practice') {
        this.timer++;
      } else {
        this.timer--;
      }
      if (this.timer <= 0) {
        this.finishSchool();
      }
    },
    finishSchool() {
      // Calculate elo and rewards
      const score = (this.mode === 'exam' ? 1 : 2) * this.score / this.currentSubject.scoreGoal - ((this.mode === 'exam' || this.currentSubject.currentGrade <= 0) ? 0 : 1);

      let gradeGain = 0;
      let gradePlus = false;
      let dustGain = 0;

      if (this.mode === 'study' && this.currentSubject.currentGrade >= this.currentSubject.grade) {
        const newProgress = Math.max(score * 0.2 + this.currentSubject.progress, 0);
        if (newProgress >= 1) {
          gradePlus = true;
          const newGrade = this.currentSubject.grade + 1;
          this.$store.commit('stat/increaseTo', {feature: 'school', name: 'highestGrade', value: newGrade});
          this.$store.commit('school/updateKey', {name: this.playing, key: 'grade', value: newGrade});
          this.$store.commit('school/updateKey', {name: this.playing, key: 'currentGrade', value: newGrade});
          this.$store.commit('school/updateKey', {name: this.playing, key: 'progress', value: 0});
        } else {
          gradeGain = newProgress - this.currentSubject.progress;
          this.$store.commit('school/updateKey', {name: this.playing, key: 'progress', value: newProgress});
        }
      }
      if (this.mode === 'exam') {
        dustGain = this.$store.getters['school/examReward'](score, this.currentSubject.currentGrade);
        this.$store.dispatch('currency/gain', {feature: 'school', name: 'goldenDust', amount: dustGain});
        this.$store.dispatch('note/find', 'school_1');
      }

      this.$store.commit('system/addNotification', {color: 'success', timeout: 5000, message: {
        type: 'school',
        isExam: this.mode === 'exam',
        score: this.score,
        perfectScore: false,
        grade: gradeGain,
        gradePlus,
        dust: dustGain
      }});

      this.leaveSchool();
    },
    intervalStop() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    updateScore(value) {
      const diff = Math.floor(value) - Math.floor(this.score);
      this.score = value;
      const element = document.getElementById('score-marker');
      if (element) {
        if (diff > 0) {
          element.classList.remove('score-add-dark', 'score-add-light', 'score-remove-dark', 'score-remove-light');
          void element.offsetWidth;
          element.classList.add(`score-add-${ this.$vuetify.theme.dark ? 'dark' : 'light' }`);
        } else if (diff < 0 || value === 0) {
          element.classList.remove('score-add-dark', 'score-add-light', 'score-remove-dark', 'score-remove-light');
          void element.offsetWidth;
          element.classList.add(`score-remove-${ this.$vuetify.theme.dark ? 'dark' : 'light' }`);
        }
      }

      // Immediately end exam if you get a perfect score
      if (this.mode === 'exam' && value >= this.currentSubject.scoreGoal) {
        const dustGain = this.$store.getters['school/examReward'](1, this.currentSubject.currentGrade);
        this.$store.dispatch('currency/gain', {feature: 'school', name: 'goldenDust', amount: dustGain});
        this.$store.dispatch('note/find', 'school_1');

        const gradePlus = this.currentSubject.currentGrade >= this.currentSubject.grade;
        if (gradePlus) {
          const newGrade = this.currentSubject.grade + 1;
          this.$store.commit('stat/increaseTo', {feature: 'school', name: 'highestGrade', value: newGrade});
          this.$store.commit('school/updateKey', {name: this.playing, key: 'grade', value: newGrade});
          this.$store.commit('school/updateKey', {name: this.playing, key: 'currentGrade', value: newGrade});
          this.$store.commit('school/updateKey', {name: this.playing, key: 'progress', value: 0});
        }

        this.$store.commit('system/addNotification', {color: 'success', timeout: 5000, message: {
          type: 'school',
          isExam: true,
          score: value,
          perfectScore: true,
          gradePlus,
          dust: dustGain
        }});

        this.leaveSchool();
      }
    },
    leaveSchool() {
      this.timer = 0;
      this.score = 0;
      this.playing = null;
      this.mode = null;
      this.intervalStop();
    }
  },
  destroyed() {
    this.intervalStop();
  }
}
</script>
