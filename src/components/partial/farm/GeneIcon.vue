<style scoped>
.gene-icon-bg {
  opacity: 0.25;
}
.gene-icon-center {
  position: absolute;
  left: 12px;
  top: 12px;
}
</style>

<template>
  <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.farm.gene.name`) + ': ' + $vuetify.lang.t(`$vuetify.farm.gene.${ name }`)">
    <template v-slot:activator="{ on, attrs }">
      <div :class="$vnode.data.staticClass" style="position: relative;" :style="$vnode.data.staticStyle" v-bind="attrs" v-on="{...on, ...$listeners}">
        <v-icon size="48" class="gene-icon-bg">mdi-decagram</v-icon>
        <v-icon size="24" class="gene-icon-center">{{ gene.icon }}</v-icon>
      </div>
    </template>
    <div>
      <display-row v-for="(elem, key) in gene.effect" :key="`stat-${ key }`" :name="elem.name" :type="elem.type" :after="elem.value"></display-row>
    </div>
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
    }
  },
  computed: {
    gene() {
      return this.$store.state.farm.gene[this.name];
    }
  }
}
</script>
