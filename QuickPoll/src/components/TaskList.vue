<template>
  <div>    <div v-if="!taskListStore.selectedTask">      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 fw-bold mb-0" :class="{ 'text-white': isDark }">My Tasks</h2>
        <!-- Kategorie-Filter Dropdown -->
        <select v-model="selectedCategory"
                class="form-select form-select-sm rounded-pill"
                style="width: auto;">
          <option value="">Alle Kategorien</option>
          <option v-for="cat in predefinedCategories" 
                  :key="cat" 
                  :value="cat">{{ cat }}</option>
        </select>
      </div>
      <ul class="list-group mb-3 gap-3">
        <li v-for="task in orderedTasks" 
            :key="task.id" 
            class="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center rounded-4 p-3 shadow-sm task-card" 
            :style="{ 
              borderLeft: '8px solid ' + (task.color || '#2196f3'),
              background: isDark ? '#23272f' : '#fff',
              opacity: task.done ? 0.5 : 1
            }">
          <!-- Task Info -->          <div class="d-flex align-items-center gap-2 mb-2 mb-sm-0 w-100">
            <span @click="taskListStore.selectTask(task.id)" 
                  style="cursor: pointer" 
                  class="d-flex align-items-center gap-2 flex-grow-1">
              <span class="task-color-dot" 
                    :style="{ background: task.color }"></span>              <span class="fw-bold text-truncate" 
                    :class="{ 
                      'text-decoration-line-through': task.done,
                      'text-white': isDark
                    }">
                {{ task.title }}
              </span>
              <span class="badge rounded-pill" 
                    :style="{ 
                      background: task.color + '33',
                      color: task.color,
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.75rem'
                    }">
                {{ task.category }}
              </span>
              <span v-if="task.deadline" 
                    class="text-secondary small d-none d-sm-inline">
                ({{ formatDateTime(task.deadline) }})
              </span>
            </span>
          </div>

          <!-- Task Actions -->
          <div class="d-flex gap-2 ms-4 ms-sm-0">
            <button class="task-btn warning" 
                    @click.stop="taskListStore.toggleFavorite(task.id)" 
                    :title="task.favorite ? 'Unfavorite' : 'Favorite'">
              <span v-if="task.favorite">★</span>
              <span v-else>☆</span>
            </button>
            <button class="task-btn success" 
                    @click.stop="taskListStore.toggleDone(task.id)" 
                    :title="task.done ? 'Als offen markieren' : 'Als erledigt markieren'">
              <span v-if="task.done">✔️</span>
              <span v-else>⬜</span>
            </button>
            <button class="task-btn danger" 
                    @click="taskListStore.deleteTask(task.id)">
              <span>🗑️</span>
            </button>
          </div>
        </li>
      </ul>
      <div v-if="taskListStore.tasks.length === 0" 
           class="text-center p-4 rounded-4 bg-light bg-opacity-50">
        <p class="text-secondary mb-0">No tasks yet. Create one!</p>
      </div>
    </div>

    <!-- Task Details -->
    <div v-else class="task-details">
      <header class="d-flex flex-wrap align-items-center gap-3 mb-4">
        <div class="task-header-content">
          <h2 class="h5 fw-bold mb-2 d-flex align-items-center gap-2">
            <span class="task-badge" 
                  :style="{ background: taskListStore.selectedTask.color }">
              {{ taskListStore.selectedTask.title.charAt(0).toUpperCase() }}
            </span>
            {{ taskListStore.selectedTask.title }}
          </h2>          <div class="text-secondary small d-flex align-items-center gap-2">
            <span v-if="taskListStore.selectedTask.deadline">
              Due: {{ formatDateTime(taskListStore.selectedTask.deadline) }}
            </span>
            <span class="badge rounded-pill" 
                  :style="{ 
                    background: taskListStore.selectedTask.color + '33',
                    color: taskListStore.selectedTask.color
                  }">
              {{ taskListStore.selectedTask.category }}
            </span>
          </div>
        </div>
        <div class="task-header-actions ms-auto">
          <button class="task-btn warning me-2" 
                  @click="taskListStore.toggleFavorite(taskListStore.selectedTask.id)">
            <span v-if="taskListStore.selectedTask.favorite">★</span>
            <span v-else>☆</span>
          </button>
          <button class="task-btn success" 
                  @click="taskListStore.toggleDone(taskListStore.selectedTask.id)">
            <span v-if="taskListStore.selectedTask.done">✔️</span>
            <span v-else>⬜</span>
          </button>
        </div>
      </header>

      <div class="mb-4">
        <textarea v-model="descriptionEdit" 
                  class="form-control rounded-3" 
                  rows="2" 
                  placeholder="Beschreibung..." 
                  @blur="saveDescription" />
      </div>

      <div class="subtasks-container">
        <ul class="list-group gap-2">
          <li v-for="subtask in taskListStore.selectedTask.subtasks" 
              :key="subtask.id" 
              class="subtask-item">
            <label class="subtask-label">
              <input type="checkbox" 
                     :checked="subtask.completed" 
                     @change="taskListStore.toggleSubtask(taskListStore.selectedTask.id, subtask.id)" 
                     class="form-check-input me-2" />
              <span :class="{ 'completed': subtask.completed }">
                {{ subtask.text }}
              </span>
            </label>
          </li>
        </ul>
      </div>

      <footer class="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
        <button class="btn btn-outline-secondary rounded-pill px-4" 
                @click="taskListStore.resetSelection()">
          ← Back to Tasks
        </button>
        <div class="task-progress">
          {{ tasksToGo }} task{{ tasksToGo === 1 ? '' : 's' }} to go
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useTaskListStore } from '../stores/taskListStore'

