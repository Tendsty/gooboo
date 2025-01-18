<template>
  <div v-if="isSimple" class="text-center">{{ text }}</div>
  <div v-else-if="type === 'tag'">{{ this.$vuetify.lang.t(`$vuetify.tag.${ name }`, ...tagArgs) }}</div>
  <div v-else class="d-flex align-center">
    <v-icon v-if="showIcon && featureIcon" small class="mr-2">{{ featureIcon }}</v-icon>
    <div class="flex-grow-1">{{ isLocked ? '???' : text }}{{ showStar ? '*' : '' }}{{ isBuff ? ` ${ $vuetify.lang.t(`$vuetify.horde.active.buff.suffix`) }` : '' }}:</div>
    <div class="pl-1" v-if="showRelative">
      <mult-stat :mult="name" :type="type" :value="relativeValue"></mult-stat>
    </div>
    <div v-else class="flex-grow-1 d-flex" :class="(before !== null && after !== null) ? 'justify-space-between' : 'justify-end'">
      <div class="px-1" v-if="before !== null">
        <mult-stat :hide-prefix="hidePrefix" :mult="name" :type="type" :value="before"></mult-stat>
      </div>
      <v-icon small v-if="before !== null && after !== null">mdi-transfer-right</v-icon>
      <div class="pl-1" v-if="after !== null">
        <mult-stat :hide-prefix="hidePrefix" :mult="name" :type="type" :value="after"></mult-stat>
      </div>
    </div>
  </div>
</template>

<script>
import MultStat from '../render/MultStat.vue';

