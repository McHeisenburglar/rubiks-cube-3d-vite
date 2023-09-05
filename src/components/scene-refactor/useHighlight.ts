// Rotation
import { createContext, useContext, useEffect } from 'react'

type IHighlightContext = {
	value: ISticker
	update: (sticker: ISticker) => void
} | null

export const HighlightContext = createContext<IHighlightContext>(null)

export const useHighlight = () => {
	return {
		highlightSticker: null,
	}
}

export const useHighlightEffect = (callback?: (sticker: ISticker) => void) => {
	const context = useContext(HighlightContext)

	useEffect(() => {
		if (context && callback) callback(context.value)
	}, [context])
}
