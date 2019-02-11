<template>
<v-dialog v-model="dialog" max-width="450px">
        <v-btn slot="activator" color="red" dark>タスクの追加</v-btn>
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
                      label="*完了日"
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
            <v-btn color="blue darken-1" flat @click="dialog = false">閉じる</v-btn>
            <v-btn color="blue darken-1" flat @click="saveTask">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      title: '',
      detail: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      completed: false,
    }
  },
  computed: {
    displayCompleted: function () {
      return this.completed ? '完了済' : '未完了'
    },
    nudgeLeft: function () {
      if(window.innerWidth <= 320){
        return 40
      }else if(window.innerWidth <= 750){
        return 0
      }else{
        return -40
      }
    },
  },
  methods: {
    saveTask () {
      const data = {
        'title': this.title,
        'detail': this.detail,
        'completed': this.completed,
        'date': this.date,
      }
      this.$store.dispatch('task/create', data)
      this.$store.dispatch('task/get')
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
