import { useEffect, useState } from 'react'

interface CountdownOptions {
	seconds: number
	refreshRate?: number
	onCompletion?: () => void
	onStart?: () => void
	onStop?: () => void
	onPause?: () => void
	onUnpause?: () => void
}

const useCountdown = (options: CountdownOptions) => {
	const DEFAULT_REFRESH_RATE = 100

	const { seconds, refreshRate } = options

	const [isRunning, setIsRunning] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [expiryDate, setExpiryDate] = useState(new Date())

	const [markers, setMarkers] = useState<Date[]>([])

	const [millisecondsLeft, setMillisecondsLeft] = useState(seconds * 1000)

	const [lastMarker, setLastMarker] = useState(new Date())

	useEffect(() => {
		setMillisecondsLeft(seconds * 1000)
	}, [seconds])

	const getDiff = () => Math.max(expiryDate.getTime() - new Date().getTime(), 0)

	useEffect(() => {
		if (!isRunning || isPaused) return
		const timeout = setInterval(() => {
			console.log('got here')
			if (getDiff() <= 0) {
				clearInterval(timeout)
			}

			const diff = expiryDate.getTime() - new Date().getTime()

			if (diff < 0) setMillisecondsLeft(0)
			// else setMillisecondsLeft(diff)
		}, 10)

		return () => clearInterval(timeout)
	}, [millisecondsLeft, isRunning, isPaused])

	const addMarker = () => {
		setMarkers([...markers, new Date()])
	}

	const clearMarkers = () => {
		setMarkers([])
	}

	const millisecondsSincePreviousMarker = () => {
		if (markers.length === 0) return 0
		const timeDiff = new Date().getTime() - lastMarker.getTime()
		return timeDiff
	}

	const newMarker = () => {
		const timeDiff = millisecondsSincePreviousMarker()
		setLastMarker(new Date())
		return timeDiff
	}

	const reset = () => {
		// setMarkers([])
		setMillisecondsLeft(seconds * 1000)
	}

	const addFirstMarker = () => {
		setMarkers([new Date()])
		setLastMarker(new Date())
	}

	const start = () => {
		if (isPaused) return unpause()
		if (isRunning) return

		reset()
		setExpiryDate(new Date(new Date().getTime() + seconds * 1000))

		setIsRunning(true)
		setIsPaused(false)

		addFirstMarker()

		options.onStart?.()
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

		options.onStop?.()
	}

	const pause = () => {
		setIsPaused(true)
		options.onPause?.()
	}

	const unpause = () => {
		setIsPaused(false)
		setExpiryDate(new Date(new Date().getTime() + millisecondsLeft))
		options.onUnpause?.()
	}

	const togglePause = () => {
		if (isPaused) unpause()
		else pause()
	}

	return {
		millisecondsLeft: getDiff(),
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
		newMarker,
		millisecondsSincePreviousMarker,
		getDiff,
	}
}

export default useCountdown
