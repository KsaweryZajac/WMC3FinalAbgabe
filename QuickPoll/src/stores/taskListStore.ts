import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
  color: string
  favorite: boolean
  done: boolean
  description: string
  category: string // Neue Eigenschaft für Kategorien
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

export const useTaskListStore = defineStore('taskList', () => {
  const tasks = ref<Task[]>(loadTasks())
  const selectedTaskId = ref<number | null>(null)
  
  // Verbesserte ID-Generierung
  const nextTaskId = ref(
    Math.max(0, ...tasks.value.map(t => t.id), 
    ...tasks.value.flatMap(t => t.subtasks.map(s => s.id))) + 1
  )

  // Computed Properties
  const selectedTask = computed(() => 
    tasks.value.find(t => t.id === selectedTaskId.value) || null
  )

  // Hilfsfunktion zum Aktualisieren einer Task
  function updateTask(taskId: number, updates: Partial<Task>) {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index === -1) return false

    // Erstelle eine neue Task-Kopie mit den Updates
    tasks.value = tasks.value.map((task, i) => 
      i === index ? { ...task, ...updates } : task
    )
    
    saveTasks(tasks.value)
    return true
  }

  // Actions  // Vordefinierte Kategorien
  const categories = [
    'Arbeit',
    'Privat',
    'Einkaufen',
    'Gesundheit',
    'Hobby',
    'Sonstiges'
  ]

  function createTask(title: string, subtasks: string[], deadline: string, color: string, category = 'Sonstiges', description = '') {
    const newTask: Task = {
      id: nextTaskId.value++,
      title,
      subtasks: subtasks.map(text => ({
        id: nextTaskId.value++,
        text,
        completed: false
      })),
      deadline,
      color,
      favorite: false,
      done: false,
      description,
      category
    }
    
    tasks.value = [...tasks.value, newTask]
    selectedTaskId.value = newTask.id
    saveTasks(tasks.value)
    return newTask.id
  }

  function toggleDone(taskId: number) {
    const task = tasks.value.find(t => t.id === taskId)
    if (!task) return

    updateTask(taskId, { done: !task.done })
  }

  function toggleFavorite(taskId: number) {
    const task = tasks.value.find(t => t.id === taskId)
    if (!task) return

    updateTask(taskId, { favorite: !task.favorite })
  }

  function toggleSubtask(taskId: number, subtaskId: number) {
    const task = tasks.value.find(t => t.id === taskId)
    if (!task) return

    const updatedSubtasks = task.subtasks.map(subtask =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    )

    updateTask(taskId, { subtasks: updatedSubtasks })
  }

  function updateDescription(taskId: number, description: string) {
    updateTask(taskId, { description })
  }

  function deleteTask(taskId: number) {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index === -1) return

    tasks.value = tasks.value.filter(t => t.id !== taskId)
    if (selectedTaskId.value === taskId) {
      selectedTaskId.value = null
    }
    saveTasks(tasks.value)
  }

  function selectTask(taskId: number) {
    selectedTaskId.value = taskId
  }

  function resetSelection() {
    selectedTaskId.value = null
  }

  return {
    tasks,
    selectedTask,
    selectedTaskId,
    createTask,
    toggleDone,
    toggleFavorite,
    toggleSubtask,
    updateDescription,
    selectTask,
    deleteTask,
    resetSelection
  }
})
