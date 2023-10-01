<style scoped>
.upgrade-collapse {
  position: absolute;
  top: 8px;
  right: 8px;
}
.upgrade-persistent {
  position: absolute;
  top: 16px;
  left: 16px;
}
.reduced-height {
  height: 28px;
}
</style>

<template>
  <v-card class="d-flex align-center pa-1" v-if="upgrade.collapse">
    <v-icon v-if="upgrade.icon" class="ma-1">{{ upgrade.icon }}</v-icon>
    <div v-else class="ma-1">{{ $vuetify.lang.t(`$vuetify.upgrade.${name}`) }}</div>
    <gb-tooltip v-if="upgrade.bought || (upgrade.cap && !upgrade.hideCap)" :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-chip label small class="ma-1 px-2" v-bind="attrs" v-on="on">
          <v-icon class="mr-1">mdi-chevron-double-up</v-icon>
          <span>{{ upgrade.level }}{{ upgrade.level !== upgrade.bought ? (' (+' + Math.round(upgrade.bought - upgrade.level) + ')') : '' }}</span>
          <span v-if="upgrade.cap && !upgrade.hideCap">&nbsp;/ {{ upgrade.cap }}</span>
        </v-chip>
      </template>
      <div>{{ $vuetify.lang.t(`$vuetify.upgrade.keyset.${ translationSet }.bought`) }}</div>
    </gb-tooltip>
    <v-chip label small class="ma-1 px-2" v-if="isTimed && isUpgrading">
      <v-icon class="mr-1">mdi-timer</v-icon>
      {{ $formatTime(timeLeftCurrent) }}
    </v-chip>
    <gb-tooltip v-if="upgrade.persistent" :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="ma-1" v-if="upgrade.persistent" small v-bind="attrs" v-on="on">mdi-lock</v-icon>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.upgrade.keyset.${ translationSet }.persistent`) }}</div>
    </gb-tooltip>
    <v-spacer></v-spacer>
    <gb-tooltip>
      <template v-slot:activator="{ on, attrs }">
        <div class="ma-1 rounded" v-bind="attrs" v-on="on">
          <v-btn class="px-2" v-if="!isMax" color="primary" :disabled="!canAfford || disabled" @click="buy">{{ $vuetify.lang.t(upgradeTranslation) }}</v-btn>
        </div>
      </template>
      <div class="mx-n1"><price-tag class="ma-1" v-for="(amount, currency, index) in price" :key="currency + '-' + index" :currency="currency" :amount="amount"></price-tag></div>
      <display-row class="mt-0" v-for="(item, key) in display" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
    </gb-tooltip>
    <v-btn class="ma-1" icon @click="toggleCollapse"><v-icon>mdi-arrow-expand</v-icon></v-btn>
  </v-card>
  <v-card v-else>
    <v-card-title class="pa-2 justify-center">
      <v-icon v-if="upgrade.icon" class="mr-2">{{ upgrade.icon }}</v-icon>
      <div>{{ $vuetify.lang.t(`$vuetify.upgrade.${ name }`) }}</div>
    </v-card-title>
    <v-card-text class="pb-0">
      <display-row v-for="(item, key) in display" :key="`${item.name}-${item.type}-${key}`" :name="item.name" :type="item.type" :before="item.before" :after="item.after"></display-row>
      <alert-text v-if="upgrade.hasDescription" type="info">{{ $vuetify.lang.t(`$vuetify.upgrade.description.${ name }`) }}</alert-text>
      <div class="mx-n1 mt-2" v-if="!isMax">
        <price-tag class="ma-1" v-for="(amount, currency, index) in price" :key="currency + '-' + index" :currency="currency" :amount="amount"></price-tag>
      </div>
      <v-progress-linear class="rounded mt-2" height="20" v-if="isTimed" :value="timePercentCurrent">
        <span v-if="isUpgrading">{{ $formatTime(timeLeftCurrent) }}</span>
      </v-progress-linear>
      <slot></slot>
    </v-card-text>
    <v-card-actions>
      <gb-tooltip v-if="subtype !== null" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="ma-1" small v-bind="attrs" v-on="on">{{ subtypeIcon }}</v-icon>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.upgrade.subtype.${ subtype }`) }}</div>
      </gb-tooltip>
      <gb-tooltip v-if="upgrade.bought || (upgrade.cap && !upgrade.hideCap)" :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            :small="$vuetify.breakpoint.xsOnly"
            :label="$vuetify.breakpoint.xsOnly"
            class="ma-1"
            :class="{'px-2': $vuetify.breakpoint.xsOnly, 'reduced-height': $vuetify.breakpoint.smAndUp}"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mr-1">mdi-chevron-double-up</v-icon>
            <span>{{ upgrade.level }}{{ upgrade.level !== upgrade.bought ? (' (+' + Math.round(upgrade.bought - upgrade.level) + ')') : '' }}</span>
            <span v-if="upgrade.cap && !upgrade.hideCap">&nbsp;/ {{ upgrade.cap }}</span>
          </v-chip>
        </template>
        <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.upgrade.keyset.${ translationSet }.bought`) }}</div>
      </gb-tooltip>
      <v-chip
        :small="$vuetify.breakpoint.xsOnly"
        :label="$vuetify.breakpoint.xsOnly"
        class="ma-1"
        :class="{'px-2': $vuetify.breakpoint.xsOnly, 'reduced-height': $vuetify.breakpoint.smAndUp}"
        v-if="isTimed"
      >
        <v-icon class="mr-1">mdi-timer</v-icon>
        {{ $formatTime(timeNeededNext) }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn small v-if="!isMax" color="primary" :disabled="!canAfford || disabled" @click="buyMax">{{ $vuetify.lang.t('$vuetify.gooboo.max') }}</v-btn>
      <v-btn v-if="!isMax" :data-cy="`upgrade-${ name }-buy`" color="primary" :disabled="!canAfford || disabled" @click="buy">{{ $vuetify.lang.t(upgradeTranslation) }}</v-btn>
    </v-card-actions>
    <v-btn class="upgrade-collapse" icon @click="toggleCollapse"><v-icon>mdi-arrow-collapse</v-icon></v-btn>
    <gb-tooltip v-if="upgrade.persistent" :min-width="0">
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="upgrade-persistent" v-if="upgrade.persistent" small v-bind="attrs" v-on="on">mdi-lock</v-icon>
      </template>
      <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.upgrade.keyset.${ translationSet }.persistent`) }}</div>
    </gb-tooltip>
  </v-card>
