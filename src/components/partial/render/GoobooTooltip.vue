<template>
  <v-tooltip :min-width="minWidth" max-width="400" :disabled="disabled" bottom transition="fade-transition">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs"></slot>
    </template>
    <h3 v-if="titleText" class="text-center" :class="noTitleMargin ? 'mb-n1' : 'mb-1'">{{ titleText }}</h3>
    <div class="tooltip-text-container">
      <slot></slot>
    </div>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    titleText: {
      type: String,
      required: false,
      default: null
    },
    minWidth: {
      type: Number,
      required: false,
      default: 300
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    noTitleMargin: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
