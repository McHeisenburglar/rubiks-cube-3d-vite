import { Routes, Route } from 'react-router-dom'

import './assets/index.scss'

import './scss/_variables.scss'
import './scss/style.scss'
import './scss/cube-block.scss'
import './scss/piece.scss'
import './scss/dev.scss'
import './scss/buttons.scss'
import './scss/customize.scss'
import './scss/play.scss'

import RubiksCube from './components/RubiksCube'
import CubeRefactor from './components/RubiksCube2'
import CubeRefactor2 from './components/scene-refactor/Main'
import TimerMain from './components/timer/TimerMain'
import PlayMode from './components/play-mode/Main'

import PlayWithCubeSlot from './components/cube-slots/PlayWithCubeSlot'
import BetterTimer from './components/timer/BetterTimer'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<RubiksCube />} />
				<Route path="/new-cube" element={<CubeRefactor />} />
				<Route path="/timer" element={<TimerMain />} />
				<Route path="/play-mode" element={<PlayMode />} />
				<Route path="/scene-refactor" element={<CubeRefactor2 />} />
				<Route path="/cube-slot" element={<PlayWithCubeSlot />} />
				<Route path="/better-timer" element={<BetterTimer />} />
			</Routes>
		</div>
	)
}

export default App
