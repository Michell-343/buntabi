export function flashcard(){

// Datos de las flashcards (kanji, traducción, lecturas y radicales)
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
    document.getElementById("kanji").textContent = flashcard.kanji;
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

// Inicializar la primera tarjeta
displayFlashcard(currentIndex);

}
