import React from 'react'

interface IProps {
	active: boolean
	children: ChildElement
}

const CubePerspectiveWrapper: React.FC<IProps> = ({ active, children }) => {
	if (active) return <div className="cube-perspective-wrapper">{children}</div>
	return children
}

export default CubePerspectiveWrapper
