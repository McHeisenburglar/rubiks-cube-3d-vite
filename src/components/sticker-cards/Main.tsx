import React, { useMemo } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'

interface IProps {}

const StickerCard: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])

	const sticker = cube.getRandomStickerInFilter((s) => s.type === 'corner')

	console.log('Showing sticker', sticker.name)

	return (
		<>
			<CubePieceView sticker={sticker} cubeConfig={cube.cubeConfig} debug />
		</>
	)
}

export default StickerCard

import CubePerspectiveWrapper from '../new/CubePerspectiveWrapper'
import CubeRotationController from '../new/CubeRotationWrapper'
import CubeStyleProvider from '../new/CubeStyleConfigWrapper'

interface CubeView {
	sticker: ISticker
	cubeConfig: CubeConfig
	debug?: boolean
	onStickerClick?: (sticker: ISticker) => void
}

const CubePieceView: React.FC<CubeView> = ({ debug, sticker, cubeConfig }) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	return (
		<div className="cube-v2">
			<div className="cube-wrapper">
				<CubeRotationController>
					<CubeStyleProvider config={cubeConfig}>
						<CubePerspectiveWrapper mode={'3d-fold'}>
							<CubePiece sticker={sticker} />
						</CubePerspectiveWrapper>
					</CubeStyleProvider>
				</CubeRotationController>
			</div>
		</div>
	)
}

import Sticker from '../new/Sticker'

interface CubePieceProps {
	sticker: ISticker
	debug?: boolean
}

const CubePiece: React.FC<CubePieceProps> = ({ sticker, debug }) => {
	if (debug) console.log('::::: Rendered Cube.')

	return (
		<div className={`cube`}>
			<CubeSide sticker={sticker} side="top" />
			{sticker.neighbors?.map((n, i) => {
				return <CubeSide sticker={n} side={i === 0 ? 'front' : 'right'} />
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
			<Sticker sticker={sticker} index={0} position={sticker.side + 0} />
		</div>
	)
}
