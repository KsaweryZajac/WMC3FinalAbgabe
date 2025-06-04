<template>
  <div class="">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="h4 fw-bold mb-0">
        {{ taskStore.activeTask?.title }}
      </h2>
      <button
        @click="taskStore.resetTask"
        class="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1 d-flex align-items-center justify-content-center"
        style="transition: box-shadow 0.2s, background 0.2s, transform 0.2s;"
        @mouseover="e => { e.currentTarget.style.boxShadow='0 0.5rem 1rem rgba(108,117,125,0.15)'; e.currentTarget.style.transform='scale(1.08)'; }"
        @mouseleave="e => { e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform=''; }"
      >
        New Task
      </button>
    </div>
    <div class="vstack gap-3">
      <div
        v-for="(subtask, idx) in taskStore.activeTask?.subtasks"
        :key="subtask.id"
        class="d-flex align-items-center bg-light rounded-pill px-3 py-2 position-relative"
        style="transition: background 0.2s;"
      >
        <input type="checkbox" v-model="subtask.completed" class="form-check-input me-3" @change="() => taskStore.toggleSubtask(subtask.id)" />
        <span :class="['fw-medium flex-grow-1', subtask.completed ? 'text-decoration-line-through text-secondary' : '']">{{ subtask.text }}</span>
      </div>
    </div>
    <div class="mt-4 text-secondary bg-light bg-opacity-75 px-3 py-2 rounded-pill d-inline-block small fw-medium">
      Completed: {{ taskStore.completedCount }} / {{ taskStore.totalCount }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore'
const taskStore = useTaskStore()
</script>
