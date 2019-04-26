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
      :dialogType="dialogType"
      @close="dialog = false"
      @addTask="addTask"/>
  </div>
</template>

<script>
import TaskDialog from '@/components/view/TaskDialog'
import { DIALOG_TYPE } from '@/constant/type.js'

export default {
  components: {
    TaskDialog
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
    },
    addTask (task) {
      this.$emit('addTask', task, () => { this.dialog = false })
    }
  }
}
</script>

<style>

</style>
