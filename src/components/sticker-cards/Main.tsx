import React, { useMemo } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'

interface IProps {}

interface StickerCardProps {
	sticker: ISticker
}

const StickerCard: React.FC<StickerCardProps> = ({ sticker }) => {
	return (
		<div className="text-center mt-20 block">
			<div className="sticker-card py-4 px-8 bg-white inline-block rounded-xl shadow">
				<CubePiece sticker={sticker} size={60} />
				<h4 className="font-bold text-2xl mt-2">
					{sticker.name.toUpperCase()}
				</h4>
			</div>
		</div>
	)
}

const Main: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])

	const sticker = cube.getRandomStickerInFilter((s) => s.type === 'corner')

	console.log('Showing sticker', sticker.name)

	return (
		<>
			<StickerCard sticker={sticker} />
			<>
				{cube.getStickersByType(['corner', 'edge']).map((s) => (
					<CubePiece sticker={s} size={80} debug />
				))}
			</>
		</>
	)
}

export default Main

interface CubeView {
	sticker: ISticker
	debug?: boolean
	size?: number
	onStickerClick?: (sticker: ISticker) => void
}

export const CubePiece: React.FC<CubeView> = ({ sticker, debug, size }) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	const style = {
		'--side-size': `${size ? size / 4 : 20}px`,
	} as React.CSSProperties

	return (
		<div className="cube-v2-piece cube-piece-wrapper m-auto" style={style}>
			<div className={`cube-piece cube-piece-${sticker.type}`}>
				<PieceSticker sticker={sticker} side="top" />
				{sticker.neighbors?.map((n, i) => {
					return <PieceSticker sticker={n} side={i === 0 ? 'right' : 'front'} />
				})}
			</div>
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
