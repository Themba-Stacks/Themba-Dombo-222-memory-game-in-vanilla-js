const { Game, itemClicked, removeHidden, itemPicked } = require('../src/scripts/memoryGame.js');
const createPlayBlocks = require('../src/scripts/createPlayBlocks');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


var wordsArray = ["book", "car", "chair", "sock", "fish", "clock", "book", "car", "chair", "sock", "fish", "clock"];
const domHtml = new JSDOM(`<body>
<h1>Memory Game</h1>
<div class="container">
</div>
<script type="module" src="main.js" defer></script>
</body>`, { includeNodeLocations: true });
const dom = domHtml.window.document;
const testingDOM = dom.querySelector('div')
testingDOM.appendChild(dom.createRange().createContextualFragment(createPlayBlocks(wordsArray)));


describe("createPlayBlocks", () => {

    it('should have inner divs with a class of hidden', () => {
        expect(testingDOM.querySelector('div.box0 h3')).toHaveClass('hidden')
    })

    it('should add first array item to first html div', () => {
        expect(testingDOM.querySelector('div.box0 h3').innerHTML).toBe(wordsArray[0])
    })

    it('should add last array items to last html div', () => {
        expect(testingDOM.querySelector('div.box11 h3').innerHTML).toBe(wordsArray[11])
    })

});

describe("removeHidden", () => {
    let box2;
    beforeEach(() => {
        box2 = testingDOM.querySelector('div.button.box2')
        box2.addEventListener('click', removeHidden)
        box2.click()
    })

    it('should remove the hidden class from div element', () => {
        expect(box2).not.toHaveClass('hidden')
    })
});

describe("itemPicked", () => {
    let box4;
    beforeEach(() => {
        box4 = testingDOM.querySelector('div.button.box4');
        box4.addEventListener('click', (e) => {
            box4.classList.add('itemPicked')
            itemPicked(e)
        });
    })

    it('should contain the class itemPicked to show that box has been clicked', () => {
        box4.click()
        expect(box4).toHaveClass('itemPicked');
    });
});

describe("itemClicked", () => {
    let box5;
    beforeEach(() => {
        box5 = testingDOM.querySelector('div.button.box5');
        box5.addEventListener('click', (e) => {
            box5.classList.add('itemClicked')
            itemClicked(e)
        });
    })

    it('should contain the class itemClicked to show that box has been clicked', () => {
        box5.click()
        expect(box5).toHaveClass('itemClicked');
    })
});

describe("compare", () => {
    let box6;
    beforeEach(() => {
        let testingDOM = dom.querySelector('div')
        testingDOM.appendChild(dom.createRange().createContextualFragment(createPlayBlocks(wordsArray)));
        box6 = testingDOM.querySelector('div.button.box6');
    })

    it('should be called from whe selected div is clicked', () => {
        var game = new Game();
        spyOn(game, "compare");
        box6.addEventListener('click', game.compare);
        box6.click();
        expect(game.compare).toHaveBeenCalled();
    })
});