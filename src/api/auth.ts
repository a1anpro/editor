import http from "./http"
import { LoginParams } from "@/typings/auth"
export function login(loginParams: LoginParams) {
  return http.post("/login", loginParams)
}

export function getCurrentUser() {
  return http.get("/currentUser")
}
