// Inizializza Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // apre la webapp a schermo intero

// Esempio: quando clicchi una card, invia un messaggio al bot
document.getElementById("tasksCard").onclick = () => {
    tg.sendData("open_tasks");
};

document.getElementById("gradesCard").onclick = () => {
    tg.sendData("open_grades");
};

document.getElementById("notesCard").onclick = () => {
    tg.sendData("open_notes");
};

document.getElementById("goalsCard").onclick = () => {
    tg.sendData("open_goals");
};
