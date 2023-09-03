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
	const [millisecondsLeft, setMsLeft] = useState(0)

	useEffect(() => {
		if (!isRunning) return

		if (millisecondsLeft <= 0) return onTimerEnd()

		const timeout = setTimeout(() => {
			setMsLeft(millisecondsLeft - 1)
		}, 1)

		return () => clearTimeout(timeout)
	}, [millisecondsLeft])

	const start = () => {
		setIsRunning(true)
		setMsLeft(seconds * 1000)
	}

	const pause = () => {
		setIsRunning(false)
	}

	const stop = () => {
		setMsLeft(seconds * 1000)
		setIsRunning(false)
	}

	return { millisecondsLeft, start, stop, pause }
}

export default function TimerMain() {
	const { millisecondsLeft, start, pause, stop } = useCountdown(60, () => {
		console.log('hello')
	})

	return (
		<>
			<div>Timer</div>
			<span>{millisecondsLeft}</span>
			<div>
				<button onClick={start}>Start</button>
				<button onClick={pause}>Pause</button>
				<button onClick={stop}>Stop</button>
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
