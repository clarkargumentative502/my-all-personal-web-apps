/**
 * Binaria v3 - Main Script
 * Mobile-First Multi-Cipher Tool
 */

// ==================== STATE ====================
const state = {
    mode: 'encode',
    cipher: 'bin8',
    theme: localStorage.getItem('binaria_theme') || 'dark',
    history: JSON.parse(localStorage.getItem('binaria_history') || '[]')
};

// ==================== CIPHER DEFINITIONS ====================
const ciphers = {
    bin8: {
        name: "Binary 8-bit",
        hint: "Standar komputer klasik. Setiap karakter diubah jadi 8 angka nol/satu. Cocok untuk teks Inggris.",
        validate: (value, mode) => mode === 'encode' ? true : /^[01\s]+$/.test(value),
        encode: (text) => {
            return text.split('').map(char => 
                char.charCodeAt(0).toString(2).padStart(8, '0')
            ).join(' ');
        },
        decode: (binary) => {
            const cleaned = binary.trim().split(/\s+/);
            return cleaned.map(bin => 
                String.fromCharCode(parseInt(bin, 2))
            ).join('');
        }
    },
    bin16: {
        name: "Binary 16-bit",
        hint: "Versi modern (Unicode). Bisa menyimpan karakter unik seperti Emoji atau huruf Arab/Jepang.",
        validate: (value, mode) => mode === 'encode' ? true : /^[01\s]+$/.test(value),
        encode: (text) => {
            return text.split('').map(char => 
                char.charCodeAt(0).toString(2).padStart(16, '0')
            ).join(' ');
        },
        decode: (binary) => {
            const cleaned = binary.trim().split(/\s+/);
            return cleaned.map(bin => 
                String.fromCharCode(parseInt(bin, 2))
            ).join('');
        }
    },
    b64: {
        name: "Base64",
        hint: "Sering digunakan untuk mengirim gambar atau data via email. Hasilnya berupa teks alfabet acak.",
        validate: (value, mode) => mode === 'encode' ? true : /^[A-Za-z0-9+/=]*$/.test(value),
        encode: (text) => {
            try {
                return btoa(unescape(encodeURIComponent(text)));
            } catch (e) {
                throw new Error('Gagal encode Base64');
            }
        },
        decode: (encoded) => {
            try {
                return decodeURIComponent(escape(atob(encoded)));
            } catch (e) {
                throw new Error('Format Base64 tidak valid');
            }
        }
    },
    morse: {
        name: "Morse Code",
        hint: "Sandi legendaris menggunakan titik (.) dan garis (-). Digunakan dalam telekomunikasi darurat.",
        validate: (value, mode) => mode === 'encode' ? true : /^[.\-\s/]+$/.test(value),
        encode: (text) => {
            const morseMap = {
                'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
                'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 
                'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 
                'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 
                'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 
                'Z': '--..', '1': '.----', '2': '..---', '3': '...--', 
                '4': '....-', '5': '.....', '6': '-....', '7': '--...', 
                '8': '---..', '9': '----.', '0': '-----', ' ': '/'
            };
            return text.toUpperCase().split('').map(char => 
                morseMap[char] || ''
            ).join(' ');
        },
        decode: (morse) => {
            const reverseMorse = {
                '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
                '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
                '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
                '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
                '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
                '--..': 'Z', '.----': '1', '..---': '2', '...--': '3',
                '....-': '4', '.....': '5', '-....': '6', '--...': '7',
                '---..': '8', '----.': '9', '-----': '0', '/': ' '
            };
            return morse.split(' ').map(code => 
                reverseMorse[code] || ''
            ).join('');
        }
    }
};

// ==================== DOM ELEMENTS ====================
const elements = {
    // Theme
    themeToggle: document.getElementById('theme-toggle'),
    
    // Mode
    modeEncode: document.getElementById('mode-encode'),
    modeDecode: document.getElementById('mode-decode'),
    
    // Cipher
    cipherSelect: document.getElementById('cipher-select'),
    
    // Input/Output
    hint: document.getElementById('hint'),
    labelInput: document.getElementById('label-input'),
    inputData: document.getElementById('input-data'),
    outputData: document.getElementById('output-data'),
    errorMsg: document.getElementById('error-msg'),
    charCount: document.getElementById('char-count'),
    
    // Buttons
    btnCopy: document.getElementById('btn-copy'),
    btnDownload: document.getElementById('btn-download'),
    btnExport: document.getElementById('btn-export'),
    btnClear: document.getElementById('btn-clear'),
    btnSaveHistory: document.getElementById('btn-save-history'),
    btnClearHistory: document.getElementById('btn-clear-history'),
    
    // History
    historyList: document.getElementById('history-list'),
    
    // Toast
    toast: document.getElementById('toast')
};