</template>

<script>
import { capitalize } from '../../js/utils/format';
import AlertText from '../partial/render/AlertText.vue';
import DisplayRow from '../partial/upgrade/DisplayRow.vue';
import PriceTag from './PriceTag.vue';

export default {
  components: { PriceTag, DisplayRow, AlertText },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    upgradeTranslation: {
      type: String,
      required: false,
      default: '$vuetify.gooboo.buy'
    },
    translationSet: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  computed: {
    upgrade() {
      return this.$store.state.upgrade.item[this.name];
    },
    price() {
      return this.upgrade.price(this.upgrade.bought);
    },
    canAfford() {
      return this.$store.getters['upgrade/canAfford'](this.upgrade.feature, this.splitName);
    },
    isMax() {
      return this.upgrade.cap !== null && this.upgrade.bought >= this.upgrade.cap;
    },
    display() {
      return this.upgrade.effect.map(elem => {
        const lvl = this.upgrade.bought;
        return {
          ...elem,
          before: lvl > 0 ? elem.value(lvl) : null,
          after: this.isMax ? null : elem.value(lvl + 1)
        };
      }).filter(elem => {
        const isBool = ['unlock', 'farmSeed', 'keepUpgrade', 'findConsumable', 'galleryIdea'].includes(elem.type);
        return (isBool && !elem.before && elem.after) || (!isBool && elem.before !== elem.after);
      });
    },
    splitName() {
      return this.name.split('_')[1];
    },
    isTimed() {
      return ['delay', 'queue'].includes(this.upgrade.mode);
    },
    isUpgrading() {
      return this.upgrade.level < this.upgrade.bought;
    },
    queueSpeed() {
      return this.isTimed ? this.$store.getters['mult/get']('queueSpeed' + capitalize(this.upgrade.feature) + capitalize(this.upgrade.type)) : 1;
    },
    timeNeededNext() {
      if (!this.isTimed) {
        return 0;
      }
      return Math.ceil((this.upgrade.timeNeeded(this.upgrade.bought)) / this.queueSpeed);
    },
    timeNeededCurrent() {
      if (!this.isTimed) {
        return 0;
      }
      return Math.ceil((this.upgrade.timeNeeded(this.upgrade.level)) / this.queueSpeed);
    },
    timeLeftCurrent() {
      if (!this.isTimed) {
        return 0;
      }
      return Math.ceil((this.upgrade.timeNeeded(this.upgrade.level) - this.upgrade.timeProgress) / this.queueSpeed);
    },
    timePercentCurrent() {
      if (!this.isTimed || this.timeNeededCurrent <= 0) {
        return 0;
      }
      return 100 * (1 - (this.timeLeftCurrent / this.timeNeededCurrent));
    },
    subtype() {
      if (this.upgrade.subtype === null) {
        return null;
      } else {
        return `${ this.upgrade.feature }_${ this.upgrade.subtype }`;
      }
    },
    subtypeIcon() {
      if (this.subtype === null) {
        return null;
      } else {
        return this.$store.state.upgrade.subtypeIcon[this.subtype];
      }
    }
  },
  methods: {
    buy() {
      this.$store.commit('system/updateTutorialKey', {name: 'miningUpgrade', key: 'completed', value: true});
      if (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](this.price, 'gem')) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'upgrade',
          name: this.name,
          price: this.price,
          amount: 1,
        }});
      } else {
        this.$store.dispatch('upgrade/buy', {feature: this.upgrade.feature, name: this.splitName});
      }
    },
    buyMax() {
      this.$store.commit('system/updateTutorialKey', {name: 'miningUpgrade', key: 'completed', value: true});
      const maxAfford = this.$store.getters['upgrade/maxAfford'](this.upgrade.feature, this.splitName);
      if (maxAfford > 0) {
        const maxPrice = this.$store.getters['upgrade/priceList'](this.upgrade.feature, this.splitName, maxAfford);
        if (this.$store.state.system.settings.confirm.items.gem.value && this.$store.getters['currency/contains'](maxPrice, 'gem')) {
          this.$store.commit('system/updateKey', {key: 'confirm', value: {
            type: 'upgrade',
            name: this.name,
            price: maxPrice,
            amount: maxAfford,
          }});
        } else {
          this.$store.dispatch('upgrade/buyMax', {feature: this.upgrade.feature, name: this.splitName});
        }
      }
    },
    toggleCollapse() {
      this.$store.commit('upgrade/updateKey', {name: this.name, key: 'collapse', value: !this.upgrade.collapse});
    }
  }
}
</script>
