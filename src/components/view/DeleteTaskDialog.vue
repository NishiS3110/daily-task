<template>
  <v-dialog v-model="dialog" max-width="450">
    <v-card>
      <v-card-title class="dialog-title">タスクの削除</v-card-title>
      <v-card-text class="dialog-body">
        『{{this.taskTitle}}』を削除しますか
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat="flat"
          @click.native="closeDialog"
          class="dialog-left-button"
        >
          閉じる
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat="flat"
          @click.native="deleteTask"
          class="dialog-right-button"
        >
          削除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    taskTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: true
    }
  },
  watch: {
    // ダイアログの外側を押下した場合にもemitする
    dialog: function () {
      if (!this.dialog) {
        this.$emit('close')
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    deleteTask () {
      this.$emit('deleteTask')
    }
  }
}
</script>

<style>
</style>
