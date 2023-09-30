import React, { useMemo } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'

interface IProps {}

const StickerCard: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])

	const sticker = cube.getRandomStickerInFilter((s) => s.type === 'edge')

	console.log('Showing sticker', sticker.name)

	return (
		<div className="cube-v2-piece">
			{cube.getStickersByType(['corner', 'edge']).map((s) => (
				<CubePieceView sticker={s} size={80} debug />
			))}
		</div>
	)
}

export default StickerCard

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

	return (
		<div className="cube-piece-wrapper m-auto" style={style}>
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
			<PieceSticker sticker={sticker} side="top" />
			{sticker.neighbors?.map((n, i) => {
				return <PieceSticker sticker={n} side={i === 0 ? 'right' : 'front'} />
			})}
		</div>
	)
}

interface StickerProps {
	sticker: ISticker
	side: Side
	debug?: boolean
	classes?: string[]
}

const PieceSticker: React.FC<StickerProps> = ({ sticker, debug, side }) => {
	if (debug) console.log('::::: Rendered Sticker.')

	const classList = ['sticker', 'piece-side', `piece-side-${side}`]
	const dataAttributes = {
		'data-sticker-color': sticker.side,
	}

	return <div className={classList.join(' ')} {...dataAttributes}></div>
}
