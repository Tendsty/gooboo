<template>
  <v-dialog :value="value" @input="$emit('input', $event)" max-width="600">
    <v-card>
      <v-card-title>{{ $vuetify.lang.t('$vuetify.remoteSave.title') }}</v-card-title>
      <v-card-text>
        <div class="mb-4">{{ $vuetify.lang.t('$vuetify.remoteSave.description') }}</div>
        <v-text-field
          v-model="url"
          :label="$vuetify.lang.t('$vuetify.remoteSave.url')"
          placeholder="https://example.com/gooboo/save"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="token"
          :label="$vuetify.lang.t('$vuetify.remoteSave.token')"
          :append-icon="showToken ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showToken ? 'text' : 'password'"
          @click:append="showToken = !showToken"
          outlined
        ></v-text-field>
        <div class="text-caption">{{ $vuetify.lang.t('$vuetify.remoteSave.endpointHint') }}</div>
        <v-alert v-if="error" class="mt-4 mb-0" type="error" dense>{{ error }}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="configured && mode !== 'restore'" text color="error" @click="disable">
          {{ $vuetify.lang.t('$vuetify.remoteSave.disable') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="close">{{ $vuetify.lang.t('$vuetify.gooboo.cancel') }}</v-btn>
        <v-btn color="primary" :loading="loading" @click="submit">
          {{ $vuetify.lang.t(mode === 'restore' ? '$vuetify.remoteSave.restore' : '$vuetify.remoteSave.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { clearRemoteConfig, getRemoteConfig, isRemoteConfigured, restoreRemoteSave, setRemoteConfig } from '../../js/remoteSave';

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      default: 'configure'
    }
  },
  data: () => ({
    url: '',
    token: '',
    showToken: false,
    loading: false,
    error: '',
    configured: false
  }),
  watch: {
    value(newVal) {
      if (newVal) {
        this.loadConfig();
      }
    }
  },
  mounted() {
    this.loadConfig();
  },
  methods: {
    loadConfig() {
      const config = getRemoteConfig();
      this.url = config.url;
      this.token = config.token;
      this.configured = isRemoteConfigured();
      this.error = '';
    },
    close() {
      this.$emit('input', false);
    },
    validateUrl() {
      try {
        const parsed = new URL(this.url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    },
    disable() {
      clearRemoteConfig();
      this.configured = false;
      this.$emit('changed');
      this.close();
    },
    async submit() {
      if (!this.validateUrl()) {
        this.error = this.$vuetify.lang.t('$vuetify.remoteSave.invalidUrl');
        return;
      }

      setRemoteConfig(this.url, this.token);
      this.configured = true;
      this.$emit('changed');

      if (this.mode !== 'restore') {
        this.close();
        return;
      }

      this.loading = true;
      this.error = '';
      try {
        const result = await restoreRemoteSave();
        if (result.status === 'empty') {
          this.error = this.$vuetify.lang.t('$vuetify.remoteSave.empty');
        } else if (result.status === 'version-mismatch') {
          this.error = this.$vuetify.lang.t('$vuetify.remoteSave.versionMismatch', result.version);
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
