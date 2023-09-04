import { useState } from 'react'
import useKeypress from './useKeypress'
import { useStickerClickEffect } from './useStickerClickEffect'
import { CubeWithPos } from '../../ts/CubeClass3'
import { InteractionContext } from '../RubiksCube2'
import SceneController from './SceneController'
import CubeRotationController from './CubeRotationWrapper.js'
import CubePerspectiveWrapper from './CubePerspectiveWrapper.js'
import CubeStyleProvider from './CubeStyleConfigWrapper.js'
import Cube from './Cube'

/* MAIN COMPONENT */
interface CubeComponentProps {
	cube: CubeWithPos
	debug?: boolean
	highlightSticker?: StickerId | null
}

const CubeComponent: React.FC<CubeComponentProps> = ({
	cube,
	debug,
	// highlightSticker,
}) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	// Custom hooks
	useKeypress(({ key }) => {
		console.log(key)
	})
	useStickerClickEffect((id: StickerId) => {
		console.log('Sticker clicked:', id)
	})

	const handleStickerClick = (sticker: ISticker) => {
		console.log('Sticker clicked:', sticker.id)
	}

	const [perspectiveMode, setPerspectiveMode] = useState<
		'3d-fold' | 'flat-fold'
	>('3d-fold')

	const togglePerspectiveMode = () => {
		setPerspectiveMode((prev) => (prev === '3d-fold' ? 'flat-fold' : '3d-fold'))
	}

	const interactionValue = {
		keypress: null,
		stickerClick: null,
	}

	return (
		<main className="cube-v2">
			<div className="cube-wrapper">
				<InteractionContext.Provider value={interactionValue}>
					<CubeRotationController disabled={perspectiveMode === 'flat-fold'}>
						<CubeStyleProvider config={cube.cubeConfig}>
							<CubePerspectiveWrapper mode={perspectiveMode}>
								<Cube cube={cube} onStickerClick={handleStickerClick} />
							</CubePerspectiveWrapper>
						</CubeStyleProvider>
					</CubeRotationController>
				</InteractionContext.Provider>
			</div>
		</main>
	)
}
export default CubeComponent
