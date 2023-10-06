<template>
  <div class="d-flex align-center bg-tile-default rounded my-2 mx-auto pa-4" style="max-width: 640px;">
    <gb-tooltip>
      <template v-slot:activator="{ on, attrs }">
        <v-btn :disabled="!canRemove || disabled" class="pa-1" small color="error" min-height="32" min-width="32" @click="remove" v-bind="attrs" v-on="on"><v-icon>mdi-minus</v-icon></v-btn>
      </template>
      <display-row
        class="mt-0"
        v-for="(item, key) in displayRemove"
        :key="`remove-${item.name}-${item.type}-${key}`"
        :name="item.name"
        :type="item.type"
        :before="item.before"
        :after="item.after"
      ></display-row>
    </gb-tooltip>
    <v-spacer></v-spacer>
    <v-icon class="mr-1">{{ policy.icon }}</v-icon>
    <div class="mr-8">{{ $vuetify.lang.t(`$vuetify.village.policy.${name}`) }}</div>
    <div>{{ policy.value }} / {{ policyLimit }}</div>
    <v-spacer></v-spacer>
    <gb-tooltip>
      <template v-slot:activator="{ on, attrs }">
        <v-btn :disabled="!canAdd || disabled" class="pa-1" small color="success" min-height="32" min-width="32" @click="add" v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
      </template>
      <display-row
        class="mt-0"
        v-for="(item, key) in displayAdd"
        :key="`remove-${item.name}-${item.type}-${key}`"
        :name="item.name"
        :type="item.type"
        :before="item.before"
        :after="item.after"
      ></display-row>
    </gb-tooltip>
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
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    policy() {
      return this.$store.state.village.policy[this.name];
    },
    policyLimit() {
      return this.$store.getters['mult/get'](this.policy.mult);
    },
    displayAdd() {
      return this.policy.effect.map(elem => {
        const lvl = this.policy.value;
        const isMax = lvl >= this.policyLimit;
        return {
          ...elem,
          before: elem.value(lvl),
          after: isMax ? null : elem.value(lvl + 1)
        };
      }).filter(elem => elem.before !== elem.after);
    },
    displayRemove() {
      return this.policy.effect.map(elem => {
        const lvl = this.policy.value;
        const isMax = lvl <= (0 - this.policyLimit);
        return {
          ...elem,
          before: elem.value(lvl),
          after: isMax ? null : elem.value(lvl - 1)
        };
      }).filter(elem => elem.before !== elem.after);
    },
    canRemove() {
      // Disabled if you don't have enough unemployed workers
      if (this.name === 'immigration' && this.$store.getters['village/unemployed'] < (this.$store.getters['mult/get']('villageWorker') -
        this.$store.getters['mult/get']('villageWorker', 0, this.policy.effect[0].value(this.policy.value - 1) / this.policy.effect[0].value(this.policy.value))
      )) {
        return false;
      }
      return this.policy.value > (0 - this.policyLimit);
    },
    canAdd() {
      return this.policy.value < this.policyLimit;
    }
  },
  methods: {
    add() {
      this.$store.dispatch('village/addPolicy', this.name);
    },
    remove() {
      this.$store.dispatch('village/removePolicy', this.name);
    }
  }
}
</script>
