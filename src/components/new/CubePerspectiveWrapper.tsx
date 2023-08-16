import React from 'react'

interface IProps {
	mode: 'none' | '3d-fold' | 'flat-fold'
	children: ChildElement
}

const CubePerspectiveWrapper: React.FC<IProps> = ({ mode, children }) => {
	let className: string = 'cube-wrapper-none'

	if (mode === '3d-fold')
		className = 'cube-perspective-wrapper cube-wrapper-3d-fold'
	if (mode === 'flat-fold')
		className = 'cube-perspective-wrapper cube-wrapper-3d-flat-fold'

	return <div className={className}>{children}</div>
}

export default CubePerspectiveWrapper
