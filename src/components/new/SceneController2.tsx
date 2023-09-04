import { useState, createContext, useEffect } from 'react'
import { Sticker } from '../../ts/CubeClass2'
import { rotationsToPos } from '../../ts/helper'

type SceneContextValue = {
	[key in SceneParts]: {
		value: unknown
		event: boolean
		update?: (...args: any[]) => void
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
	highlightedProp?: StickerId
}

const SceneController: React.FC<SceneProps> = ({
	children,
	debug,
	highlightedProp,
}) => {
	if (debug) console.log(':::: SceneController rendered')
	// const rotationValue = {
	// 	x: 0,
	// 	y: 45,
	// 	z: 0,
	// }

	const [rotationValue, setRotationValue] = useState({
		x: 0,
		y: 45,
		z: 0,
	})
	const [rotationEvent, setRotationEvent] = useState(false)

	const [highlightValue, setHighlightValue] = useState('top-3')
	const [highlightEvent, setHighlightEvent] = useState(false)

	useEffect(() => {
		if (highlightedProp) {
			setHighlightValue(highlightedProp)
		}
	}, [highlightedProp])

	const value: SceneContextValue = {
		rotation: {
			value: rotationValue,
			event: rotationEvent,
		},
		highlight: {
			value: highlightValue,
			event: highlightEvent,
			update: (sticker: Sticker) => {
				setHighlightValue(sticker.id)
				const { side, index } = sticker.currentPosition
				const [x, y, z] = rotationsToPos[side][index]
				setRotationValue({ x, y, z })
				setRotationEvent(!rotationEvent)
				setHighlightEvent(!highlightEvent)
			},
		},
	}

	console.log('VALUEEE', value)

	return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export default SceneController
