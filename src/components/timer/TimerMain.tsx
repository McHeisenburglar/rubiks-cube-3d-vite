import React from 'react'
import { useState } from 'react'
import useCountdown from './useCountdown'
import useKeypress from '../new/useKeypress'
import Scoreboard from './Scoreboard'

interface GuessLogEntry {
	no: number
	sticker: string
	time: number
}

function SmallTag({ children }: { children: React.ReactNode }) {
	return (
		<span
			className={`inline-block ml-2 px-2 py-1 text-xs rounded text-green-800 bg-green-200`}
		>
			{children}
		</span>
	)
}

function CorrectGuessLog({ log }: { log: GuessLogEntry[] }) {
	// const log: GuessLogEntry[] = [
	// 	{ sticker: 'U', time: 421 },
	// 	{ sticker: 'F', time: 312 },
	// 	{ sticker: 'J', time: 238 },
	// 	{ sticker: 'K', time: 578 },
	// 	{ sticker: 'L', time: 109 },
	// ]

	const [sortKey, setSortKey] = useState<'time' | 'index'>('time')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

	const sortMethod = (a: GuessLogEntry, b: GuessLogEntry) => {
		switch (sortKey) {
			case 'index':
				switch (sortDirection) {
					case 'asc':
						return a.no - b.no
					case 'desc':
						return b.no - a.no
				}
				break
			case 'time':
				switch (sortDirection) {
					case 'asc':
						return a.time - b.time
					case 'desc':
						return b.time - a.time
				}
				break
		}
	}

	const swapSortDirection = () => {
		setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
	}

	const handleClick = (method: string) => {
		if (method === 'index') {
			if (sortKey === 'index') return swapSortDirection()
			setSortKey(() => 'index')
		}
		if (method === 'time') {
			if (sortKey === 'time') return swapSortDirection()
			setSortKey(() => 'time')
		}
	}

	return (
		<table className="table-fixed text-left max-h-[24rem] overflow-scroll">
			<thead>
				<tr className="bg-slate-200 text-sm font text-slate-600">
					<th
						className={`w-[2rem] py-2 pl-4 ${
							sortKey === 'index' ? 'font-bold' : 'font-normal'
						}`}
						onClick={() => handleClick('index')}
					>
						#
					</th>
					<th className="min-w-min w-16 py-2 px-4 font-normal">Sticker</th>
					<th
						className={`min-w-min py-2 px-4 ${
							sortKey === 'time' ? 'font-bold' : 'font-normal'
						}`}
						onClick={() => handleClick('time')}
					>
						Time
					</th>
				</tr>
			</thead>
			<tbody>
				{log.sort(sortMethod).map((entry, index) => (
					<tr key={index} className="py-4 border-b-2">
						<td className="py-2 pl-4 text-sm text-slate-400">{entry.no}</td>
						<td className="py-2 px-4">{entry.sticker}</td>
						<td className="py-2 px-4">
							{entry.time}ms <SmallTag>Fastest</SmallTag>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default function TimerMain() {
	// const seconds = 5
	const [seconds, setSeconds] = useState(5)
	const [times, setTimes] = useState<string[]>([])

	const [guesses, setGuesses] = useState<GuessLogEntry[]>([])

	const [markers, setMarkers] = useState<number[]>([])

	const timer = useCountdown({
		seconds,
		onStart: () => {
			setGuesses([])
			setMarkers([])
		},
		onCompletion: () => {
			setTimes((times) => [...times, new Date().toISOString()])
		},
		onPause: () => {
			console.log('paused')
		},
	})

	const { millisecondsLeft, isRunning, newMarker } = timer

	const handleAddMarker = () => {
		setMarkers((markers) => [...markers, newMarker()])
	}

	useKeypress((key) => {
		addGuessEntry(key.key)
	})

	const addGuessEntry = (sticker: string) => {
		if (!timer.isRunning) return
		const newEntry = {
			sticker,
			time: timer.newMarker(),
			no: guesses.length + 1,
		}
		setGuesses([...guesses, newEntry])
	}

	const buttonClasses =
		'px-6 py-2 rounded bg-slate-300 hover:bg-slate-400 transition duration-150 mr-2'

	return (
		<div className="w-4/5 mx-auto bg-white">
			<div>Timer</div>
			<div>
				<input
					type="number"
					name="seconds"
					id=""
					value={seconds}
					onChange={(e) => setSeconds(parseInt(e.target.value))}
				/>
			</div>

			{/* {isRunning && ( */}
			<Scoreboard
				correctGuesses={124}
				incorrectGuesses={32}
				secondsTotal={seconds}
				millisecondsLeft={millisecondsLeft}
			/>
			{/* )} */}

			{/* <span>{millisecondsLeft}</span> */}
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
				{isRunning && (
					<>
						<button className="btn-primary" onClick={handleAddMarker}>
							Add marker
						</button>
					</>
				)}
				<button className="btn-primary" onClick={() => timer.clearMarkers()}>
					Clear markers
				</button>
				<button className="btn-primary" onClick={() => addGuessEntry('A')}>
					Add guess entry
				</button>
				<button className="btn-primary" onClick={() => setGuesses([])}>
					Clear guess entries
				</button>
			</div>

			<div>
				<span>{timer.millisecondsSincePreviousMarker()}</span>
				<ol>
					{markers.map((marker, index) => (
						<li key={index} className="text-slate-800">
							{marker}ms
						</li>
					))}
					{/* {markers.slice(1).map((marker, index) => (
							<li key={index} className="flex gap-x-2">
								<span className="text-slate-800">
									{`${marker.getTime() - markers[index].getTime()}ms`}
								</span>
								<span className="text-xs text-slate-500">
									{marker.toISOString()}
								</span>
							</li>
						))} */}
				</ol>
			</div>
			{/* <div>
				<ul>
					{times.map((time, index) => (
						<li key={index}>{time}</li>
					))}
				</ul>
			</div> */}
			<CorrectGuessLog log={guesses} />
		</div>
	)
}
