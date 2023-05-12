<template>
  <v-dialog v-model="dialog" width="1024">
    <template v-slot:activator="{ props }">
      <AddBtn :activator="props" />
    </template>
    <AddRoomInfo @close-dialog="dialog = false" />
  </v-dialog>
</template>
  
<script setup>
import { ref } from 'vue'
import AddRoomInfo from './AddRoomInfo.vue'
import AddBtn from '../AddBtn.vue'

const dialog = ref(false)

</script>


<style scoped>
.fill-space {
  max-width: 60%;
}

.plus-btn {
  justify-content: center;
  margin-bottom: 40px;
}

.categoryImg {
  height: 75px;
  width: 75px;
  padding: 5px 0;
}
</style>