<template>
  <v-container>
    <v-card>
      <v-card-title>Créé votre profil en entrant votre prénom, nom, adresse mail ainsi qu'un mot de passe.</v-card-title>

      <v-card-text>
        <v-text-field v-model="fname" label="Prénom"></v-text-field>
        <v-text-field v-model="lname" label="Nom"></v-text-field>
        <v-text-field v-model="mail" label="Email"></v-text-field>
        <v-text-field type="password" v-model="pwd" label="Mot de passe"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            :loading="loading"
            @click="checkInput"
        >
          Créer
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>

import {mapActions, mapState} from 'vuex'

export default {
  name: 'SignupForm',
  data: () =>({
    fname: '',
    lname: '',
    mail: '',
    pwd: '',
    loading: false,
  }),
  computed: {
    ...mapState(['auth', 'isError'])
  },
  methods: {
    ...mapActions(['signup']),
    async checkInput() {
      this.loading = true
      await this.signup({firstName: this.fname, lastName: this.lname, login: this.mail, passwd: this.pwd})
      this.loading = false
      if (this.isError === false) this.$router.push('/login')
    }
  }
}
</script>

