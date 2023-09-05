import { SIDES } from '../../../ts/helper'
import Sticker from './Sticker'
import { CubeWithPos } from '../../../ts/CubeClass3'

interface CubeProps {
	cube: CubeWithPos
	onStickerClick?: (sticker: ISticker) => void
	debug?: boolean
}

const Cube: React.FC<CubeProps> = ({ cube, onStickerClick, debug }) => {
	if (debug) console.log('::::: Rendered Cube.')

	const handleStickerClick = (sticker: ISticker) =>
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
	stickers: ISticker[]
	debug?: boolean
	onStickerClick?: (sticker: ISticker) => void
}

export const CubeSide: React.FC<CubeSideProps> = ({
	side,
	stickers,
	debug,
	onStickerClick,
}) => {
	if (debug) console.log('::::: Rendered CubeSide.')

	const handleStickerClick = (sticker: ISticker) =>
		onStickerClick && onStickerClick(sticker)

	return (
		<div className={`side side-${side}`} data-side={side}>
			{stickers.map((sticker: ISticker, index: number) => {
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

export default Cube
