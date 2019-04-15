<template>
  <div>
    <AddTask/>
    <TaskList
      v-if="tasks"
      :tasks="tasks"
      :userImageURL="userImageURL"
    />
  </div>
</template>

<script>
import AddTask from '@/components/viewModel/AddTask'
import TaskList from '@/components/view/TaskList'

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
}
</script>