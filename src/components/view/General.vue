<template>
  <div>
    <v-tabs :class="$vuetify.breakpoint.xsOnly ? 'mobile-tabs' : ''" v-model="tab" grow show-arrows>
      <v-tab v-for="item in tabs" :href="`#${item}`" :key="'tab-' + item">
        <tab-icon-text :text="$vuetify.lang.t(`$vuetify.general.${item}.name`)" :icon="generalIcon[item]"></tab-icon-text>
      </v-tab>
    </v-tabs>
    <div class="ma-2">
      <v-expansion-panels>
        <v-expansion-panel v-for="(quest, key) in quests" :key="'quest-' + key">
          <v-expansion-panel-header>
            <div class="flex-grow-0 mr-2">{{ $vuetify.lang.t(`$vuetify.general.${tab}.${key}`) }}</div>
            <v-chip class="flex-grow-0 px-2" label small v-if="quest.stage < quest.stages.length">{{ quest.stage + 1 }} / {{ quest.stages.length }}</v-chip>
            <v-chip class="flex-grow-0 px-2" label small color="success" v-else><v-icon>mdi-check</v-icon></v-chip>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="ma-2" v-if="quest.reward !== null">{{ $vuetify.lang.t(`$vuetify.general.completionReward`) }}: <mini :name="quest.reward"></mini></div>
            <v-stepper>
              <v-stepper-header>
                <v-stepper-step v-for="(item, index) in quest.stages" :key="'stage-' + key + '-' + index" :step="index + 1" :complete="quest.stage > index"></v-stepper-step>
              </v-stepper-header>
            </v-stepper>
            <div v-if="quest.stage < quest.stages.length">
              <quest-task class="ma-2" v-for="(item, index) in quest.stages[quest.stage].tasks" :key="'task-' + key + '-' + index" :general="tab" :quest="key" :index="index"></quest-task>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import QuestTask from '../partial/general/QuestTask.vue';
import Mini from '../partial/relic/Mini.vue';
import TabIconText from '../partial/render/TabIconText.vue';

export default {
  components: { QuestTask, Mini, TabIconText },
  data: () => ({
    tab: 'grobodal',
    generalIcon: {
      grobodal: 'mdi-account-cowboy-hat',
      orladee: 'mdi-account-eye',
      oppenschroe: 'mdi-account-cog',
      bellux: 'mdi-account-edit',
      onoclua: 'mdi-account-music',
      omnisolix: 'mdi-account-tie'
    }
  }),
  computed: {
    quests() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.$store.state.general[this.tab].quests)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          obj[key] = elem;
        }
      }
      return obj;
    },
    tabs() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.general)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          arr.push(key);
        }
      }
      return arr;
    }
  }
}
</script>
