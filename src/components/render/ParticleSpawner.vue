<style scoped>
.particle-container {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}
@keyframes particle-r1 {
  0%   {top: -160px; rotate: 0deg;}
  100% {top: 100%; rotate: 180deg;}
}
@keyframes particle-r2 {
  0%   {top: -160px; rotate: 0deg;}
  100% {top: 100%; rotate: 360deg;}
}
@keyframes particle-r3 {
  0%   {top: -160px; rotate: 0deg;}
  100% {top: 100%; rotate: 540deg;}
}
@keyframes particle-r4 {
  0%   {top: -160px; rotate: 0deg;}
  100% {top: 100%; rotate: 720deg;}
}
@keyframes particle-l1 {
  0%   {top: -160px; rotate: 0deg;}
  100% {top: 100%; rotate: -180deg;}
}
@keyframes particle-l2 {
  0%   {top: -160px; rotate: 0deg;}
  100% {top: 100%; rotate: -360deg;}
}
@keyframes particle-l3 {
  0%   {top: -160px; rotate: 0deg;}
  100% {top: 100%; rotate: -540deg;}
}
@keyframes particle-l4 {
  0%   {top: -160px; rotate: 0deg;}
  100% {top: 100%; rotate: -720deg;}
}
@keyframes particle-still {
  0%   {top: -160px;}
  100% {top: 100%;}
}
.particle-item {
  position: absolute;
  animation-timing-function: linear;
}
.particle-r1 {
  animation-name: particle-r1;
}
.particle-r2 {
  animation-name: particle-r2;
}
.particle-r3 {
  animation-name: particle-r3;
}
.particle-r4 {
  animation-name: particle-r4;
}
.particle-l1 {
  animation-name: particle-r1;
}
.particle-l2 {
  animation-name: particle-r2;
}
.particle-l3 {
  animation-name: particle-r3;
}
.particle-l4 {
  animation-name: particle-r4;
}
.particle-still {
  animation-name: particle-still;
}
</style>

<template>
  <div class="particle-container">
    <v-icon
      v-for="particle in particles"
      :key="particle.id + '_' + particle.time"
      :size="particle.size * sizeMult"
      class="particle-item"
      :class="`particle-${particle.animation}`"
      :color="particle.color"
      :style="`left: calc(${particle.posX}% - ${particle.size * sizeMult / 2}px); opacity: ${particle.opacity}%; filter: blur(${particle.size * sizeMult / 25}px); animation-duration: ${particle.maxTime}s; animation-delay: ${particle.time - particle.maxTime}s;`"
    >{{ particle.icon }}</v-icon>
  </div>
</template>

<script>
import { mapState } from 'vuex';
function* gen() {
  let id = 0;
  while (true) {
    yield id;
    id++;
  }
}
const getId = gen();

import { chance, randomElem, randomFloat, randomInt } from '../../js/utils/random';

export default {
  data: () => ({
    particles: [],
    interval: null
  }),
  computed: {
    ...mapState({
      amountSetting: state => state.system.settings.performance.items.particleAmount.value
    }),
    sizeMult() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 1;
        case 'sm': return 1.5;
        case 'md': return 2;
        case 'lg': return 2.5;
        case 'xl': return 3;
        default: return 1;
      }
    },
    particleRules() {
      return this.$store.state.system.themes[this.$store.state.system.theme].particles;
    }
  },
  methods: {
    tickParticle() {
      this.particles.forEach((elem, key) => {
        this.$set(this.particles[key], 'time', elem.time - 1);
      });
      this.particles = this.particles.filter(elem => elem.time > 0);

      if (this.particleRules) {
        this.spawnParticle(this.particleRules.amount * this.amountSetting);
      }
    },
    spawnParticle(amount = 1, timeShift = 0) {
      for (let i = 0; i < amount; i++) {
        if (chance(0.5)) {
          const time = randomInt(this.particleRules.time[0], this.particleRules.time[1]);
          if (time - timeShift > 0) {
            this.particles.push({
              id: getId.next().value,
              time: time - timeShift,
              maxTime: time,
              icon: randomElem(this.particleRules.icons),
              color: randomElem(this.particleRules.colors),
              size: randomInt(this.particleRules.size[0], this.particleRules.size[1]),
              animation: this.particleRules.rotate ? randomElem(['r1', 'r2', 'r3', 'r4', 'l1', 'l2', 'l3', 'l4']) : 'still',
              opacity: randomFloat(this.particleRules.opacity[0], this.particleRules.opacity[1]),
              posX: randomFloat(0, 100)
            });
          }
        }
      }
    },
    clearParticles() {
      this.particles = [];
    }
  },
  mounted() {
    this.interval = setInterval(this.tickParticle, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  watch: {
    particleRules(newVal) {
      this.clearParticles();

      // Retroactively spawn particles
      if (newVal) {
        // Reset interval time
        clearInterval(this.interval);
        this.interval = setInterval(this.tickParticle, 1000);

        for (let i = 0, n = newVal.time[1]; i < n; i++) {
          this.spawnParticle(newVal.amount * this.amountSetting, i);
        }
      }
    },
    amountSetting(newVal) {
      this.clearParticles();

      if (newVal > 0 && this.particleRules) {
        // Reset interval time
        clearInterval(this.interval);
        this.interval = setInterval(this.tickParticle, 1000);

        for (let i = 0, n = this.particleRules.time[1]; i < n; i++) {
          this.spawnParticle(this.particleRules.amount * newVal, i);
        }
      }
    }
  }
}
</script>
