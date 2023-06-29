import { MockMethod } from "vite-plugin-mock"
export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ headers, body }) => {
      return {
        code: 0,
        data: `${body.username}-jwt-token`
      }
    }
  },
  {
    url: "/api/currentUser",
    method: "get",
    response: ({ headers }) => {
      const { token } = headers
      return {
        code: 0,
        data: token.split("-")[0]
      }
    }
  }
] as MockMethod[]
