import { createContext, useContext, useEffect } from 'react'

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

	if (context) return context.update
}
