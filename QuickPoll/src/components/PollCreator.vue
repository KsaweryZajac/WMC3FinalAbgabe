<template>
  <div class="task-creator">
    <h2 class="h4 fw-bold mb-4">Create a New Task</h2>
    
    <form @submit.prevent="createTask" class="vstack gap-4">
      <!-- Task Title -->
      <div class="form-group">
        <label class="form-label fw-medium mb-2">Task Title</label>
        <input v-model="taskTitle"
               type="text"
               class="form-control form-control-lg rounded-4"
               placeholder="What's your task?"
               required>
      </div>

      <!-- Deadline -->
      <div class="form-group">
        <label class="form-label fw-medium mb-2">Deadline</label>
        <input v-model="deadline"
               type="datetime-local"
               class="form-control form-control-lg rounded-4"
               required>
      </div>      <!-- Kategorie Auswahl -->
      <div class="form-group">
        <label class="form-label fw-medium mb-2">Kategorie</label>
        <select v-model="category" 
                class="form-select form-select-lg rounded-4"
                required>
          <option v-for="cat in predefinedCategories" 
                  :key="cat" 
                  :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Color Picker -->
      <div class="form-group">
        <label class="form-label fw-medium mb-2">Task Color</label>
        <div class="d-flex gap-2 flex-wrap">
          <button type="button"
                  v-for="c in predefinedColors"
                  :key="c"
                  class="color-btn"
                  :class="{ active: color === c }"
                  :style="{ background: c }"
                  @click="color = c"></button>
          <input v-model="color"
                 type="color"
                 class="color-input"
                 title="Custom color">
        </div>
      </div>

      <!-- Subtasks -->
      <div class="form-group">
        <label class="form-label fw-medium mb-2">
          Subtasks
          <span class="text-secondary ms-2">({{ subtasks.length }})</span>
        </label>
        <div class="subtasks-container">
          <div v-for="(subtask, index) in subtasks" 
               :key="index"
               class="subtask-item">
            <input v-model="subtasks[index]"
                   type="text"
                   class="form-control rounded-4"
                   :placeholder="'Subtask ' + (index + 1)"
                   required>
            <button type="button"
                    @click="removeSubtask(index)"
                    class="btn-remove"
                    title="Remove subtask">×</button>
          </div>
        </div>
        <button type="button"
                @click="addSubtask"
                class="btn btn-outline-primary rounded-4 w-100 mt-2">
          + Add Subtask
        </button>
      </div>

      <!-- Submit Button -->
      <div class="d-grid">
        <button type="submit"
                class="btn btn-primary btn-lg rounded-4 gradient-btn">
          Create Task
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useTaskListStore } from '../stores/taskListStore'

const emit = defineEmits(['created'])
const taskListStore = useTaskListStore()
const taskTitle = ref('')
const subtasks = ref(['', ''])
const deadline = ref('')
const color = ref('#6366f1')
const category = ref('Sonstiges')

// Vordefinierte Kategorien
const predefinedCategories = [
  'Arbeit',
  'Privat',
  'Einkaufen',
  'Gesundheit',
  'Hobby',
  'Sonstiges'
]

const predefinedColors = [
  '#6366f1', // Indigo
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#ef4444', // Red
  '#f97316', // Orange
  '#eab308', // Yellow
  '#22c55e', // Green
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
]

function addSubtask() {
  subtasks.value.push('')
}

function removeSubtask(index: number) {
  if (subtasks.value.length > 1) {
    subtasks.value = subtasks.value.filter((_, i) => i !== index)
  }
}

function createTask() {
  if (taskTitle.value && subtasks.value.every(opt => opt.trim()) && deadline.value) {
    const newId = taskListStore.createTask(
      taskTitle.value,
      subtasks.value,
      deadline.value,
      color.value,
      category.value
    )
    resetForm()
    emit('created', newId)
  }
}

function resetForm() {
  taskTitle.value = ''
  subtasks.value = ['', '']
  deadline.value = ''
  color.value = '#6366f1'
}
</script>

<style scoped>
.task-creator {
  max-width: 640px;
  margin: 0 auto;
}

.form-control {
  border: 1px solid rgba(0,0,0,0.1);
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
}

.form-control:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
}

.subtasks-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.subtask-item {
  position: relative;
  display: flex;
  gap: 0.5rem;
}

.btn-remove {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(220,53,69,0.1);
  color: #dc3545;
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-remove:hover {
  background: rgba(220,53,69,0.2);
  transform: scale(1.1);
}

.color-btn {
  width: 36px;
  height: 36px;
  border: 2px solid transparent;
  border-radius: 50%;
  padding: 0;
  transition: all 0.2s ease;
  cursor: pointer;
}

.color-btn:hover,
.color-btn.active {
  transform: scale(1.1);
  border-color: white;
  box-shadow: 0 0 0 2px #6366f1;
}

.color-input {
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-input::-webkit-color-swatch {
  border: 2px solid transparent;
  border-radius: 50%;
  padding: 0;
}

.color-input::-moz-color-swatch {
  border: 2px solid transparent;
  border-radius: 50%;
  padding: 0;
}

.color-input:hover {
  transform: scale(1.1);
}

@media (max-width: 576px) {
  .form-group {
    margin-bottom: 1.5rem;
  }

  .color-btn,
  .color-input {
    width: 32px;
    height: 32px;
  }
}

:deep(.dark) .form-control {
  background-color: var(--dark-surface);
  border-color: var(--dark-border);
  color: var(--dark-text);
}

:deep(.dark) .form-label {
  color: var(--dark-text);
}

:deep(.dark) .text-secondary {
  color: var(--dark-text-secondary) !important;
}

:deep(.dark) .btn-remove {
  background: rgba(220,53,69,0.2);
  color: #ff4d4d;
}

:deep(.dark) .color-btn {
  border-color: var(--dark-border);
}

:deep(.dark) .color-btn.active {
  border-color: var(--dark-text);
}
</style>
