// import React from 'react'
import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'

interface IProps {
	expiryTimestamp: Date
	onTimerEnd: () => void
	timerOn: boolean
}

// const useCountdown = (onTimerEnd: () => void) => {
// 	const [millisecondsLeft, setMillisecondsLeft] = useState(0)

// 	useEffect(() => {
// 		console.log('made it here')

// 		if (millisecondsLeft <= 0) return onTimerEnd()

// 		const timeout = setTimeout(() => {
// 			setMillisecondsLeft(millisecondsLeft - 1)
// 		}, 1)

// 		return clearTimeout(timeout)
// 	}, [millisecondsLeft])

// 	const start = (seconds: number) => {
// 		setMillisecondsLeft(seconds * 1000)
// 	}

// 	return { millisecondsLeft, start }
// }

const useCountdown = (seconds: number, onTimerEnd: () => void) => {
	const [isRunning, setIsRunning] = useState(false)
	const [millisecondsLeft, setMsLeft] = useState(seconds * 1000)
	const [expiryDate, setExpiryDate] = useState(new Date())
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		if (!isRunning || isPaused) return

		const timeout = setTimeout(() => {
			if (millisecondsLeft <= 0) {
				setIsRunning(false)
				setMsLeft(0)
				console.log('got here yoooo')
				onTimerEnd()
				return
			}

			const now = new Date()
			const diff = expiryDate.getTime() - now.getTime()

			setMsLeft(diff)
		}, 50)

		return () => clearTimeout(timeout)
	}, [millisecondsLeft, isRunning, isPaused])

	const resetMsLeft = () => setMsLeft(seconds * 1000)

	const start = () => {
		console.log('started: ', new Date().toISOString())
		resetMsLeft()

		const expiryDate = new Date(new Date().getTime() + seconds * 1000)
		setExpiryDate(expiryDate)

		setIsRunning(true)
	}

	const stop = () => {
		resetMsLeft()
		setIsRunning(false)
	}

	const pause = () => {
		console.log('paused: ', new Date().toISOString())
		setIsPaused(true)
	}

	const unpause = () => {
		console.log('unpaused: ', new Date().toISOString())
		setExpiryDate(new Date(new Date().getTime() + millisecondsLeft))
		setIsPaused(false)
	}

	const togglePause = () => {
		isPaused ? unpause() : pause()
	}

	return {
		millisecondsLeft,
		start,
		stop,
		pause,
		unpause,
		isPaused,
		togglePause,
	}
}

export default function TimerMain() {
	const seconds = 5

	const timer = useCountdown(seconds, () => {
		console.log('ended:', new Date().toISOString())
	})

	const { millisecondsLeft } = timer

	return (
		<>
			<div>Timer</div>
			<span>{millisecondsLeft}</span>
			<div>
				<button onClick={() => timer.start()}>Start</button>
				<button onClick={() => timer.stop()}>Stop</button>
				<button onClick={() => timer.togglePause()}>
					{timer.isPaused ? 'Unpause' : 'Pause'}
				</button>
			</div>
		</>
	)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MyTimer: React.FC<IProps> = ({
	expiryTimestamp,
	onTimerEnd,
	timerOn,
}) => {
	const {
		totalSeconds,
		// seconds,
		// minutes,
		// hours,
		// days,
		isRunning,
		start,
		pause,
		// resume,
		// restart,
	} = useTimer({
		expiryTimestamp,
		onExpire: () => onTimerEnd(),
		autoStart: false,
	})

	useEffect(() => {
		if (timerOn) {
			console.log(timerOn)
			start()
		} else {
			pause()
		}
	}, [timerOn])

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>react-timer-hook </h1>
			<p>Timer Demo</p>
			<div style={{ fontSize: '100px' }}>
				<span>{totalSeconds}</span>
			</div>
			<p>{isRunning ? 'Running' : 'Not running'}</p>
		</div>
	)
}

// export default function App() {
// 	const time = new Date()
// 	time.setSeconds(time.getSeconds() + 600) // 10 minutes timer

// 	const [timerOn, setTimerOn] = useState(false)

// 	const startTimer = () => {
// 		setTimerOn(true)
// 	}

// 	const stopTimer = () => {
// 		setTimerOn(false)
// 	}

// 	return (
// 		<div>
// 			<MyTimer
// 				expiryTimestamp={time}
// 				onTimerEnd={stopTimer}
// 				timerOn={timerOn}
// 			/>
// 			<button onClick={startTimer}>Start timer</button>
// 			<button onClick={stopTimer}>Stop timer</button>
// 		</div>
// 	)
// }
