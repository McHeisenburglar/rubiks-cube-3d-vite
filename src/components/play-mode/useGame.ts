import { useState } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'

interface useGameOptions {
	cube: CubeWithPos
	onCorrectGuess?: (sticker: ISticker) => void
	onIncorrectGuess?: (sticker: ISticker) => void
	onGameStart?: () => void
	onGameStop?: () => void
}

export const useGame = (options: useGameOptions) => {
	const { cube } = options

	const getRandomSticker = () => {
		const sticker = cube.getRandomStickerInFilter((s) => s.type === 'corner')
		return sticker
	}

	const [inProgress, setInProgress] = useState(false)
	const [correct, setCorrect] = useState(0)
	const [incorrect, setIncorrect] = useState(0)

	const [currentSticker, setCurrentSticker] = useState(getRandomSticker)

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
			options.onCorrectGuess?.(currentSticker)
			onCorrectGuess()
		} else {
			options.onCorrectGuess?.(currentSticker)
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
		setInProgress(true)
		reset()
		nextRandomSticker()

		options.onGameStart?.()
	}

	const stop = () => {
		setInProgress(false)

		options.onGameStart?.()
	}

	const skip = () => {
		nextRandomSticker()
	}

	return {
		inProgress,
		start,
		stop,
		currentSticker,
		checkGuess,
		reset,
		correct,
		incorrect,
		skip,
	}
}

export default useGame
