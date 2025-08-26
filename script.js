const timers = document.querySelectorAll(".timerContainer");

timers.forEach((timer, index) => {
  const input = timer.querySelector("input");
  const display = timer.querySelector(".timer-display");
  const startBtn = timer.querySelector(".start");
  const pauseBtn = timer.querySelector(".pause");
  const resetBtn = timer.querySelector(".reset");
  const saveBtn = timer.querySelector(".save");
  const editBtn = timer.querySelector(".edit");

  let seconds = 0;
  let interval = null;

  // Load saved data
  const savedName = localStorage.getItem(`timer${index}-name`);
  const savedSeconds = localStorage.getItem(`timer${index}-seconds`);
  if(savedName) {
    input.value = savedName;
    input.readOnly = true;
    saveBtn.style.display = "none";
    editBtn.style.display = "block";
  }
  if(savedSeconds) {
    seconds = parseInt(savedSeconds,10);
    display.textContent = formatTime(seconds);
  }

  // Save button
  saveBtn.addEventListener("click", () => {
    input.readOnly = true;
    saveBtn.style.display = "none";
    editBtn.style.display = "block";
    localStorage.setItem(`timer${index}-name`, input.value);
    localStorage.setItem(`timer${index}-seconds`, seconds);
  });

  // Edit button
  editBtn.addEventListener("click", () => {
    input.readOnly = false;
    input.focus();
    editBtn.style.display = "none";
    saveBtn.style.display = "flex";
  });

  // Timer functions
  startBtn.addEventListener("click", () => {
    if(interval) return;
    interval = setInterval(() => {
      seconds++;
      display.textContent = formatTime(seconds);
      localStorage.setItem(`timer${index}-seconds`, seconds);
    }, 1000);
  });

  pauseBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    seconds = 0;
    display.textContent = "00:00:00";
    localStorage.setItem(`timer${index}-seconds`, seconds);
  });

  function formatTime(sec) {
    const h = String(Math.floor(sec / 3600)).padStart(2,"0");
    const m = String(Math.floor((sec % 3600)/60)).padStart(2,"0");
    const s = String(sec % 60).padStart(2,"0");
    return `${h}:${m}:${s}`;
  }
});
