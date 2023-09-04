import { useState } from 'react'
import useCountdown from './useCountdown'

const Scoreboard: React.FC = () => {
	return (
		<>
			<div className="scoreboard">
				<div className="top">
					<div className="left"></div>
					<div className="right">
						<div className="score-number correct-guess-number">
							<span className="score-number-value">49</span>
							<span className="score-number-label">Correct</span>
						</div>
						<div className="score-number incorrect-guess-number">
							<span className="score-number-value">3</span>
							<span className="score-number-label">Incorrect</span>
						</div>
						<div className="score-number accuracy-number">
							<span className="score-number-value">92%</span>
							<span className="score-number-label">Accuracy</span>
						</div>
					</div>
				</div>
				<div className="bottom"></div>
			</div>
		</>
	)
}

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
