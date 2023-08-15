import { CubeWithPos, Sticker as StickerData } from '../ts/CubeClass2.js'
import React, { useMemo, useState } from 'react'
import { SIDES } from '../ts/helper.js'
import RotationController from './RotationController.js'
import { FaPalette } from 'react-icons/fa'
import CubePerspectiveWrapper from './new/CubePerspectiveWrapper.js'

import '../scss/cube-v2.scss'

/* MAIN COMPONENT */
interface CubeComponentProps {}

const CubeComponent: React.FC<CubeComponentProps> = () => {
	console.log('::::: Rendered CubeComponent.')

	const cube = useMemo(() => new CubeWithPos(), [])
	// cube.scramble()
	const [rotation, setRotation] = useState<RotationSet>({
		x: -15,
		y: -30,
		z: 0,
	})

	return (
		<main className="cube-v2">
			{/* <div className="cube-wrapper"> */}
			<RotationController
				disabled={true}
				rotation={rotation}
				setRotation={setRotation}
			>
				<CubePerspectiveWrapper mode="flat-fold">
					<Cube cube={cube} />
				</CubePerspectiveWrapper>
			</RotationController>
			{/* </div> */}
		</main>
	)
}

/* CUBE */
interface CubeProps {
	cube: CubeWithPos
}

const Cube: React.FC<CubeProps> = ({ cube }) => {
	console.log('::::: Rendered Cube.')
	return (
		<div className={`cube`}>
			{SIDES.map((side, index) => (
				<CubeSide side={side} stickers={cube.state[side]} key={index} />
			))}
		</div>
	)
}

/* CUBE SIDE */
interface CubeSideProps {
	side: Side
	stickers: StickerData[]
}

const CubeSide: React.FC<CubeSideProps> = ({ side, stickers }) => {
	console.log('::::: Rendered CubeSide.')

	return (
		<div className={`side side-${side}`} data-side={side}>
			{stickers.map((sticker: StickerData, index: number) => {
				const position = `${side}-${index}`
				return (
					<Sticker
						key={index}
						sticker={sticker}
						index={index}
						position={position}
					/>
				)
			})}
		</div>
	)
}

/* STICKER */
interface StickerProps {
	sticker: StickerData
	position: string
	index: number
}

const Sticker: React.FC<StickerProps> = ({ sticker, index, position }) => {
	console.log('::::: Rendered Sticker.')

	const { side, name, type, id } = sticker
	const mode = 'letter'

	const highlightedSticker = 'top-6'

	const handleClick = (id: StickerId) => {
		console.log(id)
	}

	const dataAttributes = {
		'data-sticker-color': side,
		'data-sticker-name': name,
		'data-sticker-id': id,
		'data-piece-type': type,
		'data-sticker-position': position,
	}

	const classList = ['sticker', 'dim']
	if (id === highlightedSticker) classList.push('highlight')

	return (
		<div
			className={classList.join(' ')}
			onClick={() => handleClick(id)}
			{...dataAttributes}
		>
			<StickerContent mode={mode} sticker={sticker} index={index} />
		</div>
	)
}

/* STICKER CONTENT */
interface StickerContentProps {
	mode: string
	sticker: StickerData
	index: number
}

const StickerContent: React.FC<StickerContentProps> = ({
	mode,
	sticker,
	index,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { side, name, type, id } = sticker

	if (mode === 'letter') {
		return (
			<span className="sticker-letter">
				{type === 'corner' ? name.toUpperCase() : name}
			</span>
		)
	}

	if (mode === 'arrow') {
		if (type === 'edge') {
			let direction = ''

			if (index === 1) direction = 'up'
			if (index === 3) direction = 'left'
			if (index === 5) direction = 'right'
			if (index === 7) direction = 'down'

			return (
				<span className={`sticker-arrow sticker-arrow-${direction}`}>⬆</span>
			)
		}
	}

	if (mode === 'edit-colors') {
		if (type === 'center') return <FaPalette />
	}

	return <></>
}
/* ------- */

export default CubeComponent
