<template>
  <div>
    <v-card-title>
      <i>Projet créé par Nathan Ponthieu et Harry Boisselot.</i>
    </v-card-title>
    <v-card v-if="auth">
      <v-container>
        <v-card-title>
          Bienvenue.
        </v-card-title>
      </v-container>
    </v-card>
    <v-card v-else>
      <v-container>
        <v-card-title>
          Bienvenue sur le site du passport. Veuillez vous connecter.
        </v-card-title>
      </v-container>
      <v-container>
        <v-btn
            @click="goTo('/login')">
          Connexion
        </v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'HomeView',
    components: {
    },
    computed: {
      ...mapState(['auth'])
    },
    methods: {
      ...mapActions(['isConnected']),
      goTo(route){
        if (this.$route.fullPath !== route) {
          this.$router.push(route);
        }
      }
    },
    mounted() {
        this.isConnected();
    }
}
</script>
