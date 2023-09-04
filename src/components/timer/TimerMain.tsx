import { useState } from 'react'
import useCountdown from './useCountdown'

export default function TimerMain() {
	// const seconds = 5
	const [seconds, setSeconds] = useState(5)

	const timer = useCountdown({
		seconds,
		onTimerEnd: () => {
			setTimes((times) => [...times, new Date().toISOString()])
		},
		onPause: () => {
			console.log('paused')
		},
	})

	const { millisecondsLeft } = timer

	const [times, setTimes] = useState<string[]>([])

	return (
		<>
			<div>Timer</div>
			<div>
				<input
					type="number"
					name="seconds"
					id=""
					value={seconds}
					onChange={(e) => setSeconds(parseInt(e.target.value))}
				/>
			</div>

			<span>{millisecondsLeft}</span>
			<div>
				<button onClick={() => timer.start()}>Start</button>
				<button onClick={() => timer.stop()}>Stop</button>
				<button onClick={() => timer.restart()}>Restart</button>
				<button onClick={() => timer.reset()}>Reset</button>
				<button onClick={() => timer.togglePause()}>
					{timer.isPaused ? 'Unpause' : 'Pause'}
				</button>
			</div>
			<div>
				<ul>
					{times.map((time, index) => (
						<li key={index}>{time}</li>
					))}
				</ul>
			</div>
		</>
	)
}
