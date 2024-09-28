<style scoped>
.shape-table-sm {
  border-spacing: 4px;
}
.shape-table-sm .shape-cell {
  border-radius: 4px;
  width: 36px;
  height: 36px;
}
.shape-table-lg {
  border-spacing: 6px;
}
.shape-table-lg .shape-cell {
  border-radius: 6px;
  width: 64px;
  height: 64px;
}
.shape-icon-disabled {
  opacity: 0.2;
}
.shape-cell {
  position: relative;
}
.shape-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.25;
}
.shape-table-sm .shape-bg {
  border-radius: 4px;
}
.shape-table-lg .shape-bg {
  border-radius: 6px;
}
</style>

<template>
  <div>
    <table class="mx-auto" :class="{
      'shape-table-sm': $vuetify.breakpoint.smAndDown,
      'shape-table-lg': $vuetify.breakpoint.mdAndUp,
    }">
      <tr v-for="(row, y) in shapeGrid" :key="'shape-row-' + y">
        <td
          class="shape-cell text-center bg-tile-default elevation-2"
          v-for="(cell, x) in row"
          :key="'field-cell-' + y + '-' + x"
          @click="selectTile(x, y)"
          :id="`galleryShape_${ x }_${ y }`"
          draggable
          @dragstart="drag(x, y)"
          @drop="drop($event, x, y)"
          @dragenter="dragOver(x, y)"
          @dragover="allowDrop"
          @touchend="touchdrop($event, x, y)"
        >
          <div v-if="shapeList[cell].unlocked && !shapeList[cell].isSpecial" class="shape-bg" :class="shapeList[cell].color"></div>
          <v-badge
            :content="$formatTime(hourglassTime)"
            :value="cell === 'hourglass'"
            bottom
            left
            offset-x="52"
            offset-y="16"
          >
            <v-icon
              :size="(shapeList[cell].isSpecial ? 48 : 36) * ($vuetify.breakpoint.smAndDown ? 0.75 : 1)"
              :color="shapeList[cell].color"
              :class="{'shape-icon-disabled': !shapeList[cell].unlocked}"
            >{{ shapeList[cell].icon }}</v-icon>
          </v-badge>
        </td>
      </tr>
    </table>
    <div class="d-flex flex-wrap justify-center align-center ma-1">
      <gb-tooltip :title-text="$vuetify.lang.t('$vuetify.gallery.shapes.name')">
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="ma-1" v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.gallery.shapes.description') }}</div>
        <div>
          <span>{{ $vuetify.lang.t('$vuetify.gallery.shapes.cost') }}&nbsp;</span>
          <price-tag currency="gallery_motivation" :amount="1"></price-tag>
        </div>
      </gb-tooltip>
      <gb-tooltip v-if="specialShapeList.length > 0" :title-text="$vuetify.lang.t('$vuetify.gallery.shapes.special.name')">
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="ma-1" v-bind="attrs" v-on="on">mdi-multiplication-box</v-icon>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.gallery.shapes.special.description', $formatNum(specialShapeChance * 100, true), $formatNum(specialShapeMult, true)) }}</div>
        <div v-for="item in specialShapeList" :key="`special-shape-${ item }`">
          <v-icon x-small class="mr-1" :color="shapeList[item].color">{{ shapeList[item].icon }}</v-icon>
          <span>{{ $vuetify.lang.t(`$vuetify.gallery.shapes.${ item }`) }} - {{ $vuetify.lang.t(`$vuetify.gallery.shapes.special.${ item }`) }}</span>
        </div>
        <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.gallerySpecialShapeChance') }}</h3>
        <stat-breakdown name="gallerySpecialShapeChance"></stat-breakdown>
        <h3 class="text-center">{{ $vuetify.lang.t('$vuetify.mult.gallerySpecialShapeMult') }}</h3>
        <stat-breakdown name="gallerySpecialShapeMult"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-btn class="ma-1" width="36" min-width="36" color="primary" :disabled="!canBuyReroll" @click="buyShapeReroll"><v-icon>mdi-cached</v-icon></v-btn>
          </div>
        </template>
        <div class="mt-0">
          <span>{{ $vuetify.lang.t('$vuetify.gallery.shapes.reroll') }}&nbsp;</span>
          <price-tag currency="gallery_motivation" :amount="rerollCost"></price-tag>
        </div>
      </gb-tooltip>
      <currency class="ma-1" name="gallery_motivation" large></currency>
      <gb-tooltip :min-width="0">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-btn class="ma-1" width="36" min-width="36" color="success" :disabled="!canBuyMotivation" @click="buyMotivation"><v-icon>mdi-plus-thick</v-icon></v-btn>
          </div>
        </template>
        <div class="mt-0">
          <span>{{ $vuetify.lang.t('$vuetify.gallery.shapes.buyFor.0') }}&nbsp;</span>
          <price-tag currency="gallery_motivation" :amount="motivationBuyAmount" add></price-tag>
          <span>&nbsp;{{ $vuetify.lang.t('$vuetify.gallery.shapes.buyFor.1') }}&nbsp;</span>
          <price-tag currency="gem_sapphire" :amount="motivationBuyCost"></price-tag>
        </div>
      </gb-tooltip>
      <currency v-for="item in currencies.slice(1)" :key="item" class="ma-1" :name="item" :gainBase="1"></currency>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { GALLERY_MOTIVATION_BUY_AMOUNT, GALLERY_MOTIVATION_BUY_COST, GALLERY_REROLL_COST } from '../../../js/constants';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';

