// DATA STRUCTURE & STATE MANAGEMENT
// ===================================

// Central Exercise Library
const EXERCISE_LIBRARY = [
    // Chest
    { id: "lib_chest_1", name: "Push-up", category: "Chest", defaultSets: 3, defaultReps: 12 },
    { id: "lib_chest_2", name: "Dumbbell Press", category: "Chest", defaultSets: 3, defaultReps: 10 },
    { id: "lib_chest_3", name: "Bench Press", category: "Chest", defaultSets: 3, defaultReps: 10 },
    { id: "lib_chest_4", name: "Chest Fly", category: "Chest", defaultSets: 3, defaultReps: 12 },
    
    // Arms
    { id: "lib_arms_1", name: "Bicep Curls", category: "Arms", defaultSets: 3, defaultReps: 12 },
    { id: "lib_arms_2", name: "Tricep Dips", category: "Arms", defaultSets: 3, defaultReps: 10 },
    { id: "lib_arms_3", name: "Hammer Curls", category: "Arms", defaultSets: 3, defaultReps: 12 },
    { id: "lib_arms_4", name: "Tricep Extension", category: "Arms", defaultSets: 3, defaultReps: 12 },
    
    // Shoulders
    { id: "lib_shoulders_1", name: "Shoulder Press", category: "Shoulders", defaultSets: 3, defaultReps: 10 },
    { id: "lib_shoulders_2", name: "Lateral Raise", category: "Shoulders", defaultSets: 3, defaultReps: 12 },
    { id: "lib_shoulders_3", name: "Front Raise", category: "Shoulders", defaultSets: 3, defaultReps: 12 },
    { id: "lib_shoulders_4", name: "Shrugs", category: "Shoulders", defaultSets: 3, defaultReps: 15 },
    
    // Back
    { id: "lib_back_1", name: "Pull-ups", category: "Back", defaultSets: 3, defaultReps: 8 },
    { id: "lib_back_2", name: "Bent-over Row", category: "Back", defaultSets: 3, defaultReps: 10 },
    { id: "lib_back_3", name: "Lat Pulldown", category: "Back", defaultSets: 3, defaultReps: 10 },
    { id: "lib_back_4", name: "Deadlift", category: "Back", defaultSets: 3, defaultReps: 8 },
    
    // Legs
    { id: "lib_legs_1", name: "Squat", category: "Legs", defaultSets: 4, defaultReps: 12 },
    { id: "lib_legs_2", name: "Lunges", category: "Legs", defaultSets: 3, defaultReps: 10 },
    { id: "lib_legs_3", name: "Leg Press", category: "Legs", defaultSets: 3, defaultReps: 12 },
    { id: "lib_legs_4", name: "Calf Raises", category: "Legs", defaultSets: 3, defaultReps: 15 },
    { id: "lib_legs_5", name: "Romanian Deadlift", category: "Legs", defaultSets: 3, defaultReps: 10 },
    { id: "lib_legs_6", name: "Plank", category: "Legs", defaultSets: 3, defaultReps: 30 }
];