const taskListStore = useTaskListStore()
const isDark = inject('isDark', false)
const descriptionEdit = ref('')
const selectedCategory = ref('') // für Kategorie-Filter

// Vordefinierte Kategorien (gleich wie im Store)
const predefinedCategories = [
  'Arbeit',
  'Privat',
  'Einkaufen',
  'Gesundheit',
  'Hobby',
  'Sonstiges'
]

watch(() => taskListStore.selectedTask, (t) => {
  descriptionEdit.value = t?.description || ''
}, { immediate: true })

function saveDescription() {
  if (taskListStore.selectedTask)
    taskListStore.updateDescription(taskListStore.selectedTask.id, descriptionEdit.value)
}

const tasksToGo = computed(() => {
  const t = taskListStore.selectedTask
  return t ? t.subtasks.filter(s => !s.completed).length : 0
})

function formatDateTime(dt: string) {
  if (!dt) return ''
  return new Date(dt).toLocaleString()
}

const orderedTasks = computed(() => {
  // Erst filtern nach Kategorie
  const filteredTasks = selectedCategory.value
    ? taskListStore.tasks.filter(task => task.category === selectedCategory.value)
    : taskListStore.tasks

  // Dann sortieren nach Deadline
  return [...filteredTasks].sort((a, b) => {
    if (!a.deadline && !b.deadline) return 0
    if (!a.deadline) return 1
    if (!b.deadline) return -1
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })
})
</script>

<style scoped>
.task-card {
  transition: all 0.3s ease;
  border: none;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
}

.task-color-dot {
  width: 1.2em;
  height: 1.2em;
  border-radius: 50%;
  border: 1.5px solid #ccc;
  flex-shrink: 0;
}

.task-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: transparent;
}

.task-btn:hover {
  transform: scale(1.1);
}

.task-btn.warning:hover { color: #ffc107; }
.task-btn.success:hover { color: #198754; }
.task-btn.danger:hover { color: #dc3545; }

.task-badge {
  padding: 0.2em 0.7em;
  border-radius: 0.5em;
  color: #fff;
  font-weight: bold;
}

.task-header-content {
  flex: 1;
  min-width: 200px;
}

.subtask-item {
  padding: 0.75rem;
  background: rgba(0,0,0,0.03);
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.subtask-label {
  display: flex;
  align-items: center;
  margin: 0;
  cursor: pointer;
  width: 100%;
}

.subtask-label .completed {
  text-decoration: line-through;
  color: #6c757d;
}

.task-progress {
  padding: 0.5rem 1rem;
  background: rgba(var(--bs-primary-rgb), 0.1);
  border-radius: 2rem;
  font-size: 0.875rem;
  color: var(--bs-primary);
}

.badge {
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: all 0.2s ease;
}

/* Kategorie-Filter Styling */
.form-select {
  border-color: rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.form-select:hover {
  border-color: var(--bs-primary);
}

:deep(.dark) .form-select {
  background-color: var(--dark-surface);
  border-color: var(--dark-border);
  color: var(--dark-text);
}

:deep(.dark) .form-select:hover {
  border-color: var(--dark-text);
}

:deep(.dark) .task-card {
  color: var(--dark-text);
  background-color: var(--dark-surface);
}

:deep(.dark) .task-progress {
  background: rgba(255, 255, 255, 0.1);
  color: var(--dark-text);
}

:deep(.dark) .subtask-label {
  color: var(--dark-text);
}

:deep(.dark) .subtask-label .completed {
  color: var(--dark-text-secondary);
}

:deep(.dark) .task-btn {
  color: var(--dark-text);
}

:deep(.dark) .form-control {
  background-color: var(--dark-surface);
  border-color: var(--dark-border);
  color: var(--dark-text);
}

:deep(.dark) .text-secondary {
  color: var(--dark-text-secondary) !important;
}

@media (max-width: 576px) {
  .task-card {
    padding: 1rem;
  }

  .task-header-actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
}
</style>
