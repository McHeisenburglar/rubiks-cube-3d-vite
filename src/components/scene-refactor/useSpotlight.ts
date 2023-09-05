import { useHighlight } from './useHighlight'
import { useRotation } from './useRotationEffect'

export const useSpotlight = () => {
	const { rotateToSticker } = useRotation()
	const { highlightSticker } = useHighlight()

	const setSpotlight = (sticker: ISticker) => {
		highlightSticker(sticker)
		rotateToSticker(sticker)
	}

	const clearSpotlight = () => {
		highlightSticker(null)
	}

	return {
		setSpotlight,
		clearSpotlight,
	}
}
