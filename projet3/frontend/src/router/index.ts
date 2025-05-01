import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Vue d'accueil
import Chat from '../views/Chat.vue'; // Vue de chat

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ],
})

export default router;
