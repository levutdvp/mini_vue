<template>
    <div>
      <h2>Todo List</h2>
      <ul>
        <li v-for="task in store.tasks" :key="task.id">
          {{ task.text }}
          <button @click="store.removeTask(task.id)">Remove</button>
        </li>
      </ul>
      <input v-model="newTask" placeholder="Add a new task" />
      <button @click="addTask">Add</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useTodoStore } from '../store/todo';
  
  const store = useTodoStore();
  const newTask = ref('');
  
  const addTask = () => {
    if (newTask.value.trim() !== '') {
      store.addTask({ text: newTask.value, id: Math.floor(Math.random() * 1000) });
      newTask.value = '';
    }
  };
  </script>
  