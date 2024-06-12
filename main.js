// Variáveis
const mobileMediaQuery = window.matchMedia("(max-width: 400px)");
const tabletMediaQuery = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
const notes = document.querySelectorAll(".js-note");
const cardAudio = document.getElementById("card-audio");

const noButton = document.getElementById("no-button");
const yesButton = document.getElementById("yes-button");

// Função que redefine o tamanho das notas
function resizeNotes() {
  notes.forEach(note => {
    if (note.classList.contains("active")) {
      note.classList.remove("active");
      gsap.set(note, {
        height: "30%",
        clearProps: "all"
      });
    }
  });
}

// Função principal que ativa todas as notas
function notesReady() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  cardAudio.play();

  notes.forEach((note, index) => {
    note.addEventListener("click", function () {
      if (mobileMediaQuery.matches) {
        toggleNoteActive(this, index, 125, 40);
      } else if (tabletMediaQuery.matches) {
        toggleNoteActive(this, index, 80, 21);
      } else {
        toggleNoteActive(this, index, 70, 20);
      }
    });
  });
}

// Função que alterna o estado ativo da nota
function toggleNoteActive(note, index, baseHeight, increment) {
  if (note.classList.contains("active")) {
    note.classList.remove("active");
    gsap.set(note, {
      height: "30%",
      clearProps: "all"
    });
  } else {
    notes.forEach(n => {
      if (n.classList.contains("active")) {
        n.classList.remove("active");
        gsap.set(n, {
          height: "30%",
          clearProps: "all"
        });
      }
    });
    note.classList.add("active");
    gsap.set(note, {
      height: `${baseHeight + increment * index}%`
    });
  }
}

// Função que configura o papel superior do envelope
function setUpPaper() {
  const arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath: `polygon(${arr[0]}% ${arr[1]}%, ${arr[2]}% ${arr[3]}%, ${arr[4]}% ${arr[5]}%)`,
    onComplete: notesReady
  });
}

// Função que inicia a transição do papel superior
function envelopTransition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: setUpPaper
  });
  document.querySelector(".js-up-paper").removeEventListener("click", envelopTransition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

// Função que permite cortar o adesivo
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document.querySelector(".js-up-paper").addEventListener("click", envelopTransition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

// Configurações iniciais
document.querySelector(".js-sticker").addEventListener("click", sticker);
window.onresize = resizeNotes;

// Função para ocultar o botão "Não"
noButton.addEventListener("mouseover", function() {
  this.style.display = "none"; // Oculta o botão "Não"
});

// Função para mostrar o botão "Não" novamente
noButton.addEventListener("mouseout", function() {
  this.style.display = "inline-block";
});


// Função que redireciona para o WhatsApp quando o botão "Sim" é clicado
yesButton.addEventListener("click", function() {
  window.location.href = "https://wa.me/5581986660502";
});
