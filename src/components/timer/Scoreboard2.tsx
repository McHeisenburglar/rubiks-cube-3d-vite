import { useEffect } from 'react'
import useCountdown from './useCountdown'

interface ScoreboardNumbersProps {
	correctGuesses: number
	incorrectGuesses: number
	debug?: boolean
}

const ScoreboardNumbers: React.FC<ScoreboardNumbersProps> = (props) => {
	const { correctGuesses, incorrectGuesses, debug } = props
	if (debug) console.log('::::: Rendered ScoreboardNumbers.')

	const accuracy = (correctGuesses / (correctGuesses + incorrectGuesses)) * 100

	return (
		<div className="flex gap-x-8">
			<div className="flex flex-col justify-center items-middle text-center">
				<span className="text-2xl font-medium text-slate-900">
					{correctGuesses}
				</span>
				<span className="text-sm text-gray-500">Correct</span>
			</div>
			<div className="flex flex-col justify-center items-middle text-center">
				<span className="text-2xl font-light">{incorrectGuesses}</span>
				<span className="text-sm text-gray-500">Incorrect</span>
			</div>
			<div className="flex flex-col justify-center items-middle text-center">
				<span className="text-2xl font-light">
					{incorrectGuesses === 0 ? '0%' : accuracy.toFixed(1) + '%'}
				</span>
				<span className="text-sm text-gray-500">Accuracy</span>
			</div>
		</div>
	)
}

interface ScoreboardProps {
	inProgress: boolean
	secondsInTimer: number
	debug?: boolean
	children?: React.ReactElement<ScoreboardNumbersProps>
	onStart?: () => void
	onPause?: () => void
	onStop?: () => void
	onCompletion?: () => void
}

const Scoreboard: React.FC<ScoreboardProps> = ({
	inProgress,
	debug,
	secondsInTimer,
	onStart,
	onPause,
	onStop,
	onCompletion,
}) => {
	if (debug) console.log('::::: Rendered Scoreboard.')

	const timer = useCountdown({
		seconds: secondsInTimer,
		onStart,
		onPause,
		onStop,
		onCompletion,
	})

	useEffect(() => {
		if (inProgress) {
			timer.start()
		}
	}, [inProgress])

	const { millisecondsLeft } = timer

	const secondsLeft = millisecondsLeft / 1000

	return (
		<>
			<div className="flex flex-col gap-y-4 p-5 w-full max-w-3xl mx-auto">
				<div className="flex flex-1 justify-between items-center">
					<span className="text-4xl">{secondsLeft.toFixed(1)}</span>
				</div>
				<progress
					className="w-full h-1
                    [&::-webkit-progress-bar]:bg-slate-200
                    [&::-webkit-progress-value]:bg-green-400
                    [&::-moz-progress-bar]:bg-green-400"
					value={secondsLeft}
					max={secondsInTimer}
				></progress>
			</div>
		</>
	)
}

export default { Scoreboard, ScoreboardNumbers }
