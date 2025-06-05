<template>
  <!-- Hauptcontainer für die Task-Erstellung -->
  <div class="">
    <!-- Überschrift für das Formular -->
    <h2 class="h4 fw-bold mb-4">
      Create a New Task
    </h2>
    
    <!-- Formular für die Task-Erstellung, verhindert Standard-Submit -->
    <form @submit.prevent="createTask" class="vstack gap-3">
      
      <!-- Eingabefeld für den Task-Titel -->
      <div>
        <label class="form-label">
          Task Title
        </label>
        <!-- v-model bindet den Wert an taskTitle Variable -->
        <input
          v-model="taskTitle"
          type="text"
          class="form-control form-control-sm rounded-pill"
          placeholder="What's your task?"
          required
        >
      </div>
      
      <!-- Eingabefeld für die Deadline -->
      <div>
        <label class="form-label">Deadline</label>
        <!-- datetime-local für Datum und Zeit Auswahl -->
        <input
          v-model="deadline"
          type="datetime-local"
          class="form-control form-control-sm rounded-pill"
          required
        >
      </div>
      
      <!-- Sektion für die Subtasks -->
      <div>
        <label class="form-label">
          Subtasks
        </label>
        <!-- v-for iteriert über alle Subtasks im Array -->
        <div v-for="(subtask, index) in subtasks" :key="index" class="d-flex align-items-center gap-2 mb-2">
          <!-- Eingabefeld für jeden einzelnen Subtask -->
          <input
            v-model="subtasks[index]"
            type="text"
            class="form-control form-control-sm rounded-pill"
            :placeholder="`Subtask ${index + 1}`"
            required
          >
          <!-- Löschen-Button für jeden Subtask -->
          <button
            @click="removeSubtask(index)"
            type="button"
            class="btn btn-outline-danger btn-sm rounded-pill px-2 py-1 d-flex align-items-center justify-content-center"
            style="transition: box-shadow 0.2s, background 0.2s, transform 0.2s;"
            @mouseover="e => { e.currentTarget.style.boxShadow='0 0.5rem 1rem rgba(220,53,69,0.15)'; e.currentTarget.style.transform='scale(1.08)'; }"
            @mouseleave="e => { e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform=''; }"
          >
            <!-- X-Symbol zum Löschen -->
            <span class="fw-bold">×</span>
          </button>
        </div>
      </div>
      
      <!-- Button-Container für Aktionen -->
      <div class="d-flex gap-2">
        <!-- Button zum Hinzufügen neuer Subtasks -->
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
        
        <!-- Submit-Button zum Erstellen des Tasks -->
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
// Importiere notwendige Vue-Funktionen
import { ref, defineEmits } from 'vue'
// Importiere den Task-Store für die Datenverwaltung
import { useTaskListStore } from '../stores/taskListStore'

// Definiere Events die an Parent-Component gesendet werden können
const emit = defineEmits(['created'])

// Initialisiere den Task-Store
const taskListStore = useTaskListStore()

// Reaktive Variablen für die Formulardaten
const taskTitle = ref('') // Speichert den Titel des Tasks
const subtasks = ref(['', '']) // Array mit Subtasks, startet mit 2 leeren Strings
const deadline = ref('') // Speichert die Deadline als String

/**
 * Funktion zum Hinzufügen eines neuen Subtasks
 * Fügt einen leeren String zum subtasks Array hinzu
 */
function addSubtask() {
  subtasks.value.push('')
}

/**
 * Funktion zum Entfernen eines Subtasks
 * @param index - Der Index des zu entfernenden Subtasks
 * Filtert das Array und entfernt den Subtask am gegebenen Index
 */
function removeSubtask(index: number) {
  subtasks.value = subtasks.value.filter((_, i) => i !== index)
}

/**
 * Hauptfunktion zum Erstellen eines neuen Tasks
 * Validiert die Eingaben und erstellt den Task über den Store
 */
function createTask() {
  // Prüfe ob alle Felder ausgefüllt sind
  if (taskTitle.value && subtasks.value.every(opt => opt.trim()) && deadline.value) {
    // Erstelle den Task über den Store
    taskListStore.createTask(taskTitle.value, subtasks.value, deadline.value)
    
    // Setze alle Formularfelder zurück auf Standardwerte
    taskTitle.value = ''
    subtasks.value = ['', ''] // Zurück zu 2 leeren Subtasks
    deadline.value = ''
    
    // Sende Event an Parent-Component dass Task erstellt wurde
    emit('created')
  }
}
</script>

<style>
/* Gradient-Styling für Buttons */
/* Erstellt einen Farbverlauf von Blau zu Rot */
.gradient-btn {
  background: linear-gradient(90deg, rgba(13,110,253,1) 0%, rgba(220,53,69,1) 100%);
  color: white; /* Weiße Schrift für bessere Lesbarkeit */
}
</style>
