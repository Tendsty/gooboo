<template>
  <span>
    <span v-if="type === 'consumable'">{{ $vuetify.lang.t(`$vuetify.consumable.${ name }.name`) }}</span>
    <span v-else-if="type === 'currency'">{{ $vuetify.lang.t(`$vuetify.currency.${ name }.name`) }}</span>
    <span>&nbsp;({{ $vuetify.lang.t('$vuetify.farm.rareDrop') }}):&nbsp;</span>
    <span v-if="before === null">{{ $vuetify.lang.t('$vuetify.patchnote.type.new') }}</span>
    <span v-else-if="after === null">{{ $vuetify.lang.t('$vuetify.patchnote.type.remove') }}</span>
    <span v-else>
      <span v-if="before.chance !== after.chance">
        <span>{{ $vuetify.lang.t('$vuetify.gooboo.chance') }}: {{ $formatNum(before.chance * 100, true) }}%</span>
        <v-icon class="mx-1" small>mdi-transfer-right</v-icon>
        <span :class="{'success--text': after.chance > before.chance, 'error--text': after.chance < before.chance}">{{ $formatNum(after.chance * 100, true) }}%</span>
      </span>
      <span v-if="beforeMult !== afterMult">
        <span v-if="before.chance !== after.chance">,&nbsp;</span>
        <span>{{ $vuetify.lang.t('$vuetify.statBreakdown.multiplier') }}: x{{ $formatNum(beforeMult, true) }}</span>
        <v-icon class="mx-1" small>mdi-transfer-right</v-icon>
        <span :class="{'success--text': afterMult > beforeMult, 'error--text': afterMult < beforeMult}">x{{ $formatNum(afterMult, true) }}</span>
      </span>
      <span v-if="before.value !== after.value">
        <span v-if="(before.chance !== after.chance) || (beforeMult !== afterMult)">,&nbsp;</span>
        <span>{{ $vuetify.lang.t('$vuetify.gooboo.amount') }}: {{ $formatInt(before.value) }}</span>
        <v-icon class="mx-1" small>mdi-transfer-right</v-icon>
        <span :class="{'success--text': after.value > before.value, 'error--text': after.value < before.value}">{{ $formatInt(after.value) }}</span>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    before: {
      type: Object,
      required: true
    },
    after: {
      type: Object,
      required: true
    },
  },
  computed: {
    beforeMult() {
      return this.before?.mult ?? 1;
    },
    afterMult() {
      return this.after?.mult ?? 1;
    },
    type() {
      return this.before?.type ?? this.after.type;
    },
    name() {
      return this.before?.name ?? this.after.name;
    },
  }
}
</script>
