// ================================
// Letsfokus App - Main JavaScript
// Vanilla JS - No Dependencies
// ================================

// ===== STATE MANAGEMENT =====
const AppState = {
    timer: {
        isRunning: false,
        isPaused: false,
        mode: 'focus', // 'focus' or 'break'
        currentTime: 25 * 60, // seconds
        totalTime: 25 * 60,
        focusDuration: 25,
        breakDuration: 5,
        currentTaskId: null
    },
    tasks: [],
    categories: ['Work', 'Study', 'Personal'],
    history: [],
    planner: ''
};

let timerInterval = null;

// ===== LOCAL STORAGE =====
const Storage = {
    save() {
        localStorage.setItem('letsfokus_data', JSON.stringify({
            tasks: AppState.tasks,
            categories: AppState.categories,
            history: AppState.history,
            planner: AppState.planner,
            settings: {
                focusDuration: AppState.timer.focusDuration,
                breakDuration: AppState.timer.breakDuration
            }
        }));
    },
    
    load() {
        const data = localStorage.getItem('letsfokus_data');
        if (data) {
            const parsed = JSON.parse(data);
            AppState.tasks = parsed.tasks || [];
            AppState.categories = parsed.categories || ['Work', 'Study', 'Personal'];
            AppState.history = parsed.history || [];
            AppState.planner = parsed.planner || '';
            
            if (parsed.settings) {
                AppState.timer.focusDuration = parsed.settings.focusDuration || 25;
                AppState.timer.breakDuration = parsed.settings.breakDuration || 5;
            }
        }
    }
};

// ===== WEB AUDIO API - NOTIFICATION SOUND =====
const AudioNotification = {
    context: null,
    
    init() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
    },
    
    play() {
        if (!this.context) this.init();
        
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.5);
        
        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + 0.5);
        
        // Play twice for notification effect
        setTimeout(() => {
            const osc2 = this.context.createOscillator();
            const gain2 = this.context.createGain();
            
            osc2.connect(gain2);
            gain2.connect(this.context.destination);
            
            osc2.frequency.value = 1000;
            osc2.type = 'sine';
            
            gain2.gain.setValueAtTime(0.3, this.context.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.5);
            
            osc2.start(this.context.currentTime);
            osc2.stop(this.context.currentTime + 0.5);
        }, 200);
    }
};

// ===== CANVAS TIMER =====
const CanvasTimer = {
    canvas: null,
    ctx: null,
    
    init() {
        this.canvas = document.getElementById('timer-canvas');
        this.ctx = this.canvas.getContext('2d');
    },
    
    draw(progress) {
        const ctx = this.ctx;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 120;
        
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 12;
        ctx.stroke();
        
        // Progress arc
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (2 * Math.PI * progress);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = AppState.timer.mode === 'focus' ? '#6366f1' : '#10b981';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Inner glow
        if (progress > 0) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius - 20, startAngle, endAngle);
            ctx.strokeStyle = AppState.timer.mode === 'focus' 
                ? 'rgba(99, 102, 241, 0.2)' 
                : 'rgba(16, 185, 129, 0.2)';
            ctx.lineWidth = 20;
            ctx.stroke();
        }
    }
};

