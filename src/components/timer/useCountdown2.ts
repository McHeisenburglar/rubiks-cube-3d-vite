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
	let timeout: number
	const { seconds } = options

	const [isRunning] = useState(false)
	const [isPaused] = useState(false)

	// useEffect(() => {
	// 	// // do something
	// 	return () => clearTimeout(timeout)
	// }, [])

	const reset = () => {}

	const start = () => {
		timeout = setTimeout(() => {
			console.log(`ding after ${seconds} seconds!`)
		}, seconds * 1000)
	}

	const restart = () => {}

	const stop = () => {}

	const pause = () => {}

	const unpause = () => {}

	const togglePause = () => {}

	return {
		millisecondsLeft: seconds * 1000,
		start,
		stop,
		isRunning,
		restart,
		reset,
		pause,
		unpause,
		isPaused,
		togglePause,
	}
}

export default useCountdown
