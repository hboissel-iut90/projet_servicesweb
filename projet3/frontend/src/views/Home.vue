<template>
  <v-app>
    <v-main>
      <v-app-bar color="primary" dark>
        <v-toolbar-title>Chat App</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="text-subtitle-2 font-weight-light mr-4">
          Nathan PONTHIEU & Harry BOISSELOT
        </div>
      </v-app-bar>

      <v-container class="d-flex justify-center align-center fill-height">
        <v-card class="pa-4" max-width="400" elevation="3">
          <v-card-title class="text-center">
            {{ isLoginMode ? 'Connexion' : 'Inscription' }} au Chat
          </v-card-title>

          <v-form @submit.prevent="isLoginMode ? handleLocalLogin() : handleLocalRegister()">
            <v-text-field
              v-if="!isLoginMode"
              v-model="displayName"
              label="Nom complet"
              required
              class="mb-3"
            />

            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              class="mb-3"
            />
            <v-text-field
              v-model="password"
              label="Mot de passe"
              type="password"
              required
              class="mb-3"
            />

            <v-btn color="primary" type="submit" block class="mb-3">
              {{ isLoginMode ? 'Connexion' : 'Inscription' }} avec Email
            </v-btn>
          </v-form>

          <v-btn text @click="isLoginMode = !isLoginMode" class="mb-3">
            {{ isLoginMode ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter" }}
          </v-btn>

          <v-divider class="my-3" />

          <v-btn color="red" prepend-icon="mdi-google" class="mb-3" @click="loginWithGoogle">
            Connexion avec Google
          </v-btn>

          <v-btn color="grey" prepend-icon="mdi-github" class="mb-3" @click="loginWithGithub">
            Connexion avec GitHub
          </v-btn>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  setup() {
    const email = ref('');
    const password = ref('');
    const displayName = ref('');
    const isLoginMode = ref(true);

    const handleLocalLogin = async () => {
      try {
        const res = await fetch('http://localhost:5000/auth/local', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: email.value,
            password: password.value
          }),
        });

        if (res.ok) {
          window.location.href = '/chat';
        } else {
          const err = await res.json();
          alert('Erreur : ' + (err.message || 'Connexion échouée'));
        }
      } catch (err) {
        console.error(err);
        alert('Erreur lors de la tentative de connexion');
      }
    };

    const handleLocalRegister = async () => {
      try {
        const res = await fetch('http://localhost:5000/auth/local/register', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: email.value,
            password: password.value,
            displayName: displayName.value
          }),
        });

        if (res.ok) {
          window.location.href = '/chat';
        } else {
          const err = await res.json();
          alert('Erreur : ' + (err.message || 'Inscription échouée'));
        }
      } catch (err) {
        console.error(err);
        alert('Erreur lors de la tentative d’inscription');
      }
    };

    const loginWithGoogle = () => {
      window.location.href = 'http://localhost:5000/auth/google';
    };

    const loginWithGithub = () => {
      window.location.href = 'http://localhost:5000/auth/github';
    };

    return {
      email,
      password,
      displayName,
      isLoginMode,
      handleLocalLogin,
      handleLocalRegister,
      loginWithGoogle,
      loginWithGithub
    };
  }
});
</script>
