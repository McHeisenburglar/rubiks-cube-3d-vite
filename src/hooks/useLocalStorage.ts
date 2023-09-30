import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(key)
		if (jsonValue != null) return JSON.parse(jsonValue)
		return JSON.stringify(initialValue)
	})

	const clear = () => {
		localStorage.removeItem(key)
	}

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue, clear]
}
