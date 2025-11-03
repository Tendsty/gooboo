<style scoped>
@keyframes particle-spin-l {
  0%   {rotate: 360deg;}
  100% {rotate: 0deg;}
}
@keyframes particle-spin-r {
  0%   {rotate: 0deg;}
  100% {rotate: 360deg;}
}
@keyframes particle-move-h {
  0%   {margin-left: -20px;}
  50%  {margin-left: 20px;}
  100% {margin-left: -20px;}
}
@keyframes particle-move-v {
  0%   {margin-top: -20px;}
  50%  {margin-top: 20px;}
  100% {margin-top: -20px;}
}
@keyframes particle-move-dl {
  0%   {margin-left: -20px; margin-top: 20px;}
  50%  {margin-left: 20px; margin-top: -20px;}
  100% {margin-left: -20px; margin-top: 20px;}
}
@keyframes particle-move-dr {
  0%   {margin-left: 20px; margin-top: -20px;}
  50%  {margin-left: -20px; margin-top: 20px;}
  100% {margin-left: 20px; margin-top: -20px;}
}

.spin-left {
  animation: 5s linear 0s infinite particle-spin-l;
}
.spin-right {
  animation: 5s linear 0s infinite particle-spin-r;
}
.move-horizontal {
  animation: 3s ease-in-out 0s infinite particle-move-h;
}
.move-vertical {
  animation: 3s ease-in-out 0s infinite particle-move-v;
}
.move-diagonal-left {
  animation: 3s ease-in-out 0s infinite particle-move-dl;
}
.move-diagonal-right {
  animation: 3s ease-in-out 0s infinite particle-move-dr;
}
.spin-left.move-horizontal {
  animation: 5s linear 0s infinite particle-spin-l, 3s ease-in-out 0s infinite particle-move-h;
}
.spin-left.move-vertical {
  animation: 5s linear 0s infinite particle-spin-l, 3s ease-in-out 0s infinite particle-move-v;
}
.spin-left.move-diagonal-left {
  animation: 5s linear 0s infinite particle-spin-l, 3s ease-in-out 0s infinite particle-move-dl;
}
.spin-left.move-diagonal-right {
  animation: 5s linear 0s infinite particle-spin-l, 3s ease-in-out 0s infinite particle-move-dr;
}
.spin-right.move-horizontal {
  animation: 5s linear 0s infinite particle-spin-r, 3s ease-in-out 0s infinite particle-move-h;
}
.spin-right.move-vertical {
  animation: 5s linear 0s infinite particle-spin-r, 3s ease-in-out 0s infinite particle-move-v;
}
.spin-right.move-diagonal-left {
  animation: 5s linear 0s infinite particle-spin-r, 3s ease-in-out 0s infinite particle-move-dl;
}
.spin-right.move-diagonal-right {
  animation: 5s linear 0s infinite particle-spin-r, 3s ease-in-out 0s infinite particle-move-dr;
}

.particle-container {
  position: relative;
  width: 960px;
  height: 510px;
  border-width: 10px;
  border-style: solid;
  border-color: #808080;
}
.particle-container-smaller {
  width: 640px;
  height: 340px;
  border-width: 7px;
}
.particle-container-tablet {
  width: 480px;
  height: 255px;
  border-width: 5px;
}
.particle-container-mobile {
  width: 320px;
  height: 170px;
  border-width: 3px;
}
.particle-item {
  position: absolute;
}
.game-reset {
  font-size: 36px;
  text-align: center;
}
.game-reset-mobile {
  font-size: 28px;
}
.particle-hider {
  transition: opacity 1500ms;
}
.particle-hidden {
  opacity: 0;
}
.question-text {
  font-size: 36px;
}
.question-text-mobile {
  font-size: 28px;
}
</style>

