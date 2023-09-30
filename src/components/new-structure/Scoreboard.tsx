interface ScoreboardProps {
	correctGuesses: number
	incorrectGuesses: number
	secondsTotal: number
	millisecondsLeft: number
	debug?: boolean
}
const Scoreboard: React.FC<ScoreboardProps> = ({
	debug,
	correctGuesses,
	incorrectGuesses,
	secondsTotal,
	millisecondsLeft,
}) => {
	if (debug) console.log('::::: Rendered Scoreboard.')

	const secondsLeft = millisecondsLeft / 1000

	const totalGuesses = correctGuesses + incorrectGuesses

	const accuracy = (correctGuesses / totalGuesses) * 100

	const accuracyColor = () => {
		if (totalGuesses === 0) return 'text-slate-800'
		if (accuracy >= 80) return 'text-green-600'
		if (accuracy >= 50) return 'text-yellow-600'
		return 'text-red-700'
	}

	return (
		<>
			<div className="flex flex-col gap-y-4 p-5 w-full max-w-3xl mx-auto">
				<div className="flex flex-1 justify-between items-center">
					<span className="text-4xl">{secondsLeft.toFixed(1)}</span>
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
							<span className={`text-2xl font-light ${accuracyColor()}`}>
								{totalGuesses === 0 ? '0%' : accuracy.toFixed(1) + '%'}
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

export default Scoreboard