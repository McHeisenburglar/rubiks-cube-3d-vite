import React, { useMemo, useRef } from 'react'
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

	const styleRef = useRef<HTMLDivElement>(null)

	type CSSOption = {
		label: string
		id: string
		styleProperty: string
		minValue: number
		maxValue: number
		// value: number | string
		defaultValue: number
		unit: string
	}

	const setCSS = (property: string, value: string) => {
		if (!styleRef.current) return null
		styleRef.current.style.setProperty(property, value)
	}

	const getCSSValue = (property: string) => {
		if (!styleRef.current) return null
		return parseFloat(
			getComputedStyle(styleRef.current).getPropertyValue(property)
		)
	}

	const styleOptions: CSSOption[] = [
		{
			label: 'Rotation Duration',
			id: 'rotation-duration',
			styleProperty: '--rotation-duration',
			minValue: 0.1,
			maxValue: 1,
			defaultValue: 0.1,
			unit: 's',
		},
		{
			id: 'side-radius',
			label: 'Side Radius',
			styleProperty: '--side-radius',
			minValue: 0,
			maxValue: 20,
			defaultValue: 18,
			unit: 'px',
		},
		{
			label: 'Sticker Radius',
			id: 'sticker-radius',
			styleProperty: '--sticker-radius',
			minValue: 0,
			maxValue: 20,
			defaultValue: 4,
			unit: 'px',
		},
		{
			label: 'Sticker Corner Radius',
			id: 'sticker-corner-radius',
			styleProperty: '--sticker-corner-radius',
			minValue: 0,
			maxValue: 20,
			defaultValue: 8,
			unit: 'px',
		},
		{
			label: 'Sticker Padding',
			id: 'sticker-padding',
			styleProperty: '--sticker-padding',
			minValue: 0,
			maxValue: 20,
			defaultValue: 8,
			unit: 'px',
		},
	]

	function handleInputChange(
		e: React.ChangeEvent<HTMLInputElement>,
		option: CSSOption
	) {
		const value = e.target.value
		console.log(
			'setting option',
			option.styleProperty,
			`${value}${option.unit}`
		)
		setCSS(option.styleProperty, `${value}${option.unit}`)
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
								value={getCSSValue(option.styleProperty) || option.defaultValue}
								id={option.id}
								min={option.minValue}
								max={option.maxValue}
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
