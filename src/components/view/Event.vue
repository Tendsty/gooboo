<template>
  <div v-if="$vuetify.breakpoint.xlOnly">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#calendar"><tab-icon-text :text="$vuetify.lang.t('$vuetify.event.calendar')" icon="mdi-calendar"></tab-icon-text></v-tab>
      <v-tab href="#rewards" v-if="eventReward"><tab-icon-text :text="$vuetify.lang.t('$vuetify.event.rewards')" icon="mdi-store"></tab-icon-text></v-tab>
      <v-tab :href="`#${currentEvent}`" v-if="currentEvent !== null"><tab-icon-text :text="$vuetify.lang.t(`$vuetify.event.${currentEvent}.name`)" :icon="eventIcon[currentEvent]"></tab-icon-text></v-tab>
      <v-tab href="#summerFestivalUpgrades" v-if="currentEvent === 'summerFestival'"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
    </v-tabs>
    <div class="scroll-container-tab pa-2" v-if="tab === 'calendar'">
      <event-calendar></event-calendar>
    </div>
    <shop-list class="scroll-container-tab pa-2" :cols="3" :pool="eventReward" v-else-if="tab === 'rewards' && eventReward"></shop-list>
    <shop-list class="scroll-container-tab pa-2" :cols="3" pool="merchant" v-else-if="tab === 'merchant'"></shop-list>
    <bank class="scroll-container-tab pa-2" v-else-if="tab === 'bank'"></bank>
    <casino class="scroll-container-tab pa-2" v-else-if="tab === 'casino'"></casino>
    <v-row v-else-if="tab === 'cinders'" no-gutters>
      <v-col class="scroll-container-tab" cols="9">
        <cinders-inventory></cinders-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="event" type="cinders" key="event-cinders"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'bloom'" no-gutters>
      <v-col class="scroll-container-tab" cols="9">
        <bloom-inventory></bloom-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="event" type="bloom" key="event-bloom"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'weatherChaos'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <weather-chaos-status></weather-chaos-status>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <weather-chaos-inventory></weather-chaos-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="event" type="weatherChaos" key="event-weatherChaos"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'summerFestival'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <summer-festival-island></summer-festival-island>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <summer-festival-inventory></summer-festival-inventory>
      </v-col>
    </v-row>
    <upgrade-list v-else-if="tab === 'summerFestivalUpgrades'" class="scroll-container-tab" feature="event" type="summerFestival" key="event-summerFestival"></upgrade-list>
    <v-row v-else-if="tab === 'nightHunt'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <night-hunt-inventory></night-hunt-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <night-hunt-potion-list></night-hunt-potion-list>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="event" type="nightHunt" key="event-nightHunt"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'snowdown'" no-gutters>
      <v-col class="scroll-container-tab" cols="3">
        <snowdown-item-list></snowdown-item-list>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <snowdown-inventory></snowdown-inventory>
        <snowball-fight class="mt-8"></snowball-fight>
      </v-col>
      <v-col class="scroll-container-tab" cols="3">
        <upgrade-list feature="event" type="snowdown" key="event-snowdown"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else-if="$vuetify.breakpoint.mdAndUp">
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab href="#calendar"><tab-icon-text :text="$vuetify.lang.t('$vuetify.event.calendar')" icon="mdi-calendar"></tab-icon-text></v-tab>
      <v-tab href="#rewards" v-if="eventReward"><tab-icon-text :text="$vuetify.lang.t('$vuetify.event.rewards')" icon="mdi-store"></tab-icon-text></v-tab>
      <v-tab :href="`#${currentEvent}`" v-if="currentEvent !== null"><tab-icon-text :text="$vuetify.lang.t(`$vuetify.event.${currentEvent}.name`)" :icon="eventIcon[currentEvent]"></tab-icon-text></v-tab>
      <v-tab href="#weatherChaosInventory" v-if="currentEvent === 'weatherChaos'"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
      <v-tab href="#summerFestivalInventory" v-if="currentEvent === 'summerFestival'"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
      <v-tab href="#summerFestivalUpgrades" v-if="currentEvent === 'summerFestival'"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#nightHuntUpgrades" v-if="currentEvent === 'nightHunt'"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#snowdownInventory" v-if="currentEvent === 'snowdown'"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
    </v-tabs>
    <div class="scroll-container-tab pa-2" v-if="tab === 'calendar'">
      <event-calendar></event-calendar>
    </div>
    <shop-list class="scroll-container-tab pa-2" :cols="6" :pool="eventReward" v-else-if="tab === 'rewards' && eventReward"></shop-list>
    <shop-list class="scroll-container-tab pa-2" :cols="6" pool="merchant" v-else-if="tab === 'merchant'"></shop-list>
    <bank class="scroll-container-tab pa-2" v-else-if="tab === 'bank'"></bank>
    <casino class="scroll-container-tab pa-2" v-else-if="tab === 'casino'"></casino>
    <v-row v-else-if="tab === 'cinders'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <cinders-inventory></cinders-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="event" type="cinders" key="event-cinders"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'bloom'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <bloom-inventory></bloom-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="event" type="bloom" key="event-bloom"></upgrade-list>
      </v-col>
    </v-row>
    <weather-chaos-status v-else-if="tab === 'weatherChaos'" class="scroll-container-tab"></weather-chaos-status>
    <v-row v-else-if="tab === 'weatherChaosInventory'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <weather-chaos-inventory></weather-chaos-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="event" type="weatherChaos" key="event-weatherChaos"></upgrade-list>
      </v-col>
    </v-row>
    <summer-festival-island v-else-if="tab === 'summerFestival'" class="scroll-container-tab"></summer-festival-island>
    <summer-festival-inventory v-else-if="tab === 'summerFestivalInventory'" class="scroll-container-tab"></summer-festival-inventory>
    <upgrade-list v-else-if="tab === 'summerFestivalUpgrades'" class="scroll-container-tab" feature="event" type="summerFestival" key="event-summerFestival"></upgrade-list>
    <night-hunt-inventory v-else-if="tab === 'nightHunt'" class="scroll-container-tab"></night-hunt-inventory>
    <v-row v-else-if="tab === 'nightHuntUpgrades'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <night-hunt-potion-list></night-hunt-potion-list>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="event" type="nightHunt" key="event-nightHunt"></upgrade-list>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'snowdown'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <snowdown-item-list></snowdown-item-list>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <snowball-fight></snowball-fight>
      </v-col>
    </v-row>
    <v-row v-else-if="tab === 'snowdownInventory'" no-gutters>
      <v-col class="scroll-container-tab" cols="6">
        <snowdown-inventory></snowdown-inventory>
      </v-col>
      <v-col class="scroll-container-tab" cols="6">
        <upgrade-list feature="event" type="snowdown" key="event-snowdown"></upgrade-list>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-tabs class="mobile-tabs" v-model="tab" grow show-arrows>
      <v-tab href="#calendar"><tab-icon-text :text="$vuetify.lang.t('$vuetify.event.calendar')" icon="mdi-calendar"></tab-icon-text></v-tab>
      <v-tab href="#rewards" v-if="eventReward"><tab-icon-text :text="$vuetify.lang.t('$vuetify.event.rewards')" icon="mdi-store"></tab-icon-text></v-tab>
      <v-tab :href="`#${currentEvent}`" v-if="currentEvent !== null"><tab-icon-text :text="$vuetify.lang.t(`$vuetify.event.${currentEvent}.name`)" :icon="eventIcon[currentEvent]"></tab-icon-text></v-tab>
      <v-tab href="#cindersUpgrades" v-if="currentEvent === 'cinders'"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#bloomUpgrades" v-if="currentEvent === 'bloom'"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#weatherChaosInventory" v-if="currentEvent === 'weatherChaos'"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
      <v-tab href="#weatherChaosUpgrades" v-if="currentEvent === 'weatherChaos'"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#summerFestivalInventory" v-if="currentEvent === 'summerFestival'"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
      <v-tab href="#summerFestivalUpgrades" v-if="currentEvent === 'summerFestival'"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#nightHuntPotions" v-if="currentEvent === 'nightHunt'"><tab-icon-text :text="$vuetify.lang.t('$vuetify.event.nightHunt.potions')" icon="mdi-flask-round-bottom"></tab-icon-text></v-tab>
      <v-tab href="#nightHuntUpgrades" v-if="currentEvent === 'nightHunt'"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
      <v-tab href="#snowdownInventory" v-if="currentEvent === 'snowdown'"><tab-icon-text name="inventory"></tab-icon-text></v-tab>
      <v-tab href="#snowdownUpgrades" v-if="currentEvent === 'snowdown'"><tab-icon-text name="upgrades"></tab-icon-text></v-tab>
    </v-tabs>
    <div v-if="tab === 'calendar'" class="pa-2">
      <event-calendar></event-calendar>
    </div>
    <shop-list class="pa-2" :pool="eventReward" v-else-if="tab === 'rewards' && eventReward"></shop-list>
    <shop-list class="pa-2" pool="merchant" v-else-if="tab === 'merchant'"></shop-list>
    <bank class="pa-2" v-else-if="tab === 'bank'"></bank>
    <casino class="pa-2" v-else-if="tab === 'casino'"></casino>
    <cinders-inventory v-else-if="tab === 'cinders'"></cinders-inventory>
    <upgrade-list v-else-if="tab === 'cindersUpgrades'" feature="event" type="cinders" key="event-cinders"></upgrade-list>
    <bloom-inventory v-else-if="tab === 'bloom'"></bloom-inventory>
    <upgrade-list v-else-if="tab === 'bloomUpgrades'" feature="event" type="bloom" key="event-bloom"></upgrade-list>
    <weather-chaos-status v-else-if="tab === 'weatherChaos'"></weather-chaos-status>
    <weather-chaos-inventory v-else-if="tab === 'weatherChaosInventory'"></weather-chaos-inventory>
    <upgrade-list v-else-if="tab === 'weatherChaosUpgrades'" feature="event" type="weatherChaos" key="event-weatherChaos"></upgrade-list>
    <summer-festival-island v-else-if="tab === 'summerFestival'"></summer-festival-island>
    <summer-festival-inventory v-else-if="tab === 'summerFestivalInventory'"></summer-festival-inventory>
    <upgrade-list v-else-if="tab === 'summerFestivalUpgrades'" feature="event" type="summerFestival" key="event-summerFestival"></upgrade-list>
    <night-hunt-inventory v-else-if="tab === 'nightHunt'"></night-hunt-inventory>
    <night-hunt-potion-list v-else-if="tab === 'nightHuntPotions'"></night-hunt-potion-list>
    <upgrade-list v-else-if="tab === 'nightHuntUpgrades'" feature="event" type="nightHunt" key="event-nightHunt"></upgrade-list>
    <snowball-fight v-else-if="tab === 'snowdown'"></snowball-fight>
    <div v-else-if="tab === 'snowdownInventory'">
      <snowdown-inventory></snowdown-inventory>
      <snowdown-item-list class="mt-8"></snowdown-item-list>
    </div>
    <upgrade-list v-else-if="tab === 'snowdownUpgrades'" feature="event" type="snowdown" key="event-snowdown"></upgrade-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Bank from '../partial/event/Bank.vue';
