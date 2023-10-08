<style scoped>
.small-quest-task {
  font-size: 12px;
  line-height: 1;
}
</style>

<template>
  <div class="d-flex align-center balloon-text-dynamic">
    <v-icon class="mr-2" :color="status">{{ status === 'success' ? 'mdi-check' : 'mdi-alert' }}</v-icon>
    <v-progress-linear :color="status" :value="percent" rounded height="24">
      <div class="d-flex justify-center align-center text-center" :class="{'small-quest-task': $vuetify.breakpoint.xsOnly}">
        <template v-if="feature">
          <v-icon small class="mr-1">{{ featureIcon }}</v-icon>
          <span>{{ $vuetify.lang.t(`$vuetify.feature.${ feature }`) }}</span>
          <v-icon>mdi-circle-small</v-icon>
        </template>
        <template v-if="task.type === 'stat'">
          <span v-if="currency[task.name]">{{ $vuetify.lang.t(`$vuetify.general.questGained`, $vuetify.lang.t(`$vuetify.currency.${task.name}.name`)) }}</span>
          <span v-else>{{ $vuetify.lang.t(`$vuetify.stat.${task.name}.description`) }}</span>
        </template>
        <span v-else-if="task.type === 'unlock'">{{ $vuetify.lang.t(`$vuetify.gooboo.unlock`) }}: {{ $vuetify.lang.t(`$vuetify.unlock.${task.name}`) }}</span>
        <span v-else-if="task.type === 'upgrade'">{{ $vuetify.lang.t(`$vuetify.upgrade.${task.name}`) }} {{ $vuetify.lang.t(`$vuetify.gooboo.level`) }}</span>
        <span v-else-if="task.type === 'cropLevel'">{{ $vuetify.lang.t(`$vuetify.farm.crop.${task.name}`) }} {{ $vuetify.lang.t(`$vuetify.gooboo.level`) }}</span>
        <span v-else-if="task.type === 'equipmentMastery'">{{ $vuetify.lang.t(`$vuetify.horde.items.${task.name}`) }} {{ $vuetify.lang.t(`$vuetify.gooboo.level`) }}</span>
        <span>
          <span v-if="task.operator">&nbsp;{{ $vuetify.lang.t(`$vuetify.gooboo.operator.${task.operator}`) }}</span>
          <span v-if="task.value !== undefined">&nbsp;{{ currentIsTime ? $formatTime(task.value) : $formatNum(task.value) }}</span>
          <span v-if="typeof(current) === 'number'">: {{ currentIsTime ? $formatTime(current) : $formatNum(current) }}</span>
        </span>
      </div>
    </v-progress-linear>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    general: {
      type: String,
      required: true
    },
    quest: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      currency: state => state.currency
    }),
    task() {
      const quest = this.$store.state.general[this.general].quests[this.quest];
      return quest.stages[quest.stage].tasks[this.index];
    },
    current() {
      switch (this.task.type) {
        case 'stat': {
          return this.$store.state.stat[this.task.name][this.task.subtype === 'current' ? 'value' : 'total'];
        }
        case 'unlock': {
          return this.$store.state.unlock[this.task.name].see;
        }
        case 'upgrade': {
          return this.$store.state.upgrade.item[this.task.name][this.task.subtype === 'current' ? 'level' : 'highestLevel'];
        }
        case 'cropLevel': {
          return this.$store.state.farm.crop[this.task.name][this.task.subtype === 'current' ? 'level' : 'levelMax'];
        }
        case 'equipmentMastery': {
          return this.$store.state.horde.items[this.task.name].masteryLevel;
        }
      }
      return false;
    },
    currentIsTime() {
      return this.task.type === 'stat' && this.$store.state.stat[this.task.name].display === 'time';
    },
    percent() {
      return 100 * this.current / this.task.value;
    },
    status() {
      if (
        this.task.operator === '<' && this.current >= this.task.value ||
        this.task.operator === '<=' && this.current > this.task.value
      ) {
        return 'error';
      } else if (
        this.task.operator === undefined && !this.current ||
        this.task.operator === '>' && this.current <= this.task.value ||
        this.task.operator === '>=' && this.current < this.task.value ||
        this.task.operator === '==' && this.current !== this.task.value
      ) {
        return 'warning';
      }
      return 'success';
    },
    feature() {
      switch (this.task.type) {
        case 'stat': {
          return this.$store.state.stat[this.task.name].feature;
        }
        case 'unlock': {
          return this.task.feature;
        }
        case 'upgrade': {
          return this.$store.state.upgrade.item[this.task.name].feature;
        }
        case 'cropLevel': {
          return 'farm';
        }
        case 'equipmentMastery': {
          return 'horde';
        }
      }
      return null;
    },
    featureIcon() {
      return this.feature ? this.$store.state.system.features[this.feature].icon : null;
    }
  }
}
</script>
