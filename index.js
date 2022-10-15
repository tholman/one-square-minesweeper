(() => {
  const digit = document.querySelector(".digit");
  const timer0 = document.querySelector(".timer-0");
  const timer1 = document.querySelector(".timer-1");
  const timer2 = document.querySelector(".timer-2");
  const faceButton = document.querySelector(".face-button");
  const oneSquare = document.querySelector(".one-square");

  let startTime, animationFrame;

  startTimer();

  document.oncontextmenu = function (e) {
    if (e.target === oneSquare) return false;
  };

  function reset() {
    cancelAnimationFrame(animationFrame);
    dead = false;
    win = false;
    faceButton.classList.remove("face-button-clicking");
    faceButton.classList.remove("face-button-dead");
    faceButton.classList.remove("face-button-won");
    oneSquare.classList.remove("exploded");
    oneSquare.classList.remove("flagged");
    digit.src = "./img/display-digit-1.png";
    startTimer();
  }

  function startTimer() {
    startTime = Date.now();
    animationFrame = window.requestAnimationFrame(tick);
  }

  function tick() {
    setTime(Date.now() - startTime);
    animationFrame = window.requestAnimationFrame(tick);
  }

  function setTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60);

    if (seconds > 999) {
      seconds = 999;
    }

    const secondString = seconds.toString().padStart(3, 0).split("");
    timer0.src = `./img/display-digit-${secondString[0]}.png`;
    timer1.src = `./img/display-digit-${secondString[1]}.png`;
    timer2.src = `./img/display-digit-${secondString[2]}.png`;
  }

  oneSquare.addEventListener("mousedown", (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
    }
    clicking = true;
    faceButton.classList.add("face-button-clicking");
  });

  oneSquare.addEventListener("mouseup", (e) => {
    if (clicking === false) {
      return;
    }

    if (e.ctrlKey || e.which === 3) {
      faceButton.classList.remove("face-button-clicking");
      oneSquare.classList.add("flagged");
      faceButton.classList.add("face-button-won");
      digit.src = "./img/display-digit-0.png";
    } else {
      faceButton.classList.remove("face-button-clicking");
      oneSquare.classList.add("exploded");
      faceButton.classList.add("face-button-dead");
      digit.src = "./img/display-digit-1.png";
    }

    cancelAnimationFrame(animationFrame);
    clicking = false;
  });

  oneSquare.addEventListener("mouseout", () => {
    if (clicking === true) {
      clicking = false;
      faceButton.classList.remove("face-button-clicking");
    }
  });

  faceButton.addEventListener("click", () => {
    reset();
  });
})();
