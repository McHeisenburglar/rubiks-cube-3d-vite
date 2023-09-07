import React, { useEffect, useState } from 'react'
import useCountdown from '../timer/useCountdown3'

interface TimerControlsProps {
	timer: ReturnType<typeof useCountdown>
	show: boolean
}

const useCountdownMilliseconds = ({
	timer,
	refreshRate,
}: {
	timer: ReturnType<typeof useCountdown>
	refreshRate: number
}) => {
	const [msRemaining, setMsRemaining] = useState(0)

	useEffect(() => {
		// console.log('triggered useEffect')
		if (!timer.isRunning) return setMsRemaining(timer.millisecondsLeft)
		if (timer.isRunning && !timer.isPaused) {
			const timeout = setInterval(() => {
				if (timer.getDiff() <= 0) clearTimeout(timeout)
				setMsRemaining(timer.getDiff())
			}, refreshRate)
			return () => clearTimeout(timeout)
		}
	}, [timer.millisecondsLeft])

	return msRemaining
}

const TimerContent = ({
	timer,
	refreshRate,
}: {
	timer: ReturnType<typeof useCountdown>
	refreshRate: number
}) => {
	console.log('::::: Rendered TimerContent')
	const msRemaining = useCountdownMilliseconds({ timer, refreshRate })

	return <>{(msRemaining / 1000).toFixed(1)}</>
}

const TimerControls: React.FC<TimerControlsProps> = ({ timer, show }) => {
	console.log('::::: Rendered TimerControls')

	return (
		<div className="p-32">
			<h1 className="text-2xl mb-4">
				<TimerContent refreshRate={75} timer={timer} />
			</h1>
			{show && <h2 className="text-green">Done</h2>}
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
	console.log(':::: Rendered BetterTimer')
	const [showMessage, setShowMessage] = useState(false)
	const timer = useCountdown({
		seconds: 20,
		onCompletion: () => {
			setShowMessage(true)
		},
	})
	return <TimerControls timer={timer} show={showMessage} />
}

export default BetterTimer
