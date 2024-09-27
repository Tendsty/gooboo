<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.gallery.idea.${name}`)">
    <template v-slot:activator="{ on, attrs }">
      <div :class="$vnode.data.staticClass" v-bind="attrs" v-on="on">
        <v-btn width="56" height="56" min-width="56" :disabled="!canUpgrade || disabled" :color="idea.color" @click="buy">
          <v-badge overlap bottom left offset-x="45" color="grey" :disabled="!canUpgrade" :content="$formatNum(idea.level)">
            <v-icon large>{{ idea.icon }}</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </template>
    <div class="text-center">{{ $vuetify.lang.t(`$vuetify.gallery.idea.tier`, idea.tier) }}</div>
    <display-row class="mt-0" v-for="(item, key) in display" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
  </gb-tooltip>
</template>

<script>
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    idea() {
      return this.$store.state.gallery.idea[this.name];
    },
    canUpgrade() {
      return this.$store.state.currency.gallery_inspiration.value >= 1 && this.$store.getters['gallery/canAccessIdea'](this.idea.tier);
    },
    display() {
      return this.idea.effect.map(elem => {
        const lvl = this.idea.level;
        return {
          ...elem,
          before: lvl > 0 ? elem.value(lvl) : null,
          after: elem.value(lvl + 1)
        };
      }).filter(elem => elem.before !== elem.after);
    }
  },
  methods: {
    buy() {
      if (this.canUpgrade) {
        this.$store.dispatch('gallery/buyIdea', this.name);
      }
    }
  }
}
</script>
