<template>
  <div v-if="replay === null">
    <div class="d-flex justify-center align-center pa-1">
      <div class="ma-1">{{ $vuetify.lang.t(`$vuetify.event.snowdown.fightCount`) }} #{{ fightsWon + 1 }}</div>
      <price-tag class="ma-1" currency="event_snowball" :amount="snowballFightCost"></price-tag>
      <gb-tooltip key="snowball-fight-win">
        <template v-slot:activator="{ on, attrs }">
          <div class="ma-1" v-bind="attrs" v-on="on">
            <v-btn color="primary" :disabled="rewardProducer || rewardItem !== null || snowball < snowballFightCost" @click="snowballFight">
              <v-icon class="mr-2">mdi-snowflake</v-icon>
              {{ $vuetify.lang.t(`$vuetify.event.snowdown.fight`) }}
            </v-btn>
          </div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.snowdown.fightDescription') }}</div>
        <div>{{ $vuetify.lang.t('$vuetify.event.snowdown.fightWin') }}:</div>
        <ul class="mt-0">
          <li>{{ $vuetify.lang.t('$vuetify.event.snowdown.fightWinProducer') }}</li>
          <li v-if="winItemGain">{{ $vuetify.lang.t('$vuetify.event.snowdown.fightWinItem') }}</li>
          <li><price-tag currency="event_snowdownToken" add :amount="winTokenGain"></price-tag></li>
        </ul>
      </gb-tooltip>
      <gb-tooltip key="snowball-fight-revenge" v-if="revenge > 0" :title-text="$vuetify.lang.t('$vuetify.event.snowdown.revenge.name')">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-badge color="orange" class="balloon-text-dynamic" offset-x="14" offset-y="20" bottom overlap>
              <v-icon large>mdi-emoticon-angry</v-icon>
              <template v-slot:badge>
                <span :class="{'black--text': !$vuetify.theme.dark}">{{ $formatInt(revenge) }}</span>
              </template>
            </v-badge>
          </div>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t('$vuetify.event.snowdown.revenge.description', $formatInt(revenge)) }}</div>
        <div v-if="revengeStats > 0">{{ $vuetify.lang.t('$vuetify.event.snowdown.revenge.statsScaling', $formatNum(revengeCrit, true), $formatNum(revengeBlock, true), $formatNum(revengeStats * 100, true)) }}</div>
        <div v-else>{{ $vuetify.lang.t('$vuetify.event.snowdown.revenge.statsBase') }}</div>
      </gb-tooltip>
    </div>
    <div class="d-flex justify-center flex-wrap pa-1 mt-4">
      <snowdown-fighter class="ma-1" v-for="(item, key) in playerStats" :key="'player-' + key" :type="key > 0 ? 'pet' : 'player'" :stats="item"></snowdown-fighter>
    </div>
    <div class="d-flex justify-center flex-wrap pa-1 mt-4">
      <snowdown-fighter class="ma-1" v-for="(item, key) in enemyStats" :key="'player-' + key" :stats="item"></snowdown-fighter>
    </div>
  </div>
  <div v-else>
    <div class="d-flex justify-center align-center pa-1">
      <v-btn class="ma-1" color="primary" @click="fightSkip">{{ $vuetify.lang.t(`$vuetify.gooboo.skip`) }}</v-btn>
    </div>
    <div class="d-flex justify-center flex-wrap pa-1 mt-4">
      <snowdown-fighter class="ma-1" v-for="(item, key) in replay.player" :key="'player-' + key" :stats="item"></snowdown-fighter>
    </div>
    <div class="d-flex justify-center flex-wrap pa-1 mt-4">
      <snowdown-fighter class="ma-1" v-for="(item, key) in replay.enemy" :key="'player-' + key" :stats="item"></snowdown-fighter>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { SNOWDOWN_FIGHT_COST } from '../../../js/constants';
import PriceTag from '../../render/PriceTag.vue';
import SnowdownFighter from './SnowdownFighter.vue';

