<template>
    <TitleComponent title="Routines"/>
    <v-container fluid class="d-flex flex-column justify-center " style="width: 50%;">        
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
        <RoutineCard />
    </v-container>
    
</template>

<script setup>
    import TitleComponent from '@/components/TitleComponent.vue';
    import RoutineCard from '@/components/RoutineCard.vue';
</script>
