
import { defineStore } from 'pinia';
type TTask = {
  id: number,
  text: string
}
type TState = {
  tasks: TTask[]
}
export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
  } as TState),
  actions: {
    addTask(task: { text: string, id: number }) {
      this.tasks = [...this.tasks, task]
    },
    removeTask(taskId: number) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
  },
});