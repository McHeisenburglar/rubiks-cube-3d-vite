import React, { useMemo } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'
import { CubeView } from '../cube-slots/CubeView'

interface IProps {}

const StickerCard: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])

	const sticker = cube.getRandomStickerInFilter((s) => s.type === 'corner')

	return (
		<>
			<CubeView cube={cube} debug />
			<div className={` sticker-card ${sticker.type} `}>
				<div
					className={`sticker-card-face main-face`}
					data-sticker-color={sticker.side}
				></div>
				{sticker.neighbors.map((s) => {
					return (
						<div
							className={`sticker-card-face neighbor-face`}
							data-sticker-color={s.side}
						></div>
					)
				})}
			</div>
		</>
	)
}

export default StickerCard
