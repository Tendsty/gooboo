<style scoped>
.small-quest-task {
  font-size: 12px;
  line-height: 1;
}
.quest-hint {
  font-size: 12px;
  line-height: 12px;
  margin-bottom: 2px;
  opacity: 0.75;
}
.quest-task-mobile .quest-hint {
  font-size: 9px;
  line-height: 9px;
}
</style>

<template>
  <div v-if="isVisible" class="d-flex align-center balloon-text-dynamic" :class="{'quest-task-mobile': $vuetify.breakpoint.xsOnly}" style="max-width: 900px;">
    <v-icon class="mr-2" :color="status">{{ status === 'success' ? 'mdi-check' : 'mdi-alert' }}</v-icon>
    <v-progress-linear :color="status" :value="percent" rounded height="40">
      <div class="text-center px-1">
        <div class="d-flex justify-center align-center text-center" :class="{'small-quest-task': $vuetify.breakpoint.xsOnly}">
          <div v-if="feature" class="d-flex align-center">
            <v-icon small class="mr-1">{{ featureIcon }}</v-icon>
            <span>{{ $vuetify.lang.t(`$vuetify.feature.${ feature }`) }}</span>
            <v-icon>mdi-circle-small</v-icon>
          </div>
          <template v-if="task.type === 'subfeature'">{{ $vuetify.lang.t('$vuetify.feature.subfeature') }}: {{ $vuetify.lang.t(`$vuetify.subfeature.${ task.name }.${ task.value }`) }}</template>
          <template v-else-if="task.type === 'stat'">
            <template v-if="currency[task.name]">{{ $vuetify.lang.t('$vuetify.general.questGained', $vuetify.lang.t(`$vuetify.currency.${ task.name }.name`)) }}</template>
            <template v-else-if="task.name.slice(-3) === 'Max' && currency[task.name.slice(0, -3)]">{{ $vuetify.lang.t('$vuetify.general.questHighestAmount', $vuetify.lang.t(`$vuetify.currency.${ task.name.slice(0, -3) }.name`)) }}</template>
            <template v-else>{{ $vuetify.lang.t(`$vuetify.stat.${ task.name }.description`) }}</template>
          </template>
          <template v-else-if="task.type === 'unlock'">{{ $vuetify.lang.t(`$vuetify.gooboo.unlock`) }}: {{ $vuetify.lang.t(`$vuetify.unlock.${ task.name }`) }}</template>
          <template v-else-if="task.type === 'cardEquipped'">{{ $vuetify.lang.t('$vuetify.general.questEquipCard') }}: {{ task.name }}</template>
          <template v-else-if="task.type === 'upgrade'">{{ $vuetify.lang.t(`$vuetify.upgrade.${ task.name }`) }} {{ $vuetify.lang.t(`$vuetify.gooboo.level`) }}</template>
          <template v-else-if="task.type === 'cropLevel'">{{ $vuetify.lang.t(`$vuetify.farm.crop.${ task.name }`) }} {{ $vuetify.lang.t(`$vuetify.gooboo.level`) }}</template>
          <template v-else-if="task.type === 'equipmentMastery'">{{ $vuetify.lang.t(`$vuetify.horde.equipment.${ task.name }`) }} {{ $vuetify.lang.t(`$vuetify.gooboo.level`) }}</template>
          <template v-if="task.type !== 'subfeature'">
            <template v-if="task.operator">&nbsp;{{ $vuetify.lang.t(`$vuetify.gooboo.operator.${ task.operator }`) }}</template>
            <template v-if="task.value !== undefined">&nbsp;{{ taskValueFormatted }}</template>
            <template v-if="!isCompleted && typeof(current) === 'number'">: {{ currentValueFormatted }}</template>
          </template>
        </div>
        <div v-if="task.type === 'subfeature' && status === 'error'" class="quest-hint">{{ $vuetify.lang.t('$vuetify.general.questFailedSubfeature') }}</div>
        <div v-if="task.type === 'stat' && task.name.split('_')[1] === 'timeSpent' && status === 'error'" class="quest-hint">{{ $vuetify.lang.t('$vuetify.general.questFailedTime') }}</div>
        <div v-if="task.type === 'cardEquipped' && status === 'error'" class="quest-hint">{{ $vuetify.lang.t(`$vuetify.general.questFailedCard${ isUnownedCard ? 'Unowned' : '' }`) }}</div>
      </div>
    </v-progress-linear>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { formatInt, formatNum, formatTime } from '../../../js/utils/format';

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
    stage: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isCompleted: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      currency: state => state.currency,
    }),
    isVisible() {
      return this.task.type !== 'subfeature' || this.task.value > 0 || this.$store.state.unlock[this.$store.state.system.features[this.task.name].subfeatures[0]].see;
    },
    task() {
      return this.$store.state.general[this.general].quests[this.quest].stages[this.stage].tasks[this.index];
    },
    current() {
      switch (this.task.type) {
        case 'subfeature': {
          return this.$store.state.system.features[this.task.name].currentSubfeature;
        }
        case 'stat': {
          return this.$store.state.stat[this.task.name][this.task.subtype === 'current' ? 'value' : 'total'];
        }
        case 'unlock': {
          return this.$store.state.unlock[this.task.name].see;
        }
        case 'cardEquipped': {
          return this.$store.state.card.feature[this.task.feature].cardEquipped.includes(this.task.name);
        }
        case 'upgrade': {
          return this.$store.state.upgrade.item[this.task.name][this.task.subtype === 'current' ? 'level' : 'highestLevel'];
        }
        case 'cropLevel': {
          return Math.max(this.$store.state.farm.crop[this.task.name].level, this.$store.state.farm.crop[this.task.name].levelMax);
        }
        case 'equipmentMastery': {
          return this.$store.state.horde.items[this.task.name].masteryLevel;
        }
      }
      return false;
    },
    isUnownedCard() {
      return this.task.type === 'cardEquipped' && this.status === 'error' && this.$store.state.card.card[this.task.name].amount <= 1;
    },
    taskValueFormatted() {
      if (this.task.type === 'stat') {
        if (this.$store.state.stat[this.task.name].display === 'percent') {
          return formatNum(this.task.value * 100, true) + '%';
        }
        if (this.$store.state.stat[this.task.name].display === 'time') {
          return formatTime(this.task.value);
        }
        if (this.$store.state.stat[this.task.name].display === 'int') {
          return formatInt(this.task.value);
        }
      }
      return formatNum(this.task.value);
    },
    currentValueFormatted() {
      if (this.task.type === 'stat') {
        if (this.$store.state.stat[this.task.name].display === 'percent') {
          return formatNum(this.current * 100, true) + '%';
        }
        if (this.$store.state.stat[this.task.name].display === 'time') {
          return formatTime(this.current);
        }
        if (this.$store.state.stat[this.task.name].display === 'int') {
          return formatInt(this.current);
        }
      }
      return formatNum(this.current);
    },
    percent() {
      return this.isCompleted ? 100 : this.task.type === 'subfeature' ? (this.current === this.task.value ? 100 : 0) : (100 * this.current / this.task.value);
    },
    status() {
      if (this.isCompleted) {
        return 'success';
      } else if (
        this.task.operator === '<' && this.current >= this.task.value ||
        this.task.operator === '<=' && this.current > this.task.value ||
        this.task.type === 'cardEquipped' && !this.current ||
        this.task.type === 'subfeature' && this.current !== this.task.value
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
        case 'subfeature': {
          return this.task.name;
        }
        case 'stat': {
          return this.$store.state.stat[this.task.name].feature;
        }
        case 'unlock':
        case 'cardEquipped': {
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
