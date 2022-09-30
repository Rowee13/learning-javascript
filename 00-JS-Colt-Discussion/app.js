// Write a getCard() function which returns a random playing card object, like:
// 		{
// 			value: 'K'
// 			suit: 'clubs'
// 		}
//Pick a random value from:
//----1,2,3,4,5,6,7,8,9,10,J,Q,K,A
//Pick a random suit from:
//----clubs,spades, hearts, diamonds
//Return both in an object

/*
 * reduce
 */

// const grades = [87, 64, 96, 92, 88, 99, 73, 70, 64];

// const maxGrade = grades.reduce((max, currVal) => {
// 	if (currVal > max) return currVal;
// 	return max;
// });

// const maxGrade = grades.reduce((max, currVal) => {
// 	return Math.max(max, currVal);
// });

// const minGrade = grades.reduce((min, currVal) => {
// 	return Math.min(min, currVal);
// });

// const votes = [
// 	"y",
// 	"y",
// 	"n",
// 	"y",
// 	"n",
// 	"y",
// 	"y",
// 	"y",
// 	"n",
// 	"y",
// 	"n",
// 	"y",
// 	"y",
// 	"n",
// 	"n",
// 	"n",
// 	"y",
// ];

// const results = votes.reduce((tally, val) => {
// 	if (tally[val]) {
// 		tally[val]++;
// 	} else {
// 		tally[val] = 1;
// 	}
// 	return tally;
// }, {});

// const results = votes.reduce((tally, val) => {
// 	tally[val] = (tally[val] || 0) + 1;
// 	return tally;
// }, {});

/*
 * Destructuring topic
 */

// const raceResults = [
// 	"Eliud Kipchoge",
// 	"Feyisa Lelisa",
// 	"Galen Rupp",
// 	"Ghirmay Ghebreslassie",
// 	"Alphonce Simbu",
// 	"Jared Ward",
// ];

// const [gold, silver, bronze] = raceResults;

// const runner = {
// 	first: "Eliud",
// 	last: "Kipchoge",
// 	country: "Kenya",
// 	title: "Elder of the Order of the Golden Heart of Kenya",
// };

// const { first, last } = runner;

// const { country: nation, title: honorific } = runner;

// const results = [
// 	{
// 		first: "Eliud",
// 		last: "Kipchoge",
// 		country: "Kenya",
// 	},
// 	{
// 		first: "Feyisa",
// 		last: "Lilesa",
// 		country: "Ethiopia",
// 	},
// 	{
// 		first: "Galen",
// 		last: "Rupp",
// 		country: "United States",
// 	},
// ];

// const [{ first: goldWinner }, { country }] = results;

/*
 *this
 */

// const annoyer = {
// 	phrases: [
// 		"literally",
// 		"cray cray",
// 		"I can't even",
// 		" Totes!",
// 		"YOLO",
// 		"Can't Stop, Won't Stop",
// 	],
// 	pickPhrase() {
// 		const { phrases } = this;
// 		const idx = Math.floor(Math.random() * phrases.length);
// 		return phrases[idx];
// 	},
// 	start() {
// 		this.timerId = setInterval(() => {
// 			console.log(this.pickPhrase());
// 		}, 2000);
// 	},
// 	stop() {
// 		clearInterval(this.timerId);
// 		console.log("PHEW THANK HEAVENS THAT IS OVER!");
// 	},
// };

/*
 *Make Deck card
 */
/*
 *solution 1
 */

// function makeDeck() {
// 	const deck = [];
// 	const suits = ["hearts", "diamonds", "spades", "clubs"];
// 	const values = "2,3,4,5,6,7,8,9,10,J,Q,K,A";

// 	for (let value of values.split(",")) {
// 		for (let suit of suits) {
// 			deck.push({
// 				value,
// 				suit,
// 			});
// 		}
// 	}
// 	return deck;
// }

// function drawCard(deck) {
// 	return deck.pop();
// }

// const myDeck = makeDeck();
// const card1 = drawCard(myDeck);

/*
 *solution 2 with draw multiple and shuffle
 */
const myDeck = {
	deck: [],
	drawnCards: [],
	suits: ["hearts", "diamonds", "spades", "clubs"],
	values: "2,3,4,5,6,7,8,9,10,J,Q,K,A",
	initializeDeck() {
		const { suits, values, deck } = this;
		for (let value of values.split(",")) {
			for (let suit of suits) {
				deck.push({
					value,
					suit,
				});
			}
		}
	},
	drawCard() {
		const card = this.deck.pop();
		this.drawnCards.push(card);
		return card;
	},
	drawMultiple(numCards) {
		const cards = [];
		for (let i = 0; i < numCards; i++) {
			cards.push(this.drawCard());
		}
		return cards;
	},
	shuffle() {
		const { deck } = this;
		//loop over array backwards
		for (let i = deck.length - 1; i > 0; i--) {
			//pick random index before curent element
			let j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
		}
	},
};
