// =====================
// Login Telegram WebApp
// =====================
let tg = window.Telegram && window.Telegram.WebApp;
let user = null;

// Inserisci qui l'URL pubblico del tuo Replit
const API_URL = "study-flow-bot-2--yasminattari10.replit.app"

function initTelegramUser() {
    const userInfoEl = document.getElementById("userInfo");

    if (!tg) {
        userInfoEl.textContent = "Non sei dentro Telegram WebApp.";
        return;
    }

    tg.expand();
    user = tg.initDataUnsafe && tg.initDataUnsafe.user;

    if (!user) {
        userInfoEl.textContent = "Utente Telegram non rilevato.";
        return;
    }

    const name = user.first_name + (user.last_name ? " " + user.last_name : "");
    const username = user.username ? "@" + user.username : "";

    userInfoEl.textContent = `Ciao ${name} ${username}`;

    loadTasks(); // carica i compiti salvati
}

// =====================
// API: Carica compiti
// =====================
function loadTasks() {
    fetch(`${API_URL}/get_tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id })
    })
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("taskList");
        list.innerHTML = "";

        data.tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${task}
                <button onclick="this.parentElement.remove()">✖</button>
            `;
            list.appendChild(li);
        });
    })
    .catch(err => console.error("Errore caricamento compiti:", err));
}

// =====================
// API: Aggiungi compito
// =====================
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    fetch(`${API_URL}/add_task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user.id,
            task: text
        })
    }).catch(err => console.error("Errore salvataggio compito:", err));

    const li = document.createElement("li");
    li.innerHTML = `
        ${text}
        <button onclick="this.parentElement.remove()">✖</button>
    `;
    document.getElementById("taskList").appendChild(li);

    input.value = "";
}

document.addEventListener("DOMContentLoaded", initTelegramUser);
