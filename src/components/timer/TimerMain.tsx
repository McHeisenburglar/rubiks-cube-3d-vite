import React from 'react'
import { useState } from 'react'
import useCountdown from './useCountdown'

interface ScoreboardProps {
	correctGuesses: number
	incorrectGuesses: number
	secondsTotal: number
	millisecondsLeft: number
}

const Scoreboard: React.FC<ScoreboardProps> = ({
	correctGuesses,
	incorrectGuesses,
	secondsTotal,
	millisecondsLeft,
}) => {
	const secondsLeft = millisecondsLeft / 1000

	const accuracy = (correctGuesses / (correctGuesses + incorrectGuesses)) * 100

	return (
		<>
			<div className="flex flex-col gap-y-2 p-5 w-full max-w-3xl mx-auto">
				<div className="flex flex-1 justify-between items-center">
					<span className="text-3xl">{secondsLeft.toFixed(1)}</span>
					<div className="flex gap-x-8">
						<div className="flex flex-col justify-center items-middle text-center">
							<span className="text-xl font-medium text-slate-900">
								{correctGuesses}
							</span>
							<span className="text-sm text-gray-500">Correct</span>
						</div>
						<div className="flex flex-col justify-center items-middle text-center">
							<span className="text-xl font-light">{incorrectGuesses}</span>
							<span className="text-sm text-gray-500">Incorrect</span>
						</div>
						<div className="flex flex-col justify-center items-middle text-center">
							<span className="text-xl font-light">
								{accuracy.toFixed(1) + '%'}
							</span>
							<span className="text-sm text-gray-500">Accuracy</span>
						</div>
					</div>
				</div>
				<progress
					className="w-full h-1
                    [&::-webkit-progress-bar]:bg-slate-200
                    [&::-webkit-progress-value]:bg-green-400
                    [&::-moz-progress-bar]:bg-green-400"
					value={secondsLeft}
					max={secondsTotal}
				></progress>
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

	const { millisecondsLeft, isRunning } = timer

	const [times, setTimes] = useState<string[]>([])

	const buttonClasses =
		'px-6 py-2 rounded bg-slate-300 hover:bg-slate-400 transition duration-150 mr-2'

	return (
		<div className="w-4/5 mx-auto bg-white">
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

			{/* {isRunning && ( */}
			<Scoreboard
				correctGuesses={124}
				incorrectGuesses={32}
				secondsTotal={seconds}
				millisecondsLeft={millisecondsLeft}
			/>
			{/* )} */}

			{/* <span>{millisecondsLeft}</span> */}
			<div>
				<button className={buttonClasses} onClick={() => timer.start()}>
					Start
				</button>
				<button className={buttonClasses} onClick={() => timer.stop()}>
					Stop
				</button>
				<button className={buttonClasses} onClick={() => timer.restart()}>
					Restart
				</button>
				<button className={buttonClasses} onClick={() => timer.reset()}>
					Reset
				</button>
				<button className={buttonClasses} onClick={() => timer.togglePause()}>
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
		</div>
	)
}
