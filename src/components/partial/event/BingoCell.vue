<style scoped>
.bingo-card-cell {
  width: 72px;
  height: 72px;
  font-size: 24px;
}
.bingo-cell-mobile {
  width: 52px;
  height: 52px;
  font-size: 20px;
}
</style>

<template>
  <gb-tooltip :disabled="cell.prize === null" :title-text="$vuetify.lang.t(`$vuetify.event.casino.prize`)">
    <template v-slot:activator="{ on, attrs }">
      <div class="bg-tile-default rounded d-flex justify-center align-center bingo-card-cell mx-1 my-2" :class="{'success': drawn, 'bingo-cell-mobile': $vuetify.breakpoint.xsOnly}" v-bind="attrs" v-on="{...$listeners, ...on}">
        <v-badge :value="!drawn && cell.prize !== null" :color="cell.prize !== null && cell.isRare ? 'green' : 'grey'">
          <v-badge bottom :value="!drawn && cell.multiplier !== null" :content="`x${cell.multiplier}`">
            <div>{{ cell.value }}</div>
          </v-badge>
        </v-badge>
      </div>
    </template>
    <prize v-if="cell.prize !== null" :pool="cell.isRare ? 'bingo1' : 'bingo0'" :prizeBase="cell.prize"></prize>
  </gb-tooltip>
</template>

<script>
import Prize from './Prize.vue';

export default {
  components: { Prize },
  props: {
    cell: {
      type: Object,
      required: true
    },
    drawn: {
      type: Boolean,
      required: true
    }
  }
}
</script>
