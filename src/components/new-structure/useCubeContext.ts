import { useContext, createContext } from 'react'
import { CubeWithPos } from '../../ts/CubeClass3'

export const CubeContext = createContext<null | CubeWithPos>(null)

export const useCubeContext = () => {
	const context = useContext(CubeContext)
	if (context === null) {
		throw new Error('useCubeContext must be used within a CubeContextProvider')
	}
	return context
}
