<template>
  <div class="d-flex justify-space-between align-center">
    <div class="flex-grow-1">
      <v-select class="mr-2" dense outlined clearable hide-details item-value="name" v-model="value" :items="effectList" :no-data-text="$vuetify.lang.t('$vuetify.card.notFound')">
        <template v-slot:selection="{ item }"><treasure-effect-display :mult="item" :index="effectIndex" :treasure-obj="itemObj"></treasure-effect-display></template>
        <template v-slot:item="{ item }"><treasure-effect-display :mult="item" :index="effectIndex" :treasure-obj="itemObj"></treasure-effect-display></template>
      </v-select>
    </div>
    <v-btn small color="primary" @click="changeEffect" :disabled="value === null">{{ $vuetify.lang.t('$vuetify.gooboo.apply') }}</v-btn>
  </div>
</template>

<script>
import TreasureEffectDisplay from './TreasureEffectDisplay.vue';

export default {
  components: { TreasureEffectDisplay },
  data: () => ({
    value: null
  }),
  props: {
    slotId: {
      type: Number,
      required: true
    },
    itemObj: {
      type: Object,
      required: true
    },
    effectIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    feature() {
      const firstEffect = this.itemObj.effect.find(el => el !== null);
      return firstEffect ? firstEffect.feature : null;
    },
    effectList() {
      return this.$store.getters['treasure/eligibleEffects'](this.$store.state.treasure.type[this.itemObj.type].slots[this.effectIndex].type, this.itemObj.tier, this.feature);
    }
  },
  methods: {
    changeEffect() {
      this.$store.dispatch('treasure/changeEffect', {id: this.slotId, index: this.effectIndex, effect: this.value});
    }
  }
}
</script>
