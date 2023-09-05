// react and hooks
import React, { useContext, useMemo, useState } from 'react'

// ts library
import { CubeWithPos } from '../../ts/CubeClass3.js'
import useKeypress from '../new/useKeypress.js'

// my components
import CubeRotationController from '../new/CubeRotationWrapper.js'
import CubePerspectiveWrapper from '../new/CubePerspectiveWrapper.js'
import CubeStyleProvider from '../new/CubeStyleConfigWrapper.js'

// styles
import '../../scss/cube-v2.scss'
import Cube from './components/Cube.js'
import RotationContextWrapper from './RotationContextWrapper.js'
import { useRotation } from './useRotationEffect.js'
import { useHighlight } from './useHighlight.js'
import HighlightContextWrapper from './HighlightContextProvider.js'

type InteractionContextValue = {
	keypress: KeyboardEvent | null
	stickerClick: StickerId | null
}

export const InteractionContext = React.createContext<InteractionContextValue>({
	keypress: null,
	stickerClick: null,
})

/* MAIN COMPONENT */
interface CubeComponentProps {
	debug?: boolean
}

const CubeComponent: React.FC<CubeComponentProps> = ({ debug }) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	// Custom hooks
	useKeypress(({ key }) => {
		console.log(key)
	})
	// useStickerClickEffect((id: StickerId) => {
	// 	console.log('Sticker clicked:', id)
	// })

	const { rotate, rotateToSticker } = useRotation()

	const { highlightSticker } = useHighlight()

	const cube = useMemo<CubeWithPos>(() => {
		const cube = new CubeWithPos()
		cube.scramble()
		return cube
	}, [])

	const [perspectiveMode, setPerspectiveMode] = useState<
		'3d-fold' | 'flat-fold'
	>('flat-fold')

	const togglePerspectiveMode = () => {
		setPerspectiveMode((prev) => (prev === '3d-fold' ? 'flat-fold' : '3d-fold'))
	}

	const handleStickerClick = (sticker: ISticker) => {
		console.log('sticker clicked', sticker)
		if (perspectiveMode === '3d-fold') rotateToSticker(sticker)
		// highlightSticker(sticker)

		// applyStyle(sticker, 'active')
	}

	const interactionValue = {
		keypress: null,
		stickerClick: null,
	}

	return (
		<main className="cube-v2">
			<div className="cube-wrapper">
				<InteractionContext.Provider value={interactionValue}>
					<CubeRotationController
						debug
						disabled={perspectiveMode === 'flat-fold'}
					>
						<CubeStyleProvider config={cube.cubeConfig}>
							<CubePerspectiveWrapper mode={perspectiveMode}>
								<Cube cube={cube} onStickerClick={handleStickerClick} />
							</CubePerspectiveWrapper>
						</CubeStyleProvider>
					</CubeRotationController>
				</InteractionContext.Provider>
			</div>
			<button className="btn-primary" onClick={togglePerspectiveMode}>
				Switch
			</button>
			<button
				className="btn-primary"
				onClick={() =>
					rotate({
						x: 0,
						y: 50,
						z: 0,
					})
				}
			>
				Reset rotation
			</button>
		</main>
	)
}

export { CubeComponent }

const ComponentExport = () => {
	return (
		<>
			<HighlightContextWrapper>
				<RotationContextWrapper>
					<CubeComponent />
				</RotationContextWrapper>
			</HighlightContextWrapper>
			{/* <RotationContextWrapper>
				<CubeComponent />
			</RotationContextWrapper> */}
		</>
	)
}

export default ComponentExport
