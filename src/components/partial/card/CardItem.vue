<style scoped>
.card-playing {
  position: relative;
  width: 120px;
  height: 168px;
  border: 3px solid black !important;
}
.card-playing-dark {
  border: 3px solid white !important;
}
.card-hidden {
  width: 120px;
  height: 168px;
}
.card-playing-mobile {
  width: 80px;
  height: 112px;
}
.card-playing-title {
  width: 100%;
  height: 32px;
  font-size: 12px;
  line-height: 1;
}
.card-playing-title-mobile {
  height: 24px;
  font-size: 10px;
}
.card-playing-bottom {
  width: 100%;
  height: 12px;
  padding-left: 2px;
  font-size: 10px;
  line-height: 1;
}
.card-playing-amount {
  position: absolute;
  opacity: 0.75;
  font-size: 14px;
  left: -13px;
  top: -13px;
}
.card-playing-amount-mobile {
  left: -9px;
  top: -5px;
  font-size: 10px;
}
.card-playing-power-dark {
  border: 4px solid white !important;
}
.card-playing-power-light {
  border: 4px solid black !important;
}
.card-playing-power {
  position: absolute;
  width: 24px;
  height: 24px;
  right: -18px;
  top: -26px;
}
.card-playing-power-inner {
  width: 20px;
  height: 20px;
  margin-left: -2px;
  margin-top: -2px;
}
.card-playing-power-mobile {
  width: 20px;
  height: 20px;
  right: -15px;
  top: -16px;
}
.card-playing-power-mobile > .card-playing-power-inner {
  width: 16px;
  height: 16px;
  font-size: 12px;
}
.card-playing-inner {
  border-top: 2px solid black !important;
  border-bottom: 2px solid black !important;
}
.card-playing-inner-dark {
  border-top: 2px solid white !important;
  border-bottom: 2px solid white !important;
}
.card-playing-inner-frame {
  position: relative;
  width: 100%;
  height: 100%;
}
.card-playing-icon {
  position: absolute;
}
.card-feature-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 24px;
  height: 24px;
  border-top-left-radius: 8px;
}
.card-feature-inner {
  width: 100%;
  height: 100%;
}
.card-ma-05 {
  margin: 2px;
}

