const { Game, createPlayBlocks, itemClicked, removeHidden, itemPicked } = require('../src/function.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let wordsArray = ["book", "car", "chair", "sock", "fish", "clock", "book", "car", "chair", "sock", "fish", "clock"];

describe("createPlayBlocks", () => {
    var selectDiv
    beforeAll(() => {
        const domIndex = new JSDOM(`<body>
<h1>Memory Game</h1>
<div class="container">
</div>

<script type="module" src="main.js" defer ></script>
</body>`, { includeNodeLocations: true })
        const dom = domIndex.window.document;
       
        selectDiv = dom.querySelector('div')
        selectDiv.appendChild(dom.createRange().createContextualFragment(createPlayBlocks(wordsArray)));
    })

    it('should have inner divs with a clas of hidden', () => {
        expect(selectDiv.querySelector('div.box0 h3')).toHaveClass('hidden')
    })

    it('should add first array item to first html div', () => {
        expect(selectDiv.querySelector('div.box0 h3').innerHTML).toBe(wordsArray[0])
    }) 

    it('should add last array items to last html div', () => {
        expect(selectDiv.querySelector('div.box11 h3').innerHTML).toBe(wordsArray[11])
    }) 
});


