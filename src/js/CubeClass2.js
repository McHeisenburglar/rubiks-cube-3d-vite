import {
	SIDES,
	neighborIndexMap,
	neighborsOfPosition,
	stickerMoveMapArr,
	randomElement,
	randomNumber,
} from './helper'

const MOVE_TYPES = ['U', 'L', 'R', 'F', 'B', 'D']

const rotationMaps = {
	x: [0, 4, 1, 2, 3, 5],
	y: [4, 1, 0, 3, 5, 2],
	z: [1, 5, 2, 0, 4, 3],
}

const rotationOrder = {
	x: [4, 1, 2, 3],
	y: [4, 0, 2, 5],
	z: [1, 5, 0, 3],
}

const frontEdgeOrder = [1, 5, 7, 3]

const sideIndex = (side) => SIDES.indexOf(side)

const rotationalDistnace = (origin, target, arr) => {
	const a = arr.indexOf(origin)
	const b = arr.indexOf(target)
	if (a < 0 || b < 0) return null

	if (b >= a) return b - a
	else return b + arr.length - a
}

const moveMap = {
	U: 'top',
	F: 'front',
	L: 'left',
	R: 'right',
	B: 'back',
	D: 'bottom',
}

const cubeFaceToStickerMap = [
	['corner', 0],
	['edge', 0],
	['corner', 1],
	['edge', 3],
	['center', 0],
	['edge', 1],
	['corner', 3],
	['edge', 2],
	['corner', 2],
]

function generateRandomMove(previousMove) {
	let move = randomElement(MOVE_TYPES)
	if (move === previousMove) return generateRandomMove(previousMove)

	const random = Math.random()
	if (random > 0.66) return `${move}'`
	if (random > 0.33) return `${move}2`
	return move
}

function generateScramble() {
	const moves = []
	const amountOfMoves = randomNumber(16, 24)

	let previousMove = null
	for (let i = 0; i < amountOfMoves; i++) {
		const move = generateRandomMove(previousMove)
		previousMove = move[0]
		moves.push(move)
	}

	return moves.join(' ')
}

class Position {
	constructor(side, index) {
		this.side = side
		this.index = index
	}
}

class Sticker {
	constructor(side, index, name = '') {
		this.side = side
		this.index = index
		this.name = name
		this.neighbors = []
		this.currentPosition = new Position(side, index)
	}
	get type() {
		if (this.neighbors.length === 2) return 'corner'
		if (this.neighbors.length === 1) return 'edge'
		if (this.neighbors.length === 0) return 'center'
		return 'unknown'
	}
	get id() {
		return `${this.side}-${this.index}`
	}
	setPosition(side, index) {
		this.currentPosition.side = side
		this.currentPosition.index = index
	}

	isSameAs(sticker) {
		return this === sticker
	}
}

export class CubeWithPos {
	constructor() {
		this.dimensions = 3
		this.stickerNames = {
			top: ['A', 'a', 'B', 'd', '', 'b', 'D', 'c', 'C'],
			left: ['E', 'e', 'F', 'h', '', 'f', 'H', 'g', 'G'],
			front: ['I', 'i', 'J', 'l', '', 'j', 'L', 'k', 'K'],
			right: ['M', 'm', 'N', 'p', '', 'n', 'P', 'o', 'O'],
			back: ['Q', 'q', 'R', 't', '', 'r', 'T', 's', 'S'],
			bottom: ['U', 'u', 'V', 'x', '', 'v', 'X', 'w', 'W'],
		}
		this.pieceTypeStickerNames = {
			edge: {
				top: ['a', 'b', 'c', 'd'],
				left: ['e', 'f', 'g', 'h'],
				front: ['i', 'j', 'k', 'l'],
				right: ['m', 'n', 'o', 'p'],
				back: ['q', 'r', 's', 't'],
				bottom: ['u', 'v', 'w', 'x'],
			},
			corner: {
				top: ['a', 'b', 'c', 'd'],
				left: ['e', 'f', 'g', 'h'],
				front: ['i', 'j', 'k', 'l'],
				right: ['m', 'n', 'o', 'p'],
				back: ['q', 'r', 's', 't'],
				bottom: ['u', 'v', 'w', 'x'],
			},
			center: {
				top: [''],
				left: [''],
				front: [''],
				right: [''],
				back: [''],
				bottom: [''],
			},
		}
		this.colors = {
			front: '#0dc40d',
			left: '#ffa600',
			right: '#ff004c',
			top: '#ffffff',
			bottom: '#ffff00',
			back: '#0073ff',
		}
		this.cubeStyle = 'stickerless'
		this.state = {}

		this.renderState = {
			showStickers: true,
		}

		// Configure cube
		this.reset()
		// console.log('Cube initialized.')
	}

