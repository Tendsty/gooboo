<template>
  <div>
    <v-text-field class="ma-1" :label="$vuetify.lang.t(`$vuetify.horde.loadoutName`)" outlined hide-details v-model="loadoutName"></v-text-field>
    <v-select
      class="ma-1"
      :label="$vuetify.lang.t(`$vuetify.horde.items.name`)"
      multiple
      outlined
      hide-details
      item-value="name"
      :items="itemsList"
      v-model="contentList"
      clearable
    >
      <template v-slot:selection="{ item, index }">{{ index > 0 ? ', ' : '' }}{{ $vuetify.lang.t(`$vuetify.horde.items.${ item.name }`) }}</template>
      <template v-slot:item="{ item }"><equip-display :name="item.name"></equip-display></template>
    </v-select>
    <div class="d-flex flex-wrap justify-end">
      <v-btn v-if="contentList.length <= 0" color="primary" class="ma-1" @click="takeEquipped">
        {{ $vuetify.lang.t(`$vuetify.horde.items.takeEquipped`) }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="error" class="ma-1" @click="deleteLoadout">
        <v-icon class="mr-2">mdi-delete</v-icon>
        {{ $vuetify.lang.t(`$vuetify.gooboo.delete`) }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import EquipDisplay from './EquipDisplay.vue';

export default {
  components: { EquipDisplay },
  props: {
    name: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    loadoutName: null,
    contentList: []
  }),
  mounted() {
    this.loadoutName = this.$store.state.horde.loadout[this.name].name;
    this.contentList = [...this.$store.state.horde.loadout[this.name].content];
  },
  computed: {
    itemsList() {
      let arr = [];
      for (const [key, elem] of Object.entries(this.$store.getters['horde/itemsList'])) {
        arr.push({
          name: key,
          color: elem.activeColor
        });
      }
      return arr;
    }
  },
  methods: {
    deleteLoadout() {
      this.$store.commit('horde/deleteLoadout', this.name);
    },
    takeEquipped() {
      let equipped = [];
      for (const [key, elem] of Object.entries(this.$store.state.horde.items)) {
        if (elem.equipped) {
          equipped.push(key);
        }
      }
      this.contentList = equipped;
    }
  },
  watch: {
    loadoutName(newVal, oldVal) {
      if (oldVal !== null) {
        this.$store.commit('horde/updateLoadoutKey', {id: this.name, key: 'name', value: newVal});
      }
    },
    contentList(newVal, oldVal) {
      if (oldVal !== null) {
        this.$store.commit('horde/updateLoadoutKey', {id: this.name, key: 'content', value: newVal});
      }
    }
  }
}
</script>
