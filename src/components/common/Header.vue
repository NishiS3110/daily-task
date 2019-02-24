<template>
  <v-toolbar>
    <v-toolbar-items>
      <v-btn flat @click="goToTasKList">タスク一覧</v-btn>
      <!-- あとで追加 -->
      <!-- <v-btn flat @click="gotToProfile">プロフィール</v-btn> -->
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <!-- あとで追加あるかも -->
    <!-- <v-toolbar-items>
      <v-btn flat>ログイン</v-btn>
      <v-btn flat>ログアウト</v-btn>
    </v-toolbar-items> -->
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    goToTasKList () {
     this.$router.push({ name: 'TaskList' })
    }
    // gotToProfile () {
    //   console.log(プロフィールが押された)
    // }
  }
}
</script>

<style>

</style>
