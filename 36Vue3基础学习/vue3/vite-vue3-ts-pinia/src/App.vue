<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { useUserStore } from './store/user';
const userStore = useUserStore();
const name = ref('');
function updateName(nameStr: string) {
  userStore.updateName(nameStr);
  name.value = nameStr;
}
</script>

<template>
  <div>{{ userStore.name }}</div>
  <input v-model="name" />
  <button @click="userStore.updateName(name)">确认</button>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
