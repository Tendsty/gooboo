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
    this.answerCount = Math.floor(this.elo / 1.2 + 4);
    this.changeAmount = 100000 / (this.elo * 3 / 500 + 1000);
    this.newQuestion();
  },
  methods: {
    newQuestion() {
      const slMult = 50;
      let hue = 0;
      // Grey colors result in unfair colors with no way to differentiate them, so we reroll if that happens
      while (hue < 20) {
        this.mixed = [];
        this.answers = [];
        const firstHue = randomInt(0, 359);
        this.mixed.push(Color(`hsl(${ randomInt(0, 359) }, ${ randomFloat(60, 100) }%, ${ randomFloat(35, 65) }%)`).hex());
        this.mixed.push(Color(`hsl(${ chance(0.5) ? randomInt(firstHue + 30, firstHue + 119) : randomInt(firstHue + 240, firstHue + 329) }, ${ randomFloat(60, 100) }%, ${ randomFloat(35, 65) }%)`).hex());
        this.solution = randomInt(0, this.answerCount - 1);
        const answer = Color(this.mixed[0]).mix(Color(this.mixed[1])).hex();
        hue = Color(answer).hsl().color[1];
        for (let i = 0; i < this.answerCount; i++) {
          let newColor = Color(answer);
          if (i !== this.solution) {
            let changeLeft = this.changeAmount * randomFloat(1, 2);

            if (chance(0.4)) {
              const l = newColor.hsl().color[2];
              if (chance(0.5)) {
                // lighten
                if (l < 0.65) {
                  const diff = randomFloat(0, Math.min(0.65 - l, changeLeft / slMult));
                  newColor = newColor.lightness(l + diff);
                  changeLeft -= diff * slMult;
                }
              } else {
                // darken
                if (l > 0.35) {
                  const diff = randomFloat(0, Math.min(l - 0.35, changeLeft / slMult));
                  newColor = newColor.lightness(l - diff);
                  changeLeft -= diff * slMult;
                }
              }
            }
            if (chance(0.4)) {
              const s = newColor.hsl().color[1];
              if (chance(0.5)) {
                // saturate
                const diff = Math.random();
                newColor = newColor.saturate(diff);
                changeLeft -= (1 - s) * diff * slMult;
              } else {
                // desaturate
                const diff = Math.random();
                newColor = newColor.desaturate(diff);
                changeLeft -= s * diff * slMult;
              }
            }

            newColor = newColor.rotate(changeLeft * (chance(0.5) ? 1 : -1));
          }
          this.answers.push(newColor.hex());
        }
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
