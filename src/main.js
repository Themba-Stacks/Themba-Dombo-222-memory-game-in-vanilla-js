import {Game,createPlayBlocks,itemClicked,removeHidden,itemPicked} from '../src/function.js';

Array.prototype.shuffle = function () {
  let input = this;
  for (let i = input.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}

let wordsArray = ["book", "car", "chair", "sock", "fish", "clock", "book", "car", "chair", "sock", "fish", "clock"];
wordsArray.shuffle();

const selectDiv = document.querySelector('div');
selectDiv.appendChild(document.createRange().createContextualFragment(createPlayBlocks(wordsArray)));

const boxes = document.querySelectorAll('div.button');

var game = new Game();
boxes.forEach(function (buttons) {
  buttons.addEventListener('click', game.Compare)
})
