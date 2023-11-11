<style scoped>
.theme--dark .current-note {
  border: 4px solid var(--v-blue-grey-darken4);
  background-color: var(--v-blue-grey-darken2) !important;
}
.theme--light .current-note {
  border: 4px solid var(--v-blue-grey-lighten4);
  background-color: var(--v-blue-grey-lighten2) !important;
}
.current-note-font {
  font-family: "Roboto Mono";
}
.note-terminal {
  position: absolute;
  top: 8px;
  left: 8px;
  opacity: 0.5;
}
.note-cogs {
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0.5;
}
</style>

<template>
  <v-card class="current-note">
    <v-card-title class="px-10 py-2 justify-center current-note-font" style="font-size: 150%;">{{ $vuetify.lang.t(`$vuetify.note.text.${ name }.title`) }}</v-card-title>
    <v-card-text class="pa-2">
      <div v-if="name === 'meta_7'" class="d-flex flex-wrap justify-space-between align-center ma-1">
        <currency class="ma-1" name="mining_scrap" hide-labels></currency>
        <price-tag class="ma-1" currency="mining_scrap" :amount="1337"></price-tag>
        <div>
          <gb-tooltip :min-width="0">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-1" small :color="toggle ? 'success' : 'error'" @click="toggleButton" v-bind="attrs" v-on="on">
                <v-icon>{{ toggle ? 'mdi-check' : 'mdi-close' }}</v-icon>
              </v-btn>
            </template>
            <div class="mt-0">{{ $vuetify.lang.t(`$vuetify.note.text.meta_7.buttonTooltip`) }}</div>
          </gb-tooltip>
        </div>
      </div>
      <div v-if="name === 'village_31'" class="d-flex flex-wrap ma-1">
        <div
          class="queue-item ma-1"
          v-for="(item, key) in queue"
          :key="key"
          :id="`${ queueKeyName }-${ key }`"
          draggable
          @dragstart="drag($event, key)"
          @drop="drop($event, key)"
          @dragover="allowDrop"
          @touchstart="touchdrag(key)"
          @touchend="touchdrop($event)"
        >
          <v-icon>{{ item }}</v-icon>
        </div>
      </div>
      <div class="bg-tile-background pa-2 rounded current-note-font" style="font-size: 125%;" :class="textClass">{{ $vuetify.lang.t(`$vuetify.note.text.${ name }.text`) }}</div>
    </v-card-text>
    <v-icon class="note-terminal">mdi-console-line</v-icon>
    <v-icon large class="note-cogs">mdi-cogs</v-icon>
  </v-card>
</template>

<script>
import Currency from './Currency.vue';
import PriceTag from './PriceTag.vue';

export default {
  components: { Currency, PriceTag },
  data: () => ({
    toggle: false,
    queue: ['mdi-star', 'mdi-food-apple', 'mdi-tunnel', 'mdi-home', 'mdi-tree'],
    touchId: null,
    queueKeyName: 'notetest'
  }),
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    textClass() {
      return 'blue-grey--text ' + (this.$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4');
    }
  },
  methods: {
    toggleButton() {
      this.toggle = !this.toggle;
    },
    drag(ev, id) {
      ev.dataTransfer.setData("text", id);
    },
    drop(ev, id) {
      ev.preventDefault();
      const draggedId = parseInt(ev.dataTransfer.getData("text"));
      if (draggedId >= 0) {
        this.switchQueue(draggedId, id);
      }
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    touchdrag(id) {
      this.touchId = id;
    },
    touchdrop(ev) {
      if (this.touchId !== null) {
        const draggedId = this.touchId;
        this.touchId = null;
        const elemList = document.elementsFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
        if (draggedId >= 0 && elemList) {
          const endElem = elemList.find(el => el.id.slice(0, this.queueKeyName.length) === this.queueKeyName);
          if (endElem) {
            const endIdSplit = endElem.id.split('-');
            const endId = parseInt(endIdSplit[endIdSplit.length - 1]);
            this.switchQueue(draggedId, endId);
          }
        }
      }
    },
    switchQueue(startId, endId) {
      const oldValue = this.queue[startId];
      this.$set(this.queue, startId, this.queue[endId]);
      this.$set(this.queue, endId, oldValue);
    }
  }
}
</script>
