<template>
  <div>
    <div class="d-flex flex-wrap justify-center ma-1">
      <currency class="ma-1" name="school_book"></currency>
    </div>
    <v-row no-gutters>
      <v-col v-for="subject in subjects" :key="subject" cols="12" lg="6" xl="4">
        <subject :name="subject" class="ma-1" @play="play(subject)"></subject>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Currency from '../../render/Currency.vue';
import Subject from './Subject.vue';

export default {
  components: { Subject, Currency },
  computed: {
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
