import { useState } from 'react'
import { HighlightContext } from './useHighlight'

interface IProps {
	children: ChildElement
}

export const HighlightContextWrapper: React.FC<IProps> = ({ children }) => {
	const [current, setCurrent] = useState<ISticker | null>(null)

	return (
		<HighlightContext.Provider value={{ value: current, update: setCurrent }}>
			{children}
		</HighlightContext.Provider>
	)
}

export default HighlightContextWrapper
