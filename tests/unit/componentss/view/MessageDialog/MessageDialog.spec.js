import {
  shallowMount
} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import MessageDialog from '@/components/view/MessageDialog.vue'
import {
  testData
} from './MessageDialog-test-data'

Vue.use(Vuetify)

describe('描画のテスト', () => {
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
    const wrapper = shallowMount(MessageDialog, {
      propsData: testData[0]
    })

    describe('ダイアログの左側のボタン押下', () => {
      it('closeイベントがemitされていること', () => {
        const dialogLeftButtonWrapper = wrapper.find('.dialog-left-button')
        //「@click.native="closeDialog"」というコードになっているのは、「@click="closeDialog"」だt
        // 下記のtriggerで発火しないため
        dialogLeftButtonWrapper.trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
      })
    })
  })
})
