<script setup lang="ts">
import jpgUrl from "@/assets/kf.jpg"
import { useMainStore, useUserStore } from "@/store"
const mainStore = useMainStore()
const userStore = useUserStore()
const add = () => {
  mainStore.$patch({
    firstName: "zhang",
    lastName: "san",
    count: mainStore.count + 1
  })
}
defineProps<{ msg: string }>()
</script>
<template>
  <h2>less</h2>
  <h3>sass</h3>
  <div class="postcss"></div>
  <img :src="jpgUrl" style="width: 50px" />
  <img src="@/assets/kf.jpg" style="width: 50px" />
  <div class="logo"></div>
  <div>
    <p>userName {{ userStore.userName }}</p>
    <p>name:{{ mainStore.name }}</p>
    <p>count:{{ mainStore.count }}</p>
    <button @click="mainStore.count++">mainStore.count++</button>
    <button @click="add()">add()</button>
    <button @click="mainStore.addAmount(2)">mainStore.addAmount(2)</button>
  </div>
</template>
<style lang="less">
h2 {
  color: @themeColor;
}
</style>
<style lang="scss">
h3 {
  color: $themeColor;
}
</style>
<style>
.postcss {
  height: 30px;
  width: 60px;
  background-color: orange;
  transform: rotate(30deg);
}
</style>
<style>
.logo {
  height: 50px;
  width: 50px;
  background-image: url(@/assets/kf.jpg);
  background-size: contain;
}
</style>
