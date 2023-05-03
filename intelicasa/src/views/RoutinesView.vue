<template>
    <TitleComponent title="Routines" />
    <v-sheet color="secondary">
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
    </v-sheet>
    <RoutineDialog objectTitle="Add Routine" />
</template>

<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import RoutineCard from '@/components/RoutineCard.vue';
import RoutineDialog from '@/components/RoutineDialog.vue';
</script>


<style scoped>

.v-sheet {       
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