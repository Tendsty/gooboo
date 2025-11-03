<template>
  <v-card>
    <v-card-text class="px-2 pt-1 pb-0" style="min-height: 72px;">
      <display-row class="ma-1" v-for="(item, key) in display" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :after="item.value"></display-row>
      <div v-if="book.scalesWithGL && (book.maxGL === null || globalLevel < book.maxGL)" class="ma-1 text-center">
        <span>{{ $vuetify.lang.t('$vuetify.school.book.scalesWithGL') }}</span>
        <span v-if="book.maxGL !== null"> ({{ $vuetify.lang.t('$vuetify.school.book.scalesUpTo', $formatInt(book.maxGL)) }})</span>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0" style="min-height: 36px;">
      <v-spacer></v-spacer>
      <v-icon v-if="book.owned">mdi-check</v-icon>
      <v-btn v-else small color="primary" :disabled="!canRead" @click="readBook">{{ $vuetify.lang.t('$vuetify.school.book.read') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    book() {
      return this.$store.state.school.book[this.name];
    },
    globalLevel() {
      return this.$store.state.meta.globalLevelParts[this.book.feature + '_' + this.book.subfeature] ?? 0;
    },
    display() {
      const lvl = this.book.scalesWithGL ? Math.max((Math.min(this.globalLevel, this.book.maxGL ?? Infinity) + 1 - this.book.minGL), 0) : (this.globalLevel >= this.book.minGL ? 1 : 0);
      return this.book.effect.map(elem => {
        return {...elem, value: elem.value(lvl)};
      });
    },
    canRead() {
      return !this.book.owned && this.$store.getters['school/booksLeft'] > 0;
    }
  },
  methods: {
    readBook() {
      this.$store.dispatch('school/readBook', this.name);
    }
  }
}
</script>
