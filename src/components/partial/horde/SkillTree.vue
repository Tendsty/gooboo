<style scoped>
.class-level-current {
  width: 44px;
  height: 44px;
  font-size: 22px;
  z-index: 1;
}
.class-level-needed {
  background-color: #80808060;
  width: 40px;
}
.class-level-inactive {
  background-color: #80808020;
}
.skill-grp-letter {
  font-size: 20px;
}
.skill-grp-letter-disabled {
  opacity: 0.3;
}
</style>

<template>
  <div>
    <div class="d-flex align-center ma-2">
      <div class="class-level-current red rounded-circle d-flex justify-center align-center balloon-text-dynamic flex-shrink-0">{{ currentLevel }}</div>
      <v-progress-linear class="rounded-r ml-n1" color="red" height="20" :value="expProgress * 100">{{ $formatTime(expTime) }} ({{ $formatNum(expProgress * 100) }}%)</v-progress-linear>
    </div>
    <div class="text-center">{{ $vuetify.lang.t('$vuetify.horde.classes.skillPointsLeft', skillPoints) }}</div>
    <v-card
      v-for="(skillRow, key) in skillTree"
      :key="`skill-row-${ key }`"
      class="d-flex ma-2"
    >
      <div class="d-flex flex-column justify-center align-center rounded-l rounded-r-0 class-level-needed flex-shrink-0" :class="{'class-level-inactive': !skillRow.canUse}">
        <v-icon v-if="skillRow.isInnate">mdi-star</v-icon>
        <div v-else>{{ skillRow.level }}</div>
        <gb-tooltip v-if="skillRow.isChoice" :min-width="0">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-arrow-decision</v-icon>
          </template>
          <div class="mt-0">{{ $vuetify.lang.t('$vuetify.horde.classes.skillTreeChoice') }}</div>
        </gb-tooltip>
      </div>
      <div class="d-flex justify-center align-center flex-wrap flex-grow-1 pa-1">
        <template v-for="(skillBtn, skillId) in skillRow.items">
          <div
            v-if="Array.isArray(skillBtn)"
            :key="`skill-grp-${ skillId }`"
            class="d-flex flex-column justify-center align-center bg-tile-default ma-1 px-1 elevation-2 rounded-lg"
          >
            <div class="skill-grp-letter mb-n1" :class="skillBtn[0].canUse ? 'balloon-text-dynamic' : 'skill-grp-letter-disabled'">{{ String.fromCharCode(65 + skillId) }}</div>
            <skill-button
              v-for="skillInnerBtn in skillBtn"
              :key="`skill-btn-${ skillId }-${ skillInnerBtn.name }`"
              :name="skillInnerBtn.name"
              :type="skillInnerBtn.type"
              :color="skillInnerBtn.type === 'stat' ? statStyle[skillInnerBtn.name.split('_')[0]].color : skillInnerBtn.color"
              :icon="skillInnerBtn.type === 'stat' ? statStyle[skillInnerBtn.name.split('_')[0]].icon : skillInnerBtn.icon"
              :max="skillInnerBtn.max"
              :skill="skillInnerBtn"
              :disabled="!skillRow.canUse || !skillInnerBtn.canUse"
            ></skill-button>
          </div>
          <skill-button
            v-else
            :key="`skill-btn-${ skillBtn.name }`"
            :name="skillBtn.name"
            :type="skillBtn.type"
            :color="skillBtn.type === 'stat' ? statStyle[skillBtn.name.split('_')[0]].color : skillBtn.color"
            :icon="skillBtn.type === 'stat' ? statStyle[skillBtn.name.split('_')[0]].icon : skillBtn.icon"
            :max="skillBtn.max"
            :skill="skillBtn"
            :disabled="!skillRow.canUse"
          ></skill-button>
        </template>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SkillButton from './SkillButton.vue';

export default {
  components: { SkillButton },
  data: () => ({
    statStyle: {
      health: {
        color: 'green',
        icon: 'mdi-heart'
      },
      energy: {
        color: 'amber',
        icon: 'mdi-lightning-bolt'
      },
      mana: {
        color: 'dark-blue',
        icon: 'mdi-water'
      },
      strength: {
        color: 'orange-red',
        icon: 'mdi-arm-flex'
      },
      intelligence: {
        color: 'indigo',
        icon: 'mdi-lightbulb-on'
      },
      haste: {
        color: 'pale-yellow',
        icon: 'mdi-timer-sand'
      },
      damage: {
        color: 'red',
        icon: 'mdi-sword-cross'
      },
      recovery: {
        color: 'pink',
        icon: 'mdi-heart-plus'
      },
      blood: {
        color: 'red',
        icon: 'mdi-iv-bag'
      },
      courage: {
        color: 'orange',
        icon: 'mdi-ghost'
      },
      critChance: {
        color: 'orange',
        icon: 'mdi-motion'
      },
      critMult: {
        color: 'orange-red',
        icon: 'mdi-motion'
      },
      spellblade: {
        color: 'pale-red',
        icon: 'mdi-auto-fix'
      },
      defense: {
        color: 'dark-blue',
        icon: 'mdi-shield'
      },
      cutting: {
        color: 'brown',
        icon: 'mdi-content-cut'
      },
      toxic: {
        color: 'light-green',
        icon: 'mdi-water'
      },
      physicTaken: {
        color: 'cherry',
        icon: 'mdi-shield-sword'
      },
      magicTaken: {
        color: 'dark-blue',
        icon: 'mdi-shield-star'
      },
      bioTaken: {
        color: 'green',
        icon: 'mdi-shield-bug'
      },
      divisionShield: {
        color: 'pale-blue',
        icon: 'mdi-circle-half-full'
      },
      trinket: {
        color: 'amber',
        icon: 'mdi-necklace'
      },
      lockpick: {
        color: 'orange-red',
        icon: 'mdi-screwdriver'
      }
    }
  }),
  computed: {
    ...mapState({
      expLevel: state => state.horde.expLevel,
      skillPoints: state => state.horde.skillPoints,
      skillLevel: state => state.horde.skillLevel,
    }),
    selectedClass() {
      return this.$store.state.horde.fighterClass[this.$store.state.horde.selectedClass];
    },
    skills() {
      return this.selectedClass.skills;
    },
    skillTree() {
      return this.selectedClass.skillTree.map(elem => {
        const canUse = elem.isInnate || this.currentLevel >= elem.level;
        return {...elem, items: elem.items.map((el, ind) => {return Array.isArray(el) ? el.map((e, k) => {
          const row = elem.items.findIndex(i => this.skillLevel[i[0]] > 0);
          return {...this.skills[e], name: e, canUse: (row === ind) || (row === -1 && k === 0)};
        }) : {...this.skills[el], name: el}}), canUse};
      }).filter((elem, index, arr) => elem.canUse || (index > 0 && arr[index - 1].canUse));
    },
    currentLevel() {
      return Math.floor(this.expLevel);
    },
    expProgress() {
      return this.expLevel - this.currentLevel;
    },
    expTime() {
      return Math.ceil((1 - this.expProgress) * this.$store.getters['horde/expDifficulty'](this.currentLevel));
    }
  }
}
</script>