// Default Workout Data
const DEFAULT_WORKOUTS = {
    monday: {
        name: "Monday Workout",
        description: "Upper body focus: Chest, Arms, Shoulders",
        exercises: [
            {
                id: "mon-1",
                name: "Push-up",
                category: "Chest",
                sets: 3,
                reps: 12,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "mon-2",
                name: "Dumbbell Press",
                category: "Chest",
                sets: 3,
                reps: 10,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "mon-3",
                name: "Bicep Curls",
                category: "Arms",
                sets: 3,
                reps: 12,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "mon-4",
                name: "Tricep Dips",
                category: "Arms",
                sets: 3,
                reps: 10,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "mon-5",
                name: "Shoulder Press",
                category: "Shoulders",
                sets: 3,
                reps: 10,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            }
        ]
    },
    wednesday: {
        name: "Wednesday Workout",
        description: "Lower body focus: Legs, Core",
        exercises: [
            {
                id: "wed-1",
                name: "Squat",
                category: "Legs",
                sets: 4,
                reps: 12,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false, false]
            },
            {
                id: "wed-2",
                name: "Lunges",
                category: "Legs",
                sets: 3,
                reps: 10,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "wed-3",
                name: "Leg Press",
                category: "Legs",
                sets: 3,
                reps: 12,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "wed-4",
                name: "Calf Raises",
                category: "Legs",
                sets: 3,
                reps: 15,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "wed-5",
                name: "Plank",
                category: "Legs",
                sets: 3,
                reps: 30,
                weight: { value: 0, unit: "sec" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            }
        ]
    },
    friday: {
        name: "Friday Workout",
        description: "Full body: Back, Chest, Legs",
        exercises: [
            {
                id: "fri-1",
                name: "Pull-ups",
                category: "Back",
                sets: 3,
                reps: 8,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "fri-2",
                name: "Bent-over Row",
                category: "Back",
                sets: 3,
                reps: 10,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "fri-3",
                name: "Bench Press",
                category: "Chest",
                sets: 3,
                reps: 10,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "fri-4",
                name: "Deadlift",
                category: "Legs",
                sets: 3,
                reps: 8,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            },
            {
                id: "fri-5",
                name: "Romanian Deadlift",
                category: "Legs",
                sets: 3,
                reps: 10,
                weight: { value: 0, unit: "kg" },
                completed: false,
                currentSet: 0,
                setsCompleted: [false, false, false]
            }
        ]
    },
    custom: {
        name: "Custom Workout",
        description: "Build your own routine",
        exercises: []
    }
};

// Global State
let appState = {
    currentRoutine: 'monday',
    workouts: {},
    preferences: {
        theme: 'light',
        weightUnit: 'kg'
    },
    workoutHistory: []
};

// ===================================
// LOCALSTORAGE FUNCTIONS
// ===================================

function initializeApp() {
    // Load from localStorage or use defaults
    const savedData = localStorage.getItem('homeWorkout101');
    
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            appState = { ...appState, ...parsed };
        } catch (e) {
            console.error('Failed to parse saved data:', e);
            appState.workouts = JSON.parse(JSON.stringify(DEFAULT_WORKOUTS));
        }
    } else {
        // First time user - initialize with defaults
        appState.workouts = JSON.parse(JSON.stringify(DEFAULT_WORKOUTS));
    }
    
    // Load theme preference (separate for backward compatibility)
    const savedTheme = localStorage.getItem('theme') || 'light';
    appState.preferences.theme = savedTheme;
    
    // Load current routine
    const savedRoutine = localStorage.getItem('currentRoutine') || 'monday';
    appState.currentRoutine = savedRoutine;
    
    // Save initial state
    saveToLocalStorage();
}

