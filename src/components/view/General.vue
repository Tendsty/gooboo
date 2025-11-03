<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
    <v-tabs :class="$vuetify.breakpoint.xsOnly ? 'mobile-tabs' : ''" v-model="tab" grow show-arrows>
      <v-tab v-for="item in tabs" :href="`#${ item.name }`" :key="'tab-' + item.name">
        <v-badge dot :value="item.hasBadge">
          <tab-icon-text :text="$vuetify.lang.t(`$vuetify.general.${ item.name }.name`)" :icon="generalIcon[item.name]"></tab-icon-text>
        </v-badge>
      </v-tab>
    </v-tabs>
    <div class="ma-2">
      <v-expansion-panels :key="'general-' + tab">
        <quest-line v-for="(quest, key) in quests" :key="'quest-' + key" :quest="quest" :general="tab" :name="key"></quest-line>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import QuestLine from '../partial/general/QuestLine.vue';
import TabIconText from '../partial/render/TabIconText.vue';

export default {
  components: { TabIconText, QuestLine },
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
          obj[key] = {...elem, hasBadge: this.$store.state.system.questlineHint[this.tab].findIndex(elem => elem === key) !== -1};
        }
      }
      return obj;
    },
    tabs() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.general)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          arr.push({name: key, hasBadge: this.$store.state.system.questlineHint[key].length > 0});
        }
      }
      return arr;
    }
  }
}
</script>