import BloomInventory from '../partial/event/BloomInventory.vue';
import Casino from '../partial/event/Casino.vue';
import CindersInventory from '../partial/event/CindersInventory.vue';
import EventCalendar from '../partial/event/EventCalendar.vue';
import NightHuntInventory from '../partial/event/NightHuntInventory.vue';
import NightHuntPotionList from '../partial/event/NightHuntPotionList.vue';
import ShopList from '../partial/event/ShopList.vue';
import SnowballFight from '../partial/event/SnowballFight.vue';
import SnowdownInventory from '../partial/event/SnowdownInventory.vue';
import SnowdownItemList from '../partial/event/SnowdownItemList.vue';
import SummerFestivalInventory from '../partial/event/SummerFestivalInventory.vue';
import SummerFestivalIsland from '../partial/event/SummerFestivalIsland.vue';
import WeatherChaosInventory from '../partial/event/WeatherChaosInventory.vue';
import WeatherChaosStatus from '../partial/event/WeatherChaosStatus.vue';
import TabIconText from '../partial/render/TabIconText.vue';
import UpgradeList from '../render/UpgradeList.vue';

export default {
  components: { EventCalendar, SnowdownItemList, SnowdownInventory, SnowballFight, UpgradeList, ShopList, Bank, Casino, CindersInventory, BloomInventory, TabIconText, NightHuntInventory, NightHuntPotionList, SummerFestivalInventory, SummerFestivalIsland, WeatherChaosInventory, WeatherChaosStatus },
  data: () => ({
    tab: 'calendar',
    eventIcon: {
      merchant: 'mdi-account-tie',
      casino: 'mdi-slot-machine',
      bank: 'mdi-bank',
      cinders: 'mdi-lightbulb-on',
      bloom: 'mdi-flower-poppy',
      weatherChaos: 'mdi-weather-lightning-rainy',
      summerFestival: 'mdi-island',
      nightHunt: 'mdi-weather-night',
      snowdown: 'mdi-snowflake'
    }
  }),
  computed: {
    ...mapGetters({
      currentEvent: 'event/currentEvent',
      eventReward: 'event/eventReward'
    })
  }
}
</script>
