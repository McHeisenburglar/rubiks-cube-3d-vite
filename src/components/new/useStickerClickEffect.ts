import { InteractionContext } from '../RubiksCube2'
import { useContext, useEffect } from 'react'

export function useStickerClickEffect(callback: (sticker: StickerId) => void) {
	const context = useContext(InteractionContext)
	console.log(context)
	useEffect(() => {
		console.log('usesticker triggered')
		if (context.stickerClick) callback(context.stickerClick)
	}, [context.stickerClick])
}
