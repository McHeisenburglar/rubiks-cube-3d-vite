import { useState, useEffect } from 'react'

const useKeypress = (callback: (key: KeyboardEvent) => void) => {
	const [keypress, setKeypress] = useState<KeyboardEvent | null>(null)

	useEffect(() => {
		document.removeEventListener('keypress', handleKeyPress)
		document.addEventListener('keypress', handleKeyPress)
	}, [])

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === ' ') e.preventDefault()
		if (e.repeat) return
		setKeypress(e)
	}

	useEffect(() => {
		if (keypress) callback(keypress)
		return () => setKeypress(null)
	}, [keypress, callback])
}

export default useKeypress
