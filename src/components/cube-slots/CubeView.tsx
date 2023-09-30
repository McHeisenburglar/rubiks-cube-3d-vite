import { CubeWithPos } from '../../ts/CubeClass3'
import { CubeContext } from '../RubiksCube'
import Cube from '../new/Cube'
import CubePerspectiveWrapper from '../new/CubePerspectiveWrapper'
import CubeRotationController from '../new/CubeRotationWrapper'
import CubeStyleProvider from '../new/CubeStyleConfigWrapper'

interface CubeView {
	cube: CubeWithPos
	debug?: boolean
	onStickerClick?: (sticker: ISticker) => void
}

export const CubeView: React.FC<CubeView> = ({
	debug,
	cube,

	onStickerClick,
}) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	return (
		<div className="cube-v2">
			<div className="cube-wrapper">
				<CubeRotationController>
					<CubeStyleProvider config={cube.cubeConfig}>
						<CubePerspectiveWrapper mode={'3d-fold'}>
							<Cube cube={cube} onStickerClick={(s) => onStickerClick?.(s)} />
						</CubePerspectiveWrapper>
					</CubeStyleProvider>
				</CubeRotationController>
			</div>
		</div>
	)
}

export default CubeContext
