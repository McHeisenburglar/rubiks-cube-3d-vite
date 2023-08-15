import { useState, createContext } from 'react'
export const SceneContext = createContext({})

interface SceneProps {
	children: ChildElement
	debug?: boolean
}

const SceneController: React.FC<SceneProps> = ({ children, debug }) => {
	if (debug) console.log(':::: SceneController rendered')
	const sceneRotation = {
		x: 0,
		y: 45,
		z: 0,
	}

	const [sceneEvent, setSceneEvent] = useState(false)

	const handleButtonClick = () => {
		setSceneEvent(!sceneEvent)
	}

	const value = {
		sceneRotation,
		sceneEvent,
	}

	return (
		<>
			<SceneContext.Provider value={value}>{children}</SceneContext.Provider>
			<button onClick={() => handleButtonClick()}>Hello</button>
		</>
	)
}

export default SceneController
