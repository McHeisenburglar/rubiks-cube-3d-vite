export const SIDES = ['top', 'left', 'front', 'right', 'back', 'bottom'];
export const stickerMoveMapArr = [2, 5, 8, 1, 4, 7, 0, 3, 6];
export const neighborIndexMap = {
	top: [
		[
			['left', 0],
			['back', 2],
		],
		[['back', 1]],
		[
			['back', 0],
			['right', 2],
		],
		[['left', 1]],
		[],
		[['right', 1]],
		[
			['front', 0],
			['left', 2],
		],
		[['front', 1]],
		[
			['right', 0],
			['front', 2],
		],
	],
	left: [
		[
			['back', 2],
			['top', 0],
		],
		[['top', 3]],
		[
			['top', 6],
			['front', 0],
		],
		[['back', 5]],
		[],
		[['front', 3]],
		[
			['bottom', 6],
			['back', 8],
		],
		[['bottom', 3]],
		[
			['front', 6],
			['bottom', 0],
		],
	],
	front: [
		[
			['left', 2],
			['top', 6],
		],
		[['top', 7]],
		[
			['top', 8],
			['right', 0],
		],
		[['left', 5]],
		[],
		[['right', 3]],
		[
			['bottom', 0],
			['left', 8],
		],
		[['bottom', 1]],
		[
			['right', 6],
			['bottom', 2],
		],
	],
	right: [
		[
			['front', 2],
			['top', 8],
		],
		[['top', 5]],
		[
			['top', 2],
			['back', 0],
		],
		[['front', 5]],
		[],
		[['back', 3]],
		[
			['bottom', 2],
			['front', 8],
		],
		[['bottom', 5]],
		[
			['back', 6],
			['bottom', 8],
		],
	],
	back: [
		[
			['right', 2],
			['top', 2],
		],
		[['top', 1]],
		[
			['top', 0],
			['left', 0],
		],
		[['right', 5]],
		[],
		[['left', 3]],
		[
			['bottom', 8],
			['right', 8],
		],
		[['bottom', 7]],
		[
			['left', 6],
			['bottom', 6],
		],
	],
	bottom: [
		[
			['left', 8],
			['front', 6],
		],
		[['front', 7]],
		[
			['front', 8],
			['right', 6],
		],
		[['left', 7]],
		[],
		[['right', 7]],
		[
			['back', 8],
			['left', 6],
		],
		[['back', 7]],
		[
			['right', 8],
			['back', 6],
		],
	],
};

export function neighborsOfPosition(side, index) {
	return neighborIndexMap[side][index].map((neighbor) => {
		return {
			side: neighbor[0],
			index: neighbor[1],
		};
	});
}

export const rotations = {
	corner: {
		a: [-105, 0, 30],
		b: [-105, 0, -30],
		c: [-60, 0, -30],
		d: [-60, 0, 30],
		e: [-15, 120, 0],
		f: [-15, 60, 0],
		g: [15, 75, 0],
		h: [15, 120, 0],
		i: [-15, 30, 0],
		j: [-15, -30, 0],
		k: [15, -15, 0],
		l: [15, 30, 0],
		m: [-15, -60, 0],
		n: [-15, -105, 0],
		o: [15, -105, 0],
		p: [15, -60, 0],
		q: [-15, 210, 0],
		r: [-15, 150, 0],
		s: [15, 150, 0],
		t: [15, 210, 0],
		u: [60, 45, 0],
		v: [60, -30, 0],
		w: [135, 30, 0],
		x: [120, -30, 0],
	},
	edge: {
		a: [-120, 0, 0],
		b: [-75, 0, -30],
		c: [-60, 0, 0],
		d: [-75, 0, 30],
		e: [-30, 75, 0],
		f: [0, 60, 0],
		g: [30, 75, 0],
		h: [0, 120, 0],
		i: [-30, 0, 0],
		j: [0, -30, 0],
		k: [30, 0, 0],
		l: [0, 30, 0],
		m: [-30, -75, 0],
		n: [0, -120, 0],
		o: [30, -75, 0],
		p: [-15, -60, 0],
		q: [-150, 0, 0],
		r: [-15, 150, 0],
		s: [30, 165, 0],
		t: [-15, 210, 0],
		u: [60, 0, 0],
		v: [90, 0, 30],
		w: [120, 0, 15],
		x: [75, 0, -30],
	},
};
export const availableColors = [
	'#0dc40d',
	'#ffa600',
	'#ff004c',
	'#ffffff',
	'#ffff00',
	'#0073ff',
	'#222222',
	'#9A3FF2',
];
export const cubeStyles = {
	black: {
		color: '#111',
		stickerPadding: '8px',
		sideRadius: '6px',
		stickerCornerRadius: '6px',
	},
	white: {
		color: '#eee',
		stickerPadding: '8px',
		sideRadius: '6px',
		stickerCornerRadius: '6px',
	},
	stickerless: {
		color: '#111',
		stickerPadding: '2px',
		sideRadius: '1px',
		stickerCornerRadius: '12px',
	},
};

export const rotationsToPos = {
	top: [
		[-105, 0, 30],
		[-120, 0, 0],
		[-105, 0, -30],
		[-75, 0, 30],
		[-90, 0, 0],
		[-75, 0, -30],
		[-60, 0, 30],
		[-60, 0, 0],
		[-60, 0, -30],
	],
	left: [
		[-15, 120, 0],
		[-30, 75, 0],
		[-15, 60, 0],
		[0, 120, 0],
		[0, 90, 0],
		[0, 60, 0],
		[15, 120, 0],
		[30, 75, 0],
		[15, 75, 0],
	],
	front: [
		[-15, 30, 0],
		[-15, 0, 0],
		[-15, -30, 0],
		[0, 30, 0],
		[0, 0, 0],
		[0, -30, 0],
		[15, 30, 0],
		[30, 0, 0],
		[15, -15, 0],
	],
	right: [
		[-15, -60, 0],
		[-30, -75, 0],
		[-15, -105, 0],
		[-15, -60, 0],
		[0, -90, 0],
		[0, -120, 0],
		[15, -60, 0],
		[30, -75, 0],
		[15, -105, 0],
	],
	back: [
		[-15, 210, 0],
		[-150, 0, 0],
		[-15, 150, 0],
		[-15, 210, 0],
		[0, 180, 0],
		[-15, 150, 0],
		[15, 210, 0],
		[30, 165, 0],
		[15, 150, 0],
	],
	bottom: [
		[60, 30, 0],
		[60, 0, 0],
		[60, -30, 0],
		[75, 0, -30],
		[90, 0, 0],
		[100, 0, 30],
		[120, -30, 0],
		[120, 0, 15],
		[120, 15, 15],
	],
};

export function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function randomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
