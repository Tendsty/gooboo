<style scoped>
.question-text {
  font-size: 52px;
}
.question-text-mobile {
  font-size: 40px;
}
.answer-input {
  width: 300px;
  max-width: 300px;
}
</style>

<template>
  <div>
    <div class="text-center question-text" :class="{'question-text-mobile': $vuetify.breakpoint.xsOnly}">{{ question }}</div>
    <div class="d-flex justify-center align-center flex-wrap">
      <v-text-field id="answer-input-math" class="answer-input ma-1" type="number" @keydown.enter.prevent="giveAnswer" outlined hide-details autofocus v-model="answer"></v-text-field>
      <v-btn class="ma-1" :large="$vuetify.breakpoint.smAndAbove" color="primary" @click="giveAnswerOnButton">{{ $vuetify.lang.t(`$vuetify.school.answer`) }}</v-btn>
    </div>
  </div>
</template>

<script>
import { randomElem, randomInt } from '../../../js/utils/random';
export default {
  data: () => ({
    score: 0,
    elo: 0,
    operators: ['+'],
    question: '',
    solution: 0,
    answer: ''
  }),
  mounted() {
    this.elo = this.$store.state.school.math.currentGrade;
    if (this.elo >= 2) {
      this.operators.push('-');
    }
    if (this.elo >= 4) {
      this.operators.push('*');
    }
    if (this.elo >= 7) {
      this.operators.push('/');
    }
    if (this.elo >= 10) {
      this.operators.push('r');
    }
    if (this.elo >= 13) {
      this.operators.push('^');
    }
    this.newQuestion();
  },
  methods: {
    newQuestion() {
      const operator = randomElem(this.operators);
      switch (operator) {
        case '+': {
          const minNum = Math.round(Math.pow(8, this.elo / 3));
          const maxNum = Math.round(Math.pow(10, this.elo / 3) * 5);
          const num1 = randomInt(minNum, maxNum);
          const num2 = randomInt(minNum, maxNum);
          this.question = `${ num1 } + ${ num2 }`;
          this.solution = num1 + num2;
          break;
        }
        case '-': {
          const minNum = Math.round(Math.pow(8, this.elo / 3 - 0.2));
          const maxNum = Math.round(Math.pow(10, this.elo / 3 - 0.2) * 5);
          const num1 = randomInt(minNum, maxNum);
          const num2 = randomInt(minNum, maxNum);
          this.question = `${ num1 + num2 } - ${ num2 }`;
          this.solution = num1;
          break;
        }
        case '*': {
          const minNum = Math.round(Math.pow(1.9, this.elo / 3) * 2.5);
          const maxNum = Math.round(Math.pow(2, this.elo / 3) * 4.5);
          const num1 = randomInt(minNum, maxNum);
          const num2 = randomInt(minNum, maxNum);
          this.question = `${ num1 } * ${ num2 }`;
          this.solution = num1 * num2;
          break;
        }
        case '/': {
          const minNum = Math.round(Math.pow(1.9, this.elo / 3 - 0.2) * 2.5);
          const maxNum = Math.round(Math.pow(2, this.elo / 3 - 0.2) * 4.5);
          const num1 = randomInt(minNum, maxNum);
          const num2 = randomInt(minNum, maxNum);
          this.question = `${ num1 * num2 } / ${ num2 }`;
          this.solution = num1;
          break;
        }
        case 'r': {
          const minNum = Math.round(Math.pow(1.9, this.elo / 3 - 0.3) * 2.5);
          const maxNum = Math.round(Math.pow(2, this.elo / 3 - 0.3) * 4.5);
          const num = randomInt(minNum, maxNum);
          this.question = `√${ Math.pow(num, 2) }`;
          this.solution = num;
          break;
        }
        case '^': {
          const minNum = Math.round(Math.pow(3.1, this.elo / 3) * 7.5);
          const maxNum = Math.round(Math.pow(3.25, this.elo / 3) * 40);
          const target = randomInt(minNum, maxNum);
          const exponent = randomInt(3, Math.floor(this.elo / 3));
          const base = Math.round(Math.pow(target, 1 / exponent));
          this.question = `${ base } ^ ${ exponent }`;
          this.solution = Math.pow(base, exponent);
          break;
        }
      }
    },
    giveAnswer() {
      if (this.answer !== '' && this.answer !== null) {
        const answer = parseInt(this.answer);
        if (answer === this.solution) {
          this.score++;
        } else if (this.score > 0) {
          this.score--;
        }
        this.$emit('score', this.score);
        this.answer = null;
        this.newQuestion();
      }
    },
    giveAnswerOnButton() {
      this.giveAnswer();
      document.getElementById('answer-input-math').focus();
    }
  }
}
</script>
