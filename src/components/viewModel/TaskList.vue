<template>
  <v-list two-line>
    <v-list-tile
      v-for="task in tasks"
      :key="task.title"
      avatar
      @click="editTask"
      :class="{ completed: task.completed, uncompleted: !task.completed }"
    >
      <v-list-tile-avatar>
        <v-icon medium>info</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ task.title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ task.date }}</v-list-tile-sub-title>
      </v-list-tile-content>

      <!-- あとでタグを追加 -->
      <!-- <v-list-tile-action-text>
        <span>ふつう</span><span>ふつう</span><span>ふつう</span>
      </v-list-tile-action-text> -->
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created: function(){
    this.$store.dispatch('task/get')
  },
  computed: {
    tasks: function(){
      return this.$store.getters['task/newTasks']
    }
  },
  methods: {
    editTask () {
      console.log('editTask')
    }
  }
}
</script>

<style>
  .uncompleted{
    background-color: orange;  
  }
  .completed {
    background-color: green;
  }
</style>
