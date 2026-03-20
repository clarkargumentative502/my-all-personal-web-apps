/* ========================================
   GLOBAL STATE
   ======================================== */
const state = {
    nama: '',
    keluarga: false,
    theme: 'pink', // 'pink' or 'tosca'
    hijriyahYear: '1446',
    currentView: 'form'
};

/* ========================================
   DOM ELEMENTS
   ======================================== */
const elements = {
    // Form Elements
    viewForm: document.getElementById('view-form'),
    viewCard: document.getElementById('view-card'),
    cardForm: document.getElementById('card-form'),
    namaInput: document.getElementById('nama-input'),
    keluargaCheckbox: document.getElementById('keluarga-checkbox'),
    charCounter: document.getElementById('char-counter'),
    themeOptions: document.querySelectorAll('.theme-option'),
    
    // Card Elements
    cardDisplay: document.getElementById('card-display'),
    
    // Share Elements
    urlDisplay: document.getElementById('url-display'),
    btnCopyUrl: document.getElementById('btn-copy-url'),
    btnShareWa: document.getElementById('btn-share-wa'),
    btnShareTg: document.getElementById('btn-share-tg'),
    btnDownload: document.getElementById('btn-download'),
    btnBack: document.getElementById('btn-back'),
    qrCanvas: document.getElementById('qr-canvas'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
};

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Sanitize input (prevent XSS)
function sanitizeInput(input) {
    return input
        .replace(/[<>'"&]/g, '')
        .trim()
        .slice(0, 15);
}

// Encode data to URL
function encodeData(data) {
    const compact = `${data.nama}|${data.keluarga ? 1 : 0}|${data.theme === 'pink' ? 'A' : 'B'}`;
    return btoa(compact);
}

// Decode data from URL
function decodeData(encoded) {
    try {
        const decoded = atob(encoded);
        const [nama, keluarga, theme] = decoded.split('|');
        return {
            nama: sanitizeInput(nama || ''),
            keluarga: keluarga === '1',
            theme: theme === 'A' ? 'pink' : 'tosca'
        };
    } catch (error) {
        return null;
    }
}

// Show toast notification
function showToast(message, duration = 3000) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, duration);
}

// Switch view
function switchView(viewName) {
    state.currentView = viewName;
    
    if (viewName === 'form') {
        elements.viewForm.classList.add('active');
        elements.viewCard.classList.remove('active');
    } else {
        elements.viewForm.classList.remove('active');
        elements.viewCard.classList.add('active');
    }
}

/* ========================================
   HIJRIYAH YEAR API
   ======================================== */
async function fetchHijriyahYear() {
    try {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        
        const response = await fetch(`https://api.aladhan.com/v1/gToH/${dd}-${mm}-${yyyy}`);
        const data = await response.json();
        
        if (data.code === 200 && data.data && data.data.hijri) {
            return data.data.hijri.year;
        }
        
        // Fallback calculation
        return String(yyyy - 579);
    } catch (error) {
        // Fallback calculation
        return String(new Date().getFullYear() - 579);
    }
}

/* ========================================
   SVG DECORATIONS
   ======================================== */

// Create sparkle stars decoration (top)
function createSparkleStars(theme) {
    const color = theme === 'pink' ? '#FFD700' : '#FFD700';
    
    return `
        <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" class="decoration-stars">
            <!-- Main Star (center large) -->
            <g transform="translate(100, 50)">
                <path d="M0,-20 L5,-5 L20,0 L5,5 L0,20 L-5,5 L-20,0 L-5,-5 Z" 
                      fill="${color}" opacity="1">
                    <animateTransform attributeName="transform" type="rotate" 
                                      from="0" to="360" dur="10s" repeatCount="indefinite"/>
                </path>
            </g>
            
            <!-- Medium Star (left) -->
            <g transform="translate(60, 40)">
                <path d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3 Z" 
                      fill="${color}" opacity="0.9">
                    <animateTransform attributeName="transform" type="rotate" 
                                      from="0" to="360" dur="8s" repeatCount="indefinite"/>
                </path>
            </g>
            
            <!-- Small Star (top left) -->
            <circle cx="40" cy="20" r="3" fill="${color}" opacity="0.7">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Small Star (top right) -->
            <circle cx="160" cy="25" r="2.5" fill="${color}" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Tiny Star (far right) -->
            <circle cx="180" cy="45" r="2" fill="${color}" opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Tiny Star (far left) -->
            <circle cx="20" cy="50" r="1.5" fill="${color}" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.2s" repeatCount="indefinite"/>
            </circle>
        </svg>
    `;
}

// Create botanical leaves decoration (bottom)
function createBotanicalLeaves(theme) {
    const color = theme === 'pink' ? 'rgba(194, 24, 91, 0.15)' : 'rgba(0, 131, 143, 0.15)';
    const accentColor = theme === 'pink' ? 'rgba(194, 24, 91, 0.25)' : 'rgba(0, 131, 143, 0.25)';
    
    return `
        <svg width="100%" height="150" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" class="decoration-leaves" preserveAspectRatio="none">
            <!-- Left Leaves Group -->
            <g transform="translate(0, 100)">
                <!-- Leaf 1 -->
                <ellipse cx="50" cy="20" rx="40" ry="60" fill="${color}" transform="rotate(-20 50 20)"/>
                <ellipse cx="30" cy="40" rx="35" ry="50" fill="${accentColor}" transform="rotate(-30 30 40)"/>
                <ellipse cx="70" cy="50" rx="30" ry="45" fill="${color}" transform="rotate(-10 70 50)"/>
                
                <!-- Small decorative dots -->
                <circle cx="40" cy="35" r="3" fill="white" opacity="0.5"/>
                <circle cx="55" cy="45" r="2" fill="white" opacity="0.4"/>
                <circle cx="65" cy="30" r="2.5" fill="white" opacity="0.3"/>
            </g>
            
            <!-- Right Leaves Group -->
            <g transform="translate(300, 100)">
                <!-- Leaf 2 -->
                <ellipse cx="50" cy="20" rx="40" ry="60" fill="${color}" transform="rotate(20 50 20)"/>
                <ellipse cx="70" cy="40" rx="35" ry="50" fill="${accentColor}" transform="rotate(30 70 40)"/>
                <ellipse cx="30" cy="50" rx="30" ry="45" fill="${color}" transform="rotate(10 30 50)"/>
                
                <!-- Small decorative dots -->
                <circle cx="60" cy="35" r="3" fill="white" opacity="0.5"/>
                <circle cx="45" cy="45" r="2" fill="white" opacity="0.4"/>
                <circle cx="35" cy="30" r="2.5" fill="white" opacity="0.3"/>
            </g>
            
            <!-- Bottom small leaves scattered -->
            <ellipse cx="150" cy="130" rx="20" ry="30" fill="${color}" opacity="0.5" transform="rotate(-15 150 130)"/>
            <ellipse cx="250" cy="135" rx="18" ry="28" fill="${color}" opacity="0.5" transform="rotate(15 250 135)"/>
        </svg>
    `;
}

/* ========================================
   CARD RENDERING
   ======================================== */
function renderCard() {
    const { nama, keluarga, theme } = state;
    const displayName = keluarga ? `${nama} & Keluarga` : nama;
    const themeClass = `theme-${theme}`;
    
    const cardHTML = `
        <div class="greeting-card ${themeClass}">
            ${createSparkleStars(theme)}
            
            <div class="card-content">
                <div class="card-name">${displayName}</div>
                <div class="card-subtitle">mengucapkan</div>
                <div class="card-greeting">Selamat Hari Raya<br>Idul Fitri</div>
                <div class="card-year">${state.hijriyahYear} H</div>
            </div>
            
            ${createBotanicalLeaves(theme)}
        </div>
    `;
    
    elements.cardDisplay.innerHTML = cardHTML;
}

/* ========================================
   QR CODE GENERATION (Pure Canvas)
   ======================================== */
function generateQRCode(text) {
    const canvas = elements.qrCanvas;
    const ctx = canvas.getContext('2d');
    const size = 200;
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Simple QR Code simulation (placeholder)
    // For production, you'd want to implement a proper QR code algorithm
    // or use a small library, but this is a visual placeholder
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    // Create a grid pattern
    const cellSize = 10;
    const gridSize = size / cellSize;
    
    // Generate pseudo-random pattern based on text
    let seed = 0;
    for (let i = 0; i < text.length; i++) {
        seed += text.charCodeAt(i);
    }
    
    // Simple pseudo-random number generator
    function random() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    }
    
    ctx.fillStyle = '#000000';
    
    // Draw QR-like pattern
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            // Draw corner squares (position markers)
            const isCorner = 
                (x < 7 && y < 7) || 
                (x >= gridSize - 7 && y < 7) || 
                (x < 7 && y >= gridSize - 7);
            
            if (isCorner) {
                if ((x === 0 || x === 6 || y === 0 || y === 6) || 
                    (x >= 2 && x <= 4 && y >= 2 && y <= 4)) {
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            } else if (random() > 0.5) {
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
    
    // Add text below QR code
    ctx.fillStyle = '#2c3e50';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Scan untuk buka kartu', size / 2, size + 20);
}

/* ========================================
   SHARE FUNCTIONS
   ======================================== */
function generateShareableURL() {
    const encoded = encodeData(state);
    const baseURL = window.location.origin + window.location.pathname;
    return `${baseURL}?c=${encoded}`;
}

function shareToWhatsApp() {
    const url = generateShareableURL();
    const message = `🌙 Kartu Ucapan Idul Fitri ${state.hijriyahYear} H dari ${state.nama}${state.keluarga ? ' & Keluarga' : ''}

Buka kartu ucapan saya di: ${url}

Selamat Hari Raya Idul Fitri! 🌸`;
    
    const waURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
}

function shareToTelegram() {
    const url = generateShareableURL();
    const message = `🌙 Kartu Ucapan Idul Fitri ${state.hijriyahYear} H dari ${state.nama}${state.keluarga ? ' & Keluarga' : ''}

Buka kartu: ${url}`;
    
    const tgURL = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
    window.open(tgURL, '_blank');
}

function copyURLToClipboard() {
    const url = elements.urlDisplay.value;
    
    // Modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => {
                showToast('✅ Link berhasil disalin!');
            })
            .catch(() => {
                fallbackCopyText(url);
            });
    } else {
        fallbackCopyText(url);
    }
}

