// Prayer schedule with enable windows
const prayerSchedule = {
    'Subuh': { start: '04:30', end: '06:00' },
    'Dzuhur': { start: '11:00', end: '15:00' },
    'Ashar': { start: '15:00', end: '18:00' },
    'Maghrib': { start: '18:00', end: '19:00' },
    'Isya': { start: '19:00', end: '04:30' } // cross midnight
};

const prayers = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];

let state = {
    date: getCurrentIslamicDay(),
    data: {}
};

// Get current "Islamic day" (day starts at 04:30, not 00:00)
function getCurrentIslamicDay() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // If before 04:30, consider it as previous day
    if (hours < 4 || (hours === 4 && minutes < 30)) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toLocaleDateString('id-ID');
    }
    
    return now.toLocaleDateString('id-ID');
}

// Convert time string "HH:MM" to minutes since midnight
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Get current time in minutes since midnight
function getCurrentMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

// Check if current time is within enable window for a prayer
function isPrayerEnabled(prayerName) {
    const schedule = prayerSchedule[prayerName];
    const currentMinutes = getCurrentMinutes();
    const startMinutes = timeToMinutes(schedule.start);
    const endMinutes = timeToMinutes(schedule.end);
    
    // Special case for Isya (cross midnight: 19:00 to 04:30)
    if (prayerName === 'Isya') {
        // Enabled if >= 19:00 OR <= 04:30
        return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
    }
    
    // Normal case
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

// Get status label for a prayer
function getPrayerStatus(prayerName, isDone) {
    if (isDone) {
        return { label: 'Selesai', class: 'status-selesai' };
    }
    
    const schedule = prayerSchedule[prayerName];
    const currentMinutes = getCurrentMinutes();
    const startMinutes = timeToMinutes(schedule.start);
    const endMinutes = timeToMinutes(schedule.end);
    
    // Special case for Isya (cross midnight)
    if (prayerName === 'Isya') {
        // Before 19:00 and after 04:30 = belum waktunya
        if (currentMinutes > endMinutes && currentMinutes < startMinutes) {
            return { label: 'Belum Waktunya', class: 'status-belum-waktunya' };
        }
        // Between 19:00-23:59 or 00:00-04:30 = belum (active window)
        return { label: 'Belum', class: 'status-belum' };
    }
    
    // Normal prayers
    if (currentMinutes < startMinutes) {
        return { label: 'Belum Waktunya', class: 'status-belum-waktunya' };
    } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        return { label: 'Belum', class: 'status-belum' };
    } else {
        return { label: 'Ketinggalan', class: 'status-ketinggalan' };
    }
}

// Get prayer display name (handle Friday Dzuhur)
function getPrayerDisplayName(prayerName) {
    if (prayerName === 'Dzuhur') {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 5 = Friday
        if (dayOfWeek === 5) {
            return 'Dzuhur / Jumat';
        }
    }
    return prayerName;
}

function init() {
    // Setup Date Display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = new Date().toLocaleDateString('id-ID', options);

    // Load Data
    const savedData = localStorage.getItem('sholat_tracker_v1');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        
        // Check if date changed (auto reset at 04:30)
        if (parsed.date === state.date) {
            state.data = parsed.data;
        } else {
            // Date changed, reset data but keep the structure
            console.log('New day detected, resetting data...');
        }
    }

    // Initialize empty data if not exists
    prayers.forEach(p => {
        if (!state.data[p]) {
            state.data[p] = { done: false, jamaah: false };
        }
    });

    // Save initial state with current date
    saveData();
    
    renderList();
    updateProgress();
    checkTheme();
}

function renderList() {
    const listContainer = document.getElementById('prayer-list');
    listContainer.innerHTML = '';

    prayers.forEach(p => {
        const item = state.data[p];
        const isEnabled = isPrayerEnabled(p);
        const status = getPrayerStatus(p, item.done);
        const displayName = getPrayerDisplayName(p);
        
        // Determine if this prayer item should be disabled
        // Disabled if: not enabled AND not done
        const shouldDisable = !isEnabled && !item.done;
        
        const card = document.createElement('div');
        card.className = `prayer-card ${item.done ? 'done' : ''} ${shouldDisable ? 'prayer-disabled' : ''} glass-card`;
        
        card.innerHTML = `
            <div class="prayer-card-left">
                <button onclick="toggleDone('${p}')" class="prayer-button ${item.done ? 'done' : ''}" ${shouldDisable ? 'disabled' : ''}>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <use href="#icon-${item.done ? 'check' : 'pray'}"></use>
                    </svg>
                </button>
                <div class="prayer-info">
                    <h3 class="prayer-name">${displayName}</h3>
                    <span class="prayer-status ${status.class}">${status.label}</span>
                </div>
            </div>
            <div class="prayer-card-right">
                <button onclick="toggleJamaah('${p}')" class="jamaah-button ${item.jamaah ? 'active' : ''}" ${shouldDisable ? 'disabled' : ''}>
                    <div class="jamaah-icon ${item.jamaah ? 'active' : ''}">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <use href="#icon-mosque"></use>
                        </svg>
                    </div>
                    <span class="jamaah-label">${item.jamaah ? 'JAMAAH' : 'JAMAAH'}</span>
                </button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function toggleDone(prayer) {
    // Check if prayer is enabled
    if (!isPrayerEnabled(prayer) && !state.data[prayer].done) {
        return; // Don't allow toggle if disabled and not done
    }
    
    state.data[prayer].done = !state.data[prayer].done;
    
    // If unchecking, also uncheck jamaah
    if (!state.data[prayer].done) {
        state.data[prayer].jamaah = false;
    }
    
    saveAndRefresh();
}

function toggleJamaah(prayer) {
    // Check if prayer is enabled
    if (!isPrayerEnabled(prayer) && !state.data[prayer].done) {
        return; // Don't allow toggle if disabled
    }
    
    // Otomatis tandai 'done' jika klik jamaah
    if (!state.data[prayer].done) state.data[prayer].done = true;
    state.data[prayer].jamaah = !state.data[prayer].jamaah;
    saveAndRefresh();
}

function saveData() {
    localStorage.setItem('sholat_tracker_v1', JSON.stringify(state));
}

function saveAndRefresh() {
    saveData();
    renderList();
    updateProgress();
}

function updateProgress() {
    const total = prayers.length;
    const completed = Object.values(state.data).filter(d => d.done).length;
    const percent = Math.round((completed / total) * 100);

    // Progress Ring UI
    const circle = document.getElementById('progress-bar');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;

    // Text UI
    document.getElementById('percent-text').innerText = `${percent}%`;
    
    const statusLabel = document.getElementById('progress-status');
    if (percent === 100) statusLabel.innerText = "Maa Shaa Allah, sempurna!";
    else if (percent >= 60) statusLabel.innerText = "Sedikit lagi, ayo!";
    else statusLabel.innerText = "Semangat istiqomah!";
}

function resetData() {
    if (confirm('Hapus semua progres hari ini?')) {
        prayers.forEach(p => {
            state.data[p] = { done: false, jamaah: false };
        });
        saveAndRefresh();
    }
}

function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
    
    const newIsDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    updateThemeIcon();
}

function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    const isDark = document.body.classList.contains('dark-theme');
    
    if (isDark) {
        // Show sun icon
        icon.innerHTML = '<use href="#icon-sun"></use>';
    } else {
        // Show moon icon
        icon.innerHTML = '<use href="#icon-moon"></use>';
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 2000);
}

// Run on load
window.onload = init;
