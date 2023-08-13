/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'

export function useKeyhold(key: string, dependencies: unknown[]) {
	const [isHeld, setIsHeld] = useState(false)
	const isHeldRef = useRef(isHeld)

	useEffect(() => {
		const handleDown = (e: KeyboardEvent) => {
			if (!isHeldRef.current && e.key.toLowerCase() === key) {
				setIsHeld(true)
				isHeldRef.current = true // prevents key repeat
			}
		}
		const handleUp = (e: KeyboardEvent) => {
			if (isHeldRef.current && e.key.toLowerCase() === key) {
				setIsHeld(false)
				isHeldRef.current = false // prevents key repeat
			}
		}

		document.addEventListener('keydown', handleDown)
		document.addEventListener('keyup', handleUp)
		return () => {
			document.removeEventListener('keydown', handleDown)
			document.removeEventListener('keyup', handleUp)
		}
	}, [...dependencies])

	return [isHeld]
}
