import { useContext, useEffect } from 'react'
import { InteractionContext } from './UserInputWrapper'

const useStickerClickEffect = (
	callback: (sticker: StickerId | null) => void
) => {
	const interactionContext = useContext(InteractionContext)

	useEffect(() => {
		if (interactionContext) {
			callback(interactionContext.stickerClick)
		}
	}, [interactionContext.stickerClick])
}

export { useStickerClickEffect }
