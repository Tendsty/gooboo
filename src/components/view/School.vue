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
      <v-btn class="ma-2" v-if="mode === 'practice'" color="error" @click="leaveSchool">{{ $vuetify.lang.t('$vuetify.gooboo.leave') }}</v-btn>
    </div>
    <template v-if="canSeeMinigame">
      <math-minigame v-if="playing === 'math'" @score="updateScore" @timer="tickTimer"></math-minigame>
      <literature-minigame v-else-if="playing === 'literature'" @score="updateScore"></literature-minigame>
      <history-minigame v-else-if="playing === 'history'" :school-mode="mode" @score="updateScore" @timer="updateTimer" @stop="finishSchool"></history-minigame>
      <art-minigame v-else-if="playing === 'art'" @score="updateScore" @timer="tickTimer"></art-minigame>
      <chemistry-minigame v-else-if="playing === 'chemistry'" :school-mode="mode" @score="updateScore" @timer="updateTimer" @stop="finishSchool"></chemistry-minigame>
    </template>
    <div v-else class="text-center scoreboard-text">{{ $vuetify.lang.t(`$vuetify.school.${ mode === 'exam' ? 'beginExam' : 'begin' }`) }}</div>
  </div>
  <div v-else>
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#school"><tab-icon-text :text="$vuetify.lang.t('$vuetify.school.school')" icon="mdi-school"></tab-icon-text></v-tab>
      <v-tab v-if="canSeeLibrary" href="#library">
        <v-badge dot :value="hasLibraryBadge">
          <tab-icon-text :text="$vuetify.lang.t('$vuetify.school.library')" icon="mdi-book"></tab-icon-text>
        </v-badge>
      </v-tab>
    </v-tabs>
    <subject-list v-if="tab === 'school'" :class="{'scroll-container-tab': $vuetify.breakpoint.mdAndUp}" @practice="startPractice" @study="startStudy" @exam="startExam"></subject-list>
    <book-library v-else-if="tab === 'library'" :class="{'scroll-container-tab': $vuetify.breakpoint.mdAndUp}"></book-library>
  </div>
</template>

<script>
import MathMinigame from '../partial/school/MathMinigame.vue';
import LiteratureMinigame from '../partial/school/LiteratureMinigame.vue';
import SubjectList from '../partial/school/SubjectList.vue';
import TabIconText from '../partial/render/TabIconText.vue';
import HistoryMinigame from '../partial/school/HistoryMinigame.vue';
import ArtMinigame from '../partial/school/ArtMinigame.vue';
import { SCHOOL_EXAM_PASS_PRICE, SCHOOL_EXAM_TIME, SCHOOL_STUDY_TIME } from '../../js/constants';
import BookLibrary from '../partial/school/BookLibrary.vue';
import ChemistryMinigame from '../partial/school/ChemistryMinigame.vue';

export default {
  components: { MathMinigame, LiteratureMinigame, SubjectList, TabIconText, HistoryMinigame, ArtMinigame, BookLibrary, ChemistryMinigame },
  data: () => ({
    timer: 0,
    playing: null,
    mode: null,
    intervalId: null,
    score: 0,
    tab: 'school',
    hasCustomTimer: ['history', 'chemistry']
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
      return this.playing ? this.$store.state.school.subject[this.playing] : null;
    },
    canSeeLibrary() {
      return this.$store.state.unlock.schoolLibrarySubfeature.see;
    },
    hasLibraryBadge() {
      return this.$store.state.system.bookHint.length > 0;
    }
  },
  methods: {
    startPractice(name) {
      this.timer = 0;
      this.score = 0;
      this.playing = name;
      this.mode = 'practice';
      if (!this.hasCustomTimer.includes(name)) {
        this.intervalId = setInterval(this.tickTimer, 1000);
      }
    },
    startStudy(name) {
      this.timer = this.hasCustomTimer.includes(name) ? 0 : (SCHOOL_STUDY_TIME + 1);
      this.score = 0;
      this.playing = name;
      this.mode = 'study';
      if (!this.hasCustomTimer.includes(name)) {
        this.intervalId = setInterval(this.tickTimer, 1000);
      }
    },
    startExam(name) {
      const passesTaken = Math.min(this.$store.state.school.multipass, this.$store.getters['currency/value']('school_examPass'));
      const passSapphiresNeeded = (this.$store.state.school.multipass - passesTaken) * SCHOOL_EXAM_PASS_PRICE;
      if (this.$store.getters['currency/value']('gem_sapphire') >= passSapphiresNeeded) {
        this.$store.dispatch('currency/spend', {feature: 'school', name: 'examPass', amount: passesTaken});
        if (passSapphiresNeeded > 0) {
          this.$store.dispatch('currency/spend', {feature: 'gem', name: 'sapphire', amount: passSapphiresNeeded});
        }
        this.timer = this.hasCustomTimer.includes(name) ? 0 : (SCHOOL_EXAM_TIME + 1);
        this.score = 0;
        this.playing = name;
        this.mode = 'exam';
        if (!this.hasCustomTimer.includes(name)) {
          this.intervalId = setInterval(this.tickTimer, 1000);
        }
      }
    },
    tickTimer(seconds = 1) {
      if (this.mode === 'practice') {
        this.timer += seconds;
      } else {
        this.timer -= seconds;
      }
      if (this.timer <= 0) {
        this.finishSchool();
      }
    },
    finishSchool(score) {
      if (score !== undefined) {
        this.score = score;
      }
      this.$store.dispatch('school/finishSchool', {mode: this.mode, score: this.score, subject: this.playing});
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
        this.$store.dispatch('school/finishSchool', {mode: 'exam', score: Math.min(value, this.currentSubject.scoreGoal), subject: this.playing});
        this.leaveSchool();
      }
    },
    updateTimer(value) {
      this.timer = value;
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
