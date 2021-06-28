import { useRef, useEffect } from "react"

export const keys = Object.freeze({
  TOKEN: "token",
  USER_INFO: "userinfo",
  LOGIN: "login",
  LOGOUT: "logout",
  RESTORE_LOGIN: "restorelogin",
  SIGNUP: "signup"
})

export const useRenderCounter = () => {
  const counter = useRef(0)

  useEffect(() => {
    counter.current = counter.current + 1
    console.log()
  })
}