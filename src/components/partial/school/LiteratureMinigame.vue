<style scoped>
.question-text {
  font-size: 32px;
  line-height: 1.25;
  font-family: "Roboto Mono";
}
.question-text-mobile {
  font-size: 24px;
  line-height: 1.1;
}
.answer-input {
  width: 300px;
  max-width: 300px;
}
.question-hint {
  opacity: 0.25;
}
.question-blur-0 {
  opacity: 0.2;
}
.question-blur-1 {
  opacity: 0.15;
}
.question-blur-2 {
  opacity: 0.1;
}
.question-blur-3 {
  opacity: 0.05;
}
</style>

<template>
  <div>
    <div class="d-flex flex-column align-center question-text text-center flex-wrap my-2" :class="{'question-text-mobile': $vuetify.breakpoint.xsOnly}">
      <div class="mx-2">
        <span
          v-for="(letter, key) in currentWord"
          :key="`letter-${ key }`"
          :class="{'success--text': letter.status === 1, 'error--text': letter.status === 2}"
        >{{ (letter.status === 2 && letter.char === ' ') ? '_' : letter.char }}</span>
      </div>
      <div class="mx-2" v-for="(word, key) in words.slice(1)" :key="`word-${ key }`">
        <span class="question-hint">{{ word.slice(0, 25) }}</span>
        <span class="question-blur-0" v-if="word.length > 25">{{ word.charAt(25) }}</span>
        <span class="question-blur-1" v-if="word.length > 26">{{ word.charAt(26) }}</span>
        <span class="question-blur-2" v-if="word.length > 27">{{ word.charAt(27) }}</span>
        <span class="question-blur-3" v-if="word.length > 28">{{ word.charAt(28) }}</span>
      </div>
    </div>
    <div class="d-flex justify-center align-center">
      <v-text-field class="answer-input ma-1" clearable outlined hide-details autofocus v-model="answer"></v-text-field>
    </div>
  </div>
</template>

<script>
import { generateSentence } from '../../../js/utils/words';

export default {
  data: () => ({
    score: 0,
    elo: 0,
    words: [],
    answer: '',
    highestCorrectChars: 0
  }),
  mounted() {
    this.elo = this.$store.state.school.literature.currentGrade;
    this.newWords();
  },
  computed: {
    currentWord() {
      if (this.words.length <= 0) {
        return [];
      }
      let arr = [];
      for (let i = 0, n = this.words[0].length; i < n; i++) {
        const char = this.words[0].charAt(i);
        arr.push({char, status: this.currentAnswer.length > i ? (char === this.currentAnswer.charAt(i) ? 1 : 2) : 0});
      }
      return arr;
    },
    currentAnswer() {
      return this.answer.slice(0, 1) === ' ' ? this.answer.slice(1) : this.answer;
    },
    correctChars() {
      let num = 0;
      for (let i = 0, n = this.words[0].length; i < n; i++) {
        if (this.words[0].charAt(i) === this.currentAnswer.charAt(i)) {
          num++;
        } else {
          break;
        }
      }
      return num;
    }
  },
  methods: {
    newWords() {
      while (this.words.length < 2) {
        this.words.push(generateSentence(this.elo));
      }
    }
  },
  watch: {
    answer: {
      immediate: false,
      handler(newVal) {
        if (newVal === null) {
          this.answer = '';
        }
        if (this.currentAnswer === this.words[0]) {
          this.score++;
          this.$emit('score', this.score);
          this.answer = '';
          this.highestCorrectChars = 0;
          this.words.splice(0, 1);
          this.newWords();
        } else if (this.correctChars > this.highestCorrectChars) {
          this.$emit('score', this.score + (this.correctChars / this.words[0].length));
        }
      }
    }
  }
}
</script>
