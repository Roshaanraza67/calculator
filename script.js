const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const historyList = document.getElementById("historyList");
const calculator = document.getElementById("calc");

/* Button Click Logic */
buttons.forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.dataset.value));
});

function handleInput(value) {
  if (!value) return;

  if (value === "clear") {
    display.innerText = "0";
    return;
  }

  if (value === "del") {
    display.innerText = display.innerText.slice(0, -1) || "0";
    return;
  }

  if (value === "=") {
    calculate();
    return;
  }

  if (display.innerText === "0") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

/* Calculate */
function calculate() {
  try {
    const expression = display.innerText
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan");

    const result = eval(expression);
    addHistory(display.innerText, result);
    display.innerText = result;
  } catch {
    display.innerText = "Error";
  }
}

/* History */
function addHistory(expr, res) {
  const li = document.createElement("li");
  li.textContent = `${expr} = ${res}`;
  historyList.prepend(li);
}

/* Keyboard Support */
document.addEventListener("keydown", e => {
  const keyMap = {
    Enter: "=",
    Backspace: "del",
    Delete: "clear"
  };

  if (keyMap[e.key]) {
    handleInput(keyMap[e.key]);
  } else if ("0123456789+-*/().".includes(e.key)) {
    handleInput(e.key);
  }
});

/* Mouse-based 3D Tilt */
document.addEventListener("mousemove", e => {
  const rect = calculator.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const rotateX = (-y / 20).toFixed(2);
  const rotateY = (x / 20).toFixed(2);

  calculator.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.addEventListener("mouseleave", () => {
  calculator.style.transform = "rotateX(0deg) rotateY(0deg)";
});
