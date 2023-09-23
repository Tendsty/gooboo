<style scoped>
.grade-text {
  width: 120px;
  height: 52px;
  font-weight: 700;
  font-size: 48px;
}
.subject-help {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>

<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t(`$vuetify.school.${ name }.name`) }}</v-card-title>
    <v-card-subtitle class="pa-1 text-center">{{ $vuetify.lang.t(`$vuetify.school.${ name }.subtitle`) }}</v-card-subtitle>
    <v-card-text class="pb-0">
      <div class="d-flex align-center">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.school.grade`)">
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex justify-center align-center grade-text bg-tile-default rounded-lg mr-2 elevation-4" :class="`${ gradeColor }--text`" v-bind="attrs" v-on="on">{{ gradeName }}</div>
          </template>
          <div>{{ $vuetify.lang.t(`$vuetify.school.gradeDescription`) }}</div>
          <div>{{ $vuetify.lang.t(`$vuetify.school.elo.${ eloDiff }`) }}</div>
          <div>{{ $vuetify.lang.t(`$vuetify.school.${ name }.grade`) }}</div>
        </gb-tooltip>
        <v-progress-linear class="rounded" height="12" :value="gradePercent"></v-progress-linear>
      </div>
    </v-card-text>
    <v-card-actions>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.currency.school_book.name`)">
        <template v-slot:activator="{ on, attrs }">
          <v-chip small label :class="[$vuetify.theme.dark ? 'theme--dark darken-3' : 'theme--light lighten-3', curr.color]" v-bind="attrs" v-on="on">
            <v-icon size="12" class="mr-2">{{ curr.icon }}</v-icon>
            <span class="balloon-text-dynamic">+{{ $formatNum(bookGain) }}/h</span>
          </v-chip>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.school.bookDescription`, gradeDecay, $formatNum(bookGain)) }}</div>
      </gb-tooltip>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="play">{{ $vuetify.lang.t(`$vuetify.school.play`) }}</v-btn>
    </v-card-actions>
    <gb-tooltip :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="subject-help" small v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.school.${ name }.description`) }}</div>
    </gb-tooltip>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { SCHOOL_BOOK_BASE_GAIN, SCHOOL_GRADE_DECAY } from '../../../js/constants';
import { formatGrade } from '../../../js/utils/format';

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      curr: state => state.currency.school_book
    }),
    subject() {
      return this.$store.state.school[this.name];
    },
    gradePercent() {
      return this.subject.grade - Math.floor(this.subject.grade / 100) * 100;
    },
    gradeColor() {
      const gradeTier = Math.floor(this.subject.grade / 500);
      switch (gradeTier) {
        case 0:
          return 'red';
        case 1:
          return 'orange';
        case 2:
          return 'amber';
        case 3:
          return 'light-green';
        case 4:
          return 'green';
        default:
          return 'blue';
      }
    },
    gradeName() {
      return formatGrade(this.subject.grade);
    },
    eloDiff() {
      const diff = this.subject.elo - this.subject.grade;
      if (diff > 400) {
        return 'farAbove';
      } else if (diff > 100) {
        return 'above';
      } else if (diff > -100) {
        return 'equal';
      } else if (diff > -400) {
        return 'below';
      } else {
        return 'farBelow';
      }
    },
    bookGain() {
      return SCHOOL_BOOK_BASE_GAIN + Math.floor(this.subject.grade / 100);
    },
    gradeDecay() {
      return SCHOOL_GRADE_DECAY;
    }
  },
  methods: {
    play() {
      this.$emit('play');
    }
  }
}
</script>
