<template>
  <span>
    <template v-if="type === 'text'">{{ $vuetify.lang.t(`$vuetify.patchnote.text.${ text }`, ...params) }}</template>
    <template v-else-if="type === 'mult'">{{ $vuetify.lang.t(`$vuetify.mult.${ text }`) }}</template>
    <template v-else-if="type === 'currencyGain'">{{ $vuetify.lang.t(`$vuetify.gooboo.multGain`, $vuetify.lang.t(`$vuetify.currency.${ text }.name`)) }}</template>
    <template v-else-if="type === 'currencyCap'">{{ $vuetify.lang.t(`$vuetify.gooboo.multCapacity`, $vuetify.lang.t(`$vuetify.currency.${ text }.name`)) }}</template>
    <template v-if="per">&nbsp;({{ $vuetify.lang.t(`$vuetify.patchnote.per.${ per }`) }})</template>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    text: {
      type: String,
      required: true
    },
    per: {
      type: String,
      required: false,
      default: null
    },
    params: {
      type: Array,
      required: false,
      default: (() => [])
    }
  }
}
</script>
