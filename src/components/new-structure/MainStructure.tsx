import React, { useMemo } from 'react'
import CubeView from './CubeView'
import { CubeContextProvider } from './CubeContext'
import Scoreboard from '../timer/Scoreboard'
import TimerControls from '../cube-slots/TimerControls'
import useCountdown from '../timer/useCountdown'
import HighlightContextWrapper from '../scene-refactor/HighlightContextProvider'
import RotationContextWrapper from '../scene-refactor/RotationContextWrapper'
import useGame from '../play-mode/useGame'
import { CubeWithPos } from '../../ts/CubeClass3'
import { CubeContext } from './useCubeContext'

const PlayModeStructure: React.FC = () => {
	const seconds = 30
	const timer = useCountdown({
		seconds,
	})

	return (
		<HighlightContextWrapper>
			<RotationContextWrapper>
				<Scoreboard
					correctGuesses={1}
					incorrectGuesses={1}
					millisecondsLeft={timer.millisecondsLeft}
					secondsTotal={seconds}
					// debug
				/>
				<TimerControls timer={timer} />
				<CubeContextProvider>
					<CubeView debug />
				</CubeContextProvider>
			</RotationContextWrapper>
		</HighlightContextWrapper>
	)
}

interface ChildrenProps {
	children: React.ReactNode
}
const PlayModeContextProvider = (children) => {
	const cube = useMemo<CubeWithPos>(() => new CubeWithPos(), [])
	const game = useGame({ cube })
	const timer = useCountdown({ seconds: 30 })

	return <CubeContext.Provider value={cube}>{children}</CubeContext.Provider>
}

const MainComponent = () => {
	return (
		<PlayModeContextProvider>
			<Scoreboard />
			<TimerControls />
			<CubeView />
			<GameLog />
		</PlayModeContextProvider>
	)
}

export default PlayModeStructure
