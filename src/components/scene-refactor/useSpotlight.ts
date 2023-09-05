import { useHighlightContext } from './useHighlight'
import { useRotationContext } from './useRotationEffect'

export const useSpotlightContext = () => {
	const { rotateToSticker } = useRotationContext()
	const { highlightSticker, clearHighlight } = useHighlightContext()

	const setSpotlight = (sticker: ISticker) => {
		highlightSticker(sticker)
		rotateToSticker(sticker)
	}

	const clearSpotlight = () => {
		clearHighlight()
	}

	return {
		setSpotlight,
		clearSpotlight,
	}
}
