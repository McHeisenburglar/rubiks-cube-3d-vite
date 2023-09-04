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
import TimerMain from './components/timer/TimerMain'
import PlayMode from './components/play-mode/Main'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<RubiksCube />} />
				<Route path="/new-cube" element={<CubeRefactor />} />
				<Route path="/timer" element={<TimerMain />} />
				<Route path="/play-mode" element={<PlayMode />} />
			</Routes>
		</div>
	)
}

export default App