export default {
  components: { Currency, PriceTag, StatBreakdown },
  data: () => ({
    dragX: null,
    dragY: null
  }),
  computed: {
    ...mapState({
      shapeList: state => state.gallery.shape,
      shapeGrid: state => state.gallery.shapeGrid
    }),
    ...mapGetters({
      hourglassTime: 'gallery/hourglassTime'
    }),
    currencies() {
      return this.$store.getters['currency/list']('gallery', 'shape');
    },
    specialShapeChance() {
      return this.$store.getters['mult/get']('gallerySpecialShapeChance');
    },
    specialShapeMult() {
      return this.$store.getters['mult/get']('gallerySpecialShapeMult');
    },
    specialShapeList() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.shapeList)) {
        if (elem.isSpecial && elem.unlocked) {
          arr.push(key);
        }
      }
      return arr;
    },
    motivationBuyCost() {
      return GALLERY_MOTIVATION_BUY_COST;
    },
    motivationBuyAmount() {
      return GALLERY_MOTIVATION_BUY_AMOUNT;
    },
    rerollCost() {
      return GALLERY_REROLL_COST;
    },
    canBuyReroll() {
      return this.$store.getters['currency/value']('gallery_motivation') >= GALLERY_REROLL_COST;
    },
    canBuyMotivation() {
      return this.$store.state.unlock.galleryShape.use && this.$store.getters['currency/value']('gem_sapphire') >= GALLERY_MOTIVATION_BUY_COST && this.$store.getters['currency/value']('gallery_motivation') < 10;
    }
  },
  methods: {
    selectTile(x, y) {
      this.$store.dispatch('gallery/clickShape', {x, y});
    },
    drag(x, y) {
      this.dragX = x;
      this.dragY = y;
    },
    drop(ev, x, y) {
      ev.preventDefault();
      if ((Math.abs(this.dragX - x) + Math.abs(this.dragY - y)) === 1) {
        this.$store.dispatch('gallery/switchShape', {fromX: this.dragX, fromY: this.dragY, toX: x, toY: y});
      }
      this.dragX = null;
      this.dragY = null;
    },
    dragOver(x, y) {
      if ((Math.abs(this.dragX - x) + Math.abs(this.dragY - y)) === 1 && this.$store.getters['currency/canAfford']({gallery_motivation: 1})) {
        this.$store.dispatch('gallery/switchShape', {fromX: this.dragX, fromY: this.dragY, toX: x, toY: y});
        this.dragX = x;
        this.dragY = y;
      }
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    touchdrop(ev, x, y) {
      const elemList = document.elementsFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
      if (elemList) {
        const endElem = elemList.find(el => el.id.slice(0, 13) === 'galleryShape_');
        if (endElem) {
          const split = endElem.id.slice(13).split('_');
          const endX = parseInt(split[0]);
          const endY = parseInt(split[1]);
          if ((Math.abs(x - endX) + Math.abs(y - endY)) === 1) {
            this.$store.dispatch('gallery/switchShape', {fromX: x, fromY: y, toX: endX, toY: endY});
          }
        }
      }
    },
    buyShapeReroll() {
      this.$store.dispatch('gallery/buyShapeReroll');
    },
    buyMotivation() {
      if (this.$store.state.system.settings.confirm.items.gem.value) {
        this.$store.commit('system/updateKey', {key: 'confirm', value: {
          type: 'galleryMotivation',
          price: {gem_sapphire: GALLERY_MOTIVATION_BUY_COST},
          gain: {gallery_motivation: GALLERY_MOTIVATION_BUY_AMOUNT},
        }});
      } else {
        this.$store.dispatch('gallery/buyMotivation');
      }
    }
  }
}
</script>
