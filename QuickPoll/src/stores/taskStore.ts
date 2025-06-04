import { defineStore } from 'pinia'

export interface Subtask {
  id: number
  text: string
  completed: boolean
}

export interface Task {
  title: string
  subtasks: Subtask[]
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    activeTask: null as Task | null,
    nextSubtaskId: 1
  }),
  getters: {
    completedCount(state) {
      return state.activeTask ? state.activeTask.subtasks.filter(s => s.completed).length : 0
    },
    totalCount(state) {
      return state.activeTask ? state.activeTask.subtasks.length : 0
    }
  },
  actions: {
    createTask(title: string, subtasks: string[]) {
      this.activeTask = {
        title,
        subtasks: subtasks.map(text => ({
          id: this.nextSubtaskId++,
          text,
          completed: false
        }))
      }
    },
    toggleSubtask(subtaskId: number) {
      if (!this.activeTask) return
      const sub = this.activeTask.subtasks.find(s => s.id === subtaskId)
      if (sub) sub.completed = !sub.completed
    },
    resetTask() {
      this.activeTask = null
    }
  }
})
