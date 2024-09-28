<template>
  <span class="d-flex" :class="{'flex-wrap': $vuetify.breakpoint.xsOnly}">
    <v-chip v-if="labelIcon" label small class="flex-shrink-0 mr-2 px-2" :color="labelColor">
      <v-icon class="mr-2">{{ labelIcon }}</v-icon>
      {{ $vuetify.lang.t(`$vuetify.patchnote.type.${ item.type }`) }}
    </v-chip>
    <a class="mr-1" v-if="item.issue" :href="`/issue/${ item.issue }`">#{{ item.issue }}</a>
    <span class="d-flex" :class="{'flex-wrap': $vuetify.breakpoint.xsOnly}" v-if="item.type === 'balance' && item.before !== undefined">
      <span>{{ $vuetify.lang.t(`$vuetify.patchnote.text.${ item.text }`, ...params) }}: {{ item.before }}</span>
      <v-icon class="mx-1" small>mdi-transfer-right</v-icon>
      <span :class="{'success--text': item.balance === 'buff', 'warning--text': item.balance === 'change', 'error--text': item.balance === 'nerf'}">{{ item.after }}</span>
    </span>
    <span v-else>{{ $vuetify.lang.t(`$vuetify.patchnote.text.${ item.text }`, ...params) }}</span>
  </span>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
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
    params() {
      return this.item.params ?? [];
    }
  }
}
</script>
