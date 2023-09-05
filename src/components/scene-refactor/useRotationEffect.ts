// Rotation
import { createContext, useContext, useEffect } from 'react'
import { rotationsToPos } from '../../ts/helper'

type IRotationContext = {
	value: RotationSet
	update: (set: RotationSet) => void
} | null

export const RotationContext = createContext<IRotationContext>(null)

export const useRotationEffect = (callback?: (set: RotationSet) => void) => {
	const context = useContext(RotationContext)

	useEffect(() => {
		if (context && callback) callback(context.value)
	}, [context])
}

export const useRotation = () => {
	const context = useContext(RotationContext)

	const rotate = (set: RotationSet) => {
		context?.update(set)
	}

	const rotateToSticker = (sticker: ISticker) => {
		const { side, index } = sticker.currentPosition!
		const [x, y, z] = rotationsToPos[side][index]
		rotate({ x, y, z })
	}

	return {
		rotate,
		rotateToSticker,
	}
}

// Stickers
type IHighlightStickerContext = {
	value: ISticker
	update: (set: ISticker) => void
} | null

export const HighlightStickerContext =
	createContext<IHighlightStickerContext>(null)

export const useHighlightedSticker = (
	callback?: (sticker: ISticker) => void
) => {
	const context = useContext(HighlightStickerContext)

	useEffect(() => {
		if (context && callback) callback(context.value)
	}, [context])

	if (context) return context.update
}