export default {
  components: { SnowdownFighter, PriceTag },
  data: () => ({
    replay: null,
    replayTurn: 0,
    replayStep: 0,
    replayStop: false,
    intervalId: null
  }),
  computed: {
    ...mapState({
      fightsWon: state => state.snowdown.fight,
      rewardProducer: state => state.snowdown.rewardProducer,
      rewardItem: state => state.snowdown.rewardItem,
      replayBase: state => state.snowdown.result,
      revenge: state => state.snowdown.revenge,
      snowball: state => state.currency.event_snowball.value
    }),
    ...mapGetters({
      playerStats: 'snowdown/playerStats',
      enemyStats: 'snowdown/enemyStats',
      winTokenGain: 'snowdown/winTokenGain',
      winItemGain: 'snowdown/winItemGain',
    }),
    snowballFightCost() {
      return SNOWDOWN_FIGHT_COST;
    },
    revengeStats() {
      return this.$store.getters['mult/get']('snowdownRevengeStats');
    },
    revengeCrit() {
      return this.$store.getters['mult/get']('snowdownRevengeCrit');
    },
    revengeBlock() {
      return this.$store.getters['mult/get']('snowdownRevengeBlock');
    }
  },
  methods: {
    snowballFight() {
      this.$store.dispatch('snowdown/fight');
    },
    replayAction() {
      if (this.replayStop) {
        this.replayStop = false;
        this.intervalStop();
        this.$set(this, 'replay', null);
      } else {
        const action = this.replay.battleLog[this.replayTurn][this.replayStep];
        const playerTurn = !(this.replayTurn % 2);

        // Clear all labels
        this.replay.player.forEach(elem => {
          this.$set(elem, 'label', null);
        });
        this.replay.enemy.forEach(elem => {
          this.$set(elem, 'label', null);
        });

        // Perform action
        switch (action.type) {
          case 'attack': {
            if (playerTurn) {
              this.$set(this.replay.enemy[action.targetKey], 'healthCurrent', this.replay.enemy[action.targetKey].healthCurrent - action.power);
              this.$set(this.replay.enemy[action.targetKey], 'label', {type: 'damage', crit: action.crit, value: action.power});
              this.$set(this.replay.player[action.selfKey], 'label', {type: 'attack'});
            } else {
              this.$set(this.replay.player[action.targetKey], 'healthCurrent', this.replay.player[action.targetKey].healthCurrent - action.power);
              this.$set(this.replay.player[action.targetKey], 'label', {type: 'damage', crit: false, value: action.power});
              this.$set(this.replay.enemy[action.selfKey], 'label', {type: 'attack'});
            }
            break;
          }
          case 'attackBlocked': {
            if (playerTurn) {
              this.$set(this.replay.enemy[action.targetKey], 'label', {type: 'block'});
              this.$set(this.replay.player[action.selfKey], 'label', {type: 'attack'});
            } else {
              this.$set(this.replay.player[action.targetKey], 'label', {type: 'block'});
              this.$set(this.replay.enemy[action.selfKey], 'label', {type: 'attack'});
            }
            break;
          }
          case 'heal': {
            this.$set(this.replay.player[action.targetKey], 'healthCurrent', Math.min(this.replay.player[action.targetKey].health, this.replay.player[action.targetKey].healthCurrent + action.power));
            this.$set(this.replay.player[action.targetKey], 'label', {type: 'heal', value: action.power});
            break;
          }
          case 'buffStat': {
            this.$set(this.replay.player[action.targetKey], action.stat, this.replay.player[action.targetKey][action.stat] + action.power);
            this.$set(this.replay.player[action.targetKey], 'label', {type: 'buff', stat: action.stat, value: action.power});
            break;
          }
          case 'stun': {
            this.$set(this.replay.enemy[action.targetKey], 'stun', this.replay.enemy[action.targetKey].stun + action.power);
            this.$set(this.replay.enemy[action.targetKey], 'label', {type: 'stun', value: action.power});
            break;
          }
          case 'revive': {
            this.$set(this.replay.player[action.targetKey], 'healthCurrent', action.power);
            this.$set(this.replay.player[action.targetKey], 'label', {type: 'heal', value: action.power});
            break;
          }
          default:
            console.warn('Unknown replay log type: ' + action.type);
            break;
        }

        // Next replay step
        if ((this.replayStep + 1) < this.replay.battleLog[this.replayTurn].length) {
          this.replayStep++;
        } else if ((this.replayTurn + 1) < this.replay.battleLog.length) {
          this.replayTurn++;
          this.replayStep = 0;
        } else {
          this.replayStop = true;
        }
      }
    },
    intervalStop() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    fightSkip() {
      this.intervalStop();
      this.$set(this, 'replay', null);
    }
  },
  destroyed() {
    this.intervalStop();
  },
  watch: {
    replayBase(newVal) {
      if (newVal !== null) {
        this.$set(this, 'replay', {...newVal, player: newVal.player.map(elem => {
          return {...elem, healthCurrent: elem.health, stun: 0, label: null};
        }), enemy: newVal.enemy.map(elem => {
          return {...elem, healthCurrent: elem.health, stun: 0, label: null};
        })});
        this.replayTurn = 0;
        this.replayStep = 0;
        this.replayStop = false;
        this.intervalId = setInterval(this.replayAction, 750);
      }
    }
  }
}
</script>
