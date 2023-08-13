import { CubeWithPos, Sticker as StickerData } from '../ts/CubeClass2.js'
import React, { useMemo } from 'react'
import { SIDES } from '../ts/helper.js'

interface IProps {}

const RubiksCube: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])
	// console.log('Rendered cube.', cube.colors.right)

	return (
		<div className={`cube`}>
			{SIDES.map((side, index) => (
				<div className={`side rotate-${side}`} key={index}>
					{cube.state[side].map((sticker: StickerData, index: number) => {
						return (
							<Sticker key={index} sticker={sticker} index={index}></Sticker>
						)
					})}
				</div>
			))}
		</div>
	)
}

interface StickerProps {
	sticker: StickerData
	index: number
}

const Sticker: React.FC<StickerProps> = ({ sticker, index }) => {
	const { side, name, type, id } = sticker

	const handleClick = (id: StickerId) => {
		console.log(id)
	}

	return (
		<div
			onClick={() => {
				handleClick(id)
			}}
			className={`sticker side-${name} color-${side} ${name} letter-${name.toLowerCase()} type-${type} index-${index} id-${id} `}
		></div>
	)
}

export default RubiksCube
