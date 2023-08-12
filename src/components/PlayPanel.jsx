import React, { useState, useEffect, useRef, useContext } from 'react'
import { CubeContext, UserInputContext } from './RubiksCube'
import { randomElement } from '../js/helper'
import SwitchBar, { Switch } from './Switch'
import { setCSS } from './RubiksCube'

function GameTimer({ isPlaying, onTimerEnd }) {
	const INTERVAL = 10

	let countdown
	const [secondsInGame, setSecondsInGame] = useState(60)
	const [msRemaining, setMsRemaining] = useState(0)
	const [isRunning, setIsRunning] = useState(false)

	useEffect(() => {
		return () => {
			// console.log('Clearing interval.')
			clearInterval(countdown)
		}
	}, [])

	useEffect(() => {
		if (isRunning) startTimer()
		else clearInterval(countdown)
	}, [isRunning])

	useEffect(() => {
		setIsRunning(isPlaying)
	}, [isPlaying])

	const startTimer = () => {
		if (!(secondsInGame > 0)) {
			setIsRunning(false)
			return
		}
		setMsRemaining(secondsInGame * 1000)
		// console.log('Setting a new interval!')
		countdown = setInterval(onInterval, INTERVAL)
	}

	const onInterval = () => {
		if (isRunning) {
			setMsRemaining((ms) => ms - INTERVAL)
		}
	}

	useEffect(() => {
		if (msRemaining <= 0) {
			clearInterval(countdown)
			onTimerEnd()
		}
	}, [msRemaining])

	// 60 000 + 54 000 + 02 = 114 002
	// 1:54:02

	// 114 002 - 60 000 = 54 000
	// 114 002 -

	const minutesRemaining = msRemaining / 1000 / 60 //
	const secondsRemaining = msRemaining / 1000

	const minutesString = Math.floor(minutesRemaining).toString()
	const secondsString = (Math.floor(secondsRemaining) % 60)
		.toString()
		.padStart(2, '0')
	const msString = (msRemaining % 1000)
		.toString()
		.padStart(3, '0')
		.substring(0, 1)
	const finalString = `${minutesString}:${secondsString}.${msString}`

	return (
		<div className="game-timer">
			{!isRunning && (
				<div className="time-options">
					<h4>Seconds in game</h4>
					<SwitchBar
						activeItem={secondsInGame}
						items={[15, 30, 60, 120, '—']}
						onSwitch={(val) => setSecondsInGame(val)}
					/>
				</div>
			)}
			{isRunning && <h3>{finalString}</h3>}
		</div>
	)
}

function PlayPanel({ spotlight, pulseAnimation }) {
	const { cube, rerender } = useContext(CubeContext)
	const { latestKeyPress } = useContext(UserInputContext)

	const availableLetters = () => cube.getAvailableLetters([pieceType])

	useEffect(() => {
		return () => {
			setIsPlaying(false)
			setTargetId(null)
			setGameLog([])
			setDimCSS(false)
		}
	}, [])

	const showGameLog = false

	useEffect(() => {
		if (latestKeyPress) handleKeyPress(latestKeyPress)
	}, [latestKeyPress])

	const onGameStart = () => {
		setGameLog([])
		resetScores()
		setNewTarget()
	}

	const onGameEnd = () => {
		setTargetId(null)
	}

	const [isPlaying, setIsPlaying] = useState(false)
	const isPlayingRef = useRef(isPlaying)
	useEffect(() => {
		isPlayingRef.current = isPlaying
		isPlaying ? onGameStart() : onGameEnd()
	}, [isPlaying])

	const [pieceType, setPieceType] = useState('corner')
	const pieceTypeRef = useRef(pieceType)
	useEffect(() => {
		pieceTypeRef.current = pieceType
	}, [pieceType])

	const [targetId, setTargetId] = useState(null)
	const targetIdRef = useRef(targetId)
	useEffect(() => {
		targetIdRef.current = targetId
		if (isPlaying) {
			if (targetId) spotlight(targetId)
		}
		spotlight(targetId)
	}, [targetId])

	const [gameScore, setGameScore] = useState(0)
	const [guessCount, setGuessCount] = useState(0)

	const resetScores = () => {
		setGameScore(0)
		setGuessCount(0)
	}

	const setNewTarget = () => {
		const nextSticker = randomElement(
			cube.getStickersByType([pieceTypeRef.current])
		)
		if (targetIdRef.current && targetIdRef.current === nextSticker.id) {
			return setNewTarget()
		}
		if (targetIdRef) {
			// console.log()
		}
		setTargetId(nextSticker.id)
	}

	const handleKeyPress = (e) => {
		// console.log('Received', e.key)
		const sticker = getStickerByKeypress(e)
		if (sticker && isPlayingRef.current) {
			isGuessCorrect(sticker.id) ? onCorrectGuess() : onWrongGuess(sticker)
		}
	}

	const getStickerByKeypress = (e) => {
		e.preventDefault()
		const letter = e.key.toLowerCase()
		if (!availableLetters().includes(letter)) return false
		return cube.getStickerByLetter(letter, pieceTypeRef.current)
	}

	const isGuessCorrect = (stickerId) => {
		addLog(targetIdRef.current, stickerId)
		return stickerId === targetIdRef.current
	}

	const onCorrectGuess = () => {
		// console.log('✅ CORRECT!')
		setGameScore((s) => s + 1)
		setNewTarget()
	}

	const onWrongGuess = (sticker) => {
		// console.log(`❌ WRONG (${sticker.name})`)
		// setIncorrectGuessCount((score) => score + 1);
		const selector = `.sticker.id-${sticker.id}`
		const domElement = document.querySelector(selector)
		if (domElement) pulseAnimation(domElement, 'error')
	}

	const [gameLog, setGameLog] = useState([])

	const addLog = (targetId, guessId) => {
		const target = cube.getStickerById(targetId)
		const guess = cube.getStickerById(guessId)
		const isCorrect = targetId === guessId

		const logItem = { target, guess, isCorrect }

		setGameLog([...gameLog, logItem])
	}

	const [isDimmed, setIsDimmed] = useState(false)

	const setDimCSS = (bool) => {
		if (bool) {
			// console.log('Called with', bool)
			setCSS('--opacity-dim', 0.01)
			setCSS('--opacity-normal', 0.01)
		} else {
			// console.log('Called with', bool)
			setCSS('--opacity-dim', 0.4)
			setCSS('--opacity-normal', 0.7)
		}
	}

	useEffect(() => {
		setDimCSS(isDimmed)
	}, [isDimmed])

	const [currentScramble, setCurrentScramble] = useState(null)

	const buttonMethods = {
		scramble: (e) => {
			const scramble = cube.scramble()
			setCurrentScramble(scramble)
			rerender()
			e.target.blur()
		},
		reset: (e) => {
			cube.reset()
			rerender()
			setCurrentScramble(null)
			e.target.blur()
		},
		play: (e) => {
			setIsPlaying(!isPlaying)
			rerender()
			e.target.blur()
		},
	}

	const onTimerEnd = () => {
		setIsPlaying(false)
	}

	return (
		<>
			<div className="play-panel white-panel">
				{isPlaying && <h3 className="game-score">{gameScore.toString()}</h3>}
				{!isPlaying && (
					<>
						<h1>Play (practice mode)</h1>
						<div className="game-options">
							Game options
							<div>
								<h4>Piece type</h4>
								<SwitchBar
									activeItem={pieceType}
									items={['corner', 'edge']}
									onSwitch={setPieceType}
								/>
							</div>
							<div>
								<Switch
									active={isDimmed}
									onSwitch={() => setIsDimmed(!isDimmed)}
								>
									Only show active sticker
								</Switch>
							</div>
						</div>
						<div>
							<button
								className="btn"
								onClick={buttonMethods.scramble}
								disabled={isPlaying}
							>
								Scramble
							</button>
							<button
								className="btn"
								onClick={buttonMethods.reset}
								disabled={isPlaying}
							>
								Reset
							</button>
							{currentScramble && <p>Scramble: {currentScramble}</p>}
						</div>
					</>
				)}
				<GameTimer onTimerEnd={onTimerEnd} isPlaying={isPlaying} />
				<div>
					<button
						className={`btn full-width play-btn ${
							isPlaying ? 'playing' : 'idle'
						}`}
						onClick={buttonMethods.play}
					>
						{isPlaying ? 'Stop' : 'Play'}
					</button>
				</div>
				{showGameLog && (
					<div className="game-log">
						<ul>
							{gameLog.map(({ target, guess, isCorrect }) => {
								return (
									<li
										className={`log-list-item ${
											isCorrect ? 'correct' : 'incorrect'
										}`}
									>
										{target.name.toUpperCase()} - Guessed{' '}
										{guess.name.toUpperCase()}.
									</li>
								)
							})}
						</ul>
					</div>
				)}
			</div>
		</>
	)
}

export default PlayPanel
