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
const useCountdown2 = (seconds: number, onTimerEnd: () => void) => {
	const [isRunning, setIsRunning] = useState(false)
	const [millisecondsLeft, setMsLeft] = useState(0)
	const [isPaused, setIsPaused] = useState(false)

	useEffect(() => {
		if (isPaused) return
		if (!isRunning) return

		if (millisecondsLeft <= 0) {
			if (onTimerEnd) return onTimerEnd()
			return
		}

		const timeout = setTimeout(() => {
			setMsLeft(millisecondsLeft - 1)
		}, 1)

		return () => clearTimeout(timeout)
	}, [millisecondsLeft, isPaused, isRunning])

	const start = () => {
		const time = new Date()
		console.log('started at', time.toISOString())
		setIsPaused(false)
		setIsRunning(true)
		setMsLeft(seconds * 1000)
	}

	const stop = () => {
		setIsPaused(false)
		setIsRunning(false)
		setMsLeft(seconds * 1000)
	}

	const togglePause = () => {
		setIsPaused((p) => !p)
	}
	const pause = () => setIsPaused(true)
	const unpause = () => setIsPaused(false)

	return {
		millisecondsLeft,
		isRunning,
		start,
		stop,
		isPaused,
		togglePause,
		pause,
		unpause,
	}
}

const useCountdown = (seconds: number, onTimerEnd: () => void) => {
	const [isRunning, setIsRunning] = useState(false)
	const [millisecondsLeft, setMsLeft] = useState(seconds * 1000)
	const [expiryDate, setExpiryDate] = useState(new Date())

	useEffect(() => {
		if (!isRunning) return

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
	}, [millisecondsLeft, isRunning])

	const start = () => {
		const now = new Date()
		console.log('starting', now.toISOString())
		const expiryDate = new Date(now.getTime() + seconds * 1000)

		setExpiryDate(expiryDate)
		setIsRunning(true)
	}

	const stop = () => {
		setIsRunning(false)
		setMsLeft(seconds * 1000)
	}

	return { millisecondsLeft, start, stop }
}

export default function TimerMain() {
	const seconds = 5
	const timer = useCountdown(seconds, () => {
		const now = new Date()
		console.log('ending', now.toISOString())
	})

	const { millisecondsLeft } = timer

	return (
		<>
			<div>Timer</div>
			<span>{millisecondsLeft}</span>
			<div>
				<button onClick={() => timer.start()}>Start</button>
				<button onClick={() => timer.stop()}>Stop</button>
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