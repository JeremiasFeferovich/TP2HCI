<template>
  <v-sheet class="nav-container py-2" color="primary">
    <router-link class="logo" :to="{ name: 'home' }"><v-img src="@/assets/logoIntelicasa.svg"></v-img></router-link>
    <v-container fluid class="nav-content ma-0 pa-0">
      <v-tabs v-model="tab" background-color="primary">
        <v-tab class="tab px-5" :to="{ name: 'home' }" value="home">Inicio</v-tab>
        <v-tab class="tab px-5" :to="{ name: 'rooms' }" value="rooms">Habitaciones</v-tab>
        <v-tab class="tab px-5" :to="{ name: 'devices' }" value="devices">Dispositivos</v-tab>
        <v-tab class="tab px-5" :to="{ name: 'routines' }" value="routines">Rutinas</v-tab>
      </v-tabs>
    </v-container>
  </v-sheet>
</template>
  
<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const tab = ref('home');

</script>

<style scoped>
.nav-content {
  display: flex;
  justify-content: start;
  align-items: center;
}

.nav-container {
  width: 100%;
  display: flex;
  justify-content: start;
}

.logo {
  height: 75px;
  width: 500px;
  color: #333;
  display: flex;
  align-items: center;
}

.tabs {
  align-self: center;

}

.tab {
  font-size: 20px;
  text-decoration: none;
  color: #333;
  align-items: center;
  padding: 0 10px;
}
</style>
