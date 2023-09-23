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
        <span class="scoreboard-text">{{ $formatTime(Math.min(30, timer)) }}</span>
      </v-chip>
      <v-icon>mdi-circle-small</v-icon>
      <v-chip class="px-4" large>
        <v-icon id="score-marker" class="large-label-icon mr-2" large>mdi-marker-check</v-icon>
        <span class="scoreboard-text">{{ score }}</span>
      </v-chip>
    </div>
    <template v-if="timer <= 30">
      <math-minigame v-if="playing === 'math'" @score="updateScore"></math-minigame>
      <literature-minigame v-else-if="playing === 'literature'" @score="updateScore"></literature-minigame>
      <history-minigame v-else-if="playing === 'history'" @score="updateScore"></history-minigame>
      <art-minigame v-else-if="playing === 'art'" @score="updateScore"></art-minigame>
    </template>
    <div v-else class="text-center scoreboard-text">{{ $vuetify.lang.t('$vuetify.school.begin') }}</div>
  </div>
  <div v-else-if="$vuetify.breakpoint.mdAndUp">
    <v-row no-gutters>
      <v-col cols="6" xl="9" class="scroll-container">
        <subject-list @play="startPlaying"></subject-list>
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
    <subject-list v-if="tab === 'school'" @play="startPlaying"></subject-list>
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

export default {
  components: { MathMinigame, LiteratureMinigame, BookUpgrades, SubjectList, TabIconText, HistoryMinigame, ArtMinigame },
  data: () => ({
    timer: 0,
    playing: null,
    intervalId: null,
    score: 0,
    tab: 'school'
  }),
  methods: {
    startPlaying(name) {
      this.timer = 31;
      this.score = 0;
      this.playing = name;
      this.intervalId = setInterval(this.tickTimer, 1000);
    },
    tickTimer() {
      this.timer--;
      if (this.timer <= 0) {
        // Calculate elo and rewards
        let score = 0;
        switch (this.playing) {
          case 'math':
          case 'literature':
          case 'art':
            score = this.score / 5 - 1;
            break;
          case 'history':
            score = this.score * 2 / 5 - 1;
            break;
        }
        const elo = Math.max(0, this.$store.state.school[this.playing].elo + score * 20);
        const grade = this.$store.state.school[this.playing].grade;
        const projectedGrade = elo + 200;
        this.$store.commit('school/updateKey', {name: this.playing, key: 'elo', value: elo});
        const gradeGain = (projectedGrade - grade) * 0.15 + Math.min(1, score) * 40;
        if (gradeGain > 0) {
          const newGrade = grade + gradeGain;
          this.$store.commit('school/updateKey', {name: this.playing, key: 'grade', value: newGrade});
          this.$store.commit('stat/increaseTo', {feature: 'school', name: 'highestGrade', value: newGrade});
        }

        const dustGain = Math.round(Math.pow(score + 1, 0.5) * (elo * 0.0008 + 1) * 70);
        if (dustGain > 0) {
          this.$store.dispatch('currency/gain', {feature: 'school', name: 'goldenDust', amount: dustGain});
          this.$store.dispatch('note/find', 'school_1');
        }

        this.$store.commit('system/addNotification', {color: 'success', timeout: 5000, message: {
          type: 'school',
          score: this.score,
          grade: gradeGain,
          dust: dustGain
        }});

        // Reset everything
        this.timer = 0;
        this.score = 0;
        this.playing = null;
        this.intervalStop();
      }
    },
    intervalStop() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    updateScore(value) {
      const diff = value - this.score;
      this.score = value;
      const element = document.getElementById('score-marker');
      if (element) {
        if (diff > 0) {
          element.classList.remove('score-add-dark', 'score-add-light', 'score-remove-dark', 'score-remove-light');
          void element.offsetWidth;
          element.classList.add(`score-add-${ this.$vuetify.theme.dark ? 'dark' : 'light' }`);
        } else {
          element.classList.remove('score-add-dark', 'score-add-light', 'score-remove-dark', 'score-remove-light');
          void element.offsetWidth;
          element.classList.add(`score-remove-${ this.$vuetify.theme.dark ? 'dark' : 'light' }`);
        }
      }
    }
  },
  destroyed() {
    this.intervalStop();
  }
}
</script>
