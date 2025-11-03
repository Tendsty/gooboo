<style scoped>
.date-text {
  position: relative;
  width: 128px;
  height: 80px;
  font-size: 20px;
}
.date-text-mobile {
  width: 80px;
  height: 56px;
  font-size: 16px;
}
.card-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 100ms;
}
.card-selected {
  border: 4px dotted var(--v-primary-base);
}
.card-revealed {
  opacity: 0;
}
.game-reset {
  font-size: 36px;
  text-align: center;
}
.game-reset-mobile {
  font-size: 28px;
}
</style>

<template>
  <div v-if="gameState === 0" class="game-reset" :class="{'game-reset-mobile': $vuetify.breakpoint.xsOnly}">{{ $vuetify.lang.t('$vuetify.school.history.newGame') }}</div>
  <div v-else class="d-flex justify-center flex-wrap mx-auto" :style="`max-width: ${ maxCols * ($vuetify.breakpoint.xsOnly ? 88 : 136) }px;`">
    <div
      v-for="item in dates"
      class="d-flex flex-column justify-center align-center date-text ma-1 pa-2 rounded"
      :class="{'date-text-mobile': $vuetify.breakpoint.xsOnly, 'card-selected': item.id === revealNext}"
      :style="item.done ? undefined : `background-color: #808080;`"
      :key="item.id"
      @click="revealCell(item.done ? null : item.id)"
    >
      <template v-if="!item.done">
        <div class="balloon-text-dynamic">{{ $vuetify.lang.t(`$vuetify.school.history.year`) }}</div>
        <div class="balloon-text-dynamic">{{ $formatInt(item.year) }}</div>
      </template>
      <div
        class="card-overlay d-flex justify-center align-center rounded"
        :class="{'card-revealed': !item.done && (item.reveal > 0 || item.id === revealNext || gameState === 2), 'warning': !item.done && item.seen, 'info': !item.done && !item.seen}"
        :id="`card-overlay-${ item.id }`"
      >
        <v-icon v-if="item.done" style="opacity: 0.05;" :size="iconSize">mdi-check-bold</v-icon>
        <v-icon v-else-if="item.seen" style="opacity: 0.25;" :size="iconSize">mdi-eye</v-icon>
        <v-icon v-else style="opacity: 0.25;" :size="iconSize">mdi-help</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { shuffleArray } from '../../../js/utils/array';
import { randomInt } from '../../../js/utils/random';
import { setCharAt } from '../../../js/utils/string';

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
    found: 0,
    dates: [],
    realDates: [],
    revealNext: null,
    intervalId: null,
    gameState: 1,
    gameTick: 0,
  }),
  mounted() {
    this.elo = this.$store.state.school.subject.history.currentGrade;
    if (this.schoolMode === 'exam') {
      this.triesLeft = 1;
    }
    this.newDates();
  },
  computed: {
    maxCols() {
      return Math.ceil(Math.sqrt(this.dates.length / 2) * 2);
    },
    maxTicks() {
      return this.schoolMode === 'exam' ? 300 : 350;
    },
    revealTime() {
      return Math.ceil(80 / (this.elo + 3));
    },
    iconSize() {
      return this.$vuetify.breakpoint.xsOnly ? 48 : 72;
    }
  },
  methods: {
    newDates() {
      // Define constants
      const digitAmount = Math.ceil(this.elo / 3 + 1);
      const fakeAmount = Math.round(this.elo + 2 - digitAmount);

      // Create real date numbers
      let realDates = [];
      while (realDates.length < 5) {
        const num = randomInt(Math.pow(10, digitAmount - 1), Math.pow(10, digitAmount) - 1).toString();
        if (!realDates.includes(num)) {
          realDates.push(num);
        }
      }
      this.realDates = realDates;

      // Create fake date numbers
      let fakeDates = [];
      while (fakeDates.length < fakeAmount) {
        const realIndex = randomInt(0, 4);
        const fakeIndex = randomInt(0, digitAmount - 1);
        const realDigit = parseInt(realDates[realIndex].substring(fakeIndex, fakeIndex + 1));
        let fakeDigit = randomInt(0, fakeIndex > 0 ? 8 : 7);
        if (fakeIndex <= 0) {
          fakeDigit++;
        }
        if (fakeDigit >= realDigit) {
          fakeDigit++;
        }
        const num = setCharAt(realDates[realIndex], fakeIndex, fakeDigit);
        if (!realDates.includes(num) && !fakeDates.includes(num)) {
          fakeDates.push(num);
        }
      }

      // Set up tiles and fakes
      this.dates = shuffleArray([...realDates, ...realDates, ...fakeDates]).map((el, id) => {
        return {year: el, seen: false, done: false, reveal: 0, id};
      });

      this.found = 0;

      // Start the game
      this.gameState = 1;
      this.gameTick = 0;
      this.intervalId = setInterval(this.revealTick, 100);
    },
    revealTick() {
      this.dates.forEach((elem, key) => {
        if (elem.reveal > 0) {
          this.$set(this.dates[key], 'reveal', elem.reveal - 1);
        }
      });
      this.updateTimer(-1);
    },
    updateTimer(diff = 0) {
      this.gameTick -= diff;
      if (this.gameTick >= this.maxTicks) {
        this.intervalStop();
        this.gameState = 2;
        setTimeout(this.startNextGame, 5000);
      }
      this.$emit('timer', Math.max(0, Math.ceil((this.maxTicks - this.gameTick) / 10)));
    },
    changeScore(diff) {
      this.score = Math.max(0, this.score + diff);
      if (this.schoolMode === 'exam' && this.score > this.$store.state.school.subject.history.scoreGoal) {
        this.score = this.$store.state.school.subject.history.scoreGoal;
      }
      this.$emit('score', this.score);
    },
    startNextGame() {
      if (this.schoolMode === 'practice') {
        this.triesLeft++;
      } else if (this.triesLeft <= 0 || (this.schoolMode === 'exam' && this.score >= this.$store.state.school.subject.history.scoreGoal)) {
        this.$emit('stop', this.score);
        return;
      } else {
        this.triesLeft--;
      }
      this.gameState = 0;
      this.gameTick = 0;
      this.updateTimer();
      setTimeout(this.newDates, 5000);
    },
    revealCell(id) {
      if (id !== null) {
        if (this.revealNext === null) {
          this.revealNext = id;
        } else if (this.revealNext !== id) {
          if (this.dates[this.revealNext].year === this.dates[id].year) {
            // Found pair
            this.$set(this.dates[this.revealNext], 'done', true);
            this.$set(this.dates[id], 'done', true);
            this.found++;
            this.changeScore(1);
            if (this.found >= 5) {
              this.intervalStop();
              this.gameState = 2;
              setTimeout(this.startNextGame, 5000);
            }
          } else {
            // No pair
            let mistakes = 0;
            if (this.dates[this.revealNext].seen) {
              mistakes++;
            } else {
              this.$set(this.dates[this.revealNext], 'seen', true);
            }
            if (this.dates[id].seen) {
              mistakes++;
            } else {
              this.$set(this.dates[id], 'seen', true);
            }
            if (mistakes > 0) {
              this.updateTimer(mistakes * -50);
            }
            this.$set(this.dates[this.revealNext], 'reveal', this.revealTime);
            this.$set(this.dates[id], 'reveal', this.revealTime);
          }
          this.revealNext = null;
        }
      }
    },
    intervalStop() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
  },
  destroyed() {
    this.intervalStop();
  }
}
</script>
