import { Routes, Route, NavLink } from 'react-router-dom'

import './assets/index.scss'

import './scss/_variables.scss'
import './scss/style.scss'
import './scss/cube-block.scss'
import './scss/piece.scss'
import './scss/dev.scss'
import './scss/buttons.scss'
import './scss/customize.scss'
import './scss/play.scss'
import './scss/sticker-card.scss'

import RubiksCube from './components/RubiksCube'
import CubeRefactor from './components/RubiksCube2'
import CubeRefactor2 from './components/scene-refactor/Main'
import TimerMain from './components/timer/TimerMain'
import PlayMode from './components/play-mode/Main'
import CustomizePanel from './components/ui/customize'
import Main from './components/sticker-cards/Main'
import PlayWithCubeSlot from './components/cube-slots/PlayWithCubeSlot'
import PlayModeStructure from './components/new-structure/MainStructure'
import InputPage from './components/input/InputPage'

const routes = [
	{
		path: '/',
		element: <RubiksCube />,
		name: 'Home',
	},
	{
		path: '/new-cube',
		element: <CubeRefactor />,
		name: 'New Cube',
	},
	{
		path: '/timer',
		element: <TimerMain />,
		name: 'Timer',
	},
	{
		path: '/play-mode',
		element: <PlayMode />,
		name: 'Play Mode',
	},
	{
		path: '/scene-refactor',
		element: <CubeRefactor2 />,
		name: 'Scene Refactor',
	},
	{
		path: '/customize-panel',
		element: <CustomizePanel />,
		name: 'Customize',
	},
	{
		path: '/sticker-cards',
		element: <Main />,
		name: 'Sticker Card',
	},
	{
		path: '/play-with-cube-slot',
		element: <PlayWithCubeSlot />,
		name: 'Cube Slot',
	},
	{
		path: '/new-structure',
		element: <PlayModeStructure />,
		name: 'New Structure',
	},
	{
		path: '/input-elements',
		element: <InputPage />,
		name: 'Input',
	},
]

function App() {
	return (
		<div className="App">
			<nav className="px-8 py-4 bg-gray-300 border-b border-gray-400 ">
				<ul className="flex gap-4">
					{routes.map((route) => {
						return (
							<li key={route.path}>
								<NavLink
									key={route.path}
									to={route.path}
									className={({ isActive }) => {
										return isActive ? 'text-slate-800' : 'text-slate-500'
									}}
								>
									{route.name}
								</NavLink>
							</li>
						)
					})}
				</ul>
			</nav>
			<Routes>
				{routes.map((route) => (
					<Route path={route.path} element={route.element} key={route.path} />
				))}
			</Routes>
		</div>
	)
}

export default App
