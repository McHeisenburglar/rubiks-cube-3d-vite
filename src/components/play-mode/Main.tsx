import React, { useMemo } from 'react'
import useCountdown from '../timer/useCountdown'
import Scoreboard from '../timer/Scoreboard'

import CubeComponent from '../new/CubeComponent'
import { CubeWithPos } from '../../ts/CubeClass3'
import SceneController from '../new/SceneController'
import useKeypress from '../new/useKeypress'

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

const useGame = ({ cube }: { cube: CubeWithPos }) => {
	const getRandomSticker = () => {
		const sticker = cube.getRandomStickerInFilter((s) => s.type === 'corner')
		return sticker
	}

	const [inProgress, setInProgress] = React.useState(false)
	const [correct, setCorrect] = React.useState(0)
	const [incorrect, setIncorrect] = React.useState(0)

	const [currentSticker, setCurrentSticker] = React.useState(getRandomSticker)

	const nextRandomSticker = () => {
		const newSticker = cube.getRandomStickerInFilter(
			(sticker) => sticker.type === 'corner' && sticker.id !== currentSticker.id
		)
		setCurrentSticker(newSticker)
	}

	const reset = () => {
		setCorrect(0)
		setIncorrect(0)
	}

	const checkGuess = (e: KeyboardEvent) => {
		if (e.key.toLowerCase() === currentSticker.name.toLowerCase()) {
			onCorrectGuess()
		} else {
			onIncorrectGuess()
		}
	}

	const onCorrectGuess = () => {
		setCorrect(correct + 1)
		nextRandomSticker()
	}

	const onIncorrectGuess = () => {
		setIncorrect(incorrect + 1)
	}

	const start = () => {
		// setInProgress(true)
		// nextRandomSticker()
	}

	const skip = () => {
		nextRandomSticker()
	}

	return {
		inProgress,
		start,
		currentSticker,
		checkGuess,
		reset,
		correct,
		incorrect,
		skip,
	}
}

const GameComponent: React.FC<{ cube: CubeWithPos }> = ({ cube }) => {
	const game = useGame({ cube })

	game.start()

	const { latestKeypress } = useKeypress(game.checkGuess)

	return (
		<>
			<div className="text-left">
				<h1 className="text-lg font-bold mb-2">Game component</h1>
				<ul>
					<li></li>
					<li>Current letter to guess: {game.currentSticker.name}</li>
					<li>Latest key press: {latestKeypress?.key || 'null'}</li>
					<li>Correct: {game.correct}</li>
					<li>Incorrect: {game.incorrect}</li>
				</ul>
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
