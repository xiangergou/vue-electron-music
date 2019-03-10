/*
 * @Author: liuxia
 * @Date: 2019-03-10 22:03:18
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-10 22:12:46
 */

import router from '../router'
import { getSessionId } from '@/utils/auth'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (getSessionId()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
