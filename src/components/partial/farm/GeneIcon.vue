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
      <div :class="$vnode.data.staticClass" style="position: relative;" :style="`cursor: ${ disabled ? 'not-allowed' : (clickable ? 'pointer' : 'default') };`" v-bind="attrs" v-on="{...on, ...$listeners}">
        <v-icon size="48" class="gene-icon-bg">mdi-decagram</v-icon>
        <v-icon size="24" class="gene-icon-center">{{ gene.icon }}</v-icon>
      </div>
    </template>
    <div>
      <display-row v-for="(elem, key) in gene.effect" :key="`stat-${ key }`" :name="elem.name" :type="elem.type" :after="elem.value"></display-row>
    </div>
    <template v-if="showUpgrade && display.length > 0">
      <div class="text-center">{{ $vuetify.lang.t(`$vuetify.farm.gene.hasUpgrade`) }}:</div>
      <display-row v-for="(elem, key) in display" :key="`stat-${ key }`" class="mt-0" :name="elem.name" :type="elem.type" :before="elem.before" :after="elem.after"></display-row>
      <alert-text v-if="disabled" type="error">{{ $vuetify.lang.t(`$vuetify.farm.gene.lockOnField`) }}</alert-text>
    </template>
  </gb-tooltip>
</template>

<script>
import AlertText from '../render/AlertText.vue';
import DisplayRow from '../upgrade/DisplayRow.vue';
export default {
  components: { DisplayRow, AlertText },
  props: {
    name: {
      type: String,
      required: true
    },
    showUpgrade: {
      type: Boolean,
      required: false,
      default: false
    },
    clickable: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    gene() {
      return this.$store.state.farm.gene[this.name];
    },
    display() {
      return this.gene.upgrade.map(elem => {
        return {
          ...elem,
          before: elem.value(0),
          after: elem.value(1)
        };
      });
    }
  }
}
</script>
