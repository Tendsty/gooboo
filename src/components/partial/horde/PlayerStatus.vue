<style scoped>
.health-bar-icon {
  position: absolute;
  left: 4px;
  top: 4px;
}
</style>

<template>
  <v-card>
    <v-card-title class="pa-2 justify-center">{{ $vuetify.lang.t('$vuetify.horde.player') }}</v-card-title>
    <v-card-text class="pb-2">
      <gb-tooltip v-if="respawn > 0" :title-text="$vuetify.lang.t('$vuetify.mult.hordeRespawn')">
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear height="24" color="dark-grey" class="balloon-text-dynamic" :value="playerPercentRespawn" v-bind="attrs" v-on="on">
            <v-icon class="health-bar-icon" small>mdi-skull</v-icon>
            {{ $formatTime(respawn) }}
          </v-progress-linear>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.respawnDescription') }}</div>
        <stat-breakdown name="hordeRespawn" :base="baseRespawn"></stat-breakdown>
      </gb-tooltip>
      <gb-tooltip v-else :title-text="$vuetify.lang.t('$vuetify.mult.hordeHealth')">
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear height="24" color="green" class="balloon-text-dynamic" :value="playerPercentHealth" v-bind="attrs" v-on="on">
            <v-icon class="health-bar-icon" small>mdi-heart</v-icon>
            {{ $formatNum(playerStats.health) }} / {{ $formatNum(playerMaxHealth) }}
          </v-progress-linear>
        </template>
        <div>{{ $vuetify.lang.t('$vuetify.horde.healthDescription') }}</div>
        <stat-breakdown name="hordeHealth"></stat-breakdown>
      </gb-tooltip>
      <entity-status
        :is-player="true"
        :revive="playerStats.revive"
        :max-revive="playerRevive"
        :attack="playerAttack"
        :crit-chance="playerCritChance"
        :crit-mult="playerCritMult"
        :recovery="playerRecovery"
        :first-strike="playerFirstStrike"
        :spellblade="playerSpellblade"
        :cutting="playerCutting"
        :division-shield="playerStats.divisionShield"
        :max-division-shield="playerDivisionShield"
        :toxic="playerToxic"
        :stun="playerStats.stun"
        :poison="playerStats.poison"
        :physic-conversion="playerPhysicConversion"
        :physic-attack="playerPhysicAttack"
        :physic-taken="playerPhysicTaken"
        :magic-conversion="playerMagicConversion"
        :magic-attack="playerMagicAttack"
        :magic-taken="playerMagicTaken"
        :bio-conversion="playerBioConversion"
        :bio-attack="playerBioAttack"
        :bio-taken="playerBioTaken"
        :hits="playerStats.hits"
        :spells="playerStats.spells"
      ></entity-status>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import StatBreakdown from '../../render/StatBreakdown.vue';
import EntityStatus from './EntityStatus.vue';

export default {
  components: { StatBreakdown, EntityStatus },
  computed: {
    ...mapState({
      playerStats: state => state.horde.player,
      respawn: state => state.horde.respawn,
      maxRespawn: state => state.horde.maxRespawn
    }),
    ...mapGetters({
      baseRespawn: 'horde/baseRespawnTime'
    }),
    playerPercentHealth() {
      return 100 * this.playerStats.health / this.playerMaxHealth;
    },
    playerPercentRespawn() {
      return 100 * (1 - this.respawn / this.maxRespawn);
    },
    playerMaxHealth() {
      return this.$store.getters['mult/get']('hordeHealth');
    },
    playerAttack() {
      return this.$store.getters['mult/get']('hordeAttack');
    },
    playerRevive() {
      return this.$store.getters['mult/get']('hordeRevive');
    },
    playerCritChance() {
      return this.$store.getters['mult/get']('hordeCritChance');
    },
    playerCritMult() {
      return this.$store.getters['mult/get']('hordeCritMult');
    },
    playerToxic() {
      return this.$store.getters['mult/get']('hordeToxic');
    },
    playerRecovery() {
      return this.$store.getters['mult/get']('hordeRecovery');
    },
    playerFirstStrike() {
      return this.$store.getters['mult/get']('hordeFirstStrike');
    },
    playerSpellblade() {
      return this.$store.getters['mult/get']('hordeSpellblade');
    },
    playerCutting() {
      return this.$store.getters['mult/get']('hordeCutting');
    },
    playerDivisionShield() {
      return this.$store.getters['mult/get']('hordeDivisionShield');
    },
    playerPhysicConversion() {
      return this.$store.getters['mult/get']('hordePhysicConversion');
    },
    playerPhysicAttack() {
      return this.$store.getters['mult/get']('hordePhysicAttack');
    },
    playerPhysicTaken() {
      return this.$store.getters['mult/get']('hordePhysicTaken');
    },
    playerMagicConversion() {
      return this.$store.getters['mult/get']('hordeMagicConversion');
    },
    playerMagicAttack() {
      return this.$store.getters['mult/get']('hordeMagicAttack');
    },
    playerMagicTaken() {
      return this.$store.getters['mult/get']('hordeMagicTaken');
    },
    playerBioConversion() {
      return this.$store.getters['mult/get']('hordeBioConversion');
    },
    playerBioAttack() {
      return this.$store.getters['mult/get']('hordeBioAttack');
    },
    playerBioTaken() {
      return this.$store.getters['mult/get']('hordeBioTaken');
    }
  }
}
</script>