	loadCube(cube) {
		this.colors = cube.colors
		this.cubeStyle = cube.cubeStyle
		this.pieceTypeStickerNames = cube.pieceTypeStickerNames
		this.reset()
	}

	resetOld() {
		SIDES.forEach((side) => {
			this.state[side] = []
			for (let i = 0; i < Math.pow(this.dimensions, 2); i++) {
				const name = this.stickerNames[side][i]
				const sticker = new Sticker(side, i, name)
				this.state[side].push(sticker)
			}
		})
		this.initializeNeighbors()
	}

	reset() {
		SIDES.forEach((side) => {
			this.state[side] = []
			for (let i = 0; i < Math.pow(this.dimensions, 2); i++) {
				const [pieceType, stickerNameIndex] = cubeFaceToStickerMap[i]
				const name =
					this.pieceTypeStickerNames[pieceType][side][stickerNameIndex]
				// console.log(name)
				const sticker = new Sticker(side, i, name)
				this.state[side].push(sticker)
				// console.log('Added sticker.', sticker)
			}
		})
		this.initializeNeighbors()
	}

	get allStickers() {
		const arr = []
		SIDES.forEach((side) => {
			this.state[side].forEach((sticker) => arr.push(sticker))
		})
		return arr
	}

	getStickersByType(types) {
		return this.allStickers.filter((sticker) => types.includes(sticker.type))
	}

	getStickersArray(options = { pieceTypes: ['corner', 'edge'], sides: SIDES }) {
		const { pieceTypes, sides } = options
		const arr = []
		SIDES.forEach((side) => {
			this.state[side].forEach((sticker) => {
				if (pieceTypes.includes(sticker.type)) arr.push(sticker)
			})
		})
		return arr
	}

	getStickerByLetter(letter, type) {
		// console.log('getting sticker by letter', letter)
		let result = null
		SIDES.forEach((side) => {
			this.state[side].forEach((sticker) => {
				if (
					sticker.name.toLowerCase() === letter.toLowerCase() &&
					sticker.type === type
				) {
					result = sticker
				}
			})
		})
		return result
	}

	getStickerById(id) {
		return this.allStickers.find((sticker) => sticker.id === id)
	}

	getPositionOfSticker(letter) {
		let result = null
		SIDES.forEach((side) => {
			this.state[side].forEach((sticker) => {
				if (sticker.name === letter) {
					result = {
						side,
						index: sticker.index,
					}
				}
			})
		})
		return result
	}

	getStickerByPosition(sideIndex, index) {
		let side = sideIndex
		if (typeof side === 'number') side = SIDES[sideIndex]
		return this.state[side][index]
	}

	initializeNeighbors() {
		this.sides.forEach((side) => {
			this.state[side].forEach((sticker, index) => {
				sticker.neighbors = neighborIndexMap[side][index].map(
					(neighbor) => this.state[neighbor[0]][neighbor[1]]
				)
			})
		})
	}

	get sides() {
		return Object.keys(this.state)
	}

