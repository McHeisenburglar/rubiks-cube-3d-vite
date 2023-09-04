import { useContext, useEffect } from 'react'
import { SceneContext } from './SceneController2'

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

const useHighlightedSticker = () => {
	const highlight = useSceneEffect('highlight')
	if (!highlight) return null
	else return highlight.value
}

const useRotationEffect = (callback: (rotation: RotationSet) => void) => {
	const rotation = useSceneEffect('rotation')!
	console.log('rotation effect', rotation)

	useEffect(() => {
		callback(rotation.value as RotationSet)
	}, [rotation.event])
}

export { useSceneEffect, useHighlightedSticker, useRotationEffect }
