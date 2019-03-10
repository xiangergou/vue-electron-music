/*
 * @Author: liuxia
 * @Date: 2019-01-13 22:09:37
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-01-13 22:09:37
 */

import Cookies from 'js-cookie'

const SessionIdKey = 'Admin-SessionId'

export function getSessionId () {
  return Cookies.get(SessionIdKey)
}

export function setSessionId (sessionId) {
  return Cookies.set(SessionIdKey, sessionId)
}

export function removeSessionId () {
  return Cookies.remove(SessionIdKey)
}
