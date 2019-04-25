<template>
  <div>
    <v-btn
      slot="activator"
      color="red"
      dark
      @click="openDialog">タスクの追加
    </v-btn>
    <TaskDialog
      v-if="dialog"
      :userId="userId"
      :userImageURL="userImageURL"
      :dialogType="dialogType"
      @close="dialog = false"/>
  </div>
</template>

<script>
import TaskDialog from '@/components/view/TaskDialog'
import { DIALOG_TYPE } from '@/constant/type.js'

export default {
  components: {
    TaskDialog
  },
  props: {
    userId: {
      type: String,
      required: true
    },
    userImageURL: {
      type: String,
      default: ""
    }
　},
  data () {
    return {
      dialog: false,
      dialogType: DIALOG_TYPE.ADD
    }
  },
  computed: {
  },
  methods: {
    openDialog () {
      this.dialog = true
    }
  }
}
</script>

<style>

</style>