function saveToLocalStorage() {
    try {
        const dataToSave = {
            workouts: appState.workouts,
            preferences: appState.preferences,
            workoutHistory: appState.workoutHistory,
            currentRoutine: appState.currentRoutine
        };
        localStorage.setItem('homeWorkout101', JSON.stringify(dataToSave));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

// ===================================
// STATE MANAGEMENT FUNCTIONS
// ===================================

function getCurrentWorkout() {
    return appState.workouts[appState.currentRoutine];
}

function getExerciseById(exerciseId) {
    const workout = getCurrentWorkout();
    return workout.exercises.find(ex => ex.id === exerciseId);
}

function updateExercise(exerciseId, updates) {
    const workout = getCurrentWorkout();
    const exerciseIndex = workout.exercises.findIndex(ex => ex.id === exerciseId);
    
    if (exerciseIndex !== -1) {
        workout.exercises[exerciseIndex] = {
            ...workout.exercises[exerciseIndex],
            ...updates
        };
        saveToLocalStorage();
        return true;
    }
    return false;
}

function toggleSetComplete(exerciseId, setIndex) {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return false;
    
    // Toggle the set completion
    exercise.setsCompleted[setIndex] = !exercise.setsCompleted[setIndex];
    
    // Update currentSet to next incomplete set
    const nextIncompleteSet = exercise.setsCompleted.findIndex(completed => !completed);
    exercise.currentSet = nextIncompleteSet !== -1 ? nextIncompleteSet : exercise.sets - 1;
    
    // Check if all sets are completed
    exercise.completed = exercise.setsCompleted.every(completed => completed);
    
    updateExercise(exerciseId, exercise);
    return true;
}

function resetExercise(exerciseId) {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return false;
    
    const updates = {
        completed: false,
        currentSet: 0,
        setsCompleted: Array(exercise.sets).fill(false)
    };
    
    updateExercise(exerciseId, updates);
    return true;
}

function resetCurrentWorkout() {
    const workout = getCurrentWorkout();
    workout.exercises.forEach(exercise => {
        exercise.completed = false;
        exercise.currentSet = 0;
        exercise.setsCompleted = Array(exercise.sets).fill(false);
    });
    saveToLocalStorage();
}

function saveWorkoutToHistory() {
    const workout = getCurrentWorkout();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const historyEntry = {
        date: today,
        routine: appState.currentRoutine,
        exercises: JSON.parse(JSON.stringify(workout.exercises))
    };
    
    appState.workoutHistory.push(historyEntry);
    saveToLocalStorage();
}

function switchRoutine(routineName) {
    appState.currentRoutine = routineName;
    localStorage.setItem('currentRoutine', routineName);
    saveToLocalStorage();
}

// ===================================
// UI RENDERING FUNCTIONS
// ===================================

function renderExerciseCard(exercise) {
    const card = document.createElement('div');
    card.className = `exercise-card ${exercise.completed ? 'completed' : ''}`;
    card.setAttribute('data-exercise-id', exercise.id);
    
    // Exercise Header
    const header = document.createElement('div');
    header.className = 'exercise-header';
    
    const info = document.createElement('div');
    info.className = 'exercise-info';
    
    const name = document.createElement('div');
    name.className = 'exercise-name';
    name.textContent = exercise.name;
    
    const meta = document.createElement('div');
    meta.className = 'exercise-meta';
    meta.innerHTML = `${exercise.sets} sets × ${exercise.reps} reps`;
    
    info.appendChild(name);
    info.appendChild(meta);
    
    // Category Badge
    const badge = document.createElement('span');
    badge.className = `category-badge ${exercise.category.toLowerCase()}`;
    badge.textContent = exercise.category;
    
    header.appendChild(info);
    header.appendChild(badge);
    card.appendChild(header);
    
    // Sets List
    const setsList = document.createElement('div');
    setsList.className = 'sets-list';
    
    for (let i = 0; i < exercise.sets; i++) {
        const setItem = document.createElement('div');
        setItem.className = 'set-item';
        
        if (i === exercise.currentSet && !exercise.completed) {
            setItem.classList.add('active');
        }
        
        if (exercise.setsCompleted[i]) {
            setItem.classList.add('completed');
        }
        
        setItem.setAttribute('data-set-index', i);
        
        // Checkbox
        const checkbox = document.createElement('div');
        checkbox.className = 'set-checkbox';
        checkbox.innerHTML = '<span class="set-checkbox-icon">✓</span>';
        
        // Set Text
        const setText = document.createElement('div');
        setText.className = 'set-text';
        setText.textContent = `Set ${i + 1}: ${exercise.reps} reps`;
        
        setItem.appendChild(checkbox);
        setItem.appendChild(setText);
        
        // Click handler
        setItem.addEventListener('click', () => {
            const wasCompleted = exercise.setsCompleted[i];
            toggleSetComplete(exercise.id, i);
            renderCurrentWorkout();
            
            // Auto-open timer after completing a set (not the last set)
            if (!wasCompleted && i < exercise.sets - 1) {
                // Small delay to let UI update first
                setTimeout(() => {
                    openTimerModal(exercise.id, 60); // Default 60 seconds rest
                }, 300);
            }
        });
        
        setsList.appendChild(setItem);
    }
    
    card.appendChild(setsList);
    
    // Weight Input (optional)
    if (exercise.weight.value > 0 || exercise.category !== 'Core') {
        const weightGroup = document.createElement('div');
        weightGroup.className = 'weight-input-group';
        
        const weightLabel = document.createElement('div');
        weightLabel.className = 'weight-label';
        weightLabel.textContent = 'Weight:';
        
        const weightWrapper = document.createElement('div');
        weightWrapper.className = 'weight-input-wrapper';
        
        const weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.className = 'weight-input';
        weightInput.value = exercise.weight.value;
        weightInput.min = '0';
        weightInput.step = '0.5';
        weightInput.addEventListener('change', (e) => {
            updateExercise(exercise.id, {
                weight: { ...exercise.weight, value: parseFloat(e.target.value) || 0 }
            });
        });
        
        const unitToggle = document.createElement('button');
        unitToggle.className = 'weight-unit-toggle';
        unitToggle.textContent = exercise.weight.unit;
        unitToggle.addEventListener('click', () => {
            const newUnit = exercise.weight.unit === 'kg' ? 'lb' : 'kg';
            updateExercise(exercise.id, {
                weight: { ...exercise.weight, unit: newUnit }
            });
            renderCurrentWorkout();
        });
        
        weightWrapper.appendChild(weightInput);
        weightWrapper.appendChild(unitToggle);
        
        weightGroup.appendChild(weightLabel);
        weightGroup.appendChild(weightWrapper);
        
        card.appendChild(weightGroup);
    }
    
    // Exercise Actions
    const actions = document.createElement('div');
    actions.className = 'exercise-actions';
    
    // Check if this is a custom routine
    const isCustomRoutine = appState.currentRoutine === 'custom';
    
    if (isCustomRoutine) {
        // Reorder buttons (up/down)
        const workout = getCurrentWorkout();
        const exerciseIndex = workout.exercises.findIndex(ex => ex.id === exercise.id);
        
        const upBtn = document.createElement('button');
        upBtn.className = 'btn';
        upBtn.textContent = '↑';
        upBtn.disabled = exerciseIndex === 0;
        upBtn.addEventListener('click', () => {
            moveExerciseUp(exercise.id);
        });
        
        const downBtn = document.createElement('button');
        downBtn.className = 'btn';
        downBtn.textContent = '↓';
        downBtn.disabled = exerciseIndex === workout.exercises.length - 1;
        downBtn.addEventListener('click', () => {
            moveExerciseDown(exercise.id);
        });
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn';
        removeBtn.textContent = '× Remove';
        removeBtn.addEventListener('click', () => {
            removeExerciseFromCustom(exercise.id);
        });
        
        actions.appendChild(upBtn);
        actions.appendChild(downBtn);
        actions.appendChild(removeBtn);
    } else {
        // Default routines - timer and reset only
        const timerBtn = document.createElement('button');
        timerBtn.className = 'btn btn-primary';
        timerBtn.textContent = '⏱️ Rest Timer';
        timerBtn.addEventListener('click', () => {
            quickStartRestTimer(exercise.id);
        });
        
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn';
        resetBtn.textContent = 'Reset';
        resetBtn.addEventListener('click', () => {
            resetExercise(exercise.id);
            renderCurrentWorkout();
        });
        
        actions.appendChild(timerBtn);
        actions.appendChild(resetBtn);
    }
    
    card.appendChild(actions);
    
    return card;
}

function renderCurrentWorkout() {
    const workout = getCurrentWorkout();
    const routineView = document.getElementById(`${appState.currentRoutine}-view`);
    const exercisesList = routineView.querySelector('.exercises-list');
    const summaryContainer = document.getElementById(`${appState.currentRoutine}-summary`);
    const isCustomRoutine = appState.currentRoutine === 'custom';
    
    // Clear existing content
    exercisesList.innerHTML = '';
    
    // Render exercises or empty state
    if (workout.exercises.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div class="empty-state-icon">馃挭</div>
            <div class="empty-state-text">No exercises yet. ${isCustomRoutine ? 'Add some to get started!' : ''}</div>
        `;
        exercisesList.appendChild(emptyState);
        summaryContainer.style.display = 'none';
    } else {
        // Render summary
        renderWorkoutSummary();
        summaryContainer.style.display = 'block';
        
        // Render exercises
        workout.exercises.forEach(exercise => {
            const card = renderExerciseCard(exercise);
            exercisesList.appendChild(card);
        });
    }
    
    // Add "Add Exercises" button for custom routines
    if (isCustomRoutine) {
        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-primary btn-large';
        addBtn.textContent = '+ Add Exercises';
        addBtn.style.width = '100%';
        addBtn.style.marginTop = workout.exercises.length > 0 ? 'var(--spacing-md)' : '0';
        addBtn.addEventListener('click', openLibraryModal);
        exercisesList.appendChild(addBtn);
    }
    
    // Update footer buttons
    updateFooterButtons();
}

function getWorkoutStats() {
    const workout = getCurrentWorkout();
    
    let totalSets = 0;
    let completedSets = 0;
    let totalExercises = workout.exercises.length;
    let completedExercises = 0;
    
    workout.exercises.forEach(exercise => {
        totalSets += exercise.sets;
        completedSets += exercise.setsCompleted.filter(s => s).length;
        if (exercise.completed) completedExercises++;
    });
    
    const progressPercentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
    
    return {
        totalExercises,
        completedExercises,
        totalSets,
        completedSets,
        progressPercentage
    };
}

function renderWorkoutSummary() {
    const stats = getWorkoutStats();
    const summaryContainer = document.getElementById(`${appState.currentRoutine}-summary`);
    
    summaryContainer.innerHTML = `
        <div class="summary-grid">
            <div class="summary-item">
                <div class="summary-value">${stats.completedExercises}/${stats.totalExercises}</div>
                <div class="summary-label">Exercises</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${stats.completedSets}/${stats.totalSets}</div>
                <div class="summary-label">Sets</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${stats.progressPercentage}%</div>
                <div class="summary-label">Progress</div>
            </div>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${stats.progressPercentage}%"></div>
        </div>
        <div class="progress-text">
            ${stats.progressPercentage === 100 ? '馃帀 Workout Complete! Great job!' : 'Keep going, you got this!'}
        </div>
    `;
}

function updateFooterButtons() {
    const stats = getWorkoutStats();
    const completeBtn = document.getElementById('completeWorkoutBtn');
    const workout = getCurrentWorkout();
    
    // Enable complete button only if all exercises are done
    if (stats.progressPercentage === 100 && workout.exercises.length > 0) {
        completeBtn.disabled = false;
    } else {
        completeBtn.disabled = true;
    }
}

function completeWorkout() {
    const workout = getCurrentWorkout();
    
    if (workout.exercises.length === 0) return;
    
    // Check if all exercises are completed
    const allCompleted = workout.exercises.every(ex => ex.completed);
    
    if (!allCompleted) {
        alert('Please complete all exercises before finishing the workout!');
        return;
    }
    
    // Save to history
    saveWorkoutToHistory();
    
    // Reset current workout
    resetCurrentWorkout();
    
    // Celebrate!
    const completeBtn = document.getElementById('completeWorkoutBtn');
    completeBtn.textContent = '鉁� Saved!';
    completeBtn.classList.add('celebrating');
    
    setTimeout(() => {
        completeBtn.textContent = 'Complete Workout';
        completeBtn.classList.remove('celebrating');
        renderCurrentWorkout();
    }, 2000);
}

// ===================================
// AUDIO SYSTEM (Web Audio API)
// ===================================
let audioContext = null;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playBeep(frequency = 800, duration = 100) {
    try {
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration / 1000);
    } catch (e) {
        // Audio not available - silent fail
    }
}

function playSuccessSound() {
    playBeep(880, 100);
    setTimeout(() => playBeep(1108, 150), 100);
}

function playWarningBeep() {
    playBeep(600, 200);
}

// ===================================
// TIMER SYSTEM (REST TIMER)
// ===================================

let timerState = {
    isRunning: false,
    isPaused: false,
    duration: 60,
    remaining: 60,
    intervalId: null,
    currentExerciseId: null
};

function openTimerModal(exerciseId = null, duration = 60) {
    timerState.duration = duration;
    timerState.remaining = duration;
    timerState.currentExerciseId = exerciseId;
    timerState.isPaused = false;
    
    const overlay = document.getElementById('timerOverlay');
    const durationInput = document.getElementById('timerDuration');
    const startBtn = document.getElementById('timerStartBtn');
    const skipBtn = document.getElementById('timerSkipBtn');
    const progressCircle = document.getElementById('timerProgressCircle');
    const progressText = document.getElementById('timerProgressText');
    
    // IMPORTANT: Reset warning/danger classes to fix color bug
    progressCircle.classList.remove('warning', 'danger');
    progressText.classList.remove('warning', 'danger');
    
    durationInput.value = duration;
    overlay.classList.add('active');
    startBtn.style.display = 'block';
    skipBtn.style.display = 'none';
    
    updateTimerDisplay();
}

function closeTimerModal() {
    const overlay = document.getElementById('timerOverlay');
    overlay.classList.remove('active');
    stopTimer();
}

function startTimer() {
    const durationInput = document.getElementById('timerDuration');
    const startBtn = document.getElementById('timerStartBtn');
    const skipBtn = document.getElementById('timerSkipBtn');
    
    timerState.duration = parseInt(durationInput.value) || 60;
    timerState.remaining = timerState.duration;
    timerState.isRunning = true;
    timerState.isPaused = false;
    
    startBtn.style.display = 'none';
    skipBtn.style.display = 'block';
    
    // Play start beep
    playBeep(600, 150);
    
    timerState.intervalId = setInterval(() => {
        if (!timerState.isPaused) {
            timerState.remaining--;
            
            updateTimerDisplay();
            
            // Beep at 3, 2, 1
            if (timerState.remaining === 3 || timerState.remaining === 2 || timerState.remaining === 1) {
                playBeep(800, 100);
            }
            
            // Timer complete
            if (timerState.remaining <= 0) {
                playBeep(1000, 300); // Final beep
                stopTimer();
                closeTimerModal();
            }
        }
    }, 1000);
}

function stopTimer() {
    if (timerState.intervalId) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
    }
    timerState.isRunning = false;
    timerState.isPaused = false;
}

function updateTimerDisplay() {
    const display = document.getElementById('timerProgressText');
    const circle = document.getElementById('timerProgressCircle');
    
    display.textContent = timerState.remaining;
    
    // Update circle progress
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const progress = timerState.remaining / timerState.duration;
    const offset = circumference * (1 - progress);
    
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
    
    // IMPORTANT: Remove all color classes first to prevent bug
    display.classList.remove('warning', 'danger');
    circle.classList.remove('warning', 'danger');
    
    // Apply color based on remaining time
    if (timerState.remaining <= 3 && timerState.remaining > 0) {
        display.classList.add('danger');
        circle.classList.add('danger');
    } else if (timerState.remaining <= 10 && timerState.remaining > 3) {
        display.classList.add('warning');
        circle.classList.add('warning');
    }
}

// Quick start rest timer from exercise card
function quickStartRestTimer(exerciseId) {
    openTimerModal(exerciseId, 60);
    setTimeout(() => startTimer(), 300); // Small delay for smooth UX
}

// ===================================
// EXERCISE LIBRARY MODAL
// ===================================

let libraryState = {
    selectedExercises: [],
    currentFilter: 'All',
    searchQuery: ''
};

function openLibraryModal() {
    const overlay = document.getElementById('libraryOverlay');
    libraryState.selectedExercises = [];
    libraryState.currentFilter = 'All';
    libraryState.searchQuery = '';
    
    document.getElementById('librarySearch').value = '';
    overlay.classList.add('active');
    renderLibraryList();
    updateSelectedCount();
}

function closeLibraryModal() {
    const overlay = document.getElementById('libraryOverlay');
    overlay.classList.remove('active');
    libraryState.selectedExercises = [];
}

function renderLibraryList() {
    const list = document.getElementById('libraryList');
    list.innerHTML = '';
    
    // Filter exercises
    let filtered = EXERCISE_LIBRARY.filter(ex => {
        const matchCategory = libraryState.currentFilter === 'All' || ex.category === libraryState.currentFilter;
        const matchSearch = ex.name.toLowerCase().includes(libraryState.searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });
    
    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-state-text">No exercises found</div></div>';
        return;
    }
    
    filtered.forEach(exercise => {
        const item = document.createElement('div');
        item.className = 'library-item';
        
        if (libraryState.selectedExercises.includes(exercise.id)) {
            item.classList.add('selected');
        }
        
        item.innerHTML = `
            <div class="library-checkbox">
                <span class="library-checkbox-icon">鉁�</span>
            </div>
            <div class="library-item-info">
                <div class="library-item-name">${exercise.name}</div>
                <div class="library-item-meta">${exercise.category} 鈥� ${exercise.defaultSets} sets 脳 ${exercise.defaultReps} reps</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            toggleExerciseSelection(exercise.id);
        });
        
        list.appendChild(item);
    });
}

