<template>
  <v-app>
    <v-main>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Chat App</v-toolbar-title>
        <v-spacer />
        <v-btn text @click="logout">Déconnexion</v-btn>
      </v-app-bar>
      <v-container
        fluid
        class="pa-0 fill-height d-flex flex-column overflow-hidden"
        style="height: 100%;"
      >

        <!-- Liste des messages (scrollable) -->
        <v-list
          class="flex-grow-1 overflow-auto px-2 w-100"
          style="max-height: calc(100vh - 70px - 66px);"
        >

          <v-list-item
            v-for="(message, index) in messages"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-lighten-3' : ''"
          >
            <v-list-item-title>{{ message }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <!-- Barre de saisie en bas -->
        <v-sheet
          class="d-flex align-center pa-2 w-100"
          color="grey-lighten-4"
          elevation="3"
        >
          <v-text-field
            v-model="newMessage"
            placeholder="Type a message"
            hide-details
            variant="solo"
            class="flex-grow-1 mr-2"
            style="border-radius: 2rem;"
            autocomplete="off"
            @keyup.enter="sendMessage"
          />
          <v-btn
            color="primary"
            @click="sendMessage"
            style="border-radius: 2rem;"
          >
            Send
          </v-btn>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Chat',
  setup() {
    const messages = ref<string[]>([]);
    const newMessage = ref<string>('');
    let socket: Socket;

    onMounted(async () => {
      await fetchCurrentUser();
      socket = io('http://localhost:5000');

      socket.on('connect', () => {
        console.log('Connected to server');
        socket.emit('load-messages'); // Demander l'historique au backend
      });

      // Écouter les nouveaux messages
      socket.on('new-message', (msg) => {
        messages.value.push(`${msg.sender?.displayName || 'Anonyme'}: ${msg.content}`);
        scrollToBottom();
      });

      await loadMessages(); // Charger les messages au début
    });

    onUnmounted(() => {
      if (socket) {
        socket.disconnect();
      }
    });

    const sendMessage = async () => {
      if (!newMessage.value.trim()) return;

      try {
        const res = await fetch('http://localhost:5000/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ content: newMessage.value }),
        });

        const msg = await res.json();
        newMessage.value = ''; // Réinitialiser le champ de message

        // Émettre le message au backend via Socket.IO pour notifier les autres clients
        socket.emit('chat-message', msg);

        scrollToBottom();
      } catch (err) {
        console.error('Erreur d’envoi du message', err);
      }
    };


    const currentUser = ref(null);

    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/current_user', {
          credentials: 'include', // Crucial pour envoyer les cookies
        });
        const user = await res.json();
        console.log('Utilisateur connecté:', user);
        currentUser.value = user;
      } catch (err) {
        console.error('Erreur lors de la récupération de l’utilisateur', err);
      }
    };

    const loadMessages = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/messages', {
          credentials: 'include',
        });
        const data = await res.json();
        messages.value = data.map((msg: { sender: { displayName: string }; content: string }) => `${msg.sender?.displayName || 'Anonyme'}: ${msg.content}`);
        scrollToBottom();
      } catch (err) {
        console.error('Erreur de chargement des messages', err);
      }
    };

    const scrollToBottom = () => {
      setTimeout(() => {
        const list = document.querySelector('.v-list');
        if (list) list.scrollTop = list.scrollHeight;
      }, 50);
    };

    const logout = async () => {
      try {
        const res = await fetch('http://localhost:5000/auth/logout', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          window.location.href = '/'; // Rediriger vers l'accueil ou page de login
        } else {
          alert('Erreur lors de la déconnexion');
        }
      } catch (err) {
        console.error('Erreur lors de la déconnexion', err);
      }
    };

    return {
      messages,
      newMessage,
      sendMessage,
      logout
    };
  }
});
</script>

<style scoped>
.v-container::-webkit-scrollbar {
  display: none; /* Cache la scrollbar */
}
</style>
