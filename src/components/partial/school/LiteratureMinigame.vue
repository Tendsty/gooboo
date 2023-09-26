<style scoped>
.question-text {
  font-size: 52px;
  font-family: "Roboto Mono";
}
.question-text-mobile {
  font-size: 40px;
}
.answer-input {
  width: 300px;
  max-width: 300px;
}
.question-0 {
  opacity: 0.4;
}
.question-1 {
  opacity: 0.25;
}
</style>

<template>
  <div>
    <div class="d-flex justify-center question-text flex-wrap my-2" :class="{'question-text-mobile': $vuetify.breakpoint.xsOnly}">
      <div class="mx-2">
        <span v-for="(letter, key) in currentWord" :key="`letter-${ key }`" :class="{'success--text': letter.status === 1, 'error--text': letter.status === 2}">{{ letter.char }}</span>
      </div>
      <div class="mx-2" :class="`question-${ key }`" v-for="(word, key) in words.slice(1)" :key="`word-${ key }`">{{ word }}</div>
    </div>
    <div class="d-flex justify-center align-center">
      <v-text-field class="answer-input ma-1" clearable outlined hide-details autofocus v-model="answer"></v-text-field>
    </div>
  </div>
</template>

<script>
import { randomInt, randomRound } from '../../../js/utils/random';
export default {
  data: () => ({
    score: 0,
    elo: 0,
    characters: 'asdf',
    words: [],
    wordLength: 0,
    answer: ''
  }),
  mounted() {
    this.elo = this.$store.state.school.literature.elo;
    this.wordLength = this.elo / 250 + 3.5;
    if (this.elo >= 100) {
      this.characters += 'jkl';
    }
    if (this.elo >= 200) {
      this.characters += 'gh';
    }
    if (this.elo >= 300) {
      this.characters += 'qweruiop';
    }
    if (this.elo >= 400) {
      this.characters += 'xcvm';
    }
    if (this.elo >= 500) {
      this.characters += 'ztybn';
    }
    if (this.elo >= 600) {
      this.characters += 'ASDFJKLGH';
    }
    if (this.elo >= 700) {
      this.characters += 'QWERUIOP';
    }
    if (this.elo >= 800) {
      this.characters += 'XCVMZTYBN';
    }
    if (this.elo >= 1000) {
      this.characters += '1234567890';
    }
    if (this.elo >= 1200) {
      this.characters += '<>,;.:';
    }
    if (this.elo >= 1400) {
      this.characters += '!@#$&*';
    }
    if (this.elo >= 1600) {
      this.characters += '\'"?|/\\';
    }
    if (this.elo >= 1800) {
      this.characters += '()[]{}';
    }
    if (this.elo >= 2000) {
      this.characters += '-_+=';
    }
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
        arr.push({char, status: this.answer.length > i ? (char === this.answer.charAt(i) ? 1 : 2) : 0});
      }
      return arr;
    }
  },
  methods: {
    newWords() {
      while (this.words.length < 3) {
        let answer = '';
        for (let i = 0, n = randomRound(this.wordLength); i < n; i++) {
          const chosenChar = randomInt(0, this.characters.length - 1);
          answer += this.characters.substring(chosenChar, chosenChar + 1);
        }
        this.words.push(answer);
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
        if (newVal === this.words[0]) {
          this.score++;
          this.$emit('score', this.score);
          this.answer = '';
          this.words.splice(0, 1);
          this.newWords();
        }
      }
    }
  }
}
</script>