// ==================== INITIALIZATION ====================
function init() {
    // Set theme
    applyTheme(state.theme);
    
    // Update UI
    updateUI();
    
    // Render history
    renderHistory();
    
    // Event listeners
    attachEventListeners();
}

// ==================== THEME ====================
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('binaria_theme', theme);
}

function toggleTheme() {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} aktif`);
}

// ==================== MODE & CIPHER ====================
function updateMode(mode) {
    state.mode = mode;
    
    // Update active button
    elements.modeEncode.classList.toggle('active', mode === 'encode');
    elements.modeDecode.classList.toggle('active', mode === 'decode');
    
    updateUI();
    process();
}

function updateUI() {
    const cipher = ciphers[state.cipher];
    
    // Update hint
    elements.hint.textContent = cipher.hint;
    
    // Update label
    elements.labelInput.textContent = state.mode === 'encode' 
        ? 'Input Teks' 
        : `Input ${cipher.name}`;
    
    // Update placeholder
    elements.inputData.placeholder = state.mode === 'encode'
        ? 'Ketik pesan yang ingin di-encode...'
        : `Paste kode ${cipher.name} di sini...`;
    
    // Clear if switching
    if (elements.inputData.value) {
        process();
    }
}

// ==================== PROCESSING ====================
function process() {
    const input = elements.inputData.value;
    
    // Update character count
    elements.charCount.textContent = input.length;
    
    // Clear output if no input
    if (!input) {
        elements.outputData.innerHTML = '<span class="placeholder-text">Hasil akan muncul di sini...</span>';
        elements.errorMsg.style.display = 'none';
        return;
    }
    
    const cipher = ciphers[state.cipher];
    
    // Validate input
    if (!cipher.validate(input, state.mode)) {
        elements.errorMsg.style.display = 'block';
        elements.outputData.innerHTML = '<span class="placeholder-text">---</span>';
        return;
    }
    
    elements.errorMsg.style.display = 'none';
    
    // Process
    try {
        let result = '';
        
        if (state.mode === 'encode') {
            result = cipher.encode(input);
        } else {
            result = cipher.decode(input);
        }
        
        elements.outputData.textContent = result || 'Tidak ada hasil';
    } catch (error) {
        elements.outputData.textContent = `[Error: ${error.message}]`;
    }
}

// ==================== ACTIONS ====================
function copyToClipboard() {
    const text = elements.outputData.textContent;
    
    if (!text || text.includes('Hasil akan muncul') || text === '---') {
        showToast('Tidak ada yang bisa disalin', 'warning');
        return;
    }
    
    // Modern clipboard API
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('✅ Tersalin ke clipboard!');
        }).catch(() => {
            // Fallback
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast('✅ Tersalin ke clipboard!');
    } catch (err) {
        showToast('❌ Gagal menyalin', 'error');
    }
    
    document.body.removeChild(textarea);
}

function downloadTxt() {
    const text = elements.outputData.textContent;
    
    if (!text || text.includes('Hasil akan muncul') || text === '---') {
        showToast('Tidak ada yang bisa diunduh', 'warning');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `binaria_${state.cipher}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('💾 File berhasil diunduh!');
}

