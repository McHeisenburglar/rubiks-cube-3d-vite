// react and hooks
import React, { useMemo, useState } from 'react'

// ts library
import { CubeWithPos } from '../ts/CubeClass3.js'
import useKeypress from './new/useKeypress.js'

// my components
import CubeRotationController from './new/CubeRotationWrapper.js'
import CubePerspectiveWrapper from './new/CubePerspectiveWrapper.js'
import CubeStyleProvider from './new/CubeStyleConfigWrapper.js'
import SceneController from './new/SceneController.js'

// styles
import '../scss/cube-v2.scss'
import Cube from './new/Cube.js'

type InteractionContextValue = {
	keypress: KeyboardEvent | null
	stickerClick: StickerId | null
}

export const InteractionContext =
	React.createContext<InteractionContextValue | null>(null)

/* MAIN COMPONENT */
interface CubeComponentProps {
	debug?: boolean
}

const CubeComponent: React.FC<CubeComponentProps> = ({ debug }) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	useKeypress(() => {})

	const cube = useMemo<CubeWithPos>(() => {
		const cube = new CubeWithPos()
		cube.scramble()
		return cube
	}, [])

	const handleStickerClick = (sticker: ISticker) => {
		console.log('sticker clicked', sticker)
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
					<SceneController>
						<CubeRotationController disabled={perspectiveMode === 'flat-fold'}>
							<CubeStyleProvider config={cube.cubeConfig}>
								<CubePerspectiveWrapper mode={perspectiveMode}>
									<Cube cube={cube} onStickerClick={handleStickerClick} />
								</CubePerspectiveWrapper>
							</CubeStyleProvider>
						</CubeRotationController>
					</SceneController>
				</InteractionContext.Provider>
			</div>
			<button onClick={togglePerspectiveMode}>Switch</button>
		</main>
	)
}

const ComponentExport = () => {
	return (
		<>
			<CubeComponent />
			<CubeComponent />
		</>
	)
}

/* CUBE */

/* ------- */

export default ComponentExport
