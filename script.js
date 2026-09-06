const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");

// A entrada da surpresa foi feita por clique, então tentamos iniciar a música assim que o site abre.
window.addEventListener("load", async () => {
  try {
    await music.play();
    musicBtn.innerHTML = "♫ <span>tocando</span>";
  } catch {
    // Alguns navegadores ainda podem bloquear o autoplay; o botão continua disponível.
  }
});

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.innerHTML = "♫ <span>tocando</span>";
    } else {
      music.pause();
      musicBtn.innerHTML = "♪ <span>música</span>";
    }
  } catch {
    musicBtn.innerHTML = "♪ <span>adicione assets/musica.mp3</span>";
  }
});

// Pequenos corações flutuando pelo fundo.
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > .35 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.setProperty("--x", (Math.random() * 160 - 80) + "px");
  heart.style.fontSize = (8 + Math.random() * 13) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 900);

// Reveal suave ao rolar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, {threshold:.12});

document.querySelectorAll(".gallery-card, .letter-card, .intro").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(25px)";
  el.style.transition = "opacity .8s ease, transform .8s ease";
  observer.observe(el);
});
