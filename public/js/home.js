const url = 'https://buntabi.vercel.app/api/admin/usuarios';
const token = localStorage.getItem('token'); // Obtener el token almacenado en el localStorage


function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');

}

  // Mostrar mensaje de bienvenida
  //document.getElementById('welcomeMessage').textContent = '¡Bienvenido al Dashboard!';
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificamos el token para obtener los datos
  const usuario = decodedToken.usuario; // Extraemos el nombre de usuario
  document.getElementById('welcomeMessage').textContent = `¡Bienvenido ${usuario}!`;

function logout() {
    window.location.href = '../index.html';
}

function showReading(element) {
    alert(`Lectura: ${element.dataset.reading}\nSignificado: ${element.dataset.meaning}`);
}


function prevFlashcard() {
    currentFlashcard = (currentFlashcard - 1 + flashcards.length) % flashcards.length;
    document.getElementById('flashcard').innerText = flashcards[currentFlashcard];
}

function nextFlashcard() {
    currentFlashcard = (currentFlashcard + 1) % flashcards.length;
    document.getElementById('flashcard').innerText = flashcards[currentFlashcard];
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.innerText);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.innerText = data;
}


// preguntas kanji

const kanjiData = [
    { kanji: "日", options: ["Sol", "Luna", "Agua"], answer: "Sol" },
    { kanji: "月", options: ["Montaña", "Luna", "Fuego"], answer: "Luna" },
    { kanji: "水", options: ["Tierra", "Árbol", "Agua"], answer: "Agua" },
    { kanji: "食", options: ["Comida", "Luna", "Sol"], answer: "Comida" }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    let question = kanjiData[currentQuestionIndex];
    document.getElementById("kanji-question").textContent = question.kanji;
    let optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    
    question.options.forEach(option => {
        let button = document.createElement("button");
        button.textContent = option;
        button.onclick = function() { checkAnswer(button); };
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(button) {
    let question = kanjiData[currentQuestionIndex];
    if (button.textContent === question.answer) {
        alert("¡Correcto!");
    } else {
        alert("Incorrecto. Intenta de nuevo.");
        return;
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < kanjiData.length) {
        loadQuestion();
    } else {
        alert("¡Felicidades! Has completado el quiz.");
        currentQuestionIndex = 0;
        loadQuestion();
    }
}

loadQuestion();


const flashcards = [
    {
        kanji: "日",
        translation: "sol, día",
        readings: "にち, ひ, じつ",
        radicals: "日 (radical de sol)"
    },
    {
        kanji: "水",
        translation: "agua",
        readings: "すい, みず",
        radicals: "水 (radical de agua)"
    },
    {
        kanji: "木",
        translation: "árbol",
        readings: "もく, き",
        radicals: "木 (radical de árbol)"
    },
    {
        kanji: "人",
        translation: "persona",
        readings: "じん, にん, ひと",
        radicals: "人 (radical de persona)"
    }
];

let currentIndex = 0;


function displayFlashcard(index) {
    const flashcard = flashcards[index];
    document.getElementById("kanji2").textContent = flashcard.kanji;
    document.getElementById("translation").textContent = `Traducción: ${flashcard.translation}`;
    document.getElementById("readings").textContent = `Lecturas: ${flashcard.readings}`;
    document.getElementById("radicals").textContent = `Radicales: ${flashcard.radicals}`;
}

function changeCard(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = flashcards.length - 1;
    if (currentIndex >= flashcards.length) currentIndex = 0;
    displayFlashcard(currentIndex);
}

displayFlashcard(currentIndex);

