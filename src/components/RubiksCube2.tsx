// react and hooks
import React, { useMemo } from 'react'
// import useUpdateEffect from '../hooks/useUpdateEffect.js'
import { useSceneEffect } from './new/useSceneEffect'

// ts library
import { CubeWithPos, Sticker as StickerData } from '../ts/CubeClass2.js'
import { SIDES } from '../ts/helper.js'

// my components
import RotationController from './new/RotationController.js'
import CubePerspectiveWrapper from './new/CubePerspectiveWrapper.js'
import SceneController from './new/SceneController.js'

// icons
import { FaPalette } from 'react-icons/fa'

// styles
import '../scss/cube-v2.scss'

/* MAIN COMPONENT */
interface CubeComponentProps {
	debug?: boolean
}

const CubeComponent: React.FC<CubeComponentProps> = ({ debug }) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	const cube = useMemo(() => {
		const cube = new CubeWithPos()
		cube.scramble()
		return cube
	}, [])

	const handleStickerClick = (sticker: StickerData) => {
		console.log('sticker clicked', sticker)
	}

	return (
		<main className="cube-v2">
			<div className="cube-wrapper">
				<SceneController>
					<RotationController debug>
						<CubePerspectiveWrapper mode="3d-fold">
							<Cube cube={cube} onStickerClick={handleStickerClick} />
						</CubePerspectiveWrapper>
					</RotationController>
				</SceneController>
			</div>
		</main>
	)
}

const ComponentExport = () => {
	return (
		<>
			<CubeComponent />
			<CubeComponent />
		</>
	)
}

/* CUBE */
interface CubeProps {
	cube: CubeWithPos
	onStickerClick?: (sticker: StickerData) => void
	debug?: boolean
}

const Cube: React.FC<CubeProps> = ({ cube, onStickerClick, debug }) => {
	if (debug) console.log('::::: Rendered Cube.')

	const handleStickerClick = (sticker: StickerData) =>
		onStickerClick && onStickerClick(sticker)

	return (
		<div className={`cube`}>
			{SIDES.map((side, index) => (
				<CubeSide
					side={side}
					stickers={cube.state[side]}
					key={index}
					onStickerClick={handleStickerClick}
				/>
			))}
		</div>
	)
}

/* CUBE SIDE */
interface CubeSideProps {
	side: Side
	stickers: StickerData[]
	debug?: boolean
	onStickerClick?: (sticker: StickerData) => void
}

const CubeSide: React.FC<CubeSideProps> = ({
	side,
	stickers,
	debug,
	onStickerClick,
}) => {
	if (debug) console.log('::::: Rendered CubeSide.')

	const handleStickerClick = (sticker: StickerData) =>
		onStickerClick && onStickerClick(sticker)

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
						onClick={() => handleStickerClick(sticker)}
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
	debug?: boolean
	onClick?: (sticker: StickerData) => void
}

const Sticker: React.FC<StickerProps> = ({
	sticker,
	index,
	position,
	onClick,
	debug,
}) => {
	if (debug) console.log('::::: Rendered Sticker.')

	const { side, name, type, id } = sticker
	const mode = 'letter'

	const classList = ['sticker', 'dim']
	const dataAttributes = {
		'data-sticker-color': side,
		'data-sticker-name': name,
		'data-sticker-id': id,
		'data-piece-type': type,
		'data-sticker-position': position,
	}

	const highlight = useSceneEffect('highlight')
	if (highlight && id === highlight.value) classList.push('highlight')

	const handleClick = () => onClick && onClick(sticker)

	return (
		<div
			className={classList.join(' ')}
			onClick={handleClick}
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

export default ComponentExport
