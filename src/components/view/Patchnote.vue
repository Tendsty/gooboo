<template>
  <div :class="($vuetify.breakpoint.smAndUp && oldVersion === null) ? 'scroll-container' : ''">
    <div class="ma-2">
      <v-expansion-panels>
        <patchnote-content v-for="(note, version) in patchnote" :key="version" :version="version" :day="note.day" :content="note.content"></patchnote-content>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import PatchnoteContent from '../partial/patchnote/PatchnoteContent.vue';
import patchnotes from '../../js/modules/patchnote/patchnotes.js';

const semverCompare = require('semver/functions/compare');

export default {
  components: { PatchnoteContent },
  props: {
    oldVersion: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    patchnote() {
      if (this.oldVersion === null) {
        return patchnotes;
      }
      let obj = {};
      for (const [key, elem] of Object.entries(patchnotes)) {
        if (semverCompare(this.oldVersion, key) === -1) {
          obj[key] = elem;
        }
      }
      return obj;
    }
  }
}
</script>
