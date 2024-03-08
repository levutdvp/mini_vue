<template>
    <el-form ref="loginForm" :model="loginForm" label-width="80px">
      <el-form-item label="Username" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      login() {
        
      },
    },
  };
  </script>
  