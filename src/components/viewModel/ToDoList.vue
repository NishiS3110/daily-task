<template>
  <div>
    <AddTask
      :userId="userId"
      :userImageURL="userImageURL"
      @addTask="addTask"
    />
    <TaskList
      v-if="tasks"
      :tasks="tasks"
      @deleteTask="deleteTask"
      @updateTask="updateTask"
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
    userId: function () {
      return this.$store.getters['auth/userId']
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
      'add',
      'delete',
      'update'
    ]),
    addTask (task, callback) {
      const user = {
        'userId': this.userId,
        'userImageURL': this.userImageURL
      }
      const addingTask = Object.assign({}, task, user)
      this.add(addingTask)
      callback()
    },
    deleteTask (deletingTask, callback) {
      this.delete(deletingTask)
      callback()
    },
    updateTask (updatingtask, callback) {
      this.update(updatingtask)
      callback()
    }
  }
}
</script>
