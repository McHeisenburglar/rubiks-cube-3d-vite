import React, { useMemo } from 'react'
import { CubeComponent } from '../../scene-refactor/Main'
import { CubeWithPos } from '../../../ts/CubeClass3'
import { useDocumentTitle } from './useDocumentTitle'

interface IProps {}

function useCube() {
	const cube = useMemo(() => new CubeWithPos(), [])
	return { cube }
}

const Component: React.FC<IProps> = () => {
	useDocumentTitle('Customize Panel')
	const { cube } = useCube()

	const style = {
		'--rotation-duration': '0.1s',
		'--side-radius': '12px',
		'--sticker-radius': '12px',
		'--sticker-corner-radius': '12px',
		'--sticker-padding': '4px',
	} as React.CSSProperties

	return (
		<div style={style}>
			<CubeComponent cube={cube} debug />
		</div>
	)
}

export default Component
