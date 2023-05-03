<template>
  <v-container fluid class="nav ma-0 pa-0 pl-10 pt-1" >
    <div class="nav-container">
      <router-link class="logo" :to="{ name: 'home' }"><v-img src="@/assets/logoIntelicasa.svg"></v-img></router-link>
      <v-container fluid class="nav-content ma-0 pa-0">
        <v-tabs v-model="tab" background-color="primary">
          <v-tab class="tab px-5" :to="{ name: 'home' }" value="home">Home</v-tab>
          <v-tab class="tab px-5" :to="{ name: 'rooms' }"  value="rooms">Rooms</v-tab>
          <v-tab class="tab px-5" :to="{ name: 'devices' }"  value="devices">Devices</v-tab>
          <v-tab class="tab px-5" :to="{ name: 'routines' }" value="routines">Routines</v-tab>
        </v-tabs> 
      </v-container>
    </div>
  </v-container>
</template>
  
<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const tab = ref('home');

</script>

<style scoped>

.nav{
  background-color: rgb(211, 211, 211);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
.nav-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-container{
  display: flex;
  justify-content: space-evenly;
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
