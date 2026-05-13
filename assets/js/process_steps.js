

(() => {
  const section = document.getElementById("travelingDotProcess");

  if (!section) return;

  const steps = Array.from(section.querySelectorAll(".process-step"));

  let timers = [];
  let isRunning = false;

  function clearStepTimers() {
    timers.forEach((timer) => clearTimeout(timer));
    timers = [];
  }

  function resetAnimation() {
    section.classList.remove("is-animating");

    steps.forEach((step) => {
      step.classList.remove("is-complete");
    });

    clearStepTimers();

    void section.offsetWidth;
  }

  function startAnimation() {
    if (isRunning) return;

    isRunning = true;

    resetAnimation();

    section.classList.add("is-animating");

    steps.forEach((step) => {
      const delay = Number(step.dataset.delay) || 0;

      const timer = setTimeout(() => {
        step.classList.add("is-complete");
      }, delay);

      timers.push(timer);
    });

    const endTimer = setTimeout(() => {
      isRunning = false;
    }, 4200);

    timers.push(endTimer);
  }

  section.addEventListener("mouseenter", startAnimation);
  section.addEventListener("focusin", startAnimation);
  section.addEventListener("touchstart", startAnimation, { passive: true });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      });
    },
    {
      threshold: 0.45
    }
  );

  observer.observe(section);
})();



