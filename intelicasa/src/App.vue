<script setup>
import Navigation from '@/components/Navigation.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app id="main" :style="{ background: $vuetify.theme.themes['dark'].background }">
    <Navigation />
    <RouterView />
  </v-app>
</template>



