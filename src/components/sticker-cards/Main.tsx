import React, { useMemo } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'
import Cube from '../scene-refactor/components/Cube'

interface IProps {}

const StickerCard: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])

	const sticker = cube.getRandomStickerInFilter(() => true)

	return (
		<>
			<Cube cube={cube} />
			<div className={` sticker-card ${sticker.type} `}>
				<div className={`main-face ${sticker.side}`}></div>
				{sticker.neighbors.map((s) => {
					return <div className={`neighbor-face ${s.side}`}></div>
				})}
			</div>
		</>
	)
}

export default StickerCard
