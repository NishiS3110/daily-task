<template>
  <v-app>
    <Header v-if="displayHeader"/>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/common/Header'
import Footer from './components/common/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      //
    }
  },
  computed: {
    displayHeader: function(){
      return this.$route.name　!== "Login"
    }
  }
}
</script>
