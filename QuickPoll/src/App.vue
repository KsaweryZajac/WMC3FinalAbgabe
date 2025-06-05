<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskFlow - Your Productivity Hub</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --secondary: #f1f5f9;
            --accent: #06b6d4;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --bg-primary: #ffffff;
            --bg-secondary: #f8fafc;
            --border: #e2e8f0;
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --glass: rgba(255, 255, 255, 0.1);
        }
        
        [data-theme="dark"] {
            --text-primary: #f1f5f9;
            --text-secondary: #94a3b8;
            --bg-primary: #0f172a;
            --bg-secondary: #1e293b;
            --border: #334155;
            --glass: rgba(0, 0, 0, 0.2);
        }
        
        body {
            font-family: 'Outfit', sans-serif;
            background: var(--bg-secondary);
            color: var(--text-primary);
            min-height: 100vh;
            transition: all 0.3s ease;
            overflow-x: hidden;
        }
        
        .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        
        /* Animated Background */
        .bg-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: var(--gradient);
            opacity: 0.05;
        }
        
        .bg-animation::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        /* Header */
        .header {
            background: var(--bg-primary);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: var(--shadow);
        }
        
        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        .logo i {
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .header-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .theme-toggle {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 50%;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--text-secondary);
        }
        
        .theme-toggle:hover {
            background: var(--primary);
            color: white;
            transform: scale(1.1);
        }
        
        /* Main Content */
        .main-content {
            flex: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            width: 100%;
        }
        
        /* Navigation Tabs */
        .nav-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2rem;
            background: var(--bg-primary);
            padding: 0.5rem;
            border-radius: 1rem;
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
        }
        
        .nav-tab {
            flex: 1;
            padding: 0.75rem 1.5rem;
            border: none;
            background: transparent;
            color: var(--text-secondary);
            border-radius: 0.75rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .nav-tab.active {
            background: var(--primary);
            color: white;
            box-shadow: var(--shadow);
        }
        
        .nav-tab:hover:not(.active) {
            background: var(--bg-secondary);
            color: var(--text-primary);
        }
        
        /* Card Container */
        .card {
            background: var(--bg-primary);
            border-radius: 1.5rem;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border);
            backdrop-filter: blur(20px);
        }
        
        /* Task Creator */
        .task-creator {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-label {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .form-input {
            padding: 1rem;
            border: 2px solid var(--border);
            border-radius: 0.75rem;
            background: var(--bg-secondary);
            color: var(--text-primary);
            font-size: 1rem;
            transition: all 0.3s ease;
            outline: none;
        }
        
        .form-input:focus {
            border-color: var(--primary);
            background: var(--bg-primary);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .form-textarea {
            min-height: 120px;
            resize: vertical;
        }
        
        .priority-selector {
            display: flex;
            gap: 0.75rem;
        }
        
        .priority-option {
            flex: 1;
            padding: 1rem;
            border: 2px solid var(--border);
            border-radius: 0.75rem;
            background: var(--bg-secondary);
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            font-weight: 500;
        }
        
        .priority-option.low {
            border-color: var(--success);
            color: var(--success);
        }
        
        .priority-option.medium {
            border-color: var(--warning);
            color: var(--warning);
        }
        
        .priority-option.high {
            border-color: var(--danger);
            color: var(--danger);
        }
        
        .priority-option.selected {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
        }
        
        .btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 0.75rem;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .btn-primary {
            background: var(--gradient);
            color: white;
            box-shadow: var(--shadow);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        /* Task List */
        .task-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .task-item {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 1rem;
            padding: 1.5rem;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .task-item:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
            border-color: var(--primary);
        }
        
        .task-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 0.75rem;
        }
        
        .task-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--text-primary);
            margin: 0;
        }
        
        .task-priority {
            padding: 0.25rem 0.75rem;
            border-radius: 2rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .task-priority.low {
            background: rgba(16, 185, 129, 0.1);
            color: var(--success);
        }
        
        .task-priority.medium {
            background: rgba(245, 158, 11, 0.1);
            color: var(--warning);
        }
        
        .task-priority.high {
            background: rgba(239, 68, 68, 0.1);
            color: var(--danger);
        }
        
        .task-description {
            color: var(--text-secondary);
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .task-actions {
            display: flex;
            gap: 0.5rem;
        }
        
        .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }
        
        .btn-success {
            background: var(--success);
            color: white;
        }
        
        .btn-danger {
            background: var(--danger);
            color: white;
        }
        
        .btn-success:hover,
        .btn-danger:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }
        
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: var(--text-secondary);
        }
        
        .empty-state i {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }
        
        .empty-state h3 {
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .header-content {
                padding: 1rem;
            }
            
            .main-content {
                padding: 1rem;
            }
            
            .nav-tabs {
                flex-direction: column;
            }
            
            .nav-tab {
                text-align: center;
            }
            
            .card {
                padding: 1.5rem;
            }
            
            .priority-selector {
                flex-direction: column;
            }
            
            .task-header {
                flex-direction: column;
                align-items: stretch;
            }
            
            .task-actions {
                justify-content: center;
            }
        }
        
        /* Animations */
        .slide-enter-active,
        .slide-leave-active {
            transition: all 0.3s ease;
        }
        
        .slide-enter-from {
            opacity: 0;
            transform: translateX(30px);
        }
        
        .slide-leave-to {
            opacity: 0;
            transform: translateX(-30px);
        }
        
        /* Loading Animation */
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s ease-in-out infinite;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    </style>
</head>
<body>
    <div class="app-container" id="app">
        <div class="bg-animation"></div>
        
        <header class="header">
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-rocket"></i>
                    <span>TaskFlow</span>
                </div>
                <div class="header-actions">
                    <button class="theme-toggle" @click="toggleTheme" title="Toggle theme">
                        <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
                    </button>
                </div>
            </div>
        </header>
        
        <main class="main-content">
            <nav class="nav-tabs">
                <button 
                    class="nav-tab" 
                    :class="{ active: currentView === 'create' }"
                    @click="currentView = 'create'"
                >
                    <i class="fas fa-plus"></i>
                    Create Task
                </button>
                <button 
                    class="nav-tab" 
                    :class="{ active: currentView === 'list' }"
                    @click="currentView = 'list'"
                >
                    <i class="fas fa-list-check"></i>
                    My Tasks ({{ tasks.length }})
                </button>
            </nav>
            
            <div class="card">
                <!-- Task Creator -->
                <div v-if="currentView === 'create'" class="task-creator">
                    <div class="form-group">
                        <label class="form-label">Task Title</label>
                        <input 
                            v-model="newTask.title" 
                            class="form-input" 
                            placeholder="What needs to be done?"
                            @keyup.enter="createTask"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea 
                            v-model="newTask.description" 
                            class="form-input form-textarea" 
                            placeholder="Add more details about this task..."
                        ></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Priority Level</label>
                        <div class="priority-selector">
                            <div 
                                class="priority-option low"
                                :class="{ selected: newTask.priority === 'low' }"
                                @click="newTask.priority = 'low'"
                            >
                                <i class="fas fa-arrow-down"></i> Low
                            </div>
                            <div 
                                class="priority-option medium"
                                :class="{ selected: newTask.priority === 'medium' }"
                                @click="newTask.priority = 'medium'"
                            >
                                <i class="fas fa-minus"></i> Medium
                            </div>
                            <div 
                                class="priority-option high"
                                :class="{ selected: newTask.priority === 'high' }"
                                @click="newTask.priority = 'high'"
                            >
                                <i class="fas fa-arrow-up"></i> High
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" @click="createTask" :disabled="!newTask.title.trim()">
                        <i class="fas fa-plus" v-if="!isCreating"></i>
                        <div class="loading" v-else></div>
                        {{ isCreating ? 'Creating...' : 'Create Task' }}
                    </button>
                </div>
                
                <!-- Task List -->
                <div v-else class="task-list">
                    <div v-if="tasks.length === 0" class="empty-state">
                        <i class="fas fa-clipboard-list"></i>
                        <h3>No tasks yet</h3>
                        <p>Create your first task to get started on your productivity journey!</p>
                        <button class="btn btn-primary" @click="currentView = 'create'">
                            <i class="fas fa-plus"></i>
                            Create Your First Task
                        </button>
                    </div>
                    
                    <div v-for="task in tasks" :key="task.id" class="task-item">
                        <div class="task-header">
                            <h3 class="task-title">{{ task.title }}</h3>
                            <span class="task-priority" :class="task.priority">
                                {{ task.priority }}
                            </span>
                        </div>
                        
                        <p class="task-description" v-if="task.description">
                            {{ task.description }}
                        </p>
                        
                        <div class="task-actions">
                            <button class="btn btn-success btn-sm" @click="completeTask(task.id)">
                                <i class="fas fa-check"></i>
                                Complete
                            </button>
                            <button class="btn btn-danger btn-sm" @click="deleteTask(task.id)">
                                <i class="fas fa-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.4/vue.global.min.js"></script>
    <script>
        const { createApp, ref, reactive, onMounted, computed } = Vue;
        
        createApp({
            setup() {
                const currentView = ref('create');
                const isDark = ref(false);
                const isCreating = ref(false);
                const tasks = ref([]);
                
                const newTask = reactive({
                    title: '',
                    description: '',
                    priority: 'medium'
                });
                
                const toggleTheme = () => {
                    isDark.value = !isDark.value;
                    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
                };
                
                const createTask = async () => {
                    if (!newTask.title.trim()) return;
                    
                    isCreating.value = true;
                    
                    // Simulate API call delay
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    const task = {
                        id: Date.now(),
                        title: newTask.title,
                        description: newTask.description,
                        priority: newTask.priority,
                        createdAt: new Date()
                    };
                    
                    tasks.value.push(task);
                    
                    // Reset form
                    newTask.title = '';
                    newTask.description = '';
                    newTask.priority = 'medium';
                    
                    isCreating.value = false;
                    currentView.value = 'list';
                };
                
                const completeTask = (taskId) => {
                    const taskIndex = tasks.value.findIndex(t => t.id === taskId);
                    if (taskIndex !== -1) {
                        tasks.value.splice(taskIndex, 1);
                    }
                };
                
                const deleteTask = (taskId) => {
                    const taskIndex = tasks.value.findIndex(t => t.id === taskId);
                    if (taskIndex !== -1) {
                        tasks.value.splice(taskIndex, 1);
                    }
                };
                
                onMounted(() => {
                    // Check for saved theme preference
                    const savedTheme = localStorage.getItem('theme');
                    if (savedTheme) {
                        isDark.value = savedTheme === 'dark';
                        document.documentElement.setAttribute('data-theme', savedTheme);
                    }
                });
                
                // Watch theme changes and save to localStorage
                const unwatchTheme = computed(() => isDark.value);
                const saveTheme = () => {
                    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
                };
                
                return {
                    currentView,
                    isDark,
                    isCreating,
                    tasks,
                    newTask,
                    toggleTheme,
                    createTask,
                    completeTask,
                    deleteTask
                };
            }
        }).mount('#app');
    </script>
</body>
</html>