	turn(side, amount = 1) {
		for (let i = 0; i < amount; i++) {
			// Current state of side
			const arr = new Array(this.side)

			// For each sticker
			this.state[side].forEach((sticker, index) => {
				// Move sticker
				const newIndex = stickerMoveMapArr[index]
				arr[newIndex] = sticker
				sticker.setPosition(side, newIndex)

				// Move neighbors
				const originalNeighbors = neighborsOfPosition(side, newIndex)
				sticker.neighbors.forEach((neighbor, i) => {
					const { side, index } = originalNeighbors[i]
					neighbor.setPosition(side, index)
					this.state[side][index] = neighbor
				})
			})
			this.state[side] = arr
		}
	}

	makeMove(move) {
		const face = moveMap[move[0]]

		let amount = 1 // e.g "R"
		if (move.includes('2')) amount = 2 // e.g "R2"
		if (move.includes("'")) amount = 3 // e.g "R'"

		this.turn(face, amount)
	}

	getAvailableLetters(pieceTypes = ['corner', 'edge']) {
		const arr = []
		SIDES.forEach((side) => {
			this.state[side].forEach((sticker) => {
				if (
					pieceTypes.includes(sticker.type) &&
					!arr.includes(sticker.name.toLowerCase())
				)
					arr.push(sticker.name.toLowerCase())
			})
		})
		return arr
	}

	performAlgorithm(alg) {
		alg.split(' ').forEach((move) => this.makeMove(move))
	}

	scramble() {
		this.reset()
		const scramble = generateScramble()
		// console.log('Current scramble:', scramble)
		this.performAlgorithm(scramble)
		// console.log(this.state)
		return scramble
	}

	renameSticker(stickerId, name) {
		const sticker = this.getStickerById(stickerId)
		sticker.name = name.toLowerCase()
		const [type, nameIndex] = cubeFaceToStickerMap[sticker.index]
		const { side } = sticker
		this.pieceTypeStickerNames[type][side][nameIndex] = name.toLowerCase()
	}

	rotateColors(dimension) {
		// console.log('Rotating', dimension)
		const oldColors = SIDES.map((side) => this.colors[side])
		const newColors = new Array(SIDES.length)

		oldColors.forEach((color, index) => {
			const newIndex = rotationMaps[dimension][index]
			newColors[newIndex] = color
		})

		SIDES.forEach((side, index) => (this.colors[side] = newColors[index]))
	}

	rotateColorsNTimes(dimension, amount) {
		// console.log(`Rotating ${dimension} - ${amount} times`)
		for (let i = 0; i < amount; i++) {
			this.rotateColors(dimension)
		}
	}

	rotateColorsToNewSticker(idOfTargetSticker) {
		const currentFU = this.getStickerByPosition('front', 1)
		const targetFU = this.getStickerById(idOfTargetSticker)

		const currentSideIndex = sideIndex(currentFU.side)
		const targetSideIndex = sideIndex(targetFU.side)

		// console.log(`Moving from ${currentSideIndex} to ${targetSideIndex}`)

		if (currentSideIndex !== targetSideIndex) {
			if (rotationOrder.x.includes(targetSideIndex)) {
				const dist = rotationalDistnace(
					currentSideIndex,
					targetSideIndex,
					rotationOrder.x
				)
				this.rotateColorsNTimes('x', dist)
			} else if (rotationOrder.y.includes(targetSideIndex)) {
				const dist = rotationalDistnace(
					currentSideIndex,
					targetSideIndex,
					rotationOrder.y
				)
				this.rotateColorsNTimes('y', dist)
			}
		}

		if (currentFU.index !== targetFU.index) {
			const dist = rotationalDistnace(
				currentFU.index,
				targetFU.index,
				frontEdgeOrder
			)
			this.rotateColorsNTimes('z', dist)
		}
	}

	setOrientationToSticker(idOfTargetSticker) {
		this.reset()
		this.rotateColorsToNewSticker(idOfTargetSticker)
		// console.log(this.colors)
		this.reset()
	}
}
