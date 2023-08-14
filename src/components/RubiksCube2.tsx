import { CubeWithPos, Sticker as StickerData } from '../ts/CubeClass2.js'
import React, { useMemo, useState } from 'react'
import { SIDES } from '../ts/helper.js'
import RotationController from './RotationController.js'
import { FaPalette } from 'react-icons/fa'
import CubePerspectiveWrapper from './new/CubePerspectiveWrapper.js'

interface CubeProps {}

const CubeComponent: React.FC<CubeProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])
	const [rotation, setRotation] = useState<RotationSet>({
		x: -15,
		y: -30,
		z: 0,
	})

	const foldCube = false

	return (
		<RotationController rotation={rotation} setRotation={setRotation}>
			<CubePerspectiveWrapper active={foldCube}>
				<div className={`cube`}>
					{SIDES.map((side, index) => (
						<CubeSide side={side} stickers={cube.state[side]} key={index} />
					))}
				</div>
			</CubePerspectiveWrapper>
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

	const mode = 'arrow'

	const handleClick = (id: StickerId) => {
		console.log(id)
	}

	return (
		<div
			onClick={() => handleClick(id)}
			className={`sticker side-${name} color-${side} ${name} letter-${name.toLowerCase()} type-${type} index-${index} id-${id} `}
		>
			<StickerContent mode={mode} sticker={sticker} index={index} />
		</div>
	)
}

interface StickerContentProps {
	mode: string
	sticker: StickerData
	index: number
}

const StickerContent: React.FC<StickerContentProps> = ({
	mode,
	sticker,
	index,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { side, name, type, id } = sticker

	if (mode === 'letter') {
		return (
			<span className="sticker-letter">
				{type === 'corner' ? name.toUpperCase() : name}
			</span>
		)
	}

	if (mode === 'arrow') {
		if (type === 'edge') {
			let direction = ''

			if (index === 1) direction = 'up'
			if (index === 3) direction = 'left'
			if (index === 5) direction = 'right'
			if (index === 7) direction = 'down'

			return (
				<span className={`sticker-arrow sticker-arrow-${direction}`}>⬆</span>
			)
		}
	}

	if (mode === 'edit-colors') {
		if (type === 'center') return <FaPalette />
	}

	return <></>
}

export default CubeComponent
