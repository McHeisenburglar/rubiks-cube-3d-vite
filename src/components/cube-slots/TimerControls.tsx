import React from 'react'
import useCountdown from '../timer/useCountdown'

interface TimerControlsProps {
	timer: ReturnType<typeof useCountdown>
	debug?: boolean
}

const TimerControls: React.FC<TimerControlsProps> = ({ timer, debug }) => {
	if (debug) console.log('::::: Rendered TimerControls')

	return (
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
	)
}

export default TimerControls
