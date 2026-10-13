// Veyn OS - Elite Onboarding & Dashboard Controller (app.js)

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('hidden');
    }
}

function saveName() {
    const input = document.getElementById('user-name-input');
    const name = input ? input.value.trim() : 'Jonathan';
    if (name) {
        const dashName = document.getElementById('dash-username');
        const profName = document.getElementById('profile-name');
        const profInit = document.getElementById('profile-initial');
        if (dashName) dashName.textContent = name;
        if (profName) profName.textContent = name;
        if (profInit) profInit.textContent = name.charAt(0).toUpperCase();
    }
    goToScreen('screen-gender');
}

function selectCard(element) {
    const parent = element.parentElement;
    parent.querySelectorAll('.select-card').forEach(card => {
        card.classList.remove('selected');
        const circle = card.querySelector('.radio-circle');
        if (circle) circle.textContent = '';
    });
    element.classList.add('selected');
    const circle = element.querySelector('.radio-circle');
    if (circle) circle.textContent = '✓';
}

function validateAge() {
    const year = parseInt(document.getElementById('b-year').value);
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    if (age >= 12) {
        const profAge = document.getElementById('profile-age');
        if (profAge) profAge.textContent = age;
        goToScreen('screen-goal');
    } else {
        alert('Access Restricted: You must be at least 12 years old to initialize Veyn OS.');
    }
}

function switchDashTab(tabName, btnElement) {
    document.querySelectorAll('.dash-tab-pane').forEach(pane => pane.classList.add('hidden'));
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));

    const target = document.getElementById(`tab-${tabName}`);
    if (target) target.classList.remove('hidden');
    if (btnElement) btnElement.classList.add('active');
}
