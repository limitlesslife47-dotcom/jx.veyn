// Veyn OS - Core Elite Application Logic (app.js)

document.addEventListener('DOMContentLoaded', () => {
    // Populate DOB selectors immediately
    const daySelect = document.getElementById('dob-day');
    if (daySelect) {
        for (let i = 1; i <= 31; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.textContent = i;
            daySelect.appendChild(opt);
        }
    }

    const yearSelect = document.getElementById('dob-year');
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= currentYear - 100; y--) {
            let opt = document.createElement('option');
            opt.value = y;
            opt.textContent = y;
            yearSelect.appendChild(opt);
        }
    }

    const authCard = document.getElementById('auth-card');
    const ageCard = document.getElementById('age-card');
    const dashboardCard = document.getElementById('dashboard-card');
    
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');

    let userEmail = '';

    // Tab Switching
    if (tabLogin && tabSignup) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabSignup.classList.remove('active');
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        });

        tabSignup.addEventListener('click', () => {
            tabSignup.classList.add('active');
            tabLogin.classList.remove('active');
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }

    // Login Handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            userEmail = document.getElementById('login-email').value;
            if (userEmail) {
                authCard.classList.add('hidden');
                dashboardCard.classList.remove('hidden');
                document.getElementById('welcome-user').textContent = userEmail.split('@')[0];
            }
        });
    }

    // Signup Handler -> Triggers DOB Age Gate (12+)
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            userEmail = document.getElementById('signup-email').value;
            if (userEmail) {
                authCard.classList.add('hidden');
                ageCard.classList.remove('hidden');
            }
        });
    }

    // DOB Age Verification (12+ Check)
    const verifyDobBtn = document.getElementById('verify-dob-btn');
    if (verifyDobBtn) {
        verifyDobBtn.addEventListener('click', () => {
            const m = document.getElementById('dob-month').value;
            const d = document.getElementById('dob-day').value;
            const y = document.getElementById('dob-year').value;

            if (!m || !d || !y) {
                alert('Please select your complete date of birth.');
                return;
            }

            const birthDate = new Date(y, m - 1, d);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const mDiff = today.getMonth() - birthDate.getMonth();
            if (mDiff < 0 || (mDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age >= 12) {
                ageCard.classList.add('hidden');
                dashboardCard.classList.remove('hidden');
                document.getElementById('welcome-user').textContent = userEmail.split('@')[0];
            } else {
                alert('Access Restricted: You must be at least 12 years old to initialize Veyn OS.');
            }
        });
    }

    // Dashboard Tab Switching
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.currentTarget.getAttribute('data-tab');
            document.querySelectorAll('.sub-section').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            
            const targetTab = document.getElementById(`tab-${tabName}`);
            if (targetTab) targetTab.classList.remove('hidden');
            e.currentTarget.classList.add('active');
        });
    });

    // Add Routine Task
    const addRoutineBtn = document.getElementById('add-routine-btn');
    if (addRoutineBtn) {
        addRoutineBtn.addEventListener('click', () => {
            const task = document.getElementById('routine-input').value;
            if (task) {
                const list = document.getElementById('routine-list');
                const item = document.createElement('div');
                item.className = 'module-item';
                item.innerHTML = `<span>${task}</span> <span style="color:var(--primary);">Scheduled</span>`;
                list.appendChild(item);
                document.getElementById('routine-input').value = '';
            }
        });
    }

    // Add Workout Protocol
    const addWorkoutBtn = document.getElementById('add-workout-btn');
    if (addWorkoutBtn) {
        addWorkoutBtn.addEventListener('click', () => {
            const w = document.getElementById('workout-input').value;
            if (w) {
                const list = document.getElementById('workout-list');
                const item = document.createElement('div');
                item.className = 'module-item';
                item.innerHTML = `<span>${w}</span> <span style="color:var(--secondary);">Custom Protocol</span>`;
                list.appendChild(item);
                document.getElementById('workout-input').value = '';
            }
        });
    }

    // Update Diet Strategy
    const updateDietBtn = document.getElementById('update-diet-btn');
    if (updateDietBtn) {
        updateDietBtn.addEventListener('click', () => {
            const plan = document.getElementById('diet-select').value;
            document.getElementById('active-diet-display').textContent = plan;
            alert('Nutrition protocol successfully updated!');
        });
    }

    // Logout / Lock OS
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            dashboardCard.classList.add('hidden');
            authCard.classList.remove('hidden');
            loginForm.reset();
            signupForm.reset();
            tabLogin.click();
        });
    }
});