function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast('✅ Link berhasil disalin!');
    } catch (error) {
        showToast('❌ Gagal menyalin link');
    }
    
    document.body.removeChild(textarea);
}

/* ========================================
   DOWNLOAD AS IMAGE
   ======================================== */
function downloadCardAsImage() {
    const card = document.querySelector('.greeting-card');
    if (!card) return;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (higher resolution for better quality)
    const scale = 2;
    canvas.width = card.offsetWidth * scale;
    canvas.height = card.offsetHeight * scale;
    
    ctx.scale(scale, scale);
    
    // Get computed styles
    const computedStyle = window.getComputedStyle(card);
    const bgColor = computedStyle.background || '#ffffff';
    
    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Get card content
    const cardName = card.querySelector('.card-name').textContent;
    const cardSubtitle = card.querySelector('.card-subtitle').textContent;
    const cardGreeting = card.querySelector('.card-greeting').textContent;
    const cardYear = card.querySelector('.card-year').textContent;
    
    // Set text styles
    ctx.textAlign = 'center';
    ctx.fillStyle = state.theme === 'pink' ? '#c2185b' : '#00838f';
    
    const centerX = canvas.width / (2 * scale);
    const centerY = canvas.height / (2 * scale);
    
    // Draw sparkle emoji
    ctx.font = '80px Arial';
    ctx.fillText(state.theme === 'pink' ? '🌸' : '✨', centerX, centerY - 150);
    
    // Draw name
    ctx.font = 'bold 32px Arial';
    ctx.fillText(cardName, centerX, centerY - 60);
    
    // Draw subtitle
    ctx.font = '16px Arial';
    ctx.fillText(cardSubtitle, centerX, centerY - 30);
    
    // Draw greeting (multiline)
    ctx.font = 'bold 24px Arial';
    const greetingLines = cardGreeting.split('\n');
    greetingLines.forEach((line, index) => {
        ctx.fillText(line.trim(), centerX, centerY + (index * 30));
    });
    
    // Draw year
    ctx.font = 'bold 28px Arial';
    ctx.fillText(cardYear, centerX, centerY + 80);
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kartu-idul-fitri-${state.nama.toLowerCase()}-${state.hijriyahYear}.png`;
        a.click();
        URL.revokeObjectURL(url);
        
        showToast('✅ Kartu berhasil diunduh!');
    });
}

/* ========================================
   EVENT LISTENERS
   ======================================== */

// Character counter
elements.namaInput.addEventListener('input', (e) => {
    const length = e.target.value.length;
    elements.charCounter.textContent = `${length}/15`;
    
    // Color coding
    elements.charCounter.classList.remove('warning', 'danger');
    if (length >= 12) {
        elements.charCounter.classList.add('warning');
    }
    if (length === 15) {
        elements.charCounter.classList.add('danger');
    }
});

// Auto-capitalize nama
elements.namaInput.addEventListener('blur', (e) => {
    if (e.target.value.trim()) {
        e.target.value = capitalizeFirst(e.target.value);
    }
});

// Theme selection
elements.themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected from all
        elements.themeOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected to clicked
        option.classList.add('selected');
        
        // Update state
        state.theme = option.dataset.theme;
    });
});

// Form submit
elements.cardForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const nama = sanitizeInput(elements.namaInput.value);
    
    if (!nama) {
        showToast('❌ Nama tidak boleh kosong!');
        elements.namaInput.focus();
        return;
    }
    
    // Update state
    state.nama = capitalizeFirst(nama);
    state.keluarga = elements.keluargaCheckbox.checked;
    
    // Fetch Hijriyah year
    showToast('⏳ Memuat data...');
    state.hijriyahYear = await fetchHijriyahYear();
    
    // Render card
    renderCard();
    
    // Generate shareable URL
    const url = generateShareableURL();
    elements.urlDisplay.value = url;
    
    // Generate QR Code
    generateQRCode(url);
    
    // Switch to card view
    switchView('card');
    
    // Save to localStorage
    localStorage.setItem('kartu-ucapan-state', JSON.stringify(state));
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Share buttons
elements.btnShareWa.addEventListener('click', shareToWhatsApp);
elements.btnShareTg.addEventListener('click', shareToTelegram);
elements.btnCopyUrl.addEventListener('click', copyURLToClipboard);

// Download button
elements.btnDownload.addEventListener('click', downloadCardAsImage);

// Back button
elements.btnBack.addEventListener('click', () => {
    switchView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========================================
   INITIALIZATION
   ======================================== */
async function init() {
    // Check URL params for shared card
    const urlParams = new URLSearchParams(window.location.search);
    const encoded = urlParams.get('c');
    
    if (encoded) {
        const decoded = decodeData(encoded);
        
        if (decoded) {
            // Load shared card
            state.nama = decoded.nama;
            state.keluarga = decoded.keluarga;
            state.theme = decoded.theme;
            state.hijriyahYear = await fetchHijriyahYear();
            
            // Render card
            renderCard();
            
            // Generate URL
            const url = generateShareableURL();
            elements.urlDisplay.value = url;
            generateQRCode(url);
            
            // Switch to card view
            switchView('card');
            
            return;
        }
    }
    
    //  Check localStorage for saved state
    const saved = localStorage.getItem('kartu-ucapan-state');
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            state.theme = savedState.theme || 'pink';
            
            // Pre-select theme
            elements.themeOptions.forEach(opt => {
                if (opt.dataset.theme === state.theme) {
                    opt.classList.add('selected');
                } else {
                    opt.classList.remove('selected');
                }
            });
        } catch (error) {
            // Ignore invalid saved state
        }
    } else {
        // Default: select first theme (pink)
        elements.themeOptions[0].classList.add('selected');
    }
    
    // Start on form view
    switchView('form');
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}