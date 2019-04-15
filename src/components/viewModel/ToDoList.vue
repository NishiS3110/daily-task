<template>
  <TaskList
    v-if="tasks"
    :tasks="tasks"
    :userImageURL="userImageURL"
  />
</template>

<script>
import TaskList from '@/components/view/TaskList'

export default {
  components: {
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