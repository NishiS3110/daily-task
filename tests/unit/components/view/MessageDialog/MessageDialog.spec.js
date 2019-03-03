import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import MessageDialog from '@/components/view/MessageDialog.vue'
import task from '@/store/modules/task'
import {
  testData
} from './MessageDialog-test-data'

const localVue = createLocalVue()

localVue.use(Vuex)

Vue.use(Vuetify)

describe('MessageDialogのテスト', () => {
  describe('描画のテスト', () => {
    describe('propsとして渡された値が表示されているかの確認', () => {
      const wrapper = shallowMount(MessageDialog, {
        propsData: testData[0]
      })

      it('ダイアログのタイトル部分の確認', () => {
        const dialogTitleWrapper = wrapper.find('.dialog-title')
        expect(dialogTitleWrapper.text()).toBe(testData[0].dialogTitle)
      })
      it('ダイアログの本文部分の確認', () => {
        const dialogBodyWrapper = wrapper.find('.dialog-body')
        expect(dialogBodyWrapper.text()).toBe(testData[0].dialogText)
      })
      it('ダイアログの左側のボタン文言の確認', () => {
        const dialogLeftButtonWrapper = wrapper.find('.dialog-left-button')
        expect(dialogLeftButtonWrapper.text()).toBe(testData[0].dialogLeftButtonText)
      })
      it('ダイアログの右側のボタン文言の確認', () => {
        const dialogRightButtonWrapper = wrapper.find('.dialog-right-button')
        expect(dialogRightButtonWrapper.text()).toBe(testData[0].dialogRightButtonText)
      })
    })
  })

  describe('イベントのテスト', () => {
    describe('ダイアログの左側のボタン押下', () => {
      const wrapper = shallowMount(MessageDialog, {
        propsData: testData[0],
      })

      const dialogLeftButtonWrapper = wrapper.find('.dialog-left-button')
      //「@click.native="closeDialog"」というコードになっているのは、「@click="closeDialog"」だt
      // 下記のtriggerで発火しないため
      dialogLeftButtonWrapper.trigger('click')

      it('closeイベントがemitされていること', () => {
        expect(wrapper.emitted('close')).toBeTruthy()
      })
    })

    describe('ダイアログの右側のボタン押下', () => {
      let actions
      let store

      // beforeEachを使用しないのは一回のclickで、VuexのActionsのdeleteが呼び出されることと
      // closeイベントがemitされていることを確認したいため
      actions = {
        delete: jest.fn(),
        get: jest.fn()
      }

      store = new Vuex.Store({
        modules: {
          task: {
            namespaced: true,
            actions
          }
        }
      })

      const wrapper = shallowMount(MessageDialog, {
        propsData: testData[0],
        store,
        localVue
      })

      const dialogRightButtonWrapper = wrapper.find('.dialog-right-button')
      dialogRightButtonWrapper.trigger('click')

      it('VuexのActionsのdeleteが呼び出されること', () => {
        expect(actions.delete).toHaveBeenCalled()
      })

      it('VuexのActionsのdeleteが呼び出し時のペイロードが想定通りであること', () => {
        const data = {
          'id': testData[0].taskId
        }
        // dispatchの引数は、contextとpayloadだけではなく3つ目があるÏ
        expect(actions.delete).toBeCalledWith(expect.anything(), data, undefined)
      })

      it('closeイベントがemitされていること', () => {
        expect(wrapper.emitted('close')).toBeTruthy()
      })
    })
  })
})
