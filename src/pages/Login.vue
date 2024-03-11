<template>
  <el-form :model="loginForm" label-width="80px" class="login-form">
    <el-form-item label="Username" prop="username">
      <el-input v-model="loginForm.username" placeholder="Enter your username"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="Enter your password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

  
    const loginForm = ref({
      username: '',
      password: '',
    });
    
    const router = useRouter()

    const login = () => {
      const isValidLogin = validateLogin(loginForm.value);

      if (isValidLogin) {
        router.push('/');
      } else {
        console.log("Unauthorized");
      }
    };

    const validateLogin = (loginData:any) => {
      const validUsername = 'user';
      const validPassword = 'password';

      return loginData.username === validUsername && loginData.password === validPassword;
    };
  

</script>

<style scoped>
.login-form {
  width: 300px;
  margin: 0 auto;
}
</style>
