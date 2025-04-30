<template>
  <v-container>
    <v-card>
      <v-card-title>Entrez votre email et votre mot de passe.</v-card-title>

      <v-card-text>
        <v-text-field v-model="name" label="Email"></v-text-field>
        <v-text-field type="password" v-model="passwd" label="Mot de passe"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            :loading="loading"
            @click="checkInput"
        >
          Ok
        </v-btn>
      </v-card-actions>
      <v-card-text v-if="errorMsg !== ''">{{ errorMsg }}</v-card-text>

    </v-card>
  </v-container>
</template>

<script>

import {mapActions, mapState} from 'vuex'

export default {
  name: 'LoginForm',
  data: () =>({
    name: '',
    passwd: '',
    loading: false,
  }),
  computed: {
    ...mapState(['auth', 'errorMsg'])
  },
  methods: {
    ...mapActions(['login']),
    async checkInput() {
      this.loading = true
      await this.login({login: this.name, passwd: this.passwd})
      this.loading = false
      if (this.auth) {
        this.$router.push('/')
      }
    }
  }
}
</script>

