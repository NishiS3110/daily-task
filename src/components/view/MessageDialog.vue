<template>
  <v-dialog v-model="dialog" max-width="450">
    <v-card>
      <v-card-title class="headline">{{this.dialogTitle}}</v-card-title>
      <v-card-text>
        {{this.dialogText}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat="flat"
          @click="dialog = false"
        >
          {{this.dialogLeftButtonText}}
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat="flat"
          @click="deleteTask"
        >
          {{this.dialogRightButtonText}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    taskId: {
      type: String,
      default: null
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogText: {
      type: String,
      default: ''
    },
    dialogLeftButtonText: {
      type: String,
      default: 'キャンセル'
    },
    dialogRightButtonText: {
      type: String,
      default: 'OK'
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
      const data = {
        'id': this.taskId
      }
      this.$store.dispatch('task/delete', data)
      this.$store.dispatch('task/get')
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
