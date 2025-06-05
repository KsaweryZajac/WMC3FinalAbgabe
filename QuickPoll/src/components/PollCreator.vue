<template>
  <div class="">
    <h2 class="h4 fw-bold mb-4">
      Create a New Task
    </h2>
    
    <form @submit.prevent="createTask" class="vstack gap-3">
      <div>
        <label class="form-label">
          Task Title
        </label>
        <input
          v-model="taskTitle"
          type="text"
          class="form-control form-control-sm rounded-pill"
          placeholder="What's your task?"
          required
        >
      </div>

      <div>
        <label class="form-label">Deadline</label>
        <input
          v-model="deadline"
          type="datetime-local"
          class="form-control form-control-sm rounded-pill"
          required
        >
      </div>

      <div>
        <label class="form-label">
          Subtasks
        </label>
        <div v-for="(subtask, index) in subtasks" :key="index" class="d-flex align-items-center gap-2 mb-2">
          <input
            v-model="subtasks[index]"
            type="text"
            class="form-control form-control-sm rounded-pill"
            :placeholder="`Subtask ${index + 1}`"
            required
          >
          <button
            @click="removeSubtask(index)"
            type="button"
            class="btn btn-outline-danger btn-sm rounded-pill px-2 py-1 d-flex align-items-center justify-content-center"
            style="transition: box-shadow 0.2s, background 0.2s, transform 0.2s;"
            @mouseover="e => { e.currentTarget.style.boxShadow='0 0.5rem 1rem rgba(220,53,69,0.15)'; e.currentTarget.style.transform='scale(1.08)'; }"
            @mouseleave="e => { e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform=''; }"
          >
            <span class="fw-bold">×</span>
          </button>
        </div>
      </div>

      <div class="d-flex gap-2">
        <button
          type="button"
          @click="addSubtask"
          class="btn btn-outline-primary btn-sm rounded-pill px-3 py-1 gradient-btn"
          style="transition: box-shadow 0.2s, background 0.2s, transform 0.2s;"
          @mouseover="e => { e.currentTarget.style.boxShadow='0 0.5rem 1rem rgba(13,110,253,0.15)'; e.currentTarget.style.transform='scale(1.08)'; }"
          @mouseleave="e => { e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform=''; }"
        >
          + Add Subtask
        </button>
        <button
          type="submit"
          class="btn btn-primary btn-sm rounded-pill px-3 py-1 gradient-btn"
          style="transition: box-shadow 0.2s, background 0.2s, transform 0.2s;"
          @mouseover="e => { e.currentTarget.style.boxShadow='0 0.5rem 1rem rgba(13,110,253,0.15)'; e.currentTarget.style.transform='scale(1.08)'; }"
          @mouseleave="e => { e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform=''; }"
        >
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

function addSubtask() {
  subtasks.value.push('')
}

function removeSubtask(index: number) {
  subtasks.value = subtasks.value.filter((_, i) => i !== index)
}

function createTask() {
  if (taskTitle.value && subtasks.value.every(opt => opt.trim()) && deadline.value) {
    taskListStore.createTask(taskTitle.value, subtasks.value, deadline.value)
    taskTitle.value = ''
    subtasks.value = ['', '']
    deadline.value = ''
    emit('created')
  }
}
</script>

<style>
.gradient-btn {
  background: linear-gradient(90deg, rgba(13,110,253,1) 0%, rgba(220,53,69,1) 100%);
  color: white;
}
</style>
