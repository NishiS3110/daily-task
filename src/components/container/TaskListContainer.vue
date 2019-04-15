<template>
  <v-layout justify-center column>
    <AddTask/>
    <ToDoList/>
  </v-layout>
</template>

<script>
import AddTask from '@/components/viewModel/AddTask'
import ToDoList from '@/components/viewModel/ToDoList'
export default {
  name: 'TaskListContainer',
  components: {
    AddTask,
    ToDoList
  }
}
</script>

<style>

</style>
