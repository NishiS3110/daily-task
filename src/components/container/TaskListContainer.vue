<template>
  <v-layout justify-center column>
    <ToDoList/>
  </v-layout>
</template>

<script>
import ToDoList from '@/components/viewModel/ToDoList'
export default {
  name: 'TaskListContainer',
  components: {
    ToDoList
  }
}
</script>

<style>

</style>