/* shiny card visuals */
@keyframes shiny-card {
  0%   {opacity: 30%;}
  10%  {opacity: 40%;}
  20%  {opacity: 55%;}
  30%  {opacity: 30%;}
  40%  {opacity: 40%;}
  50%  {opacity: 30%;}
  60%  {opacity: 60%;}
  70%  {opacity: 40%;}
  80%  {opacity: 30%;}
  90%  {opacity: 45%;}
  100% {opacity: 30%;}
}
.card-shiny {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(25deg, #FFFFFFFF, #E0F0FFC0);
  animation: shiny-card 10s linear infinite;
}
</style>

<template>
  <gb-tooltip>
    <template v-slot:activator="{ on, attrs }">
      <div
        v-if="card.amount > 0"
        class="card-playing d-flex flex-column rounded elevation-2"
        :style="`border-color: ${ $vuetify.theme.dark ? 'white' : 'black' } !important;`"
        :class="[{'card-playing-mobile': $vuetify.breakpoint.xsOnly, 'card-playing-dark': $vuetify.theme.dark}, $vuetify.theme.dark ? card.color : `${ card.color } lighten-3`, $vuetify.breakpoint.xsOnly ? 'card-ma-05' : 'ma-1']"
        v-bind="attrs"
        v-on="on"
      >
        <div
          class="card-playing-title d-flex flex-wrap justify-center align-center text-center px-1"
          :class="[{'card-playing-title-mobile': $vuetify.breakpoint.xsOnly}, $vuetify.theme.dark ? `${ card.color } darken-2` : `${ card.color } lighten-1`]"
        >{{ $vuetify.lang.t(`$vuetify.card.card.${id}`) }}</div>
        <div class="card-playing-inner flex-grow-1 px-3 py-2 px-sm-4 py-sm-4" :class="{'card-playing-inner-dark': $vuetify.theme.dark}">
          <div class="card-playing-inner-frame">
            <v-icon
              class="card-playing-icon"
              :size="($vuetify.breakpoint.smAndUp ? 24 : 14.364) * (item.size ? item.size : 1)"
              v-for="(item, key) in card.icons"
              :style="`left: calc(${item.x * 50 + 50}% - ${($vuetify.breakpoint.smAndUp ? 12 : 7.182) * (item.size ? item.size : 1)}px); top: calc(${item.y * 50 + 50}% - ${($vuetify.breakpoint.smAndUp ? 12 : 7.182) * (item.size ? item.size : 1)}px); rotate: ${item.rotate ? item.rotate : 0}deg;`"
              :key="key"
              :color="$vuetify.theme.dark ? 'white' : 'black'"
            >{{ item.icon }}</v-icon>
            <div
              v-if="card.amount > 1 && !hideAmount"
              class="card-playing-amount rounded px-1"
              :class="[{'card-playing-amount-mobile': $vuetify.breakpoint.xsOnly}, $vuetify.theme.dark ? `${ card.color } lighten-2` : `${ card.color } lighten-5`]"
            ><v-icon size="10">mdi-close</v-icon>{{ $formatNum(card.amount - 1) }}</div>
            <div v-if="!card.instant" class="card-playing-power rounded-circle" :class="[{'card-playing-power-mobile': $vuetify.breakpoint.xsOnly}, `card-playing-power-${ $vuetify.theme.dark ? 'dark' : 'light' }`]">
              <div
                class="d-flex justify-center align-center card-playing-power-inner rounded-circle"
                :class="[{'card-playing-power-mobile': $vuetify.breakpoint.xsOnly}, $vuetify.theme.dark ? `${ card.color } lighten-2` : `${ card.color } lighten-5`]"
              >{{ cardPower }}</div>
            </div>
          </div>
        </div>
        <div class="card-playing-bottom d-flex align-center" :class="$vuetify.theme.dark ? `${ card.color } darken-2` : `${ card.color } lighten-1`">
          <span>{{ id }}</span>
          <v-icon v-if="card.foundShiny" class="ml-1" x-small>mdi-shimmer</v-icon>
        </div>
        <div
          class="card-feature-icon d-flex justify-center align-center"
          :style="`border-top: 2px solid ${ $vuetify.theme.dark ? 'white' : 'black' } !important; border-left: 2px solid ${ $vuetify.theme.dark ? 'white' : 'black' } !important;`"
          :class="$vuetify.theme.dark ? `${ card.color } darken-3` : card.color"
        ><v-icon size="20" :color="$vuetify.theme.dark ? 'white' : 'black'">{{ featureIcon }}</v-icon></div>
        <div v-if="card.foundShiny" class="card-shiny"></div>
      </div>
      <div v-else class="card-hidden bg-tile-default rounded elevation-2 d-flex justify-center align-center" :class="[{'card-playing-mobile': $vuetify.breakpoint.xsOnly}, $vuetify.breakpoint.xsOnly ? 'card-ma-05' : 'ma-1']" v-bind="attrs" v-on="on">
        <v-icon color="#80808040" :size="$vuetify.breakpoint.smAndUp ? 64 : 48">{{ obtainable.length ? 'mdi-help' : 'mdi-lock' }}</v-icon>
      </div>
    </template>
    <div v-if="card.amount > 0" class="mb-2">
      <div>
        <span>{{ $vuetify.lang.t(`$vuetify.gooboo.effects`) }} ({{ $vuetify.lang.t(`$vuetify.card.${ card.instant ? 'onDuplicate' : 'onActive' }`) }}</span>
        <span v-if="card.group">, {{ $vuetify.lang.t(`$vuetify.farm.fertilizerEffect.${ card.group }`) }}</span>
        <span>):</span>
      </div>
      <ul>
        <li v-if="cardPower > 0">{{ $vuetify.lang.t(`$vuetify.card.cardPower`) }} +{{ cardPower }}</li>
        <li v-for="(reward, rkey) in card.reward" :key="rkey">
          <span v-if="reward.type === 'currency'">+{{ $formatNum(reward.useMult ? multGet(gainMult(...reward.name.split('_')), reward.value) : reward.value) }} {{ $vuetify.lang.t(`$vuetify.currency.${ reward.name }.name`) }}</span>
          <span v-else-if="reward.type === 'consumable'">+{{ $formatNum(reward.value) }} {{ $vuetify.lang.t(`$vuetify.consumable.${ reward.name }.name`) }}</span>
          <span v-else-if="reward.type === 'addRareDrop'">{{ $vuetify.lang.t(`$vuetify.farm.addRareDrop`, $vuetify.lang.t(`$vuetify.currency.${ reward.name }.name`)) }}: +{{ $formatNum(reward.value) }}</span>
          <span v-else>
            <mult-name :name="reward.name"></mult-name>&nbsp;<mult-stat :mult="reward.name" :type="reward.type" :value="reward.value"></mult-stat>
          </span>
        </li>
      </ul>
    </div>
    <div v-if="obtainable.length">
      <div>{{ $vuetify.lang.t(`$vuetify.card.canFind`) }}:</div>
      <ul>
        <li v-for="pack in obtainable" :key="pack.name">{{ $vuetify.lang.t(`$vuetify.card.pack.${ pack.name }`) }} ({{ $formatNum(pack.chance * 100, true) }}%)</li>
      </ul>
    </div>
    <div class="mt-0" v-else>{{ $vuetify.lang.t(`$vuetify.card.cannotFind`) }}</div>
  </gb-tooltip>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import MultName from '../../render/MultName.vue';
import MultStat from '../render/MultStat.vue';

export default {
  components: { MultName, MultStat },
  props: {
    id: {
      type: String,
      required: true
    },
    hideAmount: {
      type: Boolean,
      required: false,
      default: false
    },
    cardObject: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState({
      unlock: state => state.unlock
    }),
    ...mapGetters({
      multGet: 'mult/get',
      gainMult: 'currency/gainMultName'
    }),
    card() {
      return this.cardObject ?? this.$store.state.card.card[this.id];
    },
    featureIcon() {
      return this.$store.state.system.features[this.card.feature].icon;
    },
    obtainable() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.card.pack)) {
        if ((elem.unlock === null || this.unlock[elem.unlock].see) && elem.content[this.id] !== undefined) {
          arr.push({name: key, chance: elem.content[this.id] / elem.cacheWeightTotal});
        }
      }
      return arr;
    },
    cardPower() {
      return this.card.power + (this.card.foundShiny ? 1 : 0);
    }
  }
}
</script>
