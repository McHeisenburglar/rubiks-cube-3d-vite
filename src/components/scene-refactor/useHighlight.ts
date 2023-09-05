// Rotation
import { createContext, useContext, useEffect } from 'react'

type IHighlightContext = {
	value: ISticker | null
	update: (val: ISticker | null) => void
} | null

export const HighlightContext = createContext<IHighlightContext>(null)

export const useHighlight = () => {
	const context = useContext(HighlightContext)

	const current = context?.value

	const update = (sticker: ISticker) => {
		context?.update(sticker)
	}

	const clear = () => {
		context?.update(null)
	}

	const classForSticker = (sticker: ISticker) => {
		if (!context || !context.value) return ''

		if (sticker.id === context.value.id) return 'highlight'

		const neighbors = context.value.neighbors?.map((n) => n.id)
		if (neighbors?.includes(sticker.id)) return 'adjacent'

		return 'dim'
	}

	return {
		currentHighlight: current,
		highlightSticker: update,
		clearHighlight: clear,
		classForSticker,
	}
}

export const useHighlightEffect = (callback?: (sticker: ISticker) => void) => {
	const context = useContext(HighlightContext)

	useEffect(() => {
		if (context?.value && callback) callback(context.value)
	}, [context])
}
