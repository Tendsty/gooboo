<template>
  <div class="d-flex flex-wrap align-center">
    <div class="d-flex align-center" :class="{'w-100': $vuetify.breakpoint.xsOnly}">
      <v-chip small label class="ma-1 px-2">
        <div class="d-flex justify-space-between align-center" style="min-width: 32px;">
          <v-icon class="mr-1">mdi-dna</v-icon>
          {{ dnaCost }}
        </div>
      </v-chip>
      <v-btn class="ma-1" :disabled="!canAfford" @click="buyDnaUpgrade" min-width="20" max-width="28" color="primary" x-small>
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
      <v-badge class="ma-1" inline :content="level + ''"></v-badge>
    </div>
    <div class="flex-grow-1" :class="{'w-100 mt-n2': $vuetify.breakpoint.xsOnly}">
      <display-row v-for="(elem, key) in display" :key="`stat-${ key }`" class="ma-1" :name="elem.name" :type="elem.type" :before="elem.before" :after="elem.after"></display-row>
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
    dnaCost() {
      return this.$store.getters['farm/upgradeDnaCost'](this.level);
    },
    canAfford() {
      return this.cropObj.dna >= this.dnaCost;
    }
  },
  methods: {
    buyDnaUpgrade() {
      this.$store.dispatch('farm/buyDnaUpgrade', {crop: this.crop, name: this.name});
    }
  }
}
</script>
