<template>
  <v-card color="transparent" flat>
    <v-card-title class="pa-0 justify-center align-center">{{ $vuetify.lang.t(`$vuetify.message.card.get`) }}</v-card-title>
    <v-card-text class="pa-0">
      <div v-for="(item, key) in message.value" :key="key">
        <span>{{ item.amount }}x {{ key }}: {{ $vuetify.lang.t(`$vuetify.card.card.${key}`) }}</span>
        <span v-if="item.isNew">&nbsp;({{ $vuetify.lang.t(`$vuetify.message.card.new`) }})</span>
        <span v-if="item.effect">&nbsp;(<template v-for="(subitem, subkey, subindex) in item.effect">
          <span :key="key + '-' + subkey + '-comma'" v-if="subindex">,&nbsp;</span>
          <card-pack-instant-effect :key="key + '-' + subkey + '-effect'" :name="subkey" :value="subitem"></card-pack-instant-effect>
        </template>)</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import CardPackInstantEffect from './CardPackInstantEffect.vue';

export default {
  components: { CardPackInstantEffect },
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
