<template>
  <v-card class="default-card pa-2">
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t('$vuetify.hourglass.title') }}</v-card-title>
    <v-card-subtitle class="pa-1 text-center">{{ $vuetify.lang.t(`$vuetify.hourglass.${ isAtSchool ? 'subtitleSchool' : 'subtitle' }`) }}</v-card-subtitle>
    <v-card-text class="px-0">
      <div class="d-flex justify-center ma-1">
        <currency class="ma-1" name="school_goldenDust"></currency>
        <currency v-if="isAtSchool" class="ma-1" name="school_examPass"></currency>
      </div>
      <div v-if="isAtSchool" class="d-flex justify-center">
        <price-tag currency="school_examPass" :amount="1"></price-tag>
        <v-icon class="mx-2">mdi-transfer-right</v-icon>
        <price-tag currency="school_goldenDust" :amount="goldenDustMin" add></price-tag>
      </div>
      <template v-else>
        <v-text-field class="ma-2" type="number" step="1" min="0" :label="$vuetify.lang.t('$vuetify.hourglass.timeInMinutes')" outlined hide-details v-model="minutes"></v-text-field>
        <div class="d-flex justify-end align-center ma-1">
          <v-btn class="ma-1" color="primary" @click="setToMax">{{ $vuetify.lang.t('$vuetify.gooboo.max') }}</v-btn>
          <v-chip class="justify-center ma-1" style="min-width: 100px;">
            <v-icon class="mr-1">mdi-timer</v-icon>
            {{ formattedTime }}
          </v-chip>
        </div>
      </template>
    </v-card-text>
    <v-card-actions class="flex-wrap ma-n1">
      <v-btn v-if="isAtSchool" class="ma-1" color="success" :disabled="!canConvertPass" @click="convertPass">{{ $vuetify.lang.t('$vuetify.gooboo.convert') }}</v-btn>
      <template v-else>
        <v-btn class="ma-1" color="success" :disabled="!canAfford || !isOnMainFeature" @click="performTimeSkip">{{ $vuetify.lang.t('$vuetify.gooboo.skip') }}</v-btn>
        <price-tag v-if="dustCost !== null" class="ma-1" currency="school_goldenDust" :amount="dustCost"></price-tag>
      </template>
      <v-spacer></v-spacer>
      <v-btn class="ma-1" color="error" @click="emitCancel">{{ $vuetify.lang.t('$vuetify.gooboo.cancel') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import mining from '../../js/modules/mining';
import village from '../../js/modules/village';
import horde from '../../js/modules/horde';
import farm from '../../js/modules/farm';
import gallery from '../../js/modules/gallery';
import Currency from './Currency.vue';
import PriceTag from './PriceTag.vue';
import { SCHOOL_EXAM_DUST_MIN } from '../../js/constants';

export default {
  components: { Currency, PriceTag },
  data: () => ({
    minutes: ''
  }),
  computed: {
    ...mapGetters({
      mainFeatures: 'system/mainFeatures',
      isOnMainFeature: 'system/isOnMainFeature'
    }),
    isValidTime() {
      return !isNaN(this.minutes) && this.minutes > 0;
    },
    formattedTime() {
      return this.isValidTime ? this.$formatTime(this.minutes * 60, 'm') : '-';
    },
    dustCost() {
      return this.isValidTime ? Math.round(Math.pow(this.minutes, 0.9) * 100) : null;
    },
    canAfford() {
      return this.isValidTime && this.$store.getters['currency/value']('school_goldenDust') >= this.dustCost;
    },
    isAtSchool() {
      return this.$store.state.system.screen === 'school';
    },
    goldenDustMin() {
      return Math.round(SCHOOL_EXAM_DUST_MIN * this.$store.getters['school/dustMult']);
    },
    canConvertPass() {
      return this.$store.getters['currency/value']('school_examPass') >= 1 && this.$store.state.currency.school_goldenDust.value < this.$store.state.currency.school_goldenDust.cap;
    }
  },
  methods: {
    performTimeSkip() {
      if (this.canAfford) {
        const module = {mining, village, horde, farm, gallery}[this.$store.state.system.screen];
        module.tick(Math.round(this.minutes * 60 / module.tickspeed));
        this.$store.dispatch('currency/spend', {feature: 'school', name: 'goldenDust', amount: this.dustCost});
      }
    },
    convertPass() {
      this.$store.dispatch('school/convertPass');
    },
    emitCancel() {
      this.$emit('cancel');
    },
    setToMax() {
      this.minutes = Math.floor(Math.pow(this.$store.getters['currency/value']('school_goldenDust') / 100, 1 / 0.9));
    }
  }
}
</script>
