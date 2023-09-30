<template>
  <div class="d-flex align-center w-100 h-100">
    <v-checkbox :data-cy="dataCy" v-if="item.type === 'checkbox'" hide-details v-model="value" :label="$vuetify.lang.t(`$vuetify.settings.${category}.${name}.name`)"></v-checkbox>
    <v-switch class="mt-0 pt-0" :data-cy="dataCy" v-else-if="item.type === 'switch'" hide-details v-model="value" :label="$vuetify.lang.t(`$vuetify.settings.${category}.${name}.name`)"></v-switch>
    <v-select :data-cy="dataCy" v-else-if="item.type === 'select'" outlined hide-details :items="item.items" v-model="value" :label="$vuetify.lang.t(`$vuetify.settings.${category}.${name}.name`)">
      <template v-slot:selection="{ item }">{{ $vuetify.lang.t(`$vuetify.settings.${category}.${name}.${item}`) }}</template>
      <template v-slot:item="{ item }">{{ $vuetify.lang.t(`$vuetify.settings.${category}.${name}.${item}`) }}</template>
    </v-select>
    <v-text-field :data-cy="dataCy" v-else-if="item.type === 'number'" outlined hide-details v-model="value" :label="$vuetify.lang.t(`$vuetify.settings.${category}.${name}.name`)" type="number" :min="item.min" :max="item.max" :step="item.step" :suffix="item.suffix" :clearable="item.clearable"></v-text-field>
    <gb-tooltip v-if="item.hasDescription" :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="ma-1" v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.settings.${category}.${name}.description`) }}</div>
    </gb-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data: () => ({
    value: null
  }),
  computed: {
    item() {
      return this.$store.state.system.settings[this.category].items[this.name];
    },
    dataCy() {
      return `setting-${ this.category }-${ this.name }`;
    }
  },
  mounted() {
    this.value = this.item.value;
  },
  watch: {
    value(newVal, oldVal) {
      if (oldVal !== null && (this.item.type !== 'number' || (this.item.clearable && newVal === null) || (!isNaN(newVal) && (this.item.min === undefined || newVal >= this.item.min) && (this.item.max === undefined || newVal <= this.item.max)))) {
        this.$store.dispatch('system/updateSetting', {category: this.category, name: this.name, value: newVal});
      }
    }
  }
}
</script>
