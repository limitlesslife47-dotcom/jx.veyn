// Veyn OS - God-Level Controller Logic (app.js)

function switchScreen(screenId) {
    document.querySelectorAll('.screen-pane').forEach(pane => pane.classList.add('hidden'));
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('hidden');
    }
}

function handleNameSubmit() {
    const input = document.getElementById('input-name');
    const name = input && input.value.trim() ? input.value.trim() : 'Jonathan';
    
    const dashName = document.getElementById('dash-name');
    const profName = document.getElementById('profile-name');
    const profInit = document.getElementById('profile-initial');
    
    if (dashName) dashName.textContent = name;
    if (profName) profName.textContent = name;
    if (profInit) profInit.textContent = name.charAt(0).toUpperCase();

    switchScreen('screen-gender');
}

function selectOption(element) {
    const parent = element.parentElement;
    parent.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
        const dot = card.querySelector('.radio-dot');
        if (dot) dot.textContent = '';
    });
    element.classList.add('selected');
    const dot = element.querySelector('.radio-dot');
    if (dot) dot.textContent = '✓';
}

function validateAge() {
    const year = parseInt(document.getElementById('b-year').value);
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    if (age >= 12) {
        const profAge = document.getElementById('profile-age');
        if (profAge) profAge.textContent = age;
        switchScreen('screen-goal');
    } else {
        alert('Access Restricted: You must be at least 12 years old to initialize Veyn OS.');
    }
}

function switchTab(tabName, btnElement) {
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
    document.querySelectorAll('.dock-item').forEach(item => item.classList.remove('active'));

    const target = document.getElementById(`pane-${tabName}`);
    if (target) target.classList.remove('hidden');
    if (btnElement) btnElement.classList.add('active');
}
