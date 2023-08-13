declare module './components/RubiksCube'

import './scss/_variables.scss'
import './scss/style.scss'
import './scss/cube.scss'
import './scss/cube-block.scss'
import './scss/piece.scss'
import './scss/dev.scss'
import './scss/buttons.scss'
import './scss/customize.scss'
import './scss/play.scss'

import RubiksCube from './components/RubiksCube'

function App() {
	return (
		<div className="App">
			<RubiksCube />
		</div>
	)
}

export default App