<template>
  <div v-if="gameState === 0" class="game-reset" :class="{'game-reset-mobile': $vuetify.breakpoint.xsOnly}">{{ $vuetify.lang.t('$vuetify.school.chemistry.newGame') }}</div>
  <div v-else>
    <div v-if="gameState >= 2" class="text-center question-text mt-4" :class="{'question-text-mobile': displaySize === 1}">
      <div v-if="questionType === 'shape'">
        <span>{{ $vuetify.lang.t('$vuetify.school.chemistry.questionShape.0') }}</span>
        <v-icon :color="colors[questionParam]">{{ icons[questionParam] }}</v-icon>
        <span>{{ $vuetify.lang.t('$vuetify.school.chemistry.questionShape.1') }}</span>
      </div>
      <div v-else-if="questionType === 'size'">{{ $vuetify.lang.t('$vuetify.school.chemistry.questionSize.text', $vuetify.lang.t(`$vuetify.school.chemistry.questionSize.${ questionParam }`)) }}</div>
      <div v-else-if="questionType === 'spin'">{{ $vuetify.lang.t('$vuetify.school.chemistry.questionSpin.text', $vuetify.lang.t(`$vuetify.school.chemistry.questionSpin.${ questionParam }`)) }}</div>
      <div v-else-if="questionType === 'moveRandom'">{{ $vuetify.lang.t('$vuetify.school.chemistry.questionMoveRandom.text', $vuetify.lang.t(`$vuetify.school.chemistry.questionMoveRandom.${ questionParam ? '1' : '0' }`)) }}</div>
      <div v-else-if="questionType === 'moveDirection'">{{ $vuetify.lang.t('$vuetify.school.chemistry.questionMoveDirection.text', $vuetify.lang.t(`$vuetify.school.chemistry.questionMoveDirection.${ questionParam }`)) }}</div>
      <div v-if="gameState === 3" class="text-center question-text">{{ $vuetify.lang.t('$vuetify.school.chemistry.answer', correctAnswer) }}</div>
      <v-slider class="mx-6" :class="`mt-${ displaySize * 3 }`" v-model="answer" thumb-label="always" :min="0" :max="maxAnswer" :disabled="gameState === 3"></v-slider>
    </div>
    <div class="particle-container rounded mx-auto" :class="{'particle-container-smaller': displaySize === 3, 'particle-container-tablet': displaySize === 2, 'particle-container-mobile': displaySize === 1}">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="particle-hider"
        :class="{'particle-hidden': gameState !== 3 && (gameState === 2 || gameTick < particle.time || gameTick >= (particle.time + revealTime))}"
      >
        <v-icon
          :key="particle.id + '-icon-' + gameTick"
          :size="particle.size * sizeMult * 0.75"
          class="particle-item"
          :class="{
            'spin-left': particle.spin === 'l',
            'spin-right': particle.spin === 'r',
            'move-horizontal': particle.move === 'h',
            'move-vertical': particle.move === 'v',
            'move-diagonal-left': particle.move === 'dl',
            'move-diagonal-right': particle.move === 'dr',
          }"
          :color="colors[particle.color]"
          :style="`left: ${ 480 * globalSizeMult + particle.x * sizeMult - particle.size * sizeMult / 2 }px; top: ${ 255 * globalSizeMult + particle.y * sizeMult - particle.size * sizeMult / 2 }px; rotate: ${ particle.rotate }deg; animation-delay: ${particle.time - gameTick}s;`"
        >{{ icons[particle.color] }}</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { buildArray, shuffleArray } from '../../../js/utils/array';
import { chance, randomElem, randomFloat, randomInt, randomSplit } from '../../../js/utils/random';

const maxShape = 30;

