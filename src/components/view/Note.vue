<template>
  <v-row no-gutters>
    <v-col cols="12" md="6" lg="8" xl="9" :class="$vuetify.breakpoint.mdAndUp ? 'scroll-container' : ''">
      <note-list :clicked="clicked" @clickNote="clickNote" @hoverNote="hoverNote" @unhoverNote="unhoverNote" class="bg-tile-default ma-2" feature="meta"></note-list>
      <note-list :clicked="clicked" @clickNote="clickNote" @hoverNote="hoverNote" @unhoverNote="unhoverNote" class="bg-tile-default ma-2" v-for="item in mainFeatures" :key="'main-' + item.name" :feature="item.name"></note-list>
      <note-list :clicked="clicked" @clickNote="clickNote" @hoverNote="hoverNote" @unhoverNote="unhoverNote" class="bg-tile-default ma-2" v-for="item in shownSideFeatures" :key="'side-' + item.name" :feature="item.name"></note-list>
    </v-col>
    <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="6" lg="4" xl="3">
      <note-simple class="ma-2" v-if="shownNote !== null" :name="shownNote"></note-simple>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteList from '../partial/note/NoteList.vue';
import NoteSimple from '../render/NoteSimple.vue';

export default {
  components: { NoteList, NoteSimple },
  data: () => ({
    hovered: null,
    clicked: null
  }),
  computed: {
    ...mapGetters({
      mainFeatures: 'system/mainFeatures',
      sideFeatures: 'system/sideFeatures'
    }),
    shownSideFeatures() {
      return this.sideFeatures.filter(elem => !['note', 'debug'].includes(elem.name));
    },
    shownNote() {
      return this.hovered ?? this.clicked;
    }
  },
  methods: {
    clickNote(name) {
      this.clicked = name === this.clicked ? null : name;
    },
    hoverNote(name) {
      this.hovered = name;
    },
    unhoverNote() {
      this.hovered = null;
    }
  }
}
</script>
