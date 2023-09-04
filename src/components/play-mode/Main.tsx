import React from 'react'
import useCountdown from '../timer/useCountdown'
import Scoreboard from '../timer/Scoreboard'

import { CubeComponent } from '../RubiksCube2'

interface IProps {}

const Component: React.FC<IProps> = () => {
	const gameOptions = {
		seconds: 60,
		type: 'corner',
	}
	const gameTimer = useCountdown({
		seconds: gameOptions.seconds,
	})
	return (
		<div className="mx-auto bg-white text-center">
			<Scoreboard
				correctGuesses={1}
				incorrectGuesses={0}
				secondsTotal={gameOptions.seconds}
				millisecondsLeft={gameTimer.millisecondsLeft}
			/>
			<div className="text-left">
				<CubeComponent />
			</div>
			<button className="btn-primary">Start game</button>
		</div>
	)
}

export default Component
