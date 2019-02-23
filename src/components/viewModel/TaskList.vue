<template>
  <div>
    <v-list two-line>
      <v-list-tile
        v-for="task in tasks"
        :key="task.title"
        avatar
        @click="editTask(task)"
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
        <!-- <v-list-tile-action-text class="tagText">
          <span>ふつう</span><span>ふつう</span><span>ふつう</span>
        </v-list-tile-action-text> -->
        <v-icon
          color="grey lighten-1"
          @click.stop="deleteTask(task)"
        >
          delete
        </v-icon>
      </v-list-tile>
    </v-list>
    <TaskDialog 
      v-if="isTaskDialog"
      :taskId="taskId"
      :taskTitle="taskTitle"
      :taskDetail="taskDetail"
      :taskDate="taskDate"
      :taskCompleted="taskCompleted"
      :dialogType="dialogType"
      @close="isTaskDialog = false"
    />
    <MessageDialog 
      v-if="isMessageDialog"
      :taskId="taskId"
      :dialogTitle="dialogTitle"
      :dialogText="dialogText"
      :dialogLeftButtonText="dialogLeftButtonText"
      :dialogRightButtonText="dialogRightButtonText"
      @close="isMessageDialog = false"
    />
  </div>
</template>

<script>
import TaskDialog from '@/components/view/TaskDialog'
import MessageDialog from '@/components/view/MessageDialog'
import {DIALOG_TYPE} from '@/constant/type.js';
export default {
  components: {
    TaskDialog,
    MessageDialog
  },
  data () {
    return {
      isTaskDialog: false,
      isMessageDialog: false,
      taskId: null,
      taskTitle: null,
      taskDetail: null,
      taskDate: null,
      taskCompleted :false,
      dialogType: DIALOG_TYPE.EDIT,
      dialogTitle: null,
      dialogText: null,
      dialogLeftButtonText: null,
      dialogRightButtonText: null
    }
  },
  computed: {
    tasks: function(){
      return this.$store.getters['task/newTasks']
    }
  },
  created: function(){
    this.$store.dispatch('task/get')
  },

  methods: {
    editTask (task) {
      this.taskId = task.id
      this.taskTitle = task.title
      this.taskDetail = task.detail
      this.taskDate = task.date
      this.taskCompleted = task.completed
      this.isTaskDialog = true
    },
    deleteTask (task) {
      this.taskId = task.id
      this.dialogTitle = 'タスクの削除'
      this.dialogText = '『' + task.title + '』を削除しますか'
      this.dialogLeftButtonText = '閉じる'
      this.dialogRightButtonText = '削除'
      this.isMessageDialog = true
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
/* .tagText {
  margin-right: 10px;
} */
</style>
