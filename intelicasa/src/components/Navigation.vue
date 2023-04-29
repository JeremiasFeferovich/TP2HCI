<template>
    <div id="nav">
      <div class="nav-content">
        <div class="logo">
          <RouterLink :to="{ name: 'home' }">Intelicasa</RouterLink>
        </div>
        <ul class="nav-links">
          <li class="links">
            <RouterLink :to="{ name: 'home' }">Home</RouterLink>
          </li>
          <li class="links">
            <RouterLink :to="{ name: 'rooms' }">Rooms</RouterLink>
          </li>
          <li class="links">
            <RouterLink :to="{ name: 'devices' }">Devices</RouterLink>
          </li>
          <li class="links">
            <RouterLink :to="{ name: 'routines' }">Routines</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  </script>
  
  <style scoped>
  #nav {
    background-color: rgb(154, 154, 154);
    border-bottom: 1px solid #ddd;
  }
  
  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 80px;
  }
  
  .logo {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
  }
  
  .logo a {
    color: #333;
    text-decoration: none;
  }
  
  .nav-links {
    display: flex;
    justify-content: cener;
    align-items: center;
  }
  
  .links {
    margin-left: 20px;
    list-style: none;
    font-size: 24px;
  }
  
  .links a {
    color: #333;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    padding: 25px;
  }
  
  .links a:hover {
    text-decoration: underline;
  }

</style>
  