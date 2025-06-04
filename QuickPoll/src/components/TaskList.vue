<template>
  <div>
    <div v-if="!taskListStore.selectedTask">
      <h2 class="h5 fw-bold mb-3">My Tasks</h2>
      <ul class="list-group mb-3">
        <li v-for="task in orderedTasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center rounded-pill mb-2">
          <span @click="taskListStore.selectTask(task.id)" style="cursor:pointer;" class="flex-grow-1">
            {{ task.title }}
            <span v-if="task.deadline" class="text-secondary small ms-2">({{ formatDateTime(task.deadline) }})</span>
          </span>
          <button class="btn btn-outline-danger btn-sm rounded-pill ms-2 gradient-btn" @click="taskListStore.deleteTask(task.id)">Delete</button>
        </li>
      </ul>
      <div v-if="taskListStore.tasks.length === 0" class="text-secondary small">No tasks yet. Create one!</div>
    </div>
    <div v-else>
      <h2 class="h5 fw-bold mb-3">{{ taskListStore.selectedTask.title }}</h2>
      <div class="mb-2 text-secondary small">
        <span v-if="taskListStore.selectedTask.deadline">
          Until: {{ formatDateTime(taskListStore.selectedTask.deadline) }}
        </span>
      </div>
      <ul class="list-group mb-3">
        <li v-for="subtask in taskListStore.selectedTask.subtasks" :key="subtask.id" class="list-group-item d-flex align-items-center rounded-pill mb-2">
          <input type="checkbox" :checked="subtask.completed" @change="taskListStore.toggleSubtask(taskListStore.selectedTask.id, subtask.id)" class="form-check-input me-2" />
          <span :class="['flex-grow-1', subtask.completed ? 'text-decoration-line-through text-secondary' : '']">{{ subtask.text }}</span>
        </li>
      </ul>
      <button class="btn btn-outline-secondary btn-sm rounded-pill gradient-btn" @click="taskListStore.resetSelection()">Back to Tasks</button>
      <div class="mt-3 text-primary small fw-bold text-center">
        {{ tasksToGo }} task{{ tasksToGo === 1 ? '' : 's' }} to go
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskListStore } from '../stores/taskListStore'
const taskListStore = useTaskListStore()
const tasksToGo = computed(() => {
  const t = taskListStore.selectedTask
  return t ? t.subtasks.filter(s => !s.completed).length : 0
})
function formatDateTime(dt) {
  if (!dt) return ''
  const d = new Date(dt)
  return d.toLocaleString()
}
const orderedTasks = computed(() => {
  return [...taskListStore.tasks].sort((a, b) => {
    if (!a.deadline && !b.deadline) return 0
    if (!a.deadline) return 1
    if (!b.deadline) return -1
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })
})
</script>
