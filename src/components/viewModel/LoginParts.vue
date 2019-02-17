<template>
  <v-flex xs12>
    <div　v-if="canDisplay">
      <v-layout align-center justify-center column>
        <div class="item">
          <v-btn
            color="success"
            class="login-button"
            @click="login">Googleアカウントでログイン
          </v-btn>
        </div>
        <div class="item">
          <p class="login-notice">
            ログインにはGoogleアカウントが必要です
            <a href="https://accounts.google.com/SignUp" target="_blank">Googleアカウント作成</a>
          </p>
        </div>
      </v-layout>
    </div>
    <div v-else class="progress-circle" >
      <v-progress-circular
        :size="70"
        :width="7"
        color="gray"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-flex>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      canDisplay: false
    }
  },
  async mounted () {
    let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => resolve(user))
    })

    this.$store.dispatch('auth/setUser', user)
    if (user) {
      this.$router.push('/')
    }else{
      this.canDisplay = true
    }
  },
  methods: {
    login () {
      this.$store.dispatch('auth/login')
    }
  }
}
</script>

<style>
.item {
  margin: 10px;
}
.login-button {
  margin-bottom: 20px;
  text-transform: none;
  font-size: 1.2rem;
}
.login-notice {
  font-size: 0.7rem;
}
.progress-circle {
  text-align: center;
}
</style>
