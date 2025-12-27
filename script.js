// =====================
// Login Telegram WebApp
// =====================
let tg = window.Telegram && window.Telegram.WebApp;

function initTelegramUser() {
    const userInfoEl = document.getElementById("userInfo");

    if (!tg) {
        userInfoEl.textContent = "Non sei dentro Telegram WebApp.";
        return;
    }

    tg.expand(); // allarga la WebApp

    const user = tg.initDataUnsafe && tg.initDataUnsafe.user;

    if (!user) {
        userInfoEl.textContent = "Utente Telegram non rilevato.";
        return;
    }

    const name = user.first_name + (user.last_name ? " " + user.last_name : "");
    const username = user.username ? "@" + user.username : "";

    userInfoEl.textContent = `Ciao ${name} ${username}`;
}

// =====================
// Gestione Compiti
// =====================
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
        ${text}
        <button onclick="this.parentElement.remove()">✖</button>
    `;

    document.getElementById("taskList").appendChild(li);
    input.value = "";
}

// Inizializza quando la pagina è pronta
document.addEventListener("DOMContentLoaded", initTelegramUser);
