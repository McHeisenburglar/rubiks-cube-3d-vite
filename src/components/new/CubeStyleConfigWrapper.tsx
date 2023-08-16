import { SIDES } from '../../ts/helper.js'
import { useEffect, useRef } from 'react'

interface CubeStyleProviderProps {
	config: CubeConfig
	children: ChildElement
}

const CubeStyleProvider: React.FC<CubeStyleProviderProps> = ({
	config,
	children,
}) => {
	const styleWrapperRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const domElement = styleWrapperRef.current

		if (domElement) {
			const colors = { ...config.colors }

			SIDES.forEach((side) => {
				domElement.style.setProperty(`--cube-color-${side}`, colors[side])
			})
		}
	}, [config])

	return (
		<>
			<div className="cube-style-provider" ref={styleWrapperRef}>
				{children}
			</div>
		</>
	)
}

export default CubeStyleProvider
