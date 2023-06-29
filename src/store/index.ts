import { defineStore } from "pinia"

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    firstName: "张",
    lastName: "三",
    count: 0
  }),
  getters: {
    name: (state) => state.firstName + state.lastName
  },
  actions: {
    async addAmount(amount: number) {
      this.count += amount
      useUserStore().change()
    }
  }
})

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userName: "A"
  }),
  actions: {
    async change() {
      this.userName = "new"
    }
  }
})
