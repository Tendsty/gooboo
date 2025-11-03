<template>
  <div>
    <div class="d-flex flex-wrap justify-center align-center ma-1">
      <currency class="ma-1" name="school_examPass">
        <div>
          <span>{{ $vuetify.lang.t('$vuetify.school.buyPass.0') }}</span>
          <price-tag currency="gem_sapphire" :amount="passPrice"></price-tag>
          <span>{{ $vuetify.lang.t('$vuetify.school.buyPass.1') }}</span>
        </div>
        <alert-text type="info">{{ $vuetify.lang.t(`$vuetify.school.passCapGain`, $formatTime(secondsUntilDailyReset)) }}</alert-text>
      </currency>
      <div v-if="dustMult < 1" class="d-flex align-center full-h">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.school.beginner.title`)">
          <template v-slot:activator="{ on, attrs }">
            <v-icon large class="ml-2" v-bind="attrs" v-on="on">mdi-head-question</v-icon>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.school.beginner.description`, $formatNum(dustMult * 100, true)) }}</div>
        </gb-tooltip>
      </div>
      <div v-if="maxMultipass > 1" class="d-flex justify-center align-center ml-8">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.schoolMultipass`)">
          <template v-slot:activator="{ on, attrs }">
            <v-icon large class="mr-1" v-bind="attrs" v-on="on">mdi-ticket-confirmation</v-icon>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.school.multipass.description`) }}</div>
          <ul>
            <li>{{ $vuetify.lang.t(`$vuetify.school.multipass.dust`) }}</li>
            <li>{{ $vuetify.lang.t(`$vuetify.school.multipass.points`) }}</li>
          </ul>
        </gb-tooltip>
        <div class="ma-1" style="width: 100px;">
          <v-text-field dense type="number" step="1" min="1" :max="maxMultipass" :suffix="`/ ${ $formatInt(maxMultipass) }`" outlined hide-details v-model="multipass"></v-text-field>
        </div>
      </div>
    </div>
    <v-row no-gutters>
      <v-col v-for="subject in subjects" :key="subject" cols="12" md="6" lg="4" xl="3">
        <subject
          :name="subject"
          class="ma-1"
          @practice="practice(subject)"
          @study="study(subject)"
          @exam="exam(subject)"
        ></subject>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="default-card pa-2">
        <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.confirm.title`) }}</v-card-title>
        <v-card-text>
          <div>{{ $vuetify.lang.t(`$vuetify.confirm.schoolExamPass`) }}</div>
          <price-tag class="ma-1" currency="gem_sapphire" :amount="passSapphiresNeeded"></price-tag>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="acceptDialog">{{ $vuetify.lang.t(`$vuetify.gooboo.confirm`) }}</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="closeDialog">{{ $vuetify.lang.t(`$vuetify.gooboo.cancel`) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SCHOOL_EXAM_PASS_PRICE, SECONDS_PER_DAY } from '../../../js/constants';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';
import AlertText from '../render/AlertText.vue';
import Subject from './Subject.vue';

export default {
  components: { Subject, Currency, AlertText, PriceTag },
  data: () => ({
    multipass: 1,
    dialog: false,
    dialogName: null,
  }),
  mounted() {
    this.multipass = this.$store.state.school.multipass;
  },
  computed: {
    ...mapGetters({
      dustMult: 'school/dustMult',
      subjectsBookGain: 'school/subjectsBookGain'
    }),
    subjects() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.school.subject)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          arr.push(key);
        }
      }
      return arr;
    },
    passPrice() {
      return SCHOOL_EXAM_PASS_PRICE;
    },
    passSapphiresNeeded() {
      return Math.max(this.multipass - this.$store.getters['currency/value']('school_examPass'), 0) * SCHOOL_EXAM_PASS_PRICE;
    },
    secondsUntilDailyReset() {
      return SECONDS_PER_DAY - (this.$store.state.system.timestamp % SECONDS_PER_DAY);
    },
    maxMultipass() {
      return this.$store.getters['mult/get']('schoolMultipass');
    },
  },
  methods: {
    practice(name) {
      this.$emit('practice', name);
    },
    study(name) {
      this.$emit('study', name);
    },
    exam(name) {
      if (this.passSapphiresNeeded <= 0 || !this.$store.state.system.settings.confirm.items.gem.value) {
        this.$emit('exam', name);
      } else {
        this.dialog = true;
        this.dialogName = name;
      }
    },
    acceptDialog() {
      this.$emit('exam', this.dialogName);
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
      this.dialogName = null;
    },
  },
  watch: {
    multipass: {
      deep: true,
      immediate: false,
      handler(newVal) {
        newVal = parseInt(newVal);
        if (!isNaN(newVal) && newVal >= 1 && newVal <= this.maxMultipass) {
          this.$store.commit('school/updateKey', {key: 'multipass', value: newVal});
        }
      }
    }
  }
}
</script>