export default {
  props: {
    schoolMode: {
      type: String,
      required: false,
      default: 'practice'
    }
  },
  mounted() {
    this.elo = this.$store.state.school.subject.chemistry.currentGrade;
    if (this.schoolMode === 'exam') {
      this.triesLeft = 1;
    }
    this.accuracyExpected = Math.max(0.1, 0.4 - this.elo * 0.012);
    if (this.elo >= 2) {
      this.operators.push('size');
    }
    if (this.elo >= 5) {
      this.operators.push('moveRandom');
    }
    if (this.elo >= 8) {
      this.operators.push('spin');
    }
    if (this.elo >= 11) {
      this.operators.push('moveDirection');
    }
    this.colorAmount = Math.min(8, Math.ceil(this.elo / 3) + 3);
    this.revealTime = Math.max(5, Math.min(15, 25 - this.elo));
    this.perfectScore = Math.max(75, Math.min(100, 105 - this.elo));
    this.newParticles();
  },
  data: () => ({
    score: 0,
    elo: 0,
    triesLeft: 0,
    answer: 15,
    maxAnswer: 30,
    correctAnswer: null,
    colors: ['green', 'blue', 'yellow', 'purple', 'brown', 'orange', 'grey', 'cyan'],
    icons: ['mdi-triangle', 'mdi-square', 'mdi-star', 'mdi-ellipse', 'mdi-hexagon', 'mdi-pentagon', 'mdi-rectangle', 'mdi-octagram'],
    colorAmount: 3,
    operators: ['shape'],
    questionType: null,
    questionParam: null,
    particles: [],
    intervalId: null,
    gameState: 1,
    gameTick: 0,
    accuracyExpected: 0.4,
    revealTime: 15,
    perfectScore: 100,
  }),
  beforeDestroy() {
    this.intervalStop();
  },
  computed: {
    displaySize() {
      if (this.$vuetify.breakpoint.xsOnly || window.screen.availHeight < 400) {
        return 1;
      }
      if (this.$vuetify.breakpoint.smOnly || window.screen.availHeight < 600) {
        return 2;
      }
      if (this.$vuetify.breakpoint.mdOnly || window.screen.availHeight < 800) {
        return 3;
      }
      return 4;
    },
    globalSizeMult() {
      if (this.displaySize === 1) {
        return 1 / 3;
      }
      if (this.displaySize === 2) {
        return 1 / 2;
      }
      if (this.displaySize === 3) {
        return 2 / 3;
      }
      return 1;
    },
    sizeMult() {
      return this.globalSizeMult * 20;
    },
    maxTicks() {
      return this.schoolMode === 'exam' ? 25 : 30;
    },
  },
  methods: {
    newParticles() {
      // Create the basic particle list
      let particleAmount = buildArray(this.colorAmount).map(() => randomInt(0, maxShape));
      const particleSum = particleAmount.reduce((a, b) => a + b, 0);
      let particleList = [];
      let id = 0;
      particleAmount.forEach((n, color) => {
        for (let i = 0; i < n; i++) {
          // Generate coords that are not too close to an existing one
          let x, y = null;
          let isValid = false;
          let tries = 0;
          while (!isValid && tries < 100) {
            x = randomFloat(-20, 20);
            y = randomFloat(-10, 10);
            isValid = particleList.findIndex(el => Math.abs(x - el.x) + Math.abs(y - el.y) < 2) === -1;
            tries++;
          }

          particleList.push({
            id,
            color,
            rotate: randomInt(0, 359),
            x,
            y,
            spin: 'n',
            move: 'n',
            size: 2,
            time: randomInt(5 - this.revealTime, this.maxTicks - 5),
          });
          id++;
        }
      });

      // Spread different sizes
      let sizeDistribution = [0, 0, 0];
      if (this.operators.includes('size')) {
        particleList = shuffleArray(particleList);
        let inc = 0;
        const distribution = randomSplit(3).map(el => {
          inc += el;
          return inc;
        });
        let currentSplit = 0;
        particleList = particleList.map((el, i) => {
          while (((i + 0.5) / particleList.length) > distribution[currentSplit]) {
            currentSplit++;
          }
          sizeDistribution[currentSplit]++;
          return {...el, size: [1, 2, 3][currentSplit]};
        });
      }

      // Spread different spins
      let spinDistribution = [0, 0, 0];
      if (this.operators.includes('spin')) {
        particleList = shuffleArray(particleList);
        let inc = 0;
        const distribution = randomSplit(3).map(el => {
          inc += el;
          return inc;
        });
        let currentSplit = 0;
        particleList = particleList.map((el, i) => {
          while (((i + 0.5) / particleList.length) > distribution[currentSplit]) {
            currentSplit++;
          }
          spinDistribution[currentSplit]++;
          return {...el, spin: ['l', 'n', 'r'][currentSplit]};
        });
      }

      // Spread different move patterns
      let moveDistribution = [0, 0, 0, 0];
      if (this.operators.includes('moveRandom')) {
        particleList = shuffleArray(particleList);
        let inc = 0;
        const distribution = randomSplit(5).map(el => {
          inc += el;
          return inc;
        });
        let currentSplit = 0;
        particleList = particleList.map((el, i) => {
          while (((i + 0.5) / particleList.length) > distribution[currentSplit]) {
            currentSplit++;
          }
          moveDistribution[currentSplit >= 2 ? (currentSplit - 1) : 0]++;
          return {...el, move: currentSplit >= 2 ? ['h', 'v', chance(0.5) ? 'dl' : 'dr'][currentSplit - 1] : 'n'};
        });
      }

      // Set the question and correct answer
      this.questionType = randomElem(this.operators);
      switch (this.questionType) {
        case 'shape':
          this.questionParam = randomInt(0, this.colorAmount - 1);
          this.correctAnswer = particleAmount[this.questionParam];
          break;
        case 'moveRandom':
          this.questionParam = chance(0.5);
          this.correctAnswer = this.questionParam ? (moveDistribution[1] + moveDistribution[2] + moveDistribution[3]) : moveDistribution[0];
          break;
        case 'spin':
          this.questionParam = randomInt(0, 2);
          this.correctAnswer = spinDistribution[this.questionParam];
          break;
        case 'size':
          this.questionParam = randomInt(0, 2);
          this.correctAnswer = sizeDistribution[this.questionParam];
          break;
        case 'moveDirection':
          this.questionParam = randomInt(0, 2);
          this.correctAnswer = moveDistribution[this.questionParam + 1];
          break;
      }

      this.maxAnswer = this.questionType === 'shape' ? maxShape : particleSum;

      // Start the game
      this.particles = particleList;
      this.intervalId = setInterval(this.tickParticle, 1000);
      this.gameState = 1;
      this.gameTick = 0;
      this.answer = Math.round(this.maxAnswer / 2);
      this.updateTimer();
    },
    tickParticle() {
      this.gameTick++;
      if (this.gameTick >= this.maxTicks) {
        this.gameState++;
        if (this.gameState === 2) {
          this.gameTick = this.maxTicks - 10;
        } else if (this.gameState === 3) {
          this.intervalStop();
          this.changeScore(Math.min((1 - Math.min(1, Math.abs(this.answer - this.correctAnswer) / this.maxAnswer / this.accuracyExpected)) * 100, this.perfectScore));
          setTimeout(this.startNewGame, 5000);
        }
      }
      this.updateTimer();
    },
    startNewGame() {
      if (this.schoolMode === 'practice') {
        this.triesLeft++;
      } else if (this.triesLeft <= 0 || (this.schoolMode === 'exam' && this.score >= this.$store.state.school.subject.chemistry.scoreGoal)) {
        this.$emit('stop', this.score);
        return;
      } else {
        this.triesLeft--;
      }
      this.gameState = 0;
      this.gameTick = 0;
      this.updateTimer();
      setTimeout(this.newParticles, 5000);
    },
    updateTimer() {
      this.$emit('timer', this.maxTicks - this.gameTick);
    },
    intervalStop() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    changeScore(diff) {
      this.score = Math.max(0, this.score + diff);
      if (this.schoolMode === 'exam' && this.score > this.$store.state.school.subject.chemistry.scoreGoal) {
        this.score = this.$store.state.school.subject.chemistry.scoreGoal;
      }
      this.$emit('score', this.score);
    },
  }
}
</script>