function toggleExerciseSelection(exerciseId) {
    const index = libraryState.selectedExercises.indexOf(exerciseId);
    
    if (index > -1) {
        libraryState.selectedExercises.splice(index, 1);
    } else {
        libraryState.selectedExercises.push(exerciseId);
    }
    
    renderLibraryList();
    updateSelectedCount();
}

function updateSelectedCount() {
    document.getElementById('selectedCount').textContent = libraryState.selectedExercises.length;
}

function addSelectedExercisesToCustom() {
    if (libraryState.selectedExercises.length === 0) {
        return;
    }
    
    const workout = getCurrentWorkout();
    const nextId = workout.exercises.length;
    
    libraryState.selectedExercises.forEach((libId, index) => {
        const libExercise = EXERCISE_LIBRARY.find(ex => ex.id === libId);
        
        const newExercise = {
            id: `${appState.currentRoutine}_${nextId + index}_${Date.now()}`,
            name: libExercise.name,
            category: libExercise.category,
            sets: libExercise.defaultSets,
            reps: libExercise.defaultReps,
            weight: { value: 0, unit: "kg" },
            completed: false,
            currentSet: 0,
            setsCompleted: Array(libExercise.defaultSets).fill(false)
        };
        
        workout.exercises.push(newExercise);
    });
    
    saveToLocalStorage();
    closeLibraryModal();
    renderCurrentWorkout();
}

