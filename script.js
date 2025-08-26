// ============================
// Инициализация таймеров
// ============================
const timers = {
  1: { 
    inputId: "taskInput", 
    displayId: "timerDisplay", 
    startBtnId: "startBtn", 
    stopBtnId: "stopBtn", 
    resetBtnId: "resetBtn", 
    seconds: 0, 
    interval: null,
    saveBtn: null,
    editBtn: null
  },
  2: { 
    inputId: "taskInput2", 
    displayId: "timerDisplay2", 
    startBtnId: "startBtn2", 
    stopBtnId: "stopBtn2", 
    resetBtnId: "resetBtn2", 
    seconds: 0, 
    interval: null,
    saveBtn: null,
    editBtn: null
  },
  3: { 
    inputId: "taskInput3", 
    displayId: "timerDisplay3", 
    startBtnId: "startBtn3", 
    stopBtnId: "stopBtn3", 
    resetBtnId: "resetBtn3", 
    seconds: 0, 
    interval: null,
    saveBtn: null,
    editBtn: null
  }
};

// ============================
// Вспомогательные функции
// ============================
function formatTime(totalSeconds) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// ============================
// Загрузка данных из localStorage
// ============================
for (let id in timers) {
  const timer = timers[id];
  const savedName = localStorage.getItem(`timer${id}-name`);
  const savedSeconds = localStorage.getItem(`timer${id}-seconds`);
  const saveDone = localStorage.getItem(`timer${id}-saved`);

  const input = document.getElementById(timer.inputId);
  const display = document.getElementById(timer.displayId);
  const inputWrapper = input.parentElement;
  timer.saveBtn = inputWrapper.querySelector('.saveBtn');
  timer.editBtn = inputWrapper.querySelector('.editIcon');

  if (savedName) input.value = savedName;
  if (savedSeconds) {
    timer.seconds = parseInt(savedSeconds, 10);
    display.textContent = formatTime(timer.seconds);
  }
  if (saveDone === "true") {
    input.readOnly = true;
  } else {
    timer.saveBtn.style.display = "block";
  }

  // ============================
  // Кнопка Edit
  // ============================
  timer.editBtn.addEventListener("click", () => {
    input.readOnly = false;
    input.focus();
    timer.saveBtn.style.display = "block";
    timer.editBtn.style.display = "none";
  });

  // ============================
  // Кнопка Save
  // ============================
  timer.saveBtn.addEventListener("click", () => {
    input.readOnly = true;
    timer.saveBtn.style.display = "none";
    timer.editBtn.style.display = "block";
    localStorage.setItem(`timer${id}-name`, input.value);
    localStorage.setItem(`timer${id}-saved`, "true");
  });

  // ============================
  // Кнопки таймера
  // ============================
  document.getElementById(timer.startBtnId).addEventListener("click", () => {
    if (timer.interval) return;
    timer.interval = setInterval(() => {
      timer.seconds++;
      display.textContent = formatTime(timer.seconds);
      localStorage.setItem(`timer${id}-seconds`, timer.seconds);
    }, 1000);
  });

  document.getElementById(timer.stopBtnId).addEventListener("click", () => {
    clearInterval(timer.interval);
    timer.interval = null;
  });

  document.getElementById(timer.resetBtnId).addEventListener("click", () => {
    clearInterval(timer.interval);
    timer.interval = null;
    timer.seconds = 0;
    display.textContent = "00:00:00";
    localStorage.setItem(`timer${id}-seconds`, timer.seconds);
  });
}