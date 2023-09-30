import React, { useEffect, useMemo, useState } from 'react'
import useCountdown from '../timer/useCountdown'
import Scoreboard from '../timer/Scoreboard'

import { CubeComponent } from '../scene-refactor/Main'
import { CubeWithPos } from '../../ts/CubeClass3'
import useKeypress from '../new/useKeypress'
import useGame from './useGame'

interface PlayModeControlsProps {
	debug?: boolean
	isRunning: boolean
	isPaused: boolean
	onClickStart: () => void
	onClickPause: () => void
	onClickStop: () => void
}

const PlayModeControls: React.FC<PlayModeControlsProps> = (props) => {
	if (props.debug) console.log('::::: Rendered PlayModeControls.')

	const { isRunning, isPaused, onClickStart, onClickPause, onClickStop } = props

	if (!isRunning) {
		return (
			<div className="text-center">
				<button className="btn-primary success" onClick={onClickStart}>
					Start game
				</button>
			</div>
		)
	} else {
		return (
			<div className="text-center">
				<button className="btn" onClick={onClickPause}>
					{isPaused ? 'Unpause' : 'Pause'}
				</button>
				<button className="btn" onClick={onClickStop}>
					Stop game
				</button>
			</div>
		)
	}
}

const GameComponentDev: React.FC<{ game: ReturnType<typeof useGame> }> = ({
	game,
}) => {
	return (
		<>
			{game.inProgress && (
				<div className="text-left">
					<h1 className="text-lg font-bold mb-2">Game component</h1>
					<ul>
						<li>Current letter to guess: {game.currentSticker?.name}</li>
						<li>Correct: {game.correct}</li>
						<li>Incorrect: {game.incorrect}</li>
					</ul>
				</div>
			)}
		</>
	)
}

import RotationContextWrapper from '../scene-refactor/RotationContextWrapper'
import HighlightContextWrapper from '../scene-refactor/HighlightContextProvider'
import { useSpotlightContext } from '../scene-refactor/useSpotlight'
import { CorrectGuessLog, GuessLogEntry } from '../timer/TimerMain'
import { useDocumentTitle } from '../ui/customize/useDocumentTitle'

const SeparateTimerComponent = () => {
	const gameTimer = useCountdown({
		seconds: 10,
		onStart: () => {},
		onStop: () => {},
	})
	useEffect(() => {
		gameTimer.start()
	}, [])

	return (
		<>
			<div>{gameTimer.millisecondsLeft}</div>
		</>
	)
}

const PlayModeComponent = () => {
	const cube = useMemo<CubeWithPos>(() => {
		const cube = new CubeWithPos()
		cube.scramble()
		return cube
	}, [])

	return (
		<>
			<SeparateTimerComponent />
			<HighlightContextWrapper>
				<RotationContextWrapper>
					<CubeComponent cube={cube} />
				</RotationContextWrapper>
			</HighlightContextWrapper>
		</>
	)
}

const PlayModeComponent2: React.FC = () => {
	console.log('rendered')
	const [scramble, setScramble] = useState<string | null>(null)
	const cube: CubeWithPos = useMemo<CubeWithPos>(() => {
		const cube = new CubeWithPos()
		if (scramble) cube.performAlgorithm(scramble)
		return cube
	}, [scramble])

	const { setSpotlight, clearSpotlight } = useSpotlightContext()

	const game = useGame({
		cube,
		onStickerChange: (sticker) => {
			setSpotlight(sticker)
		},
		onCorrectGuess: (sticker) => {
			logCorrectGuess(sticker)
		},
		onIncorrectGuess: (sticker) => {
			const domElement = document.querySelector(
				`[data-sticker-id=${sticker.id}]`
			)
			if (domElement) pulseAnimation(domElement)
		},
		onGameStop: () => {
			clearSpotlight()
		},
	})

	const handleScramble = () => {
		const scramble = cube.scramble()
		console.log('got here')
		setScramble(scramble)
	}

	const pulseAnimation = (domElement: Element) => {
		domElement.classList.add('error')
		setTimeout(() => {
			domElement.classList.remove('error')
		}, 300)
	}

	useKeypress((e) => {
		e.preventDefault()
		if (!game.inProgress) {
			const sticker = cube.getStickerByLetter(e.key, 'edge')
			if (sticker) setSpotlight(sticker)
			return
		}
		if (gameTimer.isRunning && !gameTimer.isPaused && game.inProgress) {
			game.checkGuess(e)
		}
	})

	const gameOptions = {
		seconds: 10,
		type: 'corner',
	}

	const gameTimer = useCountdown({
		seconds: gameOptions.seconds,
		onStart: () => {
			game.start()
		},
		onStop: () => {
			game.stop()
		},
		onUnpause: () => {
			if (game.currentSticker) setSpotlight(game.currentSticker)
		},
		onCompletion() {
			game.stop()
			clearSpotlight()
		},
	})

	const logCorrectGuess = (sticker: ISticker) => {
		const ms = gameTimer.newMarker()
		const logEntry: GuessLogEntry = {
			no: game.guessLog.length + 1,
			sticker: sticker.name,
			time: ms,
		}
		game.addGuessLogEntry(logEntry)
	}

	const handleStickerClick = (sticker: ISticker) => {
		if (!game.inProgress) setSpotlight(sticker)
	}

	return (
		<div className="mx-auto max-w-[60rem] px-24 bg-white pb-8">
			<Scoreboard
				correctGuesses={game.correct}
				incorrectGuesses={game.incorrect}
				secondsTotal={gameOptions.seconds}
				millisecondsLeft={gameTimer.millisecondsLeft}
			/>
			<div className="text-center">
				<CubeComponent cube={cube} onStickerClick={handleStickerClick} />
			</div>
			{!game.inProgress && (
				<>
					{scramble && (
						<div className="text-center relative -top-8">
							<span className="text-xs">Scramble: {scramble}</span>
						</div>
					)}
					<div className="text-center">
						<button
							className="btn-primary relative mb-4"
							onClick={handleScramble}
						>
							Scramble cube
						</button>
					</div>
				</>
			)}
			<PlayModeControls
				isPaused={gameTimer.isPaused}
				isRunning={gameTimer.isRunning}
				onClickStart={gameTimer.start}
				onClickPause={gameTimer.togglePause}
				onClickStop={gameTimer.stop}
			/>
			<div className="mt-16">
				<GameComponentDev game={game} />
			</div>
			{!game.inProgress && game.guessLog.length > 0 && (
				<CorrectGuessLog log={game.guessLog} />
			)}
		</div>
	)
}

const PlayModeExport = () => {
	useDocumentTitle('Play Mode')
	return (
		<HighlightContextWrapper>
			<RotationContextWrapper>
				<PlayModeComponent2 />
			</RotationContextWrapper>
		</HighlightContextWrapper>
	)
}

export default PlayModeExport
