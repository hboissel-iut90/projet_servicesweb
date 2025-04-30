<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-container class="d-flex align-center">
        <v-btn
            text
            @click="goTo('/')"
        >
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </v-btn>
      </v-container>

      <v-spacer></v-spacer>

      <v-container>
        <v-btn
            v-if="!this.auth"
            @click="goTo('/signup')"
            target="_blank"
            text
        >
          <span class="mr-2">Créer profil</span>
        </v-btn>
        <v-btn
            v-if="!this.auth"
            @click="goTo('/login')"
            target="_blank"
            text
        >
          <span class="mr-2">Connexion</span>
        </v-btn>
        <v-btn
            v-else
            @click="logout"
            target="_blank"
            text
        >
          <span class="mr-2">Déconnexion</span>
        </v-btn>
      </v-container>

    </v-app-bar>
    <v-main>
      <v-container>
        <v-container v-if="show">
          <v-card-title
              v-if="isError"
              style="color: red"
          >
            {{ message }}
          </v-card-title>
          <v-card-title
              v-else
          >
            {{ message }}
          </v-card-title>
        </v-container>
      </v-container>
      <router-view name="central"/>
    </v-main>
  </v-app>
</template>


<script>

import {mapActions, mapState} from "vuex";

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapState(['auth', 'isError', 'message', 'show'])
  },
  methods: {
    ...mapActions(['logout', 'showDialog']),
    goTo(route){
      if (this.$route.fullPath !== route) {
        this.$router.push(route);
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
