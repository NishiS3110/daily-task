import store from '../store/store'

export const authorizeToken = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {    
    if(!store.getters['auth/isAuthenticated']){
      next({ path: '/login' })
    } else {
      next()
    }
  } else if (to.path === '/login' && store.isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
}
