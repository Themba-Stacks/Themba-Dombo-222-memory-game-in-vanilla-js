let compareArray = [];
let childrenArray = [];
function itemClicked(event) {
  const boxClass = event.currentTarget.children[0];
  return boxClass;
}

function removeHidden(event) {
  const hidden = event.currentTarget.children[0];
  hidden.classList.remove('hidden');
}

function itemPicked(event) {
  const boxText = event.currentTarget.children[0].innerText;
  return boxText;
}

function compare(event) {
  if (compareArray.length < 1) {
    removeHidden(event);
    compareArray.push(itemPicked(event))
    childrenArray.push(itemClicked(event))

  } else if (compareArray.includes(itemPicked(event)) && !(childrenArray.includes(itemClicked(event)))) {
    removeHidden(event);
    childrenArray.push(itemClicked(event))
    childrenArray.forEach(selectedBox => {
      selectedBox.classList.add('correct')
    })
    compareArray = [];
    childrenArray = [];

  } else {
    removeHidden(event)
    childrenArray.push(itemClicked(event))
    childrenArray.forEach(selectedBox => {
      setTimeout(() => { selectedBox.classList.add('hidden') }, 650)
    })
    compareArray = [];
    childrenArray = [];
  }
}

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

function createPlayBlocks(listOfItems) {
  let playblocks = ``;
  let count = 0;

  listOfItems.forEach(items => {
    playblocks += `
  <div class="button box${count}">
    <h3 class="hidden">${items}</h3>
  </div> `;
    count++;
  });
  const myFragment = document.createRange().createContextualFragment(playblocks);
  return myFragment
}
//***********************************/
let wordsArray = ["book", "car", "chair", "sock", "fish", "clock", "book", "car", "chair", "sock", "fish", "clock"];
wordsArray.shuffle();

const p = document.querySelector('div');
p.appendChild(createPlayBlocks(wordsArray));

const boxes = document.querySelectorAll('div.button');

boxes.forEach(function (bottons) {
  bottons.addEventListener('click', compare)
})