function exportHTML() {
    const text = elements.outputData.textContent;
    
    if (!text || text.includes('Hasil akan muncul') || text === '---') {
        showToast('Tidak ada yang bisa di-export', 'warning');
        return;
    }
    
    const cipher = ciphers[state.cipher];
    const timestamp = new Date().toLocaleString('id-ID');
    
    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binaria Export - ${cipher.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, system-ui, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 800px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #6366f1;
            margin-bottom: 10px;
            font-size: 2rem;
        }
        .meta {
            color: #64748b;
            font-size: 0.9rem;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e2e8f0;
        }
        .label {
            font-size: 0.75rem;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .content {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 12px;
            font-family: 'Courier New', monospace;
            font-size: 1rem;
            line-height: 1.8;
            word-break: break-all;
            white-space: pre-wrap;
            color: #0f172a;
            max-height: 500px;
            overflow-y: auto;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #94a3b8;
            font-size: 0.85rem;
        }
        .btn {
            display: inline-block;
            background: #6366f1;
            color: white;
            padding: 12px 24px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 700;
            margin-top: 20px;
            cursor: pointer;
            border: none;
            font-size: 1rem;
        }
        .btn:hover {
            background: #4f46e5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔐 Binaria v3</h1>
        <div class="meta">
            <strong>Cipher:</strong> ${cipher.name}<br>
            <strong>Mode:</strong> ${state.mode === 'encode' ? 'Encode' : 'Decode'}<br>
            <strong>Waktu Export:</strong> ${timestamp}
        </div>
        
        <div class="label">Hasil Konversi</div>
        <div class="content">${text}</div>
        
        <center>
            <button class="btn" onclick="copyResult()">📋 Salin Hasil</button>
        </center>
        
        <div class="footer">
            Dibuat dengan Binaria v3 - Offline Multi-Cipher Tool<br>
            File ini dapat dibuka tanpa koneksi internet
        </div>
    </div>
    
    <script>
        function copyResult() {
            const content = document.querySelector('.content').textContent;
            navigator.clipboard.writeText(content).then(() => {
                alert('✅ Hasil berhasil disalin!');
            }).catch(() => {
                alert('❌ Gagal menyalin');
            });
        }
    </script>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `binaria_export_${state.cipher}_${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('📤 HTML berhasil di-export!');
}

function clearAll() {
    elements.inputData.value = '';
    elements.outputData.innerHTML = '<span class="placeholder-text">Hasil akan muncul di sini...</span>';
    elements.errorMsg.style.display = 'none';
    elements.charCount.textContent = '0';
    showToast('🗑️ Input/Output dibersihkan');
}

// ==================== HISTORY ====================
function saveHistory() {
    const output = elements.outputData.textContent;
    
    if (!output || output.includes('Hasil akan muncul') || output === '---') {
        showToast('Tidak ada yang bisa disimpan', 'warning');
        return;
    }
    
    const historyItem = {
        id: Date.now(),
        cipher: state.cipher,
        mode: state.mode,
        text: output.substring(0, 50) + (output.length > 50 ? '...' : ''),
        fullText: output,
        timestamp: new Date().toLocaleString('id-ID')
    };
    
    // Add to beginning
    state.history.unshift(historyItem);
    
    // Keep max 10 items
    state.history = state.history.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('binaria_history', JSON.stringify(state.history));
    
    renderHistory();
    showToast('💾 Disimpan ke riwayat!');
}

function renderHistory() {
    if (state.history.length === 0) {
        elements.historyList.innerHTML = '<div class="history-empty">Belum ada riwayat</div>';
        return;
    }
    
    elements.historyList.innerHTML = state.history.map(item => `
        <div class="history-card">
            <div class="history-content">
                <span class="history-type">${item.cipher.toUpperCase()} - ${item.mode === 'encode' ? 'ENC' : 'DEC'}</span>
                <div class="history-text">${item.text}</div>
                <div class="history-time">${item.timestamp}</div>
            </div>
            <button class="btn-delete-history" onclick="deleteHistoryItem(${item.id})" title="Hapus">
                ✕
            </button>
        </div>
    `).join('');
}

function deleteHistoryItem(id) {
    state.history = state.history.filter(item => item.id !== id);
    localStorage.setItem('binaria_history', JSON.stringify(state.history));
    renderHistory();
    showToast('Riwayat dihapus');
}

function clearHistory() {
    if (state.history.length === 0) return;
    
    if (confirm('Hapus semua riwayat?')) {
        state.history = [];
        localStorage.removeItem('binaria_history');
        renderHistory();
        showToast('🗑️ Semua riwayat dihapus');
    }
}

// ==================== TOAST ====================
function showToast(message, type = 'success') {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 2000);
}

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Mode buttons
    elements.modeEncode.addEventListener('click', () => updateMode('encode'));
    elements.modeDecode.addEventListener('click', () => updateMode('decode'));
    
    // Cipher select
    elements.cipherSelect.addEventListener('change', (e) => {
        state.cipher = e.target.value;
        updateUI();
    });
    
    // Input
    elements.inputData.addEventListener('input', process);
    
    // Action buttons
    elements.btnCopy.addEventListener('click', copyToClipboard);
    elements.btnDownload.addEventListener('click', downloadTxt);
    elements.btnExport.addEventListener('click', exportHTML);
    elements.btnClear.addEventListener('click', clearAll);
    elements.btnSaveHistory.addEventListener('click', saveHistory);
    elements.btnClearHistory.addEventListener('click', clearHistory);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter = Process
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            process();
        }
        
        // Ctrl/Cmd + K = Clear
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            clearAll();
        }
    });
}

// ==================== WINDOW EVENTS ====================
window.deleteHistoryItem = deleteHistoryItem; // Make it global for onclick

// ==================== START APP ====================
document.addEventListener('DOMContentLoaded', init);
