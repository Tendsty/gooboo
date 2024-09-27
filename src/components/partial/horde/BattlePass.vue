<style scoped>
.pass-card {
  position: relative;
  width: 200px;
  height: 300px;
}
.pass-card-mobile {
  width: 114px;
  height: 175px;
}
.pass-level {
  font-size: 30px;
}
.pass-card-mobile .pass-level {
  font-size: 24px;
}
.pass-effect {
  font-size: 14px;
}
.pass-card-mobile .pass-effect {
  font-size: 8px;
}
.pass-check {
  position: absolute;
  top: -6px;
  right: -6px;
}
.pass-effect-inactive {
  opacity: 0.5;
}
.quest-title {
  font-size: 48px;
}
.quest-select {
  width: 200px;
}
</style>

<template>
  <div>
    <div class="d-flex flex-wrap justify-center align-center ma-1">
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" width="48" min-width="0" height="48" class="ma-1" color="primary" @click="prevPage" :disabled="page <= 0"><v-icon size="72">mdi-menu-left</v-icon></v-btn>
      <div v-for="level in passLevels" class="d-flex flex-column align-center pass-card bg-tile-default rounded elevation-2 ma-1 pa-2" :class="{'pass-card-mobile': $vuetify.breakpoint.smAndDown}" :key="`pass-level-${ level.lvl }`">
        <div class="d-flex align-center pass-level balloon-text-dynamic">
          <v-icon v-if="level.isSpecial" class="mr-3" small :color="currentLevel >= level.lvl ? 'success' : undefined">mdi-star</v-icon>
          <div :class="{'success--text': currentLevel >= level.lvl}">{{ level.lvl }}</div>
          <v-icon v-if="level.isSpecial" class="ml-3" small :color="currentLevel >= level.lvl ? 'success' : undefined">mdi-star</v-icon>
        </div>
        <v-icon :color="level.color" :size="level.isSpecial ? 48 : 32" class="balloon-text-dynamic" :class="level.isSpecial ? 'mt-2' : 'mt-4 pass-effect-inactive'">{{ level.icon }}</v-icon>
        <v-spacer></v-spacer>
        <display-row
          v-for="(elem, key) in level.effect"
          class="pass-effect"
          :class="{'pass-effect-inactive': currentLevel < level.lvl}"
          :key="`pass-effect-${ level.lvl }-${ key }`"
          :type="elem.type"
          :name="elem.name"
          :before="elem.before"
          :after="elem.value"
        ></display-row>
        <v-icon v-if="currentLevel >= level.lvl" class="pass-check" large color="success">mdi-check-circle</v-icon>
      </div>
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" width="48" min-width="0" height="48" class="ma-1" color="primary" @click="nextPage" :disabled="page >= maxPage"><v-icon size="72">mdi-menu-right</v-icon></v-btn>
    </div>
    <div v-if="$vuetify.breakpoint.smAndDown" class="d-flex justify-center ma-1">
      <v-btn width="36" min-width="0" height="36" class="ma-1" color="primary" @click="prevPage" :disabled="page <= 0"><v-icon size="54">mdi-menu-left</v-icon></v-btn>
      <v-btn width="36" min-width="0" height="36" class="ma-1" color="primary" @click="nextPage" :disabled="page >= maxPage"><v-icon size="54">mdi-menu-right</v-icon></v-btn>
    </div>
    <div class="ma-1">
      <div class="d-flex justify-center align-center mx-2 mt-8">
        <div class="quest-title">{{ $vuetify.lang.t(`$vuetify.horde.quest.name`) }}</div>
        <div class="quest-select ml-4">
          <v-select outlined hide-details item-value="name" v-model="selectedClass" :items="classList">
            <template v-slot:selection="{ item }"><v-icon class="mr-2">{{ item.icon }}</v-icon><div>{{ $vuetify.lang.t(`$vuetify.horde.classes.${ item.name }.name`) }}</div></template>
            <template v-slot:item="{ item }"><v-icon class="mr-2">{{ item.icon }}</v-icon><div>{{ $vuetify.lang.t(`$vuetify.horde.classes.${ item.name }.name`) }}</div></template>
          </v-select>
        </div>
      </div>
      <div class="text-center ma-2">{{ $vuetify.lang.t(`$vuetify.horde.quest.description`) }}</div>
      <v-row no-gutters>
        <v-col v-for="(quest, qname) in quests" :key="`quest-category-${ qname }`" cols="12" sm="6" lg="3">
          <v-card class="ma-1 pa-2">
            <div>{{ $vuetify.lang.t(`$vuetify.horde.quest.completed`, quest.completed) }}</div>
            <div v-if="quest.value === null">{{ $vuetify.lang.t(`$vuetify.horde.quest.allCompleted`) }}</div>
            <template v-else>
              <div v-if="qname === 'stat'">{{ $vuetify.lang.t(`$vuetify.horde.battlePass.quest.stat`, $formatNum(quest.value.value), $vuetify.lang.t(`$vuetify.horde.battlePass.statType.${ quest.value.type }`, $vuetify.lang.t(`$vuetify.mult.${ quest.value.stat }`))) }}</div>
              <div v-else-if="qname === 'zone'">{{ $vuetify.lang.t(`$vuetify.horde.battlePass.quest.zone`, $vuetify.lang.t(`$vuetify.horde.area.${ quest.value.area }`), quest.value.zone) }}</div>
              <div v-else-if="qname === 'level'">{{ $vuetify.lang.t(`$vuetify.horde.battlePass.quest.level`, $formatNum(quest.value)) }}</div>
              <div v-else-if="qname === 'boss'">{{ $vuetify.lang.t(`$vuetify.horde.battlePass.quest.boss`, $vuetify.lang.t(`$vuetify.horde.bossName.${ quest.value.boss }`), $formatNum(quest.value.difficulty)) }}</div>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow },
  data: () => ({
    page: 0,
    selectedClass: 'adventurer'
  }),
  computed: {
    passLevels() {
      let arr = [];
      for (let i = 0; i < 5; i++) {
        const lvl = this.page * 5 + i + 1;
        arr.push({...this.$store.getters['horde/battlePassEffectAtLevel'](lvl), lvl});
      }
      return arr;
    },
    currentLevel() {
      return this.$store.getters['horde/battlePassCurrentLevel'];
    },
    maxPage() {
      return Math.ceil(this.currentLevel / 5);
    },
    quests() {
      let obj = {};
      for (const [key, elem] of Object.entries(this.$store.state.horde.fighterClass[this.selectedClass].quests)) {
        const completed = this.$store.state.horde.fighterClass[this.selectedClass].questsCompleted[key];
        obj[key] = {value: completed >= elem.length ? null : elem[completed], completed};
      }
      return obj;
    },
    classList() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.horde.fighterClass)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          arr.push({...elem, name: key});
        }
      }
      return arr;
    }
  },
  methods: {
    prevPage() {
      this.page = Math.max(0, this.page - 1);
    },
    nextPage() {
      this.page++;
    }
  },
  mounted() {
    this.selectedClass = this.$store.state.horde.selectedClass;
    this.page = Math.floor(this.currentLevel / 5);
  }
}
</script>
