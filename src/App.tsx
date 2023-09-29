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
import CustomizePanel from './components/ui/customize'

const routes = [
	{
		path: '/',
		element: <RubiksCube />,
	},
	{
		path: '/new-cube',
		element: <CubeRefactor />,
	},
	{
		path: '/timer',
		element: <TimerMain />,
	},
	{
		path: '/play-mode',
		element: <PlayMode />,
	},
	{
		path: '/scene-refactor',
		element: <CubeRefactor2 />,
	},
	{
		path: '/customize-panel',
		element: <CustomizePanel />,
	},
]

function App() {
	return (
		<div className="App">
			<Routes>
				{routes.map((route) => (
					<Route path={route.path} element={route.element} key={route.path} />
				))}
			</Routes>
		</div>
	)
}

export default App
