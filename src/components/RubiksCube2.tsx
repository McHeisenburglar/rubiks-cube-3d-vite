import { CubeWithPos, Sticker as StickerData } from '../ts/CubeClass2.js'
import React, { useMemo, useState } from 'react'
import { SIDES } from '../ts/helper.js'
import RotationController from './RotationController.js'

interface IProps {}

const RubiksCube: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])
	const [rotation, setRotation] = useState({ x: -15, y: -30, z: 0 })

	const handleRotationClick = () => {
		console.log('got here')
	}

	return (
		<RotationController
			rotation={rotation}
			setRotation={setRotation}
			handleClickOutside={handleRotationClick}
		>
			<div className={`cube`}>
				{SIDES.map((side, index) => (
					<CubeSide side={side} stickers={cube.state[side]} key={index} />
				))}
			</div>
		</RotationController>
	)
}

interface CubeSideProps {
	side: Side
	stickers: StickerData[]
}

const CubeSide: React.FC<CubeSideProps> = ({ side, stickers }) => {
	return (
		<div className={`side rotate-${side}`}>
			{stickers.map((sticker: StickerData, index: number) => {
				return <Sticker key={index} sticker={sticker} index={index}></Sticker>
			})}
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
