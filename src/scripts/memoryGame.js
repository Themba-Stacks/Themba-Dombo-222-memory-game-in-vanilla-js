function Game() {
  var compareArray = [];
  var childrenArray = [];

  this.compare = function (event) {
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

}
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

function createPlayBlocks(listOfItems) {
  let playblocks =``;
  let count = 0;

  listOfItems.forEach(items => {
    playblocks += `
      <div class="button box${count}">
        <h3 class="hidden">${items}</h3>
      </div> `;
    count++;
    
  });
  return playblocks;
}


//uncomment module.exports and comment out exports when running test still working on a fix to handle this properly

export { Game, createPlayBlocks, itemPicked, itemClicked, removeHidden };
//module.exports = { "Game": Game, "createPlayBlocks": createPlayBlocks, "itemClicked": itemClicked, "removeHidden": removeHidden, "itemPicked": itemPicked };
