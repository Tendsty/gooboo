<template>
  <v-card class="pa-1 pl-2">
    <v-row no-gutters>
      <v-col cols="4" class="d-flex align-center">
        <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.gooboo.gain`)">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{ $vuetify.lang.t(`$vuetify.village.job.${name}`) }}</span>
          </template>
          <display-row class="mt-0" v-for="(item, key) in job.rewards" :key="'text-' + key" :name="item.name" :type="item.type" :after="item.amount"></display-row>
        </gb-tooltip>
      </v-col>
      <v-col cols="8" class="d-flex justify-space-between align-center">
        <v-btn
          :disabled="!canRemove || disabled"
          class="ma-1 pa-1"
          :data-cy="`village-job-${ name }-remove-all`"
          :small="$vuetify.breakpoint.smAndUp"
          :x-small="$vuetify.breakpoint.xsOnly"
          color="error"
          :min-height="minButtonSize"
          :min-width="minButtonSize"
          @click="removeMax"
        ><v-icon :small="$vuetify.breakpoint.xsOnly">mdi-minus-thick</v-icon></v-btn>
        <v-btn
          :disabled="!canRemove || disabled"
          class="ma-1 pa-1"
          :data-cy="`village-job-${ name }-remove`"
          :small="$vuetify.breakpoint.smAndUp"
          :x-small="$vuetify.breakpoint.xsOnly"
          color="error"
          :min-height="minButtonSize"
          :min-width="minButtonSize"
          @click="remove"
        ><v-icon :small="$vuetify.breakpoint.xsOnly">mdi-minus</v-icon></v-btn>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <span>{{ $formatNum(job.amount) }}</span>
          <span>{{ job.max !== null ? ('&nbsp;/ ' + $formatNum(job.max)) : '' }}</span>
          <v-chip class="ml-2 px-2" small v-if="job.needed > 1">x{{ job.needed }}</v-chip>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!canAdd || disabled"
          class="ma-1 pa-1"
          :data-cy="`village-job-${ name }-add`"
          :small="$vuetify.breakpoint.smAndUp"
          :x-small="$vuetify.breakpoint.xsOnly"
          color="success"
          :min-height="minButtonSize"
          :min-width="minButtonSize"
          @click="add"
        ><v-icon :small="$vuetify.breakpoint.xsOnly">mdi-plus</v-icon></v-btn>
        <v-btn
          :disabled="!canAdd || disabled"
          class="ma-1 pa-1"
          :data-cy="`village-job-${ name }-add-all`"
          :small="$vuetify.breakpoint.smAndUp"
          :x-small="$vuetify.breakpoint.xsOnly"
          color="success"
          :min-height="minButtonSize"
          :min-width="minButtonSize"
          @click="addMax"
        ><v-icon :small="$vuetify.breakpoint.xsOnly">mdi-plus-thick</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      unemployed: 'village/unemployed'
    }),
    job() {
      return this.$store.state.village.job[this.name];
    },
    canAdd() {
      return this.unemployed >= this.job.needed && (this.job.max === null || this.job.amount < this.job.max);
    },
    canRemove() {
      return this.job.amount > 0;
    },
    minButtonSize() {
      return this.$vuetify.breakpoint.smAndUp ? 32 : 24;
    }
  },
  methods: {
    add() {
      this.$store.dispatch('village/addWorker', this.name);
      this.$store.commit('system/updateTutorialKey', {name: 'villageJob', key: 'completed', value: true});
    },
    addMax() {
      this.$store.dispatch('village/addMaxWorker', this.name);
      this.$store.commit('system/updateTutorialKey', {name: 'villageJob', key: 'completed', value: true});
    },
    remove() {
      this.$store.dispatch('village/removeWorker', this.name);
    },
    removeMax() {
      this.$store.dispatch('village/removeMaxWorker', this.name);
    }
  }
}
</script>