// ===== TIMER LOGIC =====
const Timer = {
    start() {
        if (AppState.timer.isRunning) return;
        
        AppState.timer.isRunning = true;
        AppState.timer.isPaused = false;
        
        // Resume audio context
        if (AudioNotification.context && AudioNotification.context.state === 'suspended') {
            AudioNotification.context.resume();
        }
        
        timerInterval = setInterval(() => {
            if (AppState.timer.currentTime > 0) {
                AppState.timer.currentTime--;
                this.updateDisplay();
            } else {
                this.complete();
            }
        }, 1000);
        
        this.updateButtons();
    },
    
    pause() {
        AppState.timer.isRunning = false;
        AppState.timer.isPaused = true;
        clearInterval(timerInterval);
        this.updateButtons();
    },
    
    reset() {
        AppState.timer.isRunning = false;
        AppState.timer.isPaused = false;
        clearInterval(timerInterval);
        
        const duration = AppState.timer.mode === 'focus' 
            ? AppState.timer.focusDuration 
            : AppState.timer.breakDuration;
        
        AppState.timer.currentTime = duration * 60;
        AppState.timer.totalTime = duration * 60;
        
        this.updateDisplay();
        this.updateButtons();
    },
    
    complete() {
        clearInterval(timerInterval);
        AppState.timer.isRunning = false;
        
        // Play notification sound
        AudioNotification.play();
        
        // Add to history if it was a focus session
        if (AppState.timer.mode === 'focus') {
            this.addToHistory();
        }
        
        // Switch mode
        if (AppState.timer.mode === 'focus') {
            AppState.timer.mode = 'break';
            showToast('🎉 Fokus selesai! Waktunya istirahat', 'success');
        } else {
            AppState.timer.mode = 'focus';
            showToast('✨ Istirahat selesai! Siap fokus lagi?', 'success');
        }
        
        this.reset();
        this.updateDisplay();
    },
    
    addToHistory() {
        const duration = AppState.timer.focusDuration;
        const currentTask = AppState.tasks.find(t => t.id === AppState.timer.currentTaskId);
        
        AppState.history.push({
            id: Date.now(),
            date: new Date().toISOString(),
            taskName: currentTask ? currentTask.name : 'Tanpa task',
            duration: duration,
            timestamp: Date.now()
        });
        
        Storage.save();
        this.updateTodayStats();
        renderHistory();
    },
    
    updateDisplay() {
        const minutes = Math.floor(AppState.timer.currentTime / 60);
        const seconds = AppState.timer.currentTime % 60;
        
        const timerText = document.getElementById('timer-text');
        const timerMode = document.getElementById('timer-mode');
        
        timerText.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerMode.textContent = AppState.timer.mode === 'focus' ? 'Fokus' : 'Istirahat';
        
        // Update canvas
        const progress = 1 - (AppState.timer.currentTime / AppState.timer.totalTime);
        CanvasTimer.draw(progress);
        
        // Update page title
        document.title = `${timerText.textContent} - Letsfokus`;
    },
    
    updateButtons() {
        const startBtn = document.getElementById('start-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const resetBtn = document.getElementById('reset-btn');
        
        if (AppState.timer.isRunning) {
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        } else {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
        
        resetBtn.disabled = false;
    },
    
    updateTodayStats() {
        const today = new Date().toDateString();
        const todaySessions = AppState.history.filter(h => {
            return new Date(h.date).toDateString() === today;
        });
        
        const totalSessions = todaySessions.length;
        const totalMinutes = todaySessions.reduce((sum, session) => sum + session.duration, 0);
        
        document.getElementById('today-sessions').textContent = totalSessions;
        document.getElementById('today-minutes').textContent = totalMinutes;
    },
    
    updateSettings() {
        const focusDuration = parseInt(document.getElementById('focus-duration').value);
        const breakDuration = parseInt(document.getElementById('break-duration').value);
        
        AppState.timer.focusDuration = focusDuration;
        AppState.timer.breakDuration = breakDuration;
        
        // Only update current time if timer is not running
        if (!AppState.timer.isRunning) {
            const duration = AppState.timer.mode === 'focus' ? focusDuration : breakDuration;
            AppState.timer.currentTime = duration * 60;
            AppState.timer.totalTime = duration * 60;
            this.updateDisplay();
        }
        
        Storage.save();
    }
};

// ===== TASK MANAGEMENT =====
const TaskManager = {
    add(name, topic, category, estimate) {
        const task = {
            id: Date.now(),
            name,
            topic: topic || '',
            category: category || '',
            estimate: estimate || 0,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        AppState.tasks.push(task);
        Storage.save();
        this.render();
        this.updateTaskSelect();
        showToast('✅ Task berhasil ditambahkan!', 'success');
    },
    
    delete(id) {
        AppState.tasks = AppState.tasks.filter(t => t.id !== id);
        Storage.save();
        this.render();
        this.updateTaskSelect();
        showToast('🗑️ Task berhasil dihapus', 'success');
    },
    
    toggleComplete(id) {
        const task = AppState.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            Storage.save();
            this.render();
        }
    },
    
    render() {
        const container = document.getElementById('task-list');
        const categoryFilter = document.getElementById('filter-category').value;
        const statusFilter = document.getElementById('filter-status').value;
        
        let filteredTasks = AppState.tasks;
        
        // Apply category filter
        if (categoryFilter) {
            filteredTasks = filteredTasks.filter(t => t.category === categoryFilter);
        }
        
        // Apply status filter
        if (statusFilter === 'completed') {
            filteredTasks = filteredTasks.filter(t => t.completed);
        } else if (statusFilter === 'pending') {
            filteredTasks = filteredTasks.filter(t => !t.completed);
        }
        
        if (filteredTasks.length === 0) {
            container.innerHTML = '<p class="empty-state">Tidak ada task yang sesuai filter 🔍</p>';
            return;
        }
        
        container.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-header">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <div class="task-content">
                        <div class="task-name">${escapeHtml(task.name)}</div>
                        <div class="task-meta">
                            ${task.topic ? `<span class="task-meta-item">📌 ${escapeHtml(task.topic)}</span>` : ''}
                            ${task.category ? `<span class="task-category-badge">${escapeHtml(task.category)}</span>` : ''}
                            ${task.estimate ? `<span class="task-meta-item">⏱️ ${task.estimate}h</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-danger btn-small delete-task">Hapus</button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners
        container.querySelectorAll('.task-checkbox').forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                this.toggleComplete(filteredTasks[index].id);
            });
        });
        
        container.querySelectorAll('.delete-task').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (confirm('Yakin ingin menghapus task ini?')) {
                    this.deleteTask(filteredTasks[index].id);
                }
            });
        });
    },
    
    updateTaskSelect() {
        const select = document.getElementById('current-task-select');
        const activeTasks = AppState.tasks.filter(t => !t.completed);
        
        select.innerHTML = '<option value="">Pilih task...</option>' + 
            activeTasks.map(task => `
                <option value="${task.id}">${escapeHtml(task.name)}</option>
            `).join('');
    }
};

// ===== CATEGORY MANAGEMENT =====
const CategoryManager = {
    add(name) {
        if (!name || name.trim() === '') return;
        if (AppState.categories.includes(name)) {
            showToast('⚠️ Kategori sudah ada', 'warning');
            return;
        }
        
        AppState.categories.push(name);
        Storage.save();
        this.render();
        showToast('✅ Kategori berhasil ditambahkan!', 'success');
    },
    
    delete(name) {
        AppState.categories = AppState.categories.filter(c => c !== name);
        
        // Update tasks with this category
        AppState.tasks.forEach(task => {
            if (task.category === name) {
                task.category = '';
            }
        });
        
        Storage.save();
        this.render();
        TaskManager.render();
        showToast('🗑️ Kategori berhasil dihapus', 'success');
    },
    
    render() {
        // Render category tags
        const tagContainer = document.getElementById('category-list');
        tagContainer.innerHTML = AppState.categories.map(cat => `
            <span class="category-tag">
                ${escapeHtml(cat)}
                <button data-category="${escapeHtml(cat)}">×</button>
            </span>
        `).join('');
        
        // Add delete listeners
        tagContainer.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                if (confirm(`Hapus kategori "${category}"?`)) {
                    this.delete(category);
                }
            });
        });
        
        // Render category selects
        const taskCategorySelect = document.getElementById('task-category');
        const filterCategorySelect = document.getElementById('filter-category');
        
        const options = AppState.categories.map(cat => 
            `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`
        ).join('');
        
        taskCategorySelect.innerHTML = '<option value="">Pilih kategori...</option>' + options;
        filterCategorySelect.innerHTML = '<option value="">Semua kategori</option>' + options;
    }
};

// ===== HISTORY =====
function renderHistory() {
    const container = document.getElementById('history-list');
    const dateFilter = document.getElementById('history-date').value;
    
    let filteredHistory = AppState.history;
    
    if (dateFilter) {
        filteredHistory = filteredHistory.filter(h => {
            const historyDate = new Date(h.date).toISOString().split('T')[0];
            return historyDate === dateFilter;
        });
    }
    
    if (filteredHistory.length === 0) {
        container.innerHTML = '<p class="empty-state">Belum ada riwayat fokus 📊</p>';
        updateHistoryStats();
        return;
    }
    
    // Sort by date (newest first)
    filteredHistory.sort((a, b) => b.timestamp - a.timestamp);
    
    container.innerHTML = filteredHistory.map(item => {
        const date = new Date(item.date);
        const timeStr = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        
        return `
            <div class="history-item">
                <div class="history-time">${dateStr} • ${timeStr}</div>
                <div class="history-task">${escapeHtml(item.taskName)}</div>
                <span class="history-duration">${item.duration} menit</span>
            </div>
        `;
    }).join('');
    
    updateHistoryStats();
}

function updateHistoryStats() {
    const totalSessions = AppState.history.length;
    const totalMinutes = AppState.history.reduce((sum, h) => sum + h.duration, 0);
    const totalHours = (totalMinutes / 60).toFixed(1);
    const avgDuration = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;
    
    document.getElementById('total-sessions').textContent = totalSessions;
    document.getElementById('total-hours').textContent = totalHours;
    document.getElementById('avg-duration').textContent = avgDuration;
}

function copySummary() {
    const today = new Date().toDateString();
    const todaySessions = AppState.history.filter(h => {
        return new Date(h.date).toDateString() === today;
    });
    
    const totalSessions = todaySessions.length;
    const totalMinutes = todaySessions.reduce((sum, session) => sum + session.duration, 0);
    const totalHours = (totalMinutes / 60).toFixed(1);
    
    const summary = `📊 Ringkasan Fokus Hari Ini
📅 ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

✅ Total Sesi: ${totalSessions}
⏱️ Total Waktu: ${totalHours} jam (${totalMinutes} menit)

Sesi Detail:
${todaySessions.map((s, i) => {
    const time = new Date(s.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    return `${i + 1}. ${time} - ${s.taskName} (${s.duration} menit)`;
}).join('\n')}

---
Dibuat dengan Letsfokus 🎯`;
    
    navigator.clipboard.writeText(summary).then(() => {
        showToast('📋 Summary berhasil disalin!', 'success');
    }).catch(err => {
        showToast('❌ Gagal menyalin summary', 'error');
    });
}

// ===== PLANNER =====
function savePlanner() {
    const plannerText = document.getElementById('planner-text').value;
    AppState.planner = plannerText;
    Storage.save();
    
    const savedContainer = document.getElementById('saved-planner');
    if (plannerText.trim()) {
        savedContainer.innerHTML = `
            <h3>✅ Planner Tersimpan</h3>
            <div style="margin-top: 1rem; white-space: pre-wrap;">${escapeHtml(plannerText)}</div>
        `;
        showToast('💾 Planner berhasil disimpan!', 'success');
    } else {
        savedContainer.innerHTML = '';
    }
}

function loadPlanner() {
    document.getElementById('planner-text').value = AppState.planner;
    const savedContainer = document.getElementById('saved-planner');
    
    if (AppState.planner.trim()) {
        savedContainer.innerHTML = `
            <h3>✅ Planner Tersimpan</h3>
            <div style="margin-top: 1rem; white-space: pre-wrap;">${escapeHtml(AppState.planner)}</div>
        `;
    }
}

// ===== TAB NAVIGATION =====
function switchTab(tabName) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== INITIALIZATION =====
function init() {
    // Load data from localStorage
    Storage.load();
    
    // Initialize Canvas Timer
    CanvasTimer.init();
    CanvasTimer.draw(0);
    
    // Initialize Audio
    AudioNotification.init();
    
    // Update UI with loaded data
    document.getElementById('focus-duration').value = AppState.timer.focusDuration;
    document.getElementById('break-duration').value = AppState.timer.breakDuration;
    
    Timer.reset();
    Timer.updateDisplay();
    Timer.updateButtons();
    Timer.updateTodayStats();
    
    CategoryManager.render();
    TaskManager.render();
    TaskManager.updateTaskSelect();
    renderHistory();
    loadPlanner();
    
    // Event Listeners - Tab Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // Event Listeners - Timer Controls
    document.getElementById('start-btn').addEventListener('click', () => Timer.start());
    document.getElementById('pause-btn').addEventListener('click', () => Timer.pause());
    document.getElementById('reset-btn').addEventListener('click', () => Timer.reset());
    
    // Event Listeners - Timer Settings
    document.getElementById('focus-duration').addEventListener('change', () => Timer.updateSettings());
    document.getElementById('break-duration').addEventListener('change', () => Timer.updateSettings());
    
    // Event Listeners - Current Task Selection
    document.getElementById('current-task-select').addEventListener('change', (e) => {
        AppState.timer.currentTaskId = parseInt(e.target.value) || null;
    });
    
    // Event Listeners - Task Form
    document.getElementById('add-task-btn').addEventListener('click', () => {
        document.getElementById('task-form').classList.remove('hidden');
    });
    
    document.getElementById('cancel-task-btn').addEventListener('click', () => {
        document.getElementById('task-form').classList.add('hidden');
        clearTaskForm();
    });
    
    document.getElementById('save-task-btn').addEventListener('click', () => {
        const name = document.getElementById('task-name').value.trim();
        const topic = document.getElementById('task-topic').value.trim();
        const category = document.getElementById('task-category').value;
        const estimate = parseFloat(document.getElementById('task-estimate').value) || 0;
        
        if (!name) {
            showToast('⚠️ Nama task harus diisi!', 'warning');
            return;
        }
        
        TaskManager.add(name, topic, category, estimate);
        document.getElementById('task-form').classList.add('hidden');
        clearTaskForm();
    });
    
    // Event Listeners - Category Management
    document.getElementById('add-category-btn').addEventListener('click', () => {
        const input = document.getElementById('new-category');
        const name = input.value.trim();
        
        if (name) {
            CategoryManager.add(name);
            input.value = '';
        }
    });
    
    document.getElementById('new-category').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('add-category-btn').click();
        }
    });
    
    // Event Listeners - Task Filters
    document.getElementById('filter-category').addEventListener('change', () => TaskManager.render());
    document.getElementById('filter-status').addEventListener('change', () => TaskManager.render());
    
    // Event Listeners - History
    document.getElementById('copy-summary-btn').addEventListener('click', copySummary);
    document.getElementById('history-date').addEventListener('change', renderHistory);
    
    // Event Listeners - Planner
    document.getElementById('save-planner-btn').addEventListener('click', savePlanner);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Space to start/pause timer (only on timer tab)
        if (e.code === 'Space' && document.getElementById('timer-tab').classList.contains('active')) {
            e.preventDefault();
            if (AppState.timer.isRunning) {
                Timer.pause();
            } else {
                Timer.start();
            }
        }
        
        // R to reset timer
        if (e.code === 'KeyR' && document.getElementById('timer-tab').classList.contains('active')) {
            Timer.reset();
        }
    });
    
    // Auto-save on visibility change (when user switches tabs/apps)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            Storage.save();
        }
    });
}

function clearTaskForm() {
    document.getElementById('task-name').value = '';
    document.getElementById('task-topic').value = '';
    document.getElementById('task-category').value = '';
    document.getElementById('task-estimate').value = '';
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
