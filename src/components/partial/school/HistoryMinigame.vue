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
    <div v-if="answersGiven >= 5" class="text-center ma-2">{{ $vuetify.lang.t(`$vuetify.school.history.${ score >= 5 ? 'perfectScore' : 'imperfectScore' }`) }}</div>
    <div class="d-flex justify-center align-center flex-wrap">
      <div v-if="question !== null" class="d-flex align-center date-text ma-1 pa-2 rounded" :class="[colors[dates[question].id], {'date-text-mobile': $vuetify.breakpoint.xsOnly}]">
        <v-icon class="mr-2" large>{{ icons[dates[question].id] }}</v-icon>
        <span>{{ $vuetify.lang.t(`$vuetify.school.history.year`, '???') }}</span>
      </div>
      <v-text-field class="answer-input ma-1" type="number" @keydown.enter.prevent="giveAnswer" outlined hide-details autofocus v-model="answer" :disabled="answersGiven >= 5"></v-text-field>
      <v-btn class="ma-1" :large="$vuetify.breakpoint.smAndAbove" color="primary" @click="giveAnswer" :disabled="answersGiven >= 5">{{ $vuetify.lang.t(`$vuetify.school.answer`) }}</v-btn>
    </div>
  </div>
  <div v-else>
    <div class="d-flex justify-center flex-wrap ma-1">
      <div v-for="(item, key) in dates" class="d-flex align-center date-text ma-1 pa-2 rounded" :class="[colors[item.id], {'date-text-mobile': $vuetify.breakpoint.xsOnly}]" :key="key">
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
  data: () => ({
    score: 0,
    elo: 0,
    colors: ['red', 'green', 'blue', 'yellow', 'purple', 'brown', 'orange', 'grey', 'cyan', 'pink'],
    icons: ['mdi-circle', 'mdi-triangle', 'mdi-square', 'mdi-star', 'mdi-ellipse', 'mdi-hexagon', 'mdi-pentagon', 'mdi-rectangle', 'mdi-octagram', 'mdi-rhombus'],
    dates: [],
    question: null,
    answer: '',
    answersGiven: 0,
    answering: false,
    intervalId: null
  }),
  mounted() {
    this.elo = this.$store.state.school.history.elo;
    const minYear = Math.round(Math.pow(5, this.elo / 500));
    const maxYear = Math.round(Math.pow(6, this.elo / 500) * 7.5);
    for (let i = 0, n = Math.floor(Math.min(10, this.elo / 500 + 3)); i < n; i++) {
      this.dates.push({id: i, year: randomInt(minYear, maxYear)});
    }
    this.dates = shuffleArray(this.dates);
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
    newQuestion() {
      if (this.answersGiven < 5) {
        this.question = randomElem(buildArray(this.dates.length).filter(elem => elem !== this.question));
      } else {
        this.question = null;
        if (this.score >= 5) {
          this.intervalId = setInterval(this.addScore, 3000);
        }
      }
    },
    addScore() {
      this.score++;
      this.$emit('score', this.score);
    }
  },
  destroyed() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
</script>
