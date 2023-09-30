import React, { useMemo } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'

interface IProps {}

const StickerCard: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])

	const sticker = cube.getRandomStickerInFilter((s) => s.type === 'edge')

	console.log('Showing sticker', sticker.name)

	return (
		<CubeStyleProvider config={cube.cubeConfig}>
			{cube.allStickers.map((s) => (
				<CubePieceView sticker={s} size={80} debug />
			))}
		</CubeStyleProvider>
	)
}

export default StickerCard

import CubePerspectiveWrapper from '../new/CubePerspectiveWrapper'
import CubeRotationController from '../new/CubeRotationWrapper'
import CubeStyleProvider from '../new/CubeStyleConfigWrapper'
import { RotationContext } from '../scene-refactor/useRotationEffect'
interface CubeView {
	sticker: ISticker
	debug?: boolean
	size?: number
	onStickerClick?: (sticker: ISticker) => void
}

export const CubePieceView: React.FC<CubeView> = ({ sticker, debug, size }) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	const style = {
		'--side-size': `${size ? size / 4 : 20}px`,
	} as React.CSSProperties

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

	const contextValue = {
		value: sticker.type === 'corner' ? cornerRotation : edgeRotation,
		update: () => {},
	}

	if (sticker.type === 'center') return <></>

	// if (sticker.type === 'corner') rotate({ x: 0, y: 0, z: 0 })

	return (
		<div className="cube-v2">
			<div className="cube-wrapper m-auto" style={style}>
				<RotationContext.Provider value={contextValue}>
					<CubeRotationController disabled>
						<CubePerspectiveWrapper mode={'3d-fold'}>
							<CubePiece sticker={sticker} />
						</CubePerspectiveWrapper>
					</CubeRotationController>
				</RotationContext.Provider>
			</div>
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
		<div className={`cube cube-piece`}>
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
		<div className={`side piece-side side-${side}`} data-side={side}>
			<Sticker sticker={sticker} position={sticker.side + 0} />
		</div>
	)
}

interface StickerProps {
	sticker: ISticker
	position: string
	debug?: boolean
	classes?: string[]
}

const Sticker: React.FC<StickerProps> = ({ sticker, position, debug }) => {
	if (debug) console.log('::::: Rendered Sticker.')

	const { side, name, type, id } = sticker

	const classList = ['sticker']
	const dataAttributes = {
		'data-sticker-color': side,
		'data-sticker-name': name,
		'data-sticker-id': id,
		'data-piece-type': type,
		'data-sticker-position': position,
	}

	return <div className={classList.join(' ')} {...dataAttributes}></div>
}
