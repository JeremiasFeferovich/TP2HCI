<template>
  <v-app id="main" :style="{ background: $vuetify.theme.themes['dark'].background }">
    <Navigation />
    <RouterView v-if="apiIsConnected" />
    <ErrorView v-else :errorMessage="errorMessage" :loading="true" />
  </v-app>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue'
import { RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import { DeviceApi } from "@/api/device.js"
import ErrorView from './views/ErrorView.vue'

const apiIsConnected = ref(false)
const errorMessage = ref('Conectando a la API')
const interval = ref(null)

window.addEventListener('api-connection-changed', (event) => {
  apiIsConnected.value = event.detail;
});

watch(apiIsConnected, (newValue) => {
  if (newValue) {
    clearInterval(interval)
  } else {
    checkApiConnection()
    interval.value = setInterval(checkApiConnection, 10000);
  }
}, { immediate: true })

async function checkApiConnection() {
  try {
    errorMessage.value = "Conectando a la API"
    DeviceApi.getAll();
  } catch (error) {
    errorMessage.value = "API error"
  }
}

</script>

<style>
.viewSheet {
  margin-top: 35px;
  border-radius: 10px;
  width: 75%;
  margin: 0 auto;
  padding: 25px 25px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}
</style>

<style scoped></style>