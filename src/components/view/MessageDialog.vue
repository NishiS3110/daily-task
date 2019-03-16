<template>
  <v-dialog v-model="dialog" max-width="450">
    <v-card>
      <v-card-title class="dialog-title">{{this.dialogTitle}}</v-card-title>
      <v-card-text class="dialog-body">
        {{this.dialogText}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat="flat"
          @click.native="pushLeftButton"
          class="dialog-left-button"
        >
          {{this.dialogLeftButtonText}}
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat="flat"
          @click.native="pushRightButton"
          class="dialog-right-button"
        >
          {{this.dialogRightButtonText}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
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
    pushLeftButton () {
      this.$emit('pushLeftButton')
    },
    pushRightButton () {
      this.$emit('pushRightButton')
    }
  }
}
</script>

<style>
</style>
