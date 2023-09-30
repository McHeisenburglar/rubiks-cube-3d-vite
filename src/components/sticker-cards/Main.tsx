import React, { useMemo } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'

interface IProps {}

interface StickerCardProps {
	sticker: ISticker
	color?: 'red' | 'green' | 'default'
	className?: React.ComponentProps<'div'>['className']
}

const StickerCard: React.FC<StickerCardProps> = ({
	sticker,
	color,
	className,
}) => {
	const colors = {
		default: 'text-slate-700',
		green: 'text-green-600',
		red: 'text-red-600',
	}

	const textColor = !color ? colors.default : colors[color]

	return (
		<div
			className={`text-center sticker-card py-4 px-8 bg-white inline-block rounded-xl shadow ${
				className || ''
			} hover:scale-125 hover:z-10 duration-[800ms] ease-[cubic-bezier(.07,.87,.27,1.03)]`}
		>
			<CubePiece sticker={sticker} size={60} />
			<h4 className={`font-bold text-2xl mt-2 ${textColor}`}>
				{sticker.name.toUpperCase()}
			</h4>
		</div>
	)
}

const Main: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])

	const sticker = cube.getRandomStickerInFilter((s) => s.type === 'corner')

	console.log('Showing sticker', sticker.name)

	return (
		<>
			<div className="flex p-4 gap-4 flex-wrap">
				{cube.getStickersByType(['corner', 'edge']).map((s) => (
					<StickerCard sticker={s} />
				))}
			</div>
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
