// react and hooks
import React, { useMemo, useState } from 'react'

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
import HighlightContextWrapper from './HighlightContextProvider.js'
import { useSpotlightContext } from './useSpotlight.js'

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
	cube: CubeWithPos
	debug?: boolean
	onStickerClick?: (sticker: ISticker) => void
}

export const CubeComponent: React.FC<CubeComponentProps> = ({
	debug,
	cube,

	onStickerClick,
}) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	return (
		<div className="cube-v2 inline-block">
			<div className="cube-wrapper">
				<CubeRotationController debug>
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

interface CubeComponentDevProps {
	debug?: boolean
}

const CubeComponentDev: React.FC<CubeComponentDevProps> = ({ debug }) => {
	if (debug) console.log('::::: Rendered CubeComponent.')

	const cube = useMemo<CubeWithPos>(() => {
		const cube = new CubeWithPos()
		// cube.scramble()
		return cube
	}, [])

	const [perspectiveMode, setPerspectiveMode] = useState<
		'3d-fold' | 'flat-fold'
	>('3d-fold')

	const togglePerspectiveMode = () => {
		setPerspectiveMode((prev) => (prev === '3d-fold' ? 'flat-fold' : '3d-fold'))
	}

	// Custom hooks
	const { setSpotlight, clearSpotlight } = useSpotlightContext()

	useKeypress(({ key }) => {
		const sticker = cube.getStickerByLetter(key, 'edge')
		if (sticker) setSpotlight(sticker)
	})

	const handleStickerClick = (sticker: ISticker) => {
		console.log('spotlighting!!!', sticker)
		setSpotlight(sticker)
	}

	const handleReset = () => {
		clearSpotlight()
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
			<button className="btn-primary" onClick={handleReset}>
				Reset rotation
			</button>
		</main>
	)
}

export { CubeComponentDev }

const ComponentExport = () => {
	return (
		<>
			<HighlightContextWrapper>
				<RotationContextWrapper>
					<CubeComponentDev />
				</RotationContextWrapper>
			</HighlightContextWrapper>
			{/* <RotationContextWrapper>
				<CubeComponent />
			</RotationContextWrapper> */}
		</>
	)
}

export default ComponentExport
