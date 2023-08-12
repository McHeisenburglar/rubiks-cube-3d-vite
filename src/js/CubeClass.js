import {
	SIDES,
	neighborIndexMap,
	neighborsOfPosition,
	stickerMoveMapArr,
} from './helper';

class Sticker2 {
	constructor(side, index, name = '') {
		this.side = side;
		this.index = index;
		this.name = name;
		this.neighbors = [];
	}
	get type() {
		if (this.index === 4) return 'center';
		if (this.index % 2 === 0) return 'corner';
		return 'edge';
	}
	get id() {
		return `${this.side}-${this.index}`;
	}
}

export class CubeWithPos {
	constructor() {
		this.dimensions = 3;
		this.stickerNames = {
			top: ['A', 'a', 'B', 'd', '', 'b', 'D', 'c', 'C'],
			left: ['E', 'e', 'F', 'h', '', 'f', 'H', 'g', 'G'],
			front: ['I', 'i', 'J', 'l', '', 'j', 'L', 'k', 'K'],
			right: ['M', 'm', 'N', 'p', '', 'n', 'P', 'o', 'O'],
			back: ['Q', 'q', 'R', 't', '', 'r', 'T', 's', 'S'],
			bottom: ['U', 'u', 'V', 'x', '', 'v', 'X', 'w', 'W'],
		};
		this.colors = {
			front: '#0dc40d',
			left: '#ffa600',
			right: '#ff004c',
			top: '#ffffff',
			bottom: '#ffff00',
			back: '#0073ff',
		};
		this.cubeStyle = 'black';
		this.state = {};

		this.DOMSettings = {
			anchorToId: '',
		};

		// Configure cube
		this.reset();
	}

	get id() {
		return this.DOMSettings.anchorToId;
	}

	set id(id) {
		this.DOMSettings.anchorToId = `#${id}`;
	}

	reset() {
		SIDES.forEach((side) => {
			this.state[side] = [];
			for (let i = 0; i < Math.pow(this.dimensions, 2); i++) {
				const name = this.stickerNames[side][i];
				const sticker = new Sticker2(side, i, name);
				this.state[side].push(sticker);
			}
		});
		this.initializeNeighbors();
	}

	getStickerByLetter(letter, type) {
		console.log('getting sticker by letter', letter);
		let result = null;
		SIDES.forEach((side) => {
			this.state[side].forEach((sticker) => {
				if (
					sticker.name.toLowerCase() === letter.toLowerCase() &&
					sticker.type === type
				) {
					result = sticker;
				}
			});
		});
		return result;
	}

	getPositionOfSticker(letter) {
		let result = null;
		SIDES.forEach((side) => {
			this.state[side].forEach((sticker) => {
				if (sticker.name === letter) {
					result = {
						side,
						index: sticker.index,
					};
				}
			});
		});
		return result;
	}

	initializeNeighbors() {
		this.sides.forEach((side) => {
			this.state[side].forEach((sticker, index) => {
				sticker.neighbors = neighborIndexMap[side][index].map(
					(neighbor) => this.state[neighbor[0]][neighbor[1]]
				);
			});
		});
	}

	get sides() {
		return Object.keys(this.state);
	}

	turn(side) {
		// Current state of side
		const arr = new Array(this.side);

		// For each sticker
		this.state[side].forEach((sticker, index) => {
			// Move sticker
			const newIndex = stickerMoveMapArr[index];
			arr[newIndex] = sticker;

			// Move neighbors
			const originalNeighbors = neighborsOfPosition(side, newIndex);
			sticker.neighbors.forEach((neighbor, i) => {
				const { side, index } = originalNeighbors[i];
				this.state[side][index] = neighbor;
			});
		});
		this.state[side] = arr;
	}

	getAvailableLetters(pieceTypes = ['corner', 'edge']) {
		const arr = [];
		SIDES.forEach((side) => {
			this.state[side].forEach((sticker) => {
				if (
					pieceTypes.includes(sticker.type) &&
					!arr.includes(sticker.name.toLowerCase())
				)
					arr.push(sticker.name.toLowerCase());
			});
		});
		return arr;
	}
}
