import Vue from 'vue'
import Router from 'vue-router'
import LoginContainer from '../components/container/LoginContainer'
import TaskListContainer from '../components/container/TaskListContainer'
import { authorizeToken } from './guards'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginContainer
    },
    {
      path: '/',
      name: 'TaskList',
      component: TaskListContainer,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
router.beforeEach(authorizeToken)

export default router
