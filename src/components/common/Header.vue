<template>
  <div>
    <v-toolbar>
      <v-toolbar-items>
        <v-btn flat @click="goToTasKList">タスク一覧</v-btn>
        <!-- あとで追加 -->
        <!-- <v-btn flat @click="gotToProfile">プロフィール</v-btn> -->
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <!-- あとで追加あるかも -->
      <v-toolbar-items>
        <v-btn flat @click="openDialog">ログアウト</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <MessageDialog
      v-if="isMessageDialog"
      :dialogTitle="dialogTitle"
      :dialogText="dialogText"
      :dialogLeftButtonText="dialogLeftButtonText"
      :dialogRightButtonText="dialogRightButtonText"
      @close="closeMessageDialog"
      @pushLeftButton="pushLeftButton"
      @pushRightButton="pushRightButton"
    />
  </div>
</template>

<script>
import MessageDialog from '@/components/view/MessageDialog'
export default {
  components: {
    MessageDialog
  },
  data () {
    return {
      isMessageDialog: false,
      dialogTitle: null,
      dialogText: null,
      dialogLeftButtonText: null,
      dialogRightButtonText: null
    }
  },
  methods: {
    goToTasKList () {
     this.$router.push({ name: 'TaskList' })
    },
    openDialog () {
      this.dialogTitle = 'ログアウト'
      this.dialogText = 'ログアウトしますか？'
      this.dialogLeftButtonText = 'いいえ'
      this.dialogRightButtonText = 'はい'
      this.isMessageDialog = true
    },
    closeMessageDialog () {
      this.isMessageDialog = false
    },
    pushLeftButton () {
      this.isMessageDialog = false
    },
    pushRightButton () {
      this.isMessageDialog = false
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(() => {
          console.log('ログアウトでエラー発生')
        })
    }
  }
}
</script>

<style>
</style>