export default {
  components: { MultStat },
  data: () => ({
    text: null
  }),
  computed: {
    isSimple() {
      return ['unlock', 'keepUpgrade', 'villageCraft', 'farmSeed', 'findConsumable', 'galleryIdea', 'galleryShape', 'text'].includes(this.type);
    },
    hidePrefix() {
      return ['hordeActive', 'hordeBuff', 'hordeCooldown'].includes(this.type);
    },
    showRelative() {
      return this.$store.state.system.settings.general.items.relativeUpgradeStats.value;
    },
    relativeValue() {
      return this.before === null ? this.after : (this.after === null ? this.before : (this.type === 'mult' ? (this.after / this.before) : (this.after - this.before)));
    },
    featureIcon() {
      if (!this.isSimple && this.$store.state.mult.items[this.name]) {
        const feature = this.$store.state.mult.items[this.name].feature;
        return feature === 'meta' ? 'mdi-earth' : this.$store.state.system.features[feature].icon;
      }
      return null;
    },
    tagArgs() {
      if (this.type !== 'tag') {
        return [];
      }
      const types = this.$store.state.tag[this.name].params;
      return (this.after !== null ? this.after : this.before).map((el, i) => {
        switch (types[i]) {
          case 'number':
            return this.$formatNum(el, true);
          case 'time':
            return this.$formatTime(el);
          case 'percent':
            return this.$formatNum(el * 100, true) + '%';
          case 'perSecond':
            return this.$formatNum(el, true) + '/s';
          case 'mult':
            return this.$formatNum(el, true) + 'x';
          default:
            return el;
        }
      });
    },
    isLocked() {
      if (!['base', 'mult', 'bonus'].includes(this.type)) {
        return false;
      }
      const mult = this.$store.state.mult.items[this.name];
      return mult && mult.unlock !== null && !this.$store.state.unlock[mult.unlock].see;
    }
  },
  props: {
    name: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    before: {
      required: false,
      default: null
    },
    after: {
      required: false,
      default: null
    },
    showStar: {
      type: Boolean,
      required: false,
      default: false
    },
    showIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    isBuff: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created() {
    const cacheKey = this.type + (this.name ? `_${this.name}` : '');
    const text = this.$store.state.mult.cache[cacheKey];

    if (text !== undefined) {
      this.text = text;
    } else if (this.type !== 'tag') {
      let cacheValue = '';
      switch (this.type) {
        case 'unlock':
          cacheValue = this.$vuetify.lang.t(`$vuetify.gooboo.unlock`) + ': ' + this.$vuetify.lang.t(`$vuetify.unlock.${this.name}`);
          break;
        case 'text':
          cacheValue = this.$vuetify.lang.t(`$vuetify.text.${this.name}`);
          break;
        case 'keepUpgrade':
          cacheValue = this.$vuetify.lang.t(`$vuetify.gooboo.keep`) + ': ' + this.$vuetify.lang.t(`$vuetify.upgrade.${this.name}`);
          break;
        case 'findConsumable':
          cacheValue = this.$vuetify.lang.t(`$vuetify.gooboo.consumable`) + ': ' + this.$vuetify.lang.t(`$vuetify.consumable.${this.name}.name`);
          break;
        case 'farmSeed':
          cacheValue = this.$vuetify.lang.t(`$vuetify.farm.unlockSeed`) + ': ' + this.$vuetify.lang.t(`$vuetify.farm.crop.${this.name}`);
          break;
        case 'villageCraft':
          cacheValue = this.$vuetify.lang.t(`$vuetify.village.crafting.unlockNew`) + this.$vuetify.lang.t(`$vuetify.village.crafting.${this.name}`);
          break;
        case 'villageJob':
          cacheValue = this.$vuetify.lang.t(`$vuetify.village.job.${this.name}`);
          break;
        case 'hordeActive':
          cacheValue = this.$vuetify.lang.t(`$vuetify.horde.active.${this.name}.0`) + ' ' + this.$vuetify.lang.t(`$vuetify.horde.active.${this.name}.1`);
          break;
        case 'hordeActiveCrit':
          cacheValue = this.$vuetify.lang.t(`$vuetify.horde.active.canCritDiff`);
          break;
        case 'hordeBuff':
          cacheValue = this.$vuetify.lang.t(`$vuetify.horde.active.buff.duration`);
          break;
        case 'hordeCooldown':
          cacheValue = this.$vuetify.lang.t(`$vuetify.horde.activeCooldown`);
          break;
        case 'farmBuilding':
          cacheValue = this.$vuetify.lang.t(`$vuetify.farm.building.${this.name}.name`);
          break;
        case 'farmBuildingPremium':
          cacheValue = this.$vuetify.lang.t(`$vuetify.farm.building.premium`, this.$vuetify.lang.t(`$vuetify.farm.building.${this.name}.name`));
          break;
        case 'addRareDrop':
          cacheValue = this.$vuetify.lang.t(`$vuetify.farm.addRareDrop`, this.$vuetify.lang.t(`$vuetify.currency.${this.name}.name`));
          break;
        case 'addRareDropAmount':
          cacheValue = this.$vuetify.lang.t(`$vuetify.farm.addRareDropAmount`, this.$vuetify.lang.t(`$vuetify.currency.${this.name}.name`));
          break;
        case 'galleryIdea':
          cacheValue = this.$vuetify.lang.t(`$vuetify.gallery.idea.unlock`) + ': ' + this.$vuetify.lang.t(`$vuetify.gallery.idea.${this.name}`);
          break;
        case 'galleryShape':
          cacheValue = this.$vuetify.lang.t(`$vuetify.gallery.shapes.unlock`, this.$vuetify.lang.t(`$vuetify.gallery.shapes.${this.name}`));
          break;
        case 'summerFestivalBuildingBase':
        case 'summerFestivalBuildingMult':
          cacheValue = this.$vuetify.lang.t(`$vuetify.event.summerFestival.buildingEffect.${this.name}`);
          break;
        default:
          if (this.$store.getters['mult/isUpgradeCap'](this.name)) {
            cacheValue = this.$vuetify.lang.t('$vuetify.upgrade.maxLevel', this.$vuetify.lang.t(`$vuetify.upgrade.${this.$store.getters['mult/getUpgradeName'](this.name)}`));
          } else if (this.$store.getters['mult/isCurrencyCap'](this.name)) {
            cacheValue = this.$vuetify.lang.t(`$vuetify.gooboo.multCapacity`, this.$vuetify.lang.t(`$vuetify.currency.${this.$store.getters['mult/getCurrencyName'](this.name)}.name`));
          } else if (this.$store.getters['mult/isCurrencyGain'](this.name)) {
            cacheValue = this.$vuetify.lang.t(`$vuetify.gooboo.multGain`, this.$vuetify.lang.t(`$vuetify.currency.${this.$store.getters['mult/getCurrencyName'](this.name, 4)}.name`));
          } else if (this.$store.getters['mult/isCryolabPassive'](this.name)) {
            cacheValue = this.$vuetify.lang.t(`$vuetify.cryolab.passiveTitle`);
          } else if (this.$store.getters['mult/isCryolabActive'](this.name)) {
            cacheValue = this.$vuetify.lang.t(`$vuetify.cryolab.activeTitle`);
          } else {
            cacheValue = this.$vuetify.lang.t(`$vuetify.mult.${this.name}`);
          }
          break;
      }
      this.$store.commit('mult/setCacheKey', {key: cacheKey, value: cacheValue});
      this.text = cacheValue;
    }
  }
}
</script>
