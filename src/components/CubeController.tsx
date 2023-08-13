// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'

function CubeController() {
	// console.log('CubeController rendered.');

	const cubeStyles = {
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
	}
	return <div>CubeController</div>
}

export default CubeController
