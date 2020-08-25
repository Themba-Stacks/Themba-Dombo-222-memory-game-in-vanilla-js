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
  return playblocks;
};

module.exports = createPlayBlocks;