import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import DeleteTaskDialog from '@/components/view/DeleteTaskDialog.vue'
import {
  testData
} from './DeleteTaskDialog-test-data'

const localVue = createLocalVue()

localVue.use(Vuex)

Vue.use(Vuetify)

describe('DeleteTaskDialogのテスト', () => {
  describe('描画のテスト', () => {
    describe('propsとして渡された値が表示されているかの確認', () => {
      const wrapper = shallowMount(DeleteTaskDialog, {
        propsData: testData[0]
      })

      it('ダイアログの本文部分の確認', () => {
        const dialogBodyWrapper = wrapper.find('.dialog-body')
        expect(dialogBodyWrapper.text()).toBe('『' + testData[0].taskTitle + '』を削除しますか')
      })
    })
  })

  describe('イベントのテスト', () => {
    describe('ダイアログの左側のボタン押下', () => {
      const wrapper = shallowMount(DeleteTaskDialog, {
        propsData: testData[0]
      })

      const dialogLeftButtonWrapper = wrapper.find('.dialog-left-button')
      // 「@click.native="closeDialog"」というコードになっているのは、「@click="closeDialog"」だと
      // 下記のtriggerで発火しないため
      dialogLeftButtonWrapper.trigger('click')

      it('closeイベントがemitされていること', () => {
        expect(wrapper.emitted('close')).toBeTruthy()
      })
    })

    describe('ダイアログの右側のボタン押下', () => {
      const wrapper = shallowMount(DeleteTaskDialog, {
        propsData: testData[0]
      })

      const dialogRightButtonWrapper = wrapper.find('.dialog-right-button')
      dialogRightButtonWrapper.trigger('click')

      it('deleteTaskイベントがemitされていること', () => {
        expect(wrapper.emitted('deleteTask')).toBeTruthy()
      })
    })
  })
})
