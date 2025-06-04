import { defineStore } from 'pinia'

export interface Subtask {
  id: number
  text: string
  completed: boolean
}

export interface Task {
  id: number
  title: string
  subtasks: Subtask[]
  deadline: string
}

function loadTasks(): Task[] {
  try {
    const data = localStorage.getItem('tasks')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export const useTaskListStore = defineStore('taskList', {
  state: () => ({
    tasks: loadTasks() as Task[],
    nextTaskId: 1,
    nextSubtaskId: 1,
    selectedTaskId: null as number | null
  }),
  getters: {
    selectedTask(state) {
      return state.tasks.find(t => t.id === state.selectedTaskId) || null
    }
  },
  actions: {
    createTask(title: string, subtasks: string[], deadline: string) {
      const task: Task = {
        id: this.nextTaskId++,
        title,
        subtasks: subtasks.map(text => ({
          id: this.nextSubtaskId++,
          text,
          completed: false
        })),
        deadline
      }
      this.tasks.push(task)
      this.selectedTaskId = task.id
      saveTasks(this.tasks)
    },
    toggleSubtask(taskId: number, subtaskId: number) {
      const task = this.tasks.find(t => t.id === taskId)
      if (!task) return
      const sub = task.subtasks.find(s => s.id === subtaskId)
      if (sub) sub.completed = !sub.completed
      saveTasks(this.tasks)
    },
    selectTask(taskId: number) {
      this.selectedTaskId = taskId
    },
    deleteTask(taskId: number) {
      this.tasks = this.tasks.filter(t => t.id !== taskId)
      if (this.selectedTaskId === taskId) this.selectedTaskId = null
      saveTasks(this.tasks)
    },
    resetSelection() {
      this.selectedTaskId = null
    }
  }
})
