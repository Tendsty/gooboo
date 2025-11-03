<template>
  <div class="d-flex flex-wrap align-center">
    <div class="d-flex align-center" :class="{'w-100': $vuetify.breakpoint.xsOnly}">
      <v-chip small label class="ma-1 px-2">
        <div class="d-flex align-center" style="min-width: 60px;">
          <v-icon class="mr-1">mdi-dna</v-icon>
          <v-spacer></v-spacer>
          <span>{{ $formatInt(level) }}</span>
          <span v-if="maxLevel !== Infinity">&nbsp;/ {{ $formatInt(maxLevel) }}</span>
        </div>
      </v-chip>
      <div style="min-width: 36px;">
        <v-btn v-if="level < maxLevel" class="ma-1" :disabled="!canAfford" @click="buyDnaUpgrade" min-width="20" max-width="28" color="primary" x-small>
          <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="flex-grow-1" :class="{'w-100 mt-n2': $vuetify.breakpoint.xsOnly}">
      <display-row v-for="(elem, key) in display" :key="`stat-${ key }`" class="ml-1" :name="elem.name" :type="elem.type" :before="elem.before" :after="level < maxLevel ? elem.after : null"></display-row>
    </div>
  </div>
</template>

<script>
import DisplayRow from '../upgrade/DisplayRow.vue';

export default {
  components: { DisplayRow },
  props: {
    name: {
      type: String,
      required: true
    },
    crop: {
      type: String,
      required: true
    }
  },
  computed: {
    upgrade() {
      if (this.name === 'dna') {
        let arr = [];
        this.dnaGenes.forEach(elem => {
          arr.push(...this.$store.state.farm.gene[elem].upgrade);
        });
        return arr;
      }
      return this.$store.state.farm.gene[this.name].upgrade;
    },
    display() {
      return this.upgrade.map(elem => {
        return {
          ...elem,
          before: elem.value(this.level),
          after: elem.value(this.level + 1)
        };
      });
    },
    cropObj() {
      return this.$store.state.farm.crop[this.crop];
    },
    level() {
      return this.cropObj.upgrades[this.name] ?? 0;
    },
    maxLevel() {
      return this.$store.state.farm.gene[this.name].maxLevel;
    },
    canAfford() {
      return this.$store.getters['farm/cropDnaLeft'](this.crop) >= 1;
    },
    dnaGenes() {
      return this.$store.state.farm.geneLevels[1].filter(elem => this.cropObj.genes.length <= 0 || this.cropObj.genes[0] !== elem);
    },
  },
  methods: {
    buyDnaUpgrade() {
      this.$store.dispatch('farm/buyDnaUpgrade', {crop: this.crop, name: this.name});
    }
  }
}
</script>
