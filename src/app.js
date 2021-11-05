/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

// const BODY = document.querySelector("body");
const SUIT = ["♦", "♥", "♠", "♣"];
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const CARDSINDECK = document.querySelector("#deck");
const FORM = document.querySelector("form");

const BOX = document.querySelector("#box"); // es igual que document.getElementbyid("box")
const SORTBOX = document.querySelector("#sortBox");

const BUTTON = document.querySelector("#button");

let cards = []; //tiene que ir fuera para que las demas funciones la puedan coger, y tiene que ser let para cambiarla

FORM.addEventListener("submit", event => {
  event.preventDefault(); //no hagas nada que tengas asignado por defecto
  cards = []; //logica. son para limpiar. poner el array a cero
  for (let i = 0; i < CARDSINDECK.value; i++) {
    //value = atributo html de elemento input
    //value es una propiedad (en este caso te da el numero de cartas que hay)
    let oneCard = createCard();
    cards.push(oneCard);

    // cards.push(createCard());
  }

  BOX.innerHTML = ""; //visual. son para limipiar .lo que esta entre las etiquetas, decimos que este vacio el string
  renderCards(cards, BOX);
});

////BUBLE SORT!!!
BUTTON.addEventListener("click", event => {
  event.preventDefault();
  let len = cards.length;
  for (let i = 0; i < len; i++) {
    for (let j = 1; j < len; j++) {
      if (cards[j - 1].numbers > cards[j].numbers) {
        let tmp = cards[j - 1].numbers;
        cards[j - 1].numbers = cards[j].numbers;
        cards[j].numbers = tmp;
      }
    }
  }
  SORTBOX.innerHTML = "";
  renderCards(cards, SORTBOX);
});

function createCard() {
  return {
    numbers: NUMBERS[getRandom(NUMBERS)],
    suit: SUIT[getRandom(SUIT)]
  };
}

function getRandom(list) {
  return Math.floor(Math.random() * list.length);
}

function renderCards(listcard, cardContainer) {
  for (const element of listcard) {
    let card = document.createElement("div");
    card.classList.add("card");
    cardContainer.appendChild(card);

    let iconHeart = document.createElement("div");
    iconHeart.classList.add("iconHeart");
    let iconText = document.createTextNode(element.suit); //COMO ES variable no van con comillas
    iconHeart.appendChild(iconText);
    card.appendChild(iconHeart);

    let numberElement = document.createElement("div");
    numberElement.classList.add("numberElement");
    let numberText = document.createTextNode(element.numbers); // =INNERHTML
    numberElement.appendChild(numberText);
    card.appendChild(numberElement);

    let inverseElement = document.createElement("div");
    inverseElement.classList.add("inverseElement");
    let inverseText = document.createTextNode(element.suit);
    inverseElement.appendChild(inverseText);
    card.appendChild(inverseElement);

    if (element.suit == "♣" || element.suit == "♠") {
      iconHeart.classList.add("red");
      inverseElement.classList.add("red");
      numberElement.classList.add("red");
    } else {
      iconHeart.classList.add("black");
      inverseElement.classList.add("black");
      numberElement.classList.add("black");
    }
  }
}
