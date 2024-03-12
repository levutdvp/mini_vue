<template>
  <el-form @submit="logIn" label-width="80px" class="login-form">
    <el-form-item label="email" prop="email">
      <el-input v-model="email" placeholder="Enter your email"></el-input>
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input type="password" v-model="password" placeholder="Enter your password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="logIn">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { LoginApi } from '../api/authen';


const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const logIn = async(): Promise<void> =>{
    try {
      const response = await LoginApi({
        email: email.value,
        password: password.value
      })

      const accessToken = response.data.accessToken
      store.dispatch('setAccessToken', accessToken)
      router.push('/')      
    } catch (error) {
      console.log(error)
    }
}
</script>

<style scoped>
.login-form {
  width: 300px;
  margin: 0 auto;
}
</style>
