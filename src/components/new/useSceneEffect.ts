import { useContext } from 'react'
import { SceneContext } from './SceneController'

const useSceneEffect = (key: SceneParts) => {
	// let sceneRotation = null
	// let sceneEvent = null

	const sceneContext = useContext(SceneContext)

	if (sceneContext) {
		return { ...sceneContext[key] }
		// sceneRotation = sceneContext[key].value
		// sceneEvent = sceneContext[key].event
	}
	return null

	// return [sceneRotation, sceneEvent]
}

export { useSceneEffect }
