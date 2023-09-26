<template>
  <div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <currency class="ma-1" name="school_book"></currency>
      <gb-tooltip v-if="dustMult < 1" :title-text="$vuetify.lang.t(`$vuetify.school.beginner.title`)">
        <template v-slot:activator="{ on, attrs }">
          <v-icon large class="ml-2" v-bind="attrs" v-on="on">mdi-head-question</v-icon>
        </template>
        <div>{{ $vuetify.lang.t(`$vuetify.school.beginner.description`, $formatNum(dustMult * 100, true)) }}</div>
      </gb-tooltip>
    </div>
    <v-row no-gutters>
      <v-col v-for="subject in subjects" :key="subject" cols="12" lg="6" xl="4">
        <subject :name="subject" class="ma-1" @play="play(subject)"></subject>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Currency from '../../render/Currency.vue';
import Subject from './Subject.vue';

export default {
  components: { Subject, Currency },
  computed: {
    ...mapGetters({
      dustMult: 'school/dustMult'
    }),
    subjects() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.state.school)) {
        if (elem.unlock === null || this.$store.state.unlock[elem.unlock].see) {
          arr.push(key);
        }
      }
      return arr;
    }
  },
  methods: {
    play(name) {
      this.$emit('play', name);
    }
  }
}
</script>
