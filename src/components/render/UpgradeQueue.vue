<style scoped>
.queue-item {
  touch-action: none;
}
</style>

<template>
  <v-card class="d-flex flex-column justify-space-between ma-2" min-height="52">
    <div class="d-flex flex-wrap align-center pa-2" style="min-height: 48px;">
      <template v-if="queue.length > 0">
        <div
          class="queue-item"
          v-for="(item, key) in queue"
          :key="key"
          :id="`${ queueKeyName }-${ key }`"
          :draggable="!disabled"
          @dragstart="drag($event, queueLength - key)"
          @drop="drop($event, key)"
          @dragover="allowDrop"
          @touchstart="touchdrag(queueLength - key)"
          @touchend="touchdrop($event)"
        >
          <v-badge overlap bottom color="#1e1e1ec0" class="ma-1" :content="item.amount" :value="item.amount > 1">
            <v-icon v-if="upgrades[item.name].icon">{{ upgrades[item.name].icon }}</v-icon>
            <v-icon v-else>mdi-chevron-double-up</v-icon>
          </v-badge>
        </div>
        <v-spacer></v-spacer>
      </template>
      <div class="text-center flex-grow-1" v-else>{{ $vuetify.lang.t('$vuetify.upgrade.queueEmpty') }}</div>
      <gb-tooltip :title-text="$vuetify.lang.t(`$vuetify.mult.${ speedMultName }`)">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on"><v-icon>mdi-chevron-double-right</v-icon></div>
        </template>
        <stat-breakdown :name="speedMultName"></stat-breakdown>
      </gb-tooltip>
    </div>
    <v-progress-linear :value="queueProgress"></v-progress-linear>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { capitalize } from '../../js/utils/format';
import StatBreakdown from './StatBreakdown.vue';

export default {
  components: { StatBreakdown },
  props: {
    feature: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    touchId: null
  }),
  computed: {
    ...mapState({
      upgrades: state => state.upgrade.item
    }),
    queue() {
      let arr = [];

      this.$store.state.upgrade.queue[`${this.feature}_${this.type}`].forEach(elem => {
        if (arr.length > 0 && elem === arr[arr.length - 1].name) {
          arr[arr.length - 1].amount++;
        } else {
          arr.push({name: elem, amount: 1});
        }
      });

      return arr;
    },
    queueLength() {
      return this.queue.length - 1;
    },
    speedMultName() {
      return 'queueSpeed' + capitalize(this.feature) + capitalize(this.type);
    },
    queueKeyName() {
      return `queue-${ this.feature }-${ this.type }`;
    },
    queueProgress() {
      const upgradeName = this.$store.state.upgrade.queue[`${this.feature}_${this.type}`];
      if (upgradeName.length <= 0) {
        return 0;
      }
      const upgrade = this.$store.state.upgrade.item[upgradeName[0]];
      const queueSpeed = this.$store.getters['mult/get']('queueSpeed' + capitalize(upgrade.feature) + capitalize(upgrade.type));
      const timeNeededCurrent = Math.ceil((upgrade.timeNeeded(upgrade.level)) / queueSpeed);
      const timeLeftCurrent = Math.ceil((upgrade.timeNeeded(upgrade.level) - upgrade.timeProgress) / queueSpeed);
      return 100 * (1 - (timeLeftCurrent / timeNeededCurrent));
    }
  },
  methods: {
    drag(ev, id) {
      ev.dataTransfer.setData("text", id);
    },
    drop(ev, id) {
      ev.preventDefault();
      if (!this.disabled) {
        const draggedId = this.queueLength - parseInt(ev.dataTransfer.getData("text"));
        if (draggedId >= 0) {
          this.switchQueue(draggedId, id);
        }
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
        const draggedId = this.queueLength - this.touchId;
        this.touchId = null;
        if (!this.disabled) {
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
      }
    },
    switchQueue(startId, endId) {
      let queue = [...this.queue];
      const oldValue = queue[startId];
      queue[startId] = queue[endId];
      queue[endId] = oldValue;
      let newQueue = [];
      queue.forEach(elem => {
        for (let i = 0; i < elem.amount; i++) {
          newQueue.push(elem.name);
        }
      });
      this.$store.commit('upgrade/updateQueue', {key: `${this.feature}_${this.type}`, value: newQueue});
    }
  }
}
</script>