// ===================================
// CUSTOM ROUTINE MANAGEMENT
// ===================================

function removeExerciseFromCustom(exerciseId) {
    if (appState.currentRoutine === 'monday' || appState.currentRoutine === 'wednesday' || appState.currentRoutine === 'friday') {
        alert('Cannot remove exercises from default routines!');
        return;
    }
    
    if (!confirm('Remove this exercise?')) {
        return;
    }
    
    const workout = getCurrentWorkout();
    const index = workout.exercises.findIndex(ex => ex.id === exerciseId);
    
    if (index > -1) {
        workout.exercises.splice(index, 1);
        saveToLocalStorage();
        renderCurrentWorkout();
    }
}

function moveExerciseUp(exerciseId) {
    if (appState.currentRoutine === 'monday' || appState.currentRoutine === 'wednesday' || appState.currentRoutine === 'friday') {
        return;
    }
    
    const workout = getCurrentWorkout();
    const index = workout.exercises.findIndex(ex => ex.id === exerciseId);
    
    if (index > 0) {
        [workout.exercises[index - 1], workout.exercises[index]] = 
        [workout.exercises[index], workout.exercises[index - 1]];
        
        saveToLocalStorage();
        renderCurrentWorkout();
    }
}

function moveExerciseDown(exerciseId) {
    if (appState.currentRoutine === 'monday' || appState.currentRoutine === 'wednesday' || appState.currentRoutine === 'friday') {
        return;
    }
    
    const workout = getCurrentWorkout();
    const index = workout.exercises.findIndex(ex => ex.id === exerciseId);
    
    if (index < workout.exercises.length - 1) {
        [workout.exercises[index], workout.exercises[index + 1]] = 
        [workout.exercises[index + 1], workout.exercises[index]];
        
        saveToLocalStorage();
        renderCurrentWorkout();
    }
}

