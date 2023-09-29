import React from 'react'
import CubeView from './CubeView'
import { CubeContextProvider } from './CubeContext'

const PlayModeStructure: React.FC = () => {
	return (
		<CubeContextProvider>
			<CubeView />
		</CubeContextProvider>
	)
}

export default PlayModeStructure
