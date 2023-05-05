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