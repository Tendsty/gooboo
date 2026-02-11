<template>
  <span class="d-flex align-center" :class="{'flex-wrap': $vuetify.breakpoint.xsOnly}">
    <v-chip v-if="labelIcon" label small class="flex-shrink-0 mr-2 px-2" :color="labelColor">
      <v-icon class="mr-2">{{ labelIcon }}</v-icon>
      {{ $vuetify.lang.t(`$vuetify.patchnote.type.${ item.type }`) }}
    </v-chip>
    <a class="mr-1" v-if="item.issue" target="_blank" :href="`${ issueUrl }/${ item.issue }`">#{{ item.issue }}</a>
    <span class="d-flex align-center" :class="{'flex-wrap': $vuetify.breakpoint.xsOnly, 'bg-tile-default rounded px-2 py-1': item.subtype}" v-if="item.subtype || item.before !== undefined || item.after !== undefined">
      <span v-if="item.subtype" class="d-flex align-center" :style="item.type !== 'remove' ? 'min-width: 160px;' : ''">
        <v-icon v-if="subtypeIcon" small class="mr-1">{{ subtypeIcon }}</v-icon>
        <span v-if="item.subtype === 'card'">{{ $vuetify.lang.t(`$vuetify.card.card.${ item.name }`) }}</span>
        <span v-else-if="item.subtype === 'equipment'">{{ $vuetify.lang.t(`$vuetify.horde.equipment.${ item.name }`) }}</span>
        <span v-else-if="item.subtype === 'crop'">{{ $vuetify.lang.t(`$vuetify.farm.crop.${ item.name }`) }}</span>
        <span v-else-if="item.subtype === 'gene'">{{ $vuetify.lang.t(`$vuetify.farm.gene.${ item.name }`) }}</span>
        <span v-else-if="item.subtype === 'fertilizer'">{{ $vuetify.lang.t(`$vuetify.consumable.farm_${ item.name }.name`) }}</span>
        <span v-else-if="item.subtype === 'idea'">{{ $vuetify.lang.t(`$vuetify.gallery.idea.${ item.name }`) }}</span>
        <span v-else-if="item.subtype === 'upgrade'">{{ $vuetify.lang.t(`$vuetify.upgrade.${ item.name }`) }}</span>
        <template v-if="item.type !== 'remove'">
          <v-spacer></v-spacer>
          <v-icon>mdi-circle-small</v-icon>
          <v-spacer></v-spacer>
        </template>
      </span>
      <div v-if="item.subtype" class="d-flex flex-column">
        <patchnote-rare-drop-change
          v-for="(elem, key) in rareDropDiff"
          :key="`rare-drop-${ key }`"
          :before="elem.before"
          :after="elem.after"
        ></patchnote-rare-drop-change>
        <template v-if="item.content">
          <div v-for="(elem, key) in item.content" :key="`content-${ key }`" class="d-flex align-center">
            <a class="mr-1" v-if="elem.issue" target="_blank" :href="`${ issueUrl }/${ elem.issue }`">#{{ elem.issue }}</a>
            <patchnote-text :type="elem.textType" :text="elem.text" :per="elem.textPer" :params="elem.params"></patchnote-text>
            <template v-if="elem.before !== undefined || elem.after !== undefined">
              <span>: {{ elem.before ? elem.before : '-' }}</span>
              <v-icon class="mx-1" small>mdi-transfer-right</v-icon>
              <span :class="{'success--text': elem.balance === 'buff', 'warning--text': elem.balance === 'change', 'error--text': elem.balance === 'nerf'}">{{ elem.after ? elem.after : '-' }}</span>
            </template>
          </div>
        </template>
      </div>
      <template v-else-if="item.before !== undefined || item.after !== undefined">
        <span><patchnote-text :type="item.textType" :text="item.text" :per="item.textPer" :params="item.params"></patchnote-text>: {{ item.before ? item.before : '-' }}</span>
        <v-icon class="mx-1" small>mdi-transfer-right</v-icon>
        <span :class="{'success--text': item.balance === 'buff', 'warning--text': item.balance === 'change', 'error--text': item.balance === 'nerf'}">{{ item.after ? item.after : '-' }}</span>
      </template>
    </span>
    <patchnote-text v-else :type="item.textType" :text="item.text" :per="item.textPer" :params="item.params"></patchnote-text>
  </span>
</template>

<script>
import PatchnoteRareDropChange from './PatchnoteRareDropChange.vue';
import PatchnoteText from './PatchnoteText.vue';

export default {
  components: { PatchnoteRareDropChange, PatchnoteText },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    issueUrl: 'https://github.com/Tendsty/gooboo/issues'
  }),
  computed: {
    labelIcon() {
      switch (this.item.type) {
        case 'bugfix':
          return 'mdi-bug';
        case 'balance':
          return 'mdi-scale-balance';
        case 'qol':
          return 'mdi-sofa';
        case 'clarity':
          return 'mdi-lightbulb-on';
        case 'info':
          return 'mdi-information';
        case 'context':
          return 'mdi-chat-question';
        case 'new':
          return 'mdi-plus-thick';
        case 'remove':
          return 'mdi-delete';
        case 'change':
          return 'mdi-cached';
        case 'accessibility':
          return 'mdi-glasses';
        case 'appearance':
          return 'mdi-flower';
        case 'anticheat':
          return 'mdi-close-network';
      }
      return null;
    },
    labelColor() {
      switch (this.item.type) {
        case 'bugfix':
          return 'brown';
        case 'balance':
          return 'orange';
        case 'qol':
          return 'teal';
        case 'clarity':
          return 'amber';
        case 'info':
          return 'blue';
        case 'context':
          return 'pink';
        case 'new':
          return 'green';
        case 'remove':
          return 'red';
        case 'change':
          return 'pale-light-green';
        case 'accessibility':
          return 'pale-purple';
        case 'appearance':
          return 'deep-purple';
        case 'anticheat':
          return 'dark-grey';
      }
      return null;
    },
    subtypeIcon() {
      switch (this.item.subtype) {
        case 'card':
          return 'mdi-cards';
        case 'equipment':
          return 'mdi-sack';
        case 'crop':
          return 'mdi-sprout';
        case 'gene':
          return 'mdi-dna';
        case 'fertilizer':
          return 'mdi-sack';
        case 'idea':
          return 'mdi-lightbulb';
        case 'upgrade':
          return 'mdi-chevron-double-up';
      }
      return null;
    },
    rareDropDiff() {
      if (this.item.before?.rareDrop) {
        return this.item.before.rareDrop.map((before, index) => {
          return {index, before, after: this.item.after.rareDrop[index]};
        }).filter(el => (
          this.item.subtype !== 'crop' ||
          this.$store.state.farm.crop[this.item.name] === undefined ||
          this.$store.state.farm.crop[this.item.name].rareDrop[el.index] === undefined ||
          this.$store.state.farm.crop[this.item.name].rareDrop[el.index].found
        ) && !(el.before === null && el.after === null) && (
          el.before === null ||
          el.after === null ||
          el.before.chance !== el.after.chance ||
          el.before.mult !== el.after.mult ||
          el.before.value !== el.after.value
        ));
      }
      return [];
    }
  }
}
</script>
