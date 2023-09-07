import React, { useState } from 'react'
import useCountdown from '../timer/useCountdown2'

interface TimerControlsProps {
	timer: ReturnType<typeof useCountdown>
	show: boolean
}

const TimerControls: React.FC<TimerControlsProps> = ({ timer, show }) => {
	console.log('::::: Rendered TimerControls')

	return (
		<div className="p-32">
			<h1>{(timer.millisecondsLeft / 1000).toFixed(1)}</h1>
			{show && <h2 style={{ color: 'green' }}>Done</h2>}
			<div>
				<button className="btn-primary" onClick={() => timer.start()}>
					Start
				</button>
				<button className="btn-primary" onClick={() => timer.stop()}>
					Stop
				</button>
				<button className="btn-primary" onClick={() => timer.restart()}>
					Restart
				</button>
				<button className="btn-primary" onClick={() => timer.reset()}>
					Reset
				</button>
				<button className="btn-primary" onClick={() => timer.togglePause()}>
					{timer.isPaused ? 'Unpause' : 'Pause'}
				</button>
			</div>
		</div>
	)
}

const BetterTimer = () => {
	const [showMessage, setShowMessage] = useState(false)
	const timer = useCountdown({
		seconds: 1,
		onCompletion: () => {
			setShowMessage(true)
		},
	})
	return <TimerControls timer={timer} show={showMessage} />
}

export default BetterTimer
