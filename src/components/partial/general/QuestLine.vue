<style scoped>
.quest-stepper-mobile >>> .v-stepper__step {
  padding: 12px;
  max-width: 40px;
}
.quest-stepper-mobile >>> .v-stepper__step__step {
  margin-bottom: 0;
}
</style>

<template>
  <v-expansion-panel @click="clickQuestline">
    <v-expansion-panel-header>
      <v-badge class="flex-grow-0" :class="{'mr-1': quest.hasBadge}" dot :value="quest.hasBadge">
        <div>{{ $vuetify.lang.t(`$vuetify.general.${ general }.${ name }`) }}</div>
      </v-badge>
      <v-chip class="flex-grow-0 ml-2 px-2" label small color="success" v-if="quest.stage >= quest.stageLength">
        <v-icon class="mr-1">mdi-check</v-icon>
        <span>{{ Math.floor(quest.stage / quest.stageLength) }}</span>
      </v-chip>
      <v-chip class="flex-grow-0 ml-2 px-2" label small v-if="quest.stage < quest.stages.length">{{ quest.stage % quest.stageLength + 1 }} / {{ quest.stageLength }}</v-chip>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="d-flex align-center ma-2" v-if="quest.reward !== null && quest.stage < quest.stages.length">
        <span>{{ $vuetify.lang.t(`$vuetify.general.completionReward`) }}:&nbsp;</span>
        <mini v-if="quest.stage < quest.stageLength" :name="quest.reward"></mini>
        <gb-tooltip v-else key="relic-battery-gain" :title-text="$vuetify.lang.t(`$vuetify.relic.battery`)">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="amber" size="28" v-bind="attrs" v-on="on">mdi-battery-plus-variant</v-icon>
          </template>
          <display-row name="currencyRelicPowerCap" type="base" :before="0" :after="relicBatteryCap"></display-row>
        </gb-tooltip>
      </div>
      <div class="d-flex align-center">
        <v-btn v-if="$vuetify.breakpoint.smAndUp" x-large icon class="mr-2" :disabled="page <= 0" @click="prevPage"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-stepper class="flex-grow-1" :class="{'quest-stepper-mobile': $vuetify.breakpoint.smAndDown}" non-linear alt-labels v-model="step">
          <v-stepper-header>
            <v-stepper-step
              v-for="item in stepList"
              edit-icon="mdi-check"
              :key="'stage-' + name + '-' + item.index"
              :step="item.index"
              :complete="questStage > item.index"
              :editable="questStage >= item.index"
            ><v-icon v-for="(icon, iname) in item.icons" :key="'stage-icon-' + name + '-' + item.index + '-' + iname" :color="icon.color">{{ icon.icon }}</v-icon></v-stepper-step>
          </v-stepper-header>
        </v-stepper>
        <v-btn v-if="$vuetify.breakpoint.smAndUp" x-large icon class="ml-2" :disabled="page >= maxPage" @click="nextPage"><v-icon>mdi-arrow-right</v-icon></v-btn>
      </div>
      <div v-if="$vuetify.breakpoint.xsOnly" class="d-flex align-center">
        <v-btn x-large icon class="mr-2" :disabled="page <= 0" @click="prevPage"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large icon class="ml-2" :disabled="page >= maxPage" @click="nextPage"><v-icon>mdi-arrow-right</v-icon></v-btn>
      </div>
      <div>
        <quest-task
          class="ma-2 mx-auto"
          v-for="(item, index) in quest.stages[step - 1].tasks"
          :key="'task-' + step + '-' + name + '-' + index"
          :general="general"
          :quest="name"
          :stage="step - 1"
          :index="index"
          :is-completed="step < questStage"
        ></quest-task>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { RELIC_POWER_CAP_PER_QUESTLINE } from '../../../js/constants';
import Mini from '../relic/Mini.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
import QuestTask from './QuestTask.vue';

export default {
  components: { QuestTask, Mini, DisplayRow },
  props: {
    quest: {
      type: Object,
      required: true
    },
    general: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data: () => ({
    step: 1,
    page: 0
  }),
  mounted() {
    this.step = Math.min(this.questStage, this.quest.stages.length);
    this.page = Math.floor((this.step - 1) / this.quest.stageLength);
  },
  computed: {
    questStage() {
      return this.quest.stage + 1;
    },
    stepList() {
      let arr = [];
      this.quest.stages.forEach((elem, key) => {
        let icons = {};
        if (elem.isChallenge) {
          icons.challenge = {color: 'warning', icon: 'mdi-alert-octagram'};
        }
        elem.tasks.forEach(el => {
          let featureName = null;
          if (['stat', 'upgrade'].includes(el.type)) {
            const split = el.name.split('_');
            if (split[1] === 'timeSpent') {
              icons.challenge = {color: 'light-blue', icon: 'mdi-timer'};
            }
            featureName = split[0];
          } else if (el.type === 'unlock') {
            featureName = el.feature;
          } else if (el.type === 'cropLevel') {
            featureName = 'farm';
          } else if (el.type === 'equipmentMastery') {
            featureName = 'horde';
          }
          if (featureName) {
            icons[featureName] = {color: null, icon: this.$store.state.system.features[featureName].icon};
          }
        });
        if (key >= (this.quest.stageLength * this.page) && key < (this.quest.stageLength * (this.page + 1))) {
          arr.push({...elem, icons, index: key + 1});
        }
      });
      return arr;
    },
    maxPage() {
      return Math.floor(Math.min(this.quest.stage, this.quest.stages.length - 1) / this.quest.stageLength);
    },
    relicBatteryCap() {
      return RELIC_POWER_CAP_PER_QUESTLINE;
    }
  },
  methods: {
    nextPage() {
      this.page++;
    },
    prevPage() {
      this.page--;
    },
    clickQuestline() {
      this.$store.commit('system/removeQuestlineHint', {general: this.general, questline: this.name});
    }
  }
}
</script>
