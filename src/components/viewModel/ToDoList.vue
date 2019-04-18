<template>
  <div>
    <AddTask/>
    <TaskList
      v-if="tasks"
      :tasks="tasks"
      :userImageURL="userImageURL"
      @deleteTask="deleteTask"
    />
  </div>
</template>

<script>
import AddTask from '@/components/viewModel/AddTask'
import TaskList from '@/components/view/TaskList'
import { mapActions } from 'vuex'

export default {
  components: {
    AddTask,
    TaskList
  },
  computed: {
    tasks: function () {
      return this.$store.getters['task/newTasks']
    },
    userImageURL: function () {
      return this.$store.getters['auth/userImageURL'] 
    }
  },
  created: function () {
    this.$store.dispatch('task/get')
  },
  methods: {
    ...mapActions('task', [
      'delete'
    ]),
    deleteTask (taskId, callback) {
      const data = {
        'id': taskId
      }
      this.delete(data)
      callback()
    },
  }
}
</script>