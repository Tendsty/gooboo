<style scoped>
.achievement-info {
  min-height: 24px;
}
</style>

<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.stat.${name}.achievement`) }}</v-card-title>
    <v-card-text>
      <div>{{ $vuetify.lang.t(`$vuetify.stat.${name}.description`) }}</div>
      <v-progress-linear class="balloon-text-dynamic mt-1 mb-2" height="20" :color="achievement.secret ? 'purple' : 'primary'" :value="percent">
        <span v-if="achievement.display === 'number'">{{ $formatNum(stat) }}<span v-if="!isMax">&nbsp;/ {{ $formatNum(milestone) }}</span></span>
        <span v-else-if="achievement.display === 'percent'">{{ $formatNum(stat * 100) }}%<span v-if="!isMax">&nbsp;/ {{ $formatNum(milestone * 100) }}%</span></span>
        <span v-else-if="achievement.display === 'time'">{{ $formatTime(stat) }}<span v-if="!isMax">&nbsp;/ {{ $formatTime(milestone) }}</span></span>
        <span v-else-if="achievement.display === 'grade'">{{ gradeCurrent }}<span v-if="!isMax">&nbsp;/ {{ gradeMilestone }}</span></span>
        <v-icon small v-else-if="achievement.display === 'boolean'">{{ stat ? 'mdi-check' : 'mdi-close' }}</v-icon>
      </v-progress-linear>
      <div class="achievement-info d-flex align-center">
        <v-chip v-if="achievement.level > 0" class="mr-2 px-2" label small>
          <v-icon class="mr-1">mdi-trophy</v-icon>
          <span v-if="achievement.cap === null || achievement.cap > 1">{{ achievement.level }}</span>
          <v-icon v-else>mdi-check</v-icon>
        </v-chip>
        <mini v-if="relicName" :name="relicName" is-achievement-reward></mini>
        <v-spacer></v-spacer>
        <gb-tooltip v-if="achievement.secret">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-eye-off</v-icon>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.achievement.secret`) }}</div>
        </gb-tooltip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { formatGrade } from '../../../js/utils/format';
import Mini from '../relic/Mini.vue';

export default {
  components: { Mini },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    achievement() {
      return this.$store.state.achievement[this.name];
    },
    stat() {
      return this.achievement.value();
    },
    isMax() {
      return this.achievement.cap !== null && this.achievement.level >= this.achievement.cap;
    },
    milestone() {
      return this.isMax ? Infinity : this.achievement.milestones(this.achievement.level);
    },
    milestoneOld() {
      return this.achievement.level > 0 ? this.achievement.milestones(this.achievement.level - 1) : 0;
    },
    percent() {
      return this.isMax ? 100 : (100 * (this.stat - this.milestoneOld) / (this.milestone - this.milestoneOld));
    },
    relicName() {
      return this.achievement.relic[this.achievement.level] ? this.achievement.relic[this.achievement.level] : null;
    },
    gradeCurrent() {
      return formatGrade(this.stat);
    },
    gradeMilestone() {
      return formatGrade(this.milestone);
    }
  }
}
</script>
