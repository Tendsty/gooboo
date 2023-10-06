<style scoped>
.date-text {
  font-size: 32px;
}
.date-text-mobile {
  font-size: 28px;
}
.answer-input {
  width: 300px;
  max-width: 300px;
}
</style>

<template>
  <div v-if="answering">
    <div class="d-flex justify-center align-center flex-wrap">
      <div v-if="question !== null" class="d-flex align-center date-text ma-1 pa-2 rounded balloon-text-dynamic" :class="[colors[dates[question].id], {'date-text-mobile': $vuetify.breakpoint.xsOnly}]">
        <v-icon class="mr-2" large>{{ icons[dates[question].id] }}</v-icon>
        <span>{{ $vuetify.lang.t(`$vuetify.school.history.year`, '???') }}</span>
      </div>
      <v-text-field id="answer-input-history" class="answer-input ma-1" type="number" @keydown.enter.prevent="giveAnswer" outlined hide-details autofocus v-model="answer" :disabled="answersGiven >= 5"></v-text-field>
      <v-btn class="ma-1" :large="$vuetify.breakpoint.smAndAbove" color="primary" @click="giveAnswerOnButton" :disabled="answersGiven >= 5">{{ $vuetify.lang.t(`$vuetify.school.answer`) }}</v-btn>
    </div>
  </div>
  <div v-else>
    <div class="d-flex justify-center flex-wrap ma-1">
      <div v-for="(item, key) in dates" class="d-flex align-center date-text ma-1 pa-2 rounded balloon-text-dynamic" :class="[colors[item.id], {'date-text-mobile': $vuetify.breakpoint.xsOnly}]" :key="key">
        <v-icon class="mr-2" large>{{ icons[item.id] }}</v-icon>
        <span>{{ $vuetify.lang.t(`$vuetify.school.history.year`, item.year) }}</span>
      </div>
    </div>
    <div class="d-flex justify-center align-center">
      <v-btn color="primary" @click="startAnswering">{{ $vuetify.lang.t(`$vuetify.school.answer`) }}</v-btn>
    </div>
  </div>
</template>

<script>
import { buildArray, shuffleArray } from '../../../js/utils/array';
import { randomElem, randomInt } from '../../../js/utils/random';

export default {
  props: {
    schoolMode: {
      type: String,
      required: false,
      default: 'practice'
    }
  },
  data: () => ({
    score: 0,
    elo: 0,
    triesLeft: 0,
    colors: ['red', 'green', 'blue', 'yellow', 'purple', 'brown', 'orange', 'grey', 'cyan', 'pink'],
    icons: ['mdi-circle', 'mdi-triangle', 'mdi-square', 'mdi-star', 'mdi-ellipse', 'mdi-hexagon', 'mdi-pentagon', 'mdi-rectangle', 'mdi-octagram', 'mdi-rhombus'],
    dates: [],
    question: null,
    answer: '',
    answersGiven: 0,
    answering: false
  }),
  mounted() {
    this.elo = this.$store.state.school.history.currentGrade;
    if (this.schoolMode === 'exam') {
      this.triesLeft = 1;
    } else if (this.schoolMode === 'study') {
      this.triesLeft = 0;
    }
    this.newDates();
  },
  methods: {
    startAnswering() {
      this.answering = true;
      this.newQuestion();
    },
    giveAnswer() {
      if (this.answer !== '' && this.question !== null) {
        const answer = parseInt(this.answer);
        if (answer === this.dates[this.question].year) {
          this.addScore();
        } else {
          this.$emit('score', this.score);
        }
        this.answer = null;
        this.answersGiven++;
        this.newQuestion();
      }
    },
    giveAnswerOnButton() {
      this.giveAnswer();
      document.getElementById('answer-input-history').focus();
    },
    newQuestion() {
      if (this.answersGiven < 5) {
        this.question = randomElem(buildArray(this.dates.length).filter(elem => elem !== this.question));
      } else {
        this.question = null;
        if (this.schoolMode !== 'practice' && this.triesLeft <= 0) {
          setTimeout(this.endEarly, 1000);
        } else {
          if (this.schoolMode !== 'practice') {
            this.triesLeft--;
          }
          this.newDates();
        }
      }
    },
    newDates() {
      const minYear = Math.round(Math.pow(5, this.elo / 3));
      const maxYear = Math.round(Math.pow(6, this.elo / 3) * 7.5);
      let dates = [];
      for (let i = 0, n = Math.floor(Math.min(10, this.elo / 3 + 3)); i < n; i++) {
        dates.push({id: i, year: randomInt(minYear, maxYear)});
      }
      this.dates = shuffleArray(dates);
      this.answersGiven = 0;
      this.answering = false;
    },
    addScore() {
      this.score++;
      this.$emit('score', this.score);
    },
    endEarly() {
      this.$emit('stop');
    }
  }
}
</script>
