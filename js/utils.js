import { useRef, useEffect } from 'react'

const API_URL = 'http://scrollduck.com'
export const config = Object.freeze({
  API_LOGIN_URL: API_URL+'/login',
  API_LOGOUT_URL: API_URL+'/logout',

  CONDITION_OK: null,
  CONDITION_HTTP_503: {message: '서버가 꺼져있습니다!...'},
  CONDITION_HTTP_502: {message: '서버 프로그램이 아직 시작하지 않았어요!...'},
  CONDITION_HTTP_401: {message: '잘못된 유저 정보입니다.'},
  CONDITION_EXPIRED_TOKEN: {message: '로그인이 만료되었습니다.'},
  CONDITION_RESTORED_LOGIN: {message: '로그인 정보가 복구되었습니다'},

  USER_DATA_KEYS: [
    'name',
  ],

  TOKEN: 'token',
  USER_DATA: 'userdata',
  LOGIN: 'login',
  LOGOUT: 'logout',
  RESTORE_LOGIN: 'restorelogin',
  SIGNUP: 'signup',
})

export const useRenderCounter = () => {
  const counter = useRef(0)

  useEffect(() => {
    counter.current = counter.current + 1
    console.log(counter.current)
  })
}