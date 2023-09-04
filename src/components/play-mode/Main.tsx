import React, { useMemo } from 'react'
import useCountdown from '../timer/useCountdown'
import Scoreboard from '../timer/Scoreboard'

import CubeComponent from '../new/CubeComponent'
import { CubeWithPos } from '../../ts/CubeClass3'
import SceneController from '../new/SceneController'
import useKeypress from '../new/useKeypress'
import useGame from './useGame'

interface PlayModeControlsProps {
	isRunning: boolean
	isPaused: boolean
	onStart: () => void
	onPause: () => void
	onStop: () => void
}

const PlayModeControls: React.FC<PlayModeControlsProps> = (props) => {
	const { isRunning, isPaused, onStart, onPause, onStop } = props

	if (!isRunning) {
		return (
			<button className="btn-primary success" onClick={onStart}>
				Start game
			</button>
		)
	} else {
		return (
			<>
				<button className="btn" onClick={onPause}>
					{isPaused ? 'Unpause' : 'Pause'}
				</button>
				<button className="btn" onClick={onStop}>
					Stop game
				</button>
			</>
		)
	}
}

const GameComponent: React.FC<{ cube: CubeWithPos }> = ({ cube }) => {
	const game = useGame({ cube })

	const { latestKeypress } = useKeypress(game.checkGuess)

	return (
		<>
			<div className="text-left">
				<h1 className="text-lg font-bold mb-2">Game component</h1>
				{!game.inProgress ? (
					<button className="btn-primary" onClick={game.start}>
						Start game
					</button>
				) : (
					<ul>
						<li>Current letter to guess: {game.currentSticker.name}</li>
						<li>Latest key press: {latestKeypress?.key || 'null'}</li>
						<li>Correct: {game.correct}</li>
						<li>Incorrect: {game.incorrect}</li>
						<button className="btn-primary" onClick={game.stop}>
							Stop game
						</button>
					</ul>
				)}
			</div>
		</>
	)
}

const PlayModeComponent: React.FC = () => {
	const cube = useMemo<CubeWithPos>(() => {
		const cube = new CubeWithPos()
		cube.scramble()
		return cube
	}, [])
	const gameOptions = {
		seconds: 60,
		type: 'corner',
	}
	const gameTimer = useCountdown({
		seconds: gameOptions.seconds,
	})

	return (
		<div className="mx-auto max-w-[60rem] px-24 bg-white text-center">
			<Scoreboard
				correctGuesses={1}
				incorrectGuesses={0}
				secondsTotal={gameOptions.seconds}
				millisecondsLeft={gameTimer.millisecondsLeft}
			/>
			<div className="text-left">
				<SceneController>
					<CubeComponent cube={cube} />
				</SceneController>
			</div>
			<GameComponent cube={cube} />
			<PlayModeControls
				isPaused={gameTimer.isPaused}
				isRunning={gameTimer.isRunning}
				onStart={gameTimer.start}
				onPause={gameTimer.togglePause}
				onStop={gameTimer.stop}
			/>
		</div>
	)
}

export default PlayModeComponent
