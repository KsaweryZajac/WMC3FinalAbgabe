<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center gradient-bg">
    <div class="w-100" style="max-width: 540px;">
      <header class="d-flex justify-content-between align-items-center mb-4 p-4 rounded-5 shadow-lg border-0 position-relative overflow-hidden modern-header">
        <div class="position-absolute top-0 start-0 w-100 h-100 modern-header-bg"></div>
        <h1 class="display-4 fw-black mb-0 text-gradient position-relative z-1" style="letter-spacing: 1px;">Task Achievement</h1>
        <button 
          @click="toggleDark()" 
          class="btn btn-light btn-lg rounded-circle d-flex align-items-center justify-content-center shadow border-0 position-relative z-1 modern-toggle gradient-btn"
          style="width:52px;height:52px;backdrop-filter: blur(6px);transition: box-shadow 0.2s, background 0.2s, transform 0.2s;"
          @mouseover="e => { e.currentTarget.style.boxShadow='0 0.5rem 1.5rem rgba(0,0,0,0.18)'; e.currentTarget.style.transform='scale(1.12)'; }"
          @mouseleave="e => { e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform=''; }"
        >
          <span v-if="isDark" class="fs-2">🌙</span>
          <span v-else class="fs-2">☀️</span>
        </button>
      </header>
      <div class="d-flex gap-2 justify-content-center mb-3">
        <button class="btn btn-outline-primary btn-sm rounded-pill gradient-btn" :class="{active: view==='list'}" @click="view='list'">My Tasks</button>
        <button class="btn btn-outline-primary btn-sm rounded-pill gradient-btn" :class="{active: view==='create'}" @click="view='create'">Create Task</button>
      </div>
      <div class="bg-white dark:bg-dark rounded-4 shadow p-4 card-gradient">
        <TaskCreator v-if="view==='create'" @created="view='list'" />
        <TaskList v-else @switch="view = $event" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useTaskListStore } from './stores/taskListStore'
import TaskCreator from './components/PollCreator.vue'
import TaskList from './components/TaskList.vue'

const isDark = useDark()
provide('isDark', isDark)
const toggleDark = useToggle(isDark)
const view = ref('create')
const taskListStore = useTaskListStore()
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
@import 'bootstrap/dist/css/bootstrap.min.css';

body {
  font-family: 'Inter', sans-serif !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  background: transparent !important;
  min-height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  transition: background 0.5s !important;
  animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1) !important;
}

.dark {
  background-color: #181a1b !important;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.gradient-bg {
  background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%);
}
.card-gradient {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%) !important;
  border: none;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
}
.modern-header {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(12px) saturate(1.2);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
  border: 1.5px solid rgba(255,255,255,0.18);
}
.modern-header-bg {
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(0,123,255,0.10) 0%, rgba(156,39,176,0.10) 100%);
  border-radius: 2rem;
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.10);
}
.text-gradient {
  background: linear-gradient(90deg, #007bff 0%, #9c27b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.modern-toggle {
  background: rgba(255,255,255,0.7) !important;
}
.dark .modern-header {
  background: rgba(24,26,27,0.85);
  border: 1.5px solid rgba(255,255,255,0.08);
}
.dark .modern-header-bg {
  background: linear-gradient(90deg, rgba(0,123,255,0.13) 0%, rgba(156,39,176,0.13) 100%);
}
.dark .modern-toggle {
  background: rgba(40,44,52,0.85) !important;
}
.gradient-btn {
  background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%) !important;
  color: #fff !important;
  border: none !important;
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.10);
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
}
.gradient-btn:hover, .gradient-btn:focus {
  background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%) !important;
  color: #fff !important;
  box-shadow: 0 4px 16px 0 rgba(99,102,241,0.18);
  transform: scale(1.05);
}
</style>