// ===================================
// THEME MANAGEMENT
// ===================================
const themeToggle = document.getElementById('themeToggle');
const themeColorMeta = document.getElementById('theme-color-meta');
const html = document.documentElement;

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    appState.preferences.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    saveToLocalStorage();
});

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
        themeToggle.textContent = '鈽€锔� Light';
        themeColorMeta.setAttribute('content', '#191919');
    } else {
        themeToggle.textContent = '馃寵 Dark';
        themeColorMeta.setAttribute('content', '#FFFFFF');
    }
}

// ===================================
// ROUTINE TAB NAVIGATION
// ===================================
const routineTabs = document.querySelectorAll('.routine-tab');
const routineViews = document.querySelectorAll('.routine-view');

routineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const routineName = tab.getAttribute('data-routine');
        switchRoutine(routineName);
    });
});

function switchRoutine(routineName) {
    // Update active tab
    routineTabs.forEach(tab => {
        if (tab.getAttribute('data-routine') === routineName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update active view
    routineViews.forEach(view => {
        if (view.id === `${routineName}-view`) {
            view.classList.add('active');
        } else {
            view.classList.remove('active');
        }
    });
    
    // Save current routine to state
    appState.currentRoutine = routineName;
    localStorage.setItem('currentRoutine', routineName);
    saveToLocalStorage();
    
    // Re-render the workout
    renderCurrentWorkout();
}

// Load last viewed routine on page load
window.addEventListener('DOMContentLoaded', () => {
    // Initialize app data
    initializeApp();
    
    // Set theme
    setTheme(appState.preferences.theme);
    
    // Switch to saved routine
    switchRoutine(appState.currentRoutine);
    
    // Render the workout
    renderCurrentWorkout();
    
    // Attach footer button listeners
    document.getElementById('resetWorkoutBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all exercises?')) {
            resetCurrentWorkout();
            renderCurrentWorkout();
        }
    });
    
    document.getElementById('completeWorkoutBtn').addEventListener('click', () => {
        completeWorkout();
    });
    
    // Timer button listeners
    document.getElementById('timerCancelBtn').addEventListener('click', () => {
        closeTimerModal();
    });
    
    document.getElementById('timerStartBtn').addEventListener('click', () => {
        startTimer();
    });
    
    document.getElementById('timerSkipBtn').addEventListener('click', () => {
        closeTimerModal();
    });
    
    // Timer duration input validation
    document.getElementById('timerDuration').addEventListener('change', (e) => {
        const value = parseInt(e.target.value) || 60;
        if (value < 5) e.target.value = 5;
        if (value > 300) e.target.value = 300;
    });
    
    // Library modal listeners
    document.getElementById('libraryCancelBtn').addEventListener('click', closeLibraryModal);
    document.getElementById('libraryAddBtn').addEventListener('click', addSelectedExercisesToCustom);
    
    // Library filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            libraryState.currentFilter = btn.getAttribute('data-category');
            renderLibraryList();
        });
    });
    
    // Library search
    document.getElementById('librarySearch').addEventListener('input', (e) => {
        libraryState.searchQuery = e.target.value;
        renderLibraryList();
    });