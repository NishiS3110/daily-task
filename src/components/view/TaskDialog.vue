<template>
  <v-dialog
    v-model="dialog"
    max-width="450px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">タスク</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="title"
                label="タイトル*"
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="detail"
                label="詳細"
              >
              </v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-left="nudgeLeft"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date"
                  label="*完了予定日"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">閉じる</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(date)">決定</v-btn>
                 </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-switch v-model="completed" :label="displayCompleted"></v-switch>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*は必須入力です</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="closeDialog">閉じる</v-btn>
        <v-btn
          v-if="isAddButton"
          color="blue darken-1"
          flat
          @click="addTask">追加
        </v-btn>
        <v-btn
          v-if="isEditButton"
          color="blue darken-1"
          flat
          @click="editTask">更新
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DIALOG_TYPE } from '@/constant/type.js'

export default {
  props: {
    taskId: {
      type: String,
      default: null
    },
    taskTitle: {
      type: String,
      default: ''
    },
    taskDetail: {
      type: String,
      default: ''
    },
    taskDate: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    },
    taskCompleted: {
      type: Boolean,
      default: false
    },
    dialogType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialog: true,
      title: this.taskTitle,
      detail: this.taskDetail,
      date: this.taskDate,
      completed: this.taskCompleted,
      menu: false
    }
  },
  computed: {
    isAddButton: function () {
      return this.dialogType === DIALOG_TYPE.ADD
    },
    isEditButton: function () {
      return this.dialogType === DIALOG_TYPE.EDIT
    },
    displayCompleted: function () {
      return this.completed ? '完了済' : '未完了'
    },
    nudgeLeft: function () {
      let nudgeLeft
      if (window.innerWidth <= 320) {
        nudgeLeft = 40
      } else if (window.innerWidth <= 750) {
        nudgeLeft = 0
      } else {
        nudgeLeft = -40
      }
      return nudgeLeft
    }
  },
  watch: {
    // ダイアログの外側を押下した場合にもemitする
    dialog: function () {
      if (!this.dialog) {
        this.$emit('close')
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    addTask () {
      const task = {
        'title': this.title,
        'detail': this.detail,
        'completed': this.completed,
        'date': this.date
      }
      this.$emit('addTask', task)
    },
    editTask () {
      const data = {
        'id': this.taskId,
        'title': this.title,
        'detail': this.detail,
        'completed': this.completed,
        'date': this.date
      }
      this.$store.dispatch('task/update', data)
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
