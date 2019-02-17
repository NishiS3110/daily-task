<template>
  <v-layout justify-center column>
    <AddTask/>
    <TaskList/>
  </v-layout>
</template>

<script>
import AddTask from '@/components/viewModel/AddTask'
import TaskList from '@/components/viewModel/TaskList'
export default {
  name: 'TaskListContainer',
  components: {
    AddTask,
    TaskList
  }
}
</script>

<style>

</style>
