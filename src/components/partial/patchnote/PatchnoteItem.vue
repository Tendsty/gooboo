<template>
  <span class="d-flex">
    <v-chip v-if="labelIcon" label small class="mr-2 px-2" :color="labelColor">
      <v-icon class="mr-2">{{ labelIcon }}</v-icon>
      {{ $vuetify.lang.t(`$vuetify.patchnote.type.${ item.type }`) }}
    </v-chip>
    <a class="mr-1" v-if="item.issue" :href="`/issue/${ item.issue }`">#{{ item.issue }}</a>
    <span class="d-flex" v-if="item.type === 'balance' && item.before !== undefined">
      <span>{{ $vuetify.lang.t(`$vuetify.patchnote.text.${ item.text }`) }}: {{ item.before }}</span>
      <v-icon class="mx-1" small>mdi-transfer-right</v-icon>
      <span :class="{'success--text': item.balance === 'buff', 'warning--text': item.balance === 'change', 'error--text': item.balance === 'nerf'}">{{ item.after }}</span>
    </span>
    <span v-else>
      <span>{{ $vuetify.lang.t(`$vuetify.patchnote.text.${ item.text }`) }}</span>
    </span>
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
        case 'new':
          return 'mdi-plus-thick';
        case 'remove':
          return 'mdi-delete';
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
        case 'new':
          return 'green';
        case 'remove':
          return 'red';
      }
      return null;
    }
  }
}
</script>
