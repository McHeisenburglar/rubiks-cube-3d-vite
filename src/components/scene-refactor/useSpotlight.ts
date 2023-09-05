import { useHighlight } from './useHighlight'
import { useRotation } from './useRotationEffect'

export const useSpotlight = () => {
	const { rotateToSticker } = useRotation()
	const { highlightSticker, clearHighlight } = useHighlight()

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
