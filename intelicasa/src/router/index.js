import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'
import RoomsView from '@/views/RoomsView.vue'
import DevicesView from '@/views/DevicesView.vue'
import RoutinesView from '@/views/RoutinesView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name:'home', component: HomeView },
        { path: '/rooms', name: 'rooms', component: () => import('@/views/RoomsView.vue') },
        { path: '/devices', name: 'devices', component: () => import('@/views/DevicesView.vue') },
        { path: '/routines', name: 'routines', component: () => import('@/views/RoutinesView.vue') },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: HomeView }
    ]
});

export default router;