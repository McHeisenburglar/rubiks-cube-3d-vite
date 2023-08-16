import { useState, createContext } from 'react'

type SceneContextValue = {
	[key in SceneParts]: {
		value: unknown
		event: boolean
		update?: (...args: unknown[]) => void
	}
}

// type ISceneContext = {
// 	sceneRotation: RotationSet
// 	sceneEvent: boolean
// } | null

export const SceneContext = createContext<SceneContextValue | null>(null)

interface SceneProps {
	children: ChildElement
	debug?: boolean
}

const SceneController: React.FC<SceneProps> = ({ children, debug }) => {
	if (debug) console.log(':::: SceneController rendered')
	const rotationValue = {
		x: 0,
		y: 45,
		z: 0,
	}

	const [highlightValue, setHighlightValue] = useState('top-2')

	const [rotationEvent, setRotationEvent] = useState(false)
	const [highlightEvent, setHighlightEvent] = useState(false)

	const handleRotationButtonClick = () => {
		setRotationEvent(!rotationEvent)
	}

	const handleHighlightButtonClick = () => {
		setHighlightEvent(!highlightEvent)
	}

	// const updateFunction: randomFunction = (id: StickerId) => {
	// 	setHighlightValue(id)
	// }

	const value: SceneContextValue = {
		rotation: {
			value: rotationValue,
			event: rotationEvent,
		},
		highlight: {
			value: highlightValue,
			event: highlightEvent,
			update: (id: StickerId) => setHighlightValue(id),
		},
	}

	return (
		<>
			<SceneContext.Provider value={value}>{children}</SceneContext.Provider>
			<button onClick={() => handleRotationButtonClick()}>Rotate</button>
			<button onClick={() => handleHighlightButtonClick()}>Highlight</button>
		</>
	)
}

export default SceneController
