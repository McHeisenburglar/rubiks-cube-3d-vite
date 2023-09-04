import { useEffect, useState } from 'react'

interface CountdownOptions {
	seconds: number
	onTimerEnd?: () => void
	onStart?: () => void
	onPause?: () => void
	onUnpause?: () => void
}

const useCountdown = (options: CountdownOptions) => {
	const { seconds, onTimerEnd, onStart, onPause, onUnpause } = options

	const [isRunning, setIsRunning] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [expiryDate, setExpiryDate] = useState(new Date())

	const [markers, setMarkers] = useState<Date[]>([])

	const [millisecondsLeft, setMillisecondsLeft] = useState(seconds * 1000)

	useEffect(() => {
		setMillisecondsLeft(seconds * 1000)
	}, [seconds])

	useEffect(() => {
		if (!isRunning || isPaused) return
		const timeout = setTimeout(() => {
			if (millisecondsLeft <= 0) {
				setMillisecondsLeft(0)
				setIsRunning(false)
				setIsPaused(false)
				if (onTimerEnd) onTimerEnd()
				return
			}

			const diff = expiryDate.getTime() - new Date().getTime()

			if (diff < 0) setMillisecondsLeft(0)
			else setMillisecondsLeft(diff)
		}, 10)

		return () => clearTimeout(timeout)
	}, [millisecondsLeft, isRunning, isPaused])

	const addMarker = () => {
		setMarkers([...markers, new Date()])
	}

	const clearMarkers = () => {
		setMarkers([])
	}

	const reset = () => {
		setMarkers([])
		// clearMarkers()
		console.log('hellooo', markers)
		setMillisecondsLeft(seconds * 1000)
	}

	const addFirstMarker = () => {
		setMarkers([new Date()])
	}

	const start = () => {
		if (isPaused) return unpause()
		if (isRunning) return

		reset()
		setExpiryDate(new Date(new Date().getTime() + seconds * 1000))

		setIsRunning(true)
		setIsPaused(false)

		addFirstMarker()

		console.log('isRunning', isRunning)

		if (onStart) onStart()
	}

	const restart = () => {
		// if (!isRunning) start()

		setExpiryDate(new Date(new Date().getTime() + seconds * 1000))
		start()
	}

	const stop = () => {
		reset()
		setIsRunning(false)
		setIsPaused(false)
	}

	const pause = () => {
		setIsPaused(true)
		if (onPause) onPause()
	}

	const unpause = () => {
		setIsPaused(false)
		setExpiryDate(new Date(new Date().getTime() + millisecondsLeft))
		if (onUnpause) onUnpause()
	}

	const togglePause = () => {
		if (isPaused) unpause()
		else pause()
	}

	return {
		millisecondsLeft,
		start,
		stop,
		isRunning,
		restart,
		reset,
		pause,
		unpause,
		isPaused,
		togglePause,
		addMarker,
		markers,
		clearMarkers,
	}
}

export default useCountdown
