import React, { useMemo, useState } from 'react'
import Scoreboard from '../timer/Scoreboard'
import useKeypress from '../new/useKeypress'
import useGame from '../play-mode/useGame'
import useCountdown from '../timer/useCountdown'
import TimerControls from './TimerControls'
import { CubeWithPos } from '../../ts/CubeClass3'
import { CubeView } from './CubeView'
import Cube from '../new/Cube'

interface PlayPanelProps {
	slot: React.ReactNode
}

interface IProps {}

const PlayPanel: React.FC<PlayPanelProps> = ({ slot }) => {
	const seconds = 30
	const timer = useCountdown({
		seconds,
	})

	return (
		<>
			<Scoreboard
				correctGuesses={1}
				incorrectGuesses={1}
				millisecondsLeft={timer.millisecondsLeft}
				secondsTotal={seconds}
				debug
			/>
			{slot}
			<TimerControls timer={timer} />
		</>
	)
}

const PlayWithCubeSlot: React.FC<IProps> = () => {
	const cube = useMemo(() => new CubeWithPos(), [])
	return <PlayPanel slot={<CubeView cube={cube} debug />}></PlayPanel>
}

export default PlayWithCubeSlot
