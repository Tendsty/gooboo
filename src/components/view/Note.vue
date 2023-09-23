<template>
  <div class="ma-1" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
    <note-list class="bg-tile-default ma-2" feature="meta"></note-list>
    <note-list class="bg-tile-default ma-2" v-for="item in mainFeatures" :key="'main-' + item.name" :feature="item.name"></note-list>
    <note-list class="bg-tile-default ma-2" v-for="item in shownSideFeatures" :key="'side-' + item.name" :feature="item.name"></note-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteList from '../partial/note/NoteList.vue';

export default {
  components: { NoteList },
  computed: {
    ...mapGetters({
      mainFeatures: 'system/mainFeatures',
      sideFeatures: 'system/sideFeatures'
    }),
    shownSideFeatures() {
      return this.sideFeatures.filter(elem => !['note', 'debug'].includes(elem.name));
    }
  }
}
</script>
