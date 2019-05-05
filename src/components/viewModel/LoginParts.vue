<template>
  <v-flex xs12>
    <div v-if="canDisplay">
      <v-layout align-center justify-center column>
        <div class="item">
          <v-btn
            color="green"
            class="login-button white--text"
            @click="googleLogin">Googleアカウントでログイン
          </v-btn>
          <p class="login-notice">
            Googleアカウントは
            <a href="https://accounts.google.com/SignUp" target="_blank">こちらで</a>
            作成できます。
          </p>
        </div>
        <div class="item">
          <v-btn
            color="amber"
            class="login-button white--text"
            @click="anonymousLogin">匿名アカウントでログイン
          </v-btn>
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
  mounted () {
    this.getUserInfo()
  },
  methods: {
    googleLogin () {
      this.$store.dispatch('auth/googleLogin')
    },
    anonymousLogin () {
      this.$store.dispatch('auth/anonymousLogin')
        .then(() => {
          this.getUserInfo()
        })
        .catch(err => console.log(`Error :${error.message}`))
    },
    async getUserInfo () {
      let user = await new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => resolve(user))
      })

      this.$store.dispatch('auth/setUser', user)
      if (user) {
        this.$router.push('/')
      } else {
        this.canDisplay = true
      }
    }
  }
}
</script>

<style>
.item:not(:first-child) {
  margin-top: -10px;
}
.login-button {
  width: 250px;
  text-transform: none;
  font-size: 1.2rem;
}
.login-notice {
  font-size: 0.5rem;
  text-align: right;
}
.progress-circle {
  text-align: center;
}
</style>
