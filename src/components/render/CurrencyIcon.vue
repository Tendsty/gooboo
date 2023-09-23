<template>
  <v-icon :class="`balloon-text-${ $vuetify.theme.dark ? 'white' : 'black' }`" :small="!large" :color="currency.color">{{ currency.icon }}</v-icon>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    currency() {
      return this.$store.state.currency[this.name];
    }
  }
}
</script>
