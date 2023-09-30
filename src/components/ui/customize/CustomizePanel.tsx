import React, { useEffect, useMemo, useRef, useState } from 'react'
import { CubeComponent } from '../../scene-refactor/Main'
import { CubeWithPos } from '../../../ts/CubeClass3'
import { useDocumentTitle } from './useDocumentTitle'

interface IProps {}

function useCube() {
	const cube = useMemo(() => new CubeWithPos(), [])
	return { cube }
}

const Component: React.FC<IProps> = () => {
	console.log('rendered CustomizePage')
	useDocumentTitle('Customize Panel')
	const { cube } = useCube()
	const style = {
		'--rotation-duration': '0.1s',
		'--side-radius': '4px',
		'--sticker-radius': '4px',
		'--sticker-corner-radius': '8px',
		'--sticker-padding': '8px',
	} as React.CSSProperties

	interface StyleConfig {
		[key: string]: number
	}

	const [styleState, setStyleState] = useState<StyleConfig>({
		'rotation-duration': 0.1,
		'side-radius': 4,
		'sticker-radius': 4,
		'sticker-corner-radius': 8,
		'sticker-padding': 8,
	})
	const setCSS = (property: string, value: string) => {
		if (!styleRef.current) return null
		styleRef.current.style.setProperty(property, value)
	}

	useEffect(() => {
		styleOptions.forEach((style) => {
			setCSS(style.styleProperty, styleState[style.id].toString() + style.unit)
		})
	}, [styleState])

	const styleRef = useRef<HTMLDivElement>(null)

	type CSSOption = {
		label: string
		id: string
		styleProperty: string
		minValue: number
		maxValue: number
		steps?: number
		unit: string
	}

	const styleOptions: CSSOption[] = [
		{
			label: 'Rotation Duration',
			id: 'rotation-duration',
			styleProperty: '--rotation-duration',
			minValue: 0.1,
			maxValue: 1,
			steps: 0.1,
			unit: 's',
		},
		{
			id: 'side-radius',
			label: 'Side Radius',
			styleProperty: '--side-radius',
			minValue: 0,
			maxValue: 20,
			unit: 'px',
		},
		{
			label: 'Sticker Radius',
			id: 'sticker-radius',
			styleProperty: '--sticker-radius',
			minValue: 0,
			maxValue: 20,
			unit: 'px',
		},
		{
			label: 'Sticker Corner Radius',
			id: 'sticker-corner-radius',
			styleProperty: '--sticker-corner-radius',
			minValue: 0,
			maxValue: 20,
			unit: 'px',
		},
		{
			label: 'Sticker Padding',
			id: 'sticker-padding',
			styleProperty: '--sticker-padding',
			minValue: 0,
			maxValue: 20,
			unit: 'px',
		},
	]

	function handleInputChange(
		e: React.ChangeEvent<HTMLInputElement>,
		option: CSSOption
	) {
		const newValue = parseFloat(e.target.value)
		setStyleState({ ...styleState, [option.id]: newValue })
	}

	return (
		<div style={style} ref={styleRef}>
			<ul className="m-auto max-w-lg">
				{styleOptions.map((option) => {
					return (
						<li className="flex flex-row justify-between" key={option.id}>
							<label htmlFor={option.id}>{option.label}</label>
							<input
								type="range"
								name={option.id}
								value={styleState[option.id]}
								id={option.id}
								min={option.minValue}
								max={option.maxValue}
								step={option.steps || 1}
								onChange={(e) => handleInputChange(e, option)}
							/>
						</li>
					)
				})}
			</ul>
			<CubeComponent cube={cube} debug />
		</div>
	)
}

export default Component
