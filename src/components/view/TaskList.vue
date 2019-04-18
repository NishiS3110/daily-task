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
          <img 
            v-if="userImageURL"
            :src="userImageURL"
          >
          <v-icon v-else medium>info</v-icon>
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
          @click.stop="openDeleteTaskDialog(task)"
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
    <DeleteTaskDialog
      v-if="isDeleteTaskDialog"
      :taskTitle="taskTitle"
      @close="closeDeleteTaskDialog"
      @deleteTask="deleteTask"
    />
  </div>
</template>

<script>
import TaskDialog from '@/components/view/TaskDialog'
import DeleteTaskDialog from '@/components/view/DeleteTaskDialog'
import { DIALOG_TYPE } from '@/constant/type.js'
export default {
  components: {
    TaskDialog,
    DeleteTaskDialog
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    userImageURL: {
      type: String,
      default: ""
    }
　},
  data () {
    return {
      isTaskDialog: false,
      isDeleteTaskDialog: false,
      taskId: null,
      taskTitle: null,
      taskDetail: null,
      taskDate: null,
      taskCompleted: false,
      dialogType: DIALOG_TYPE.EDIT
    }
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
    openDeleteTaskDialog (task) {
      this.taskId = task.id
      this.taskTitle = task.title
      this.isDeleteTaskDialog = true
    },
    closeDeleteTaskDialog () {
      this.isDeleteTaskDialog = false
    },
    deleteTask () {
      this.$emit('deleteTask', this.taskId, () => {this.isDeleteTaskDialog = false})
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
