import { useRef, useEffect } from "react"

const API_URL = "http://scrollduck.com"

const expiredTokenError = new Error("User token is expired.")
const httpStatus401 = new Error("HTTP Status 401: Unauthorized")

export const config = Object.freeze({
  API_LOGIN_URL: API_URL+"/login",
  API_LOGOUT_URL: API_URL+"/logout",

  HTTP_STATUS_401: httpStatus401,
  EXPIRED_TOKEN_ERROR: expiredTokenError,

  USER_DATA_KEYS: [
    "name",
  ],

  TOKEN: "token",
  USER_DATA: "userdata",
  LOGIN: "login",
  LOGOUT: "logout",
  RESTORE_LOGIN: "restorelogin",
  SIGNUP: "signup",
})

export const useRenderCounter = () => {
  const counter = useRef(0)

  useEffect(() => {
    counter.current = counter.current + 1
    console.log()
  })
}