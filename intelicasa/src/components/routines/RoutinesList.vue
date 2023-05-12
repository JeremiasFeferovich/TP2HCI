<template>
    <v-row>
        <v-col v-for="(routine, index) in routineStore.routines.filter(routine => routine.meta.favorite)" 
        :key="index" cols="12" sm="6" lg="3">
            <HomeRoutineCard :routine="routine" />
        </v-col>
    </v-row>
</template>

<script setup>
    import { useRoutineStore } from '@/stores/routineStore'
    import HomeRoutineCard from '@/components/HomeRoutineCard.vue'

    const routineStore = useRoutineStore()
</script>
