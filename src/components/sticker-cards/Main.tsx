import React, { useMemo } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'

interface IProps {}

const StickerCard: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])

	const sticker = cube.getRandomStickerInFilter((s) => s.type === 'edge')

	console.log('Showing sticker', sticker.name)

	return (
		<div className="cube-v2-piece">
			{cube.allStickers.map((s) => (
				<CubePieceView sticker={s} size={80} debug />
			))}
		</div>
	)
}

export default StickerCard

import CubeStyleProvider from '../new/CubeStyleConfigWrapper'
interface CubeView {
	sticker: ISticker
	debug?: boolean
	size?: number
	onStickerClick?: (sticker: ISticker) => void
}

export const CubePieceView: React.FC<CubeView> = ({ sticker, debug, size }) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	const cornerRotation: RotationSet = {
		x: -45,
		y: -45,
		z: 0,
	}

	const edgeRotation: RotationSet = {
		x: -60,
		y: -90,
		z: 0,
	}

	const rotation = sticker.type === 'corner' ? cornerRotation : edgeRotation

	const style = {
		'--side-size': `${size ? size / 4 : 20}px`,
		'--rotate-x': `${rotation.x}deg`,
		'--rotate-y': `${rotation.y}deg`,
		'--rotate-z': `${rotation.z}deg`,
	} as React.CSSProperties

	if (sticker.type === 'center') return <></>

	// if (sticker.type === 'corner') rotate({ x: 0, y: 0, z: 0 })

	return (
		<div
			className="cube-piece-wrapper m-auto cube-perspective-wrapper cube-wrapper-3d-fold"
			style={style}
		>
			<CubePiece sticker={sticker} />
		</div>
	)
}

interface CubePieceProps {
	sticker: ISticker
	debug?: boolean
}

const CubePiece: React.FC<CubePieceProps> = ({ sticker, debug }) => {
	if (debug) console.log('::::: Rendered Cube.')

	return (
		<div className={`cube-piece cube-piece-${sticker.type}`}>
			<CubeSide sticker={sticker} side="top" />
			{sticker.neighbors?.map((n, i) => {
				return <CubeSide sticker={n} side={i === 0 ? 'right' : 'front'} />
			})}
		</div>
	)
}

/* CUBE SIDE */
interface CubeSideProps {
	sticker: ISticker
	debug?: boolean
	side: Side
}

export const CubeSide: React.FC<CubeSideProps> = ({ sticker, debug, side }) => {
	if (debug) console.log('::::: Rendered CubeSide.')

	return (
		<>
			{/* <div className={`piece-side piece-side-${side}`} data-side={side}> */}
			<PieceSticker sticker={sticker} side={side} position={sticker.side + 0} />
			{/* </div> */}
			{/* <PieceSticker sticker={sticker} position={sticker.side + 0} /> */}
		</>
	)
}

interface StickerProps {
	sticker: ISticker
	position: string
	side: Side
	debug?: boolean
	classes?: string[]
}

const PieceSticker: React.FC<StickerProps> = ({ sticker, debug, side }) => {
	if (debug) console.log('::::: Rendered Sticker.')

	// const { side } = sticker

	const classList = ['sticker', 'piece-side', `piece-side-${side}`]
	const dataAttributes = {
		'data-sticker-color': sticker.side,
	}

	return <div className={classList.join(' ')} {...dataAttributes}></div>
}
