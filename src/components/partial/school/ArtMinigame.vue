<style scoped>
.color-cell-mixed {
  width: 128px;
  height: 128px;
}
.color-cell-mixed-mobile {
  width: 96px;
  height: 96px;
}
.color-cell-answer {
  width: 72px;
  height: 72px;
}
.color-cell-answer-mobile {
  width: 54px;
  height: 54px;
}
.color-border-dark {
  border: 4px solid white;
}
.color-border-light {
  border: 4px solid black;
}
.color-border-mobile {
  border-width: 3px;
}
</style>

<template>
  <div>
    <div v-if="mixed.length >= 2" class="d-flex justify-center align-center flex-wrap ma-2">
      <div
        class="color-cell-mixed rounded-lg elevation-4 ma-2"
        :class="[`color-border-${ $vuetify.theme.dark ? 'dark' : 'light' }`, {'color-cell-mixed-mobile color-border-mobile': $vuetify.breakpoint.xsOnly}]"
        :style="`background-color: ${ mixed[0] };`"
      ></div>
      <v-icon size="72">mdi-plus</v-icon>
      <div
        class="color-cell-mixed rounded-lg elevation-4 ma-2"
        :class="[`color-border-${ $vuetify.theme.dark ? 'dark' : 'light' }`, {'color-cell-mixed-mobile color-border-mobile': $vuetify.breakpoint.xsOnly}]"
        :style="`background-color: ${ mixed[1] };`"
      ></div>
    </div>
    <div class="d-flex justify-center flex-wrap ma-2" :class="`mt-${ $vuetify.breakpoint.xsOnly ? '4' : '8' }`">
      <div
        v-for="(color, key) in answers"
        :key="`answer-${ key }`"
        class="color-cell-answer rounded-lg elevation-4"
        :class="[`color-border-${ $vuetify.theme.dark ? 'dark' : 'light' } ma-${ $vuetify.breakpoint.xsOnly ? '1' : '2' }`, {'color-cell-answer-mobile color-border-mobile': $vuetify.breakpoint.xsOnly}]"
        :style="`background-color: ${ color };`"
        @click="giveAnswer(key)"
      ></div>
    </div>
  </div>
</template>

<script>
import { chance, randomFloat, randomInt } from '../../../js/utils/random';
const Color = require('color');

export default {
  data: () => ({
    score: 0,
    elo: 0,
    answerCount: 0,
    changeAmount: 0,
    mixed: [],
    answers: [],
    solution: null
  }),
  mounted() {
    this.elo = this.$store.state.school.art.currentGrade;
    this.answerCount = Math.floor(this.elo / 2 + 4);
    this.changeAmount = 60000 / (this.elo * 150 + 1000);
    this.newQuestion();
  },
  methods: {
    newQuestion() {
      this.mixed = [];
      this.answers = [];
      const firstHue = randomInt(0, 359);
      let secondHue = chance(0.5) ? randomInt(firstHue + 30, firstHue + 119) : randomInt(firstHue + 240, firstHue + 329);
      while (secondHue >= 360) {
        secondHue -= 360;
      }
      this.mixed.push(Color(`hsl(${ firstHue }, 100%, 50%)`).hex());
      this.mixed.push(Color(`hsl(${ secondHue }, 100%, 50%)`).hex());
      this.solution = randomInt(0, this.answerCount - 1);
      const answer = Color(this.mixed[0]).mix(Color(this.mixed[1])).hex();
      for (let i = 0; i < this.answerCount; i++) {
        let newColor = Color(answer);
        if (i !== this.solution) {
          newColor = newColor.rotate(this.changeAmount * randomFloat(1, 3) * (chance(0.5) ? 1 : -1));
        }
        this.answers.push(newColor.hex());
      }
    },
    giveAnswer(id) {
      if (this.solution === id) {
        this.score++;
      } else if (this.score > 0) {
        this.score--;
      }
      this.$emit('score', this.score);
      this.newQuestion();
    }
  }
}
</script>
