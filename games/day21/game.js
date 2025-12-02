(() => {
  const nums = [1,2,3].sort(() => Math.random() - 0.5);
  const puzzle = document.getElementById("puzzle");

  nums.forEach(n => {
    const el = document.createElement("button");
    el.className = "btn";
    el.innerText = n;

    el.onclick = () => {
      el.style.opacity = "0.5";
      chosen.push(n);
      if (chosen.length === 3) check();
    };

    puzzle.appendChild(el);
  });

  let chosen = [];

  function check() {
    if (chosen.join("") === "123") {
      alert("Perfecto 💖");
    } else {
      alert("Casi… 😅");
    }
    closeOverlay();
  }
})();