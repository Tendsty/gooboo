<style scoped>
.card-amount {
  min-width: 44px;
}
.card-reward {
  font-size: 12px;
}
</style>

<template>
  <div class="d-flex align-center" :class="colorText">
    <div v-if="!hideAmount" class="card-amount mr-1">
      <v-icon :color="colorIcon" size="10" class="mr-n1">mdi-close</v-icon>
      {{ $formatNum(item.amount - 1) }}
    </div>
    <div class="flex-grow-1">
      <div>
        <span>{{ $vuetify.lang.t(`$vuetify.card.card.${item.name}`) }}</span>
        <span v-if="item.power > 0">&nbsp;(+{{ item.power }})</span>
      </div>
      <div class="card-reward" v-for="(reward, rkey) in item.reward" :key="rkey">
        <span v-if="reward.type === 'addRareDrop'">{{ $vuetify.lang.t(`$vuetify.farm.addRareDrop`, $vuetify.lang.t(`$vuetify.currency.${ reward.name }.name`)) }}: +{{ $formatNum(reward.value) }}</span>
        <span v-else><mult-name :name="reward.name"></mult-name> <mult-stat :mult="reward.name" :type="reward.type" :value="reward.value"></mult-stat></span>
      </div>
    </div>
  </div>
</template>

<script>
import MultName from '../../render/MultName.vue';
import MultStat from '../render/MultStat.vue';

export default {
  components: { MultStat, MultName },
  props: {
    item: {
      type: Object,
      required: true
    },
    showDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    hideAmount: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    themeModifier() {
      return this.$vuetify.theme.dark ? 'lighten-2' : 'darken-1';
    },
    colorText() {
      return (this.showDisabled || !this.item.disabled) ? (this.item.color + '--text text--' + this.themeModifier) : null;
    },
    colorIcon() {
      return (this.showDisabled || !this.item.disabled) ? ((this.item.color + ' ' + this.themeModifier)) : (this.item.disabled ? '#80808080' : null);
    }
  }
}
</script>
