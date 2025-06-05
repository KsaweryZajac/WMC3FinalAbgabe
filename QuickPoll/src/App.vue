<template>  <!-- Haupt-Container mit Gradient-Hintergrund -->
  <div class="min-vh-100 d-flex align-items-stretch justify-content-center p-3 p-md-4 gradient-bg">
    <div class="w-100" style="max-width: 768px;">
      <!-- Responsiver Header mit Glasmorphismus-Effekt -->
      <header class="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mb-4 p-3 p-md-4 rounded-4 shadow-lg border-0 position-relative overflow-hidden modern-header">
        <!-- Gradient Hintergrund für den Header -->
        <div class="position-absolute top-0 start-0 w-100 h-100 modern-header-bg"></div>
        <!-- Titel mit Gradient-Text-Effekt -->
        <h1 class="display-5 display-md-4 fw-black mb-0 text-gradient position-relative z-1 text-center text-sm-start" 
            style="letter-spacing: 1px; font-size: clamp(1.5rem, 5vw, 2.5rem);">
          Task Achievement
        </h1>
        <!-- Dark Mode Toggle Button -->
        <div class="d-flex gap-3 align-items-center">
          <button 
            @click="toggleDark()" 
            class="btn btn-light rounded-circle d-flex align-items-center justify-content-center shadow border-0 position-relative z-1 modern-toggle"
            style="width: clamp(42px, 6vw, 52px); height: clamp(42px, 6vw, 52px); backdrop-filter: blur(6px);"
            @mouseover="e => { e.currentTarget.style.transform='scale(1.12)'; }"
            @mouseleave="e => { e.currentTarget.style.transform=''; }">
            <span v-if="isDark" class="fs-4">🌙</span>
            <span v-else class="fs-4">☀️</span>
          </button>
        </div>
      </header>      <!-- Navigation mit Gradient-Buttons für Aufgabenliste und Erstellung -->
      <div class="d-flex gap-2 justify-content-center mb-3">
        <!-- Navigation Buttons mit reaktivem Zustand -->
        <button 
          v-for="v in ['list', 'create']" 
          :key="v"
          class="btn btn-outline-primary rounded-pill px-4 py-2 gradient-btn"
          :class="{ active: view === v }"
          style="min-width: 120px; font-size: clamp(0.875rem, 2vw, 1rem);"
          :aria-label="v === 'list' ? 'Aufgabenliste anzeigen' : 'Neue Aufgabe erstellen'"
          @click="view = v">
          {{ v === 'list' ? 'My Tasks' : 'Create Task' }}
        </button>
      </div>      <!-- Hauptinhalt mit dynamischem Komponenten-Rendering -->
      <div class="bg-white dark:bg-dark rounded-4 shadow p-3 p-md-4 card-gradient">
        <!-- Aufgaben-Erstellung: Wird angezeigt wenn view === 'create' -->
        <TaskCreator 
          v-if="view==='create'" 
          @created="(id) => { 
            taskListStore.selectTask(id); // Wähle die neue Aufgabe aus
            view='list' // Wechsel zur Aufgabenliste
          }" 
        />
        <!-- Aufgabenliste: Wird angezeigt wenn view !== 'create' -->
        <TaskList 
          v-else 
          @switch="view = $event" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Importiere benötigte Vue.js Funktionalitäten und Komponenten
import { provide, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useTaskListStore } from './stores/taskListStore'
import TaskCreator from './components/PollCreator.vue'
import TaskList from './components/TaskList.vue'

// Dark Mode Verwaltung mit VueUse
const isDark = useDark() // Reaktiver Dark Mode Status
provide('isDark', isDark) // Stelle Dark Mode Status für Kind-Komponenten bereit
const toggleDark = useToggle(isDark) // Toggle Funktion für Dark Mode

// Ansichtsverwaltung
const view = ref('create') // 'create' oder 'list' für die aktuelle Ansicht

// Store Integration
const taskListStore = useTaskListStore() // Zentrale Aufgabenverwaltung
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
@import 'bootstrap/dist/css/bootstrap.min.css';

/* Grundlegende Farbvariablen und Theme-Einstellungen */
:root {
  --dark-bg: #121212;
  --dark-surface: #1e1e1e;
  --dark-text: #ffffff;
  --dark-text-secondary: rgba(255, 255, 255, 0.7);
  --dark-border: rgba(255, 255, 255, 0.1);
  
  /* Gradient-Definitionen für verschiedene UI-Elemente */
  --gradient-primary: linear-gradient(45deg, #6366f1 0%, #a855f7 100%);
  --gradient-hover: linear-gradient(45deg, #4f46e5 0%, #9333ea 100%);
  --gradient-light: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  --gradient-dark: linear-gradient(135deg, #1a1c2a 0%, #2d1b2e 100%);
  
  /* Schatten und Animation Variablen */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  --transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Basis Styling */
body {
  font-family: 'Inter', sans-serif !important;
  -webkit-font-smoothing: antialiased !important;
  background: var(--gradient-light) !important;
  transition: background 0.5s !important;
  min-height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Dark Mode Anpassungen */
.dark body {
  background: var(--gradient-dark) !important;
}

.dark {
  color: var(--dark-text) !important;
}

/* Header Styling mit Glaseffekt */
.modern-header {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255,255,255,0.18);
}

.dark .modern-header {
  background: rgba(18, 18, 18, 0.95);
  border-color: var(--dark-border);
}

/* Gradient Text für Header mit verbesserter Lesbarkeit */
.text-gradient {
  background-image: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-weight: 900;
}

.dark .text-gradient {
  background-image: linear-gradient(45deg, #818cf8 0%, #c084fc 100%);
  filter: brightness(1.2) contrast(1.1);
}

/* Gradient Buttons mit verbesserten Hover-Effekten */
.gradient-btn {
  background-image: var(--gradient-primary) !important;
  color: #fff !important;
  border: none !important;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.gradient-btn:hover, 
.gradient-btn:focus {
  background-image: var(--gradient-hover) !important;
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.dark .gradient-btn {
  opacity: 0.9;
}

.dark .gradient-btn:hover {
  opacity: 1;
}

.card-gradient {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: none;
  transition: var(--transition-base);
}

.dark .card-gradient {
  background: var(--dark-surface) !important;
  color: var(--dark-text) !important;
}

/* Responsive Anpassungen */
@media (max-width: 576px) {
  .modern-header {
    padding: 1rem !important;
  }
  
  .card-gradient {
    margin: -1rem;
    padding: 1rem !important;
  }
  
  .gradient-btn {
    padding: 0.5rem 1rem;
  }
}

/* Animationen */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

body {
  animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
