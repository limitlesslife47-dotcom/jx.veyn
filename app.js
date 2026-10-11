// Veyn OS Core Application Logic - app.js

document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const ageScreen = document.getElementById('age-screen');
    const desktopScreen = document.getElementById('desktop-screen');
    const appWindow = document.getElementById('app-window');
    const winTitle = document.getElementById('win-title');
    const winContent = document.getElementById('win-content');

    let currentUser = '';

    // Authentication Flow (Login / Sign Up first)
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            currentUser = document.getElementById('email-el').value;
            if (currentUser) {
                loginScreen.classList.add('hidden');
                ageScreen.classList.remove('hidden');
            }
        });
    }

    // Age Verification Flow (Triggers after successful login)
    const verifyBtn = document.getElementById('verify-btn');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            const ageVal = parseInt(document.getElementById('age-el').value);
            if (isNaN(ageVal) || ageVal < 1) {
                alert('Please provide a valid numeric age.');
                return;
            }
            if (ageVal >= 18) {
                ageScreen.classList.add('hidden');
                desktopScreen.classList.remove('hidden');
                startClock();
            } else {
                alert('Access Denied: You must be 18 or older to initialize Veyn OS.');
            }
        });
    }

    // Taskbar Live Clock
    function startClock() {
        setInterval(() => {
            const now = new Date();
            const clockEl = document.getElementById('live-clock');
            if (clockEl) {
                clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        }, 1000);
    }

    // Window Manager Application Controller
    window.openApp = function(appName) {
        appWindow.classList.remove('hidden');
        if (appName === 'terminal') {
            winTitle.innerHTML = '<span>💻</span> Terminal - root@veyn';
            winContent.innerHTML = `
                <p>Veyn OS Kernel [Version 10.47.2]</p>
                <p>Logged in user: <strong>${currentUser}</strong></p><br/>
                <p>> System integrity verified successfully.</p>
                <p>> Android TWA bridge operational.</p>
            `;
        } else if (appName === 'files') {
            winTitle.innerHTML = '<span>📁</span> File Explorer';
            winContent.innerHTML = `
                <h3>Storage Volumes</h3><br/>
                <ul style="list-style: none; line-height: 1.8;">
                    <li>📁 /system/core</li>
                    <li>📁 /home/${currentUser}/workspace</li>
                    <li>📁 /mnt/sdcard/twa-storage</li>
                </ul>
            `;
        } else if (appName === 'settings') {
            winTitle.innerHTML = '<span>⚙️</span> System Settings';
            winContent.innerHTML = `
                <h3>Veyn OS Control Panel</h3><br/>
                <p><strong>MinSDK Version:</strong> 24</p>
                <p><strong>Runtime Environment:</strong> Trusted Web Activity</p>
                <p><strong>Security Status:</strong> Fully Encrypted & Verified</p>
            `;
        }
    };

    window.closeApp = function() {
        appWindow.classList.add('hidden');
    };
});