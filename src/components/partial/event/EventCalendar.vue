<template>
  <div>
    <div class="d-flex align-center mb-2">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-spacer></v-spacer>
      {{ monthAndYear }}
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>
    <v-calendar ref="calendar" v-model="day" :events="calendar" :weekdays="[1, 2, 3, 4, 5, 6, 0]">
      <template v-slot:event="{ event }"><span class="pa-2">{{ $vuetify.lang.t(`$vuetify.event.${event.name}.name`) }}</span></template>
    </v-calendar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    day: null
  }),
  mounted() {
    this.day = this.$store.state.system.currentDay;
  },
  computed: {
    ...mapGetters({
      currentEvent: 'event/currentEvent'
    }),
    monthAndYear() {
      return (new Date(this.day)).toLocaleDateString([this.$store.state.system.settings.general.items.lang.value, 'default'], {year: 'numeric', month: 'long'});
    },
    calendar() {
      return this.$store.getters['event/calendar'](this.day);
    }
  }
}
</script>

