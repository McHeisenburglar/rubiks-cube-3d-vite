import React from 'react'
import { useState, useRef, useEffect } from 'react'
// import RotationController from '../RotationController'

const DIMENSIONS = ['x', 'y', 'z'] as const

interface IProps {
	children: ChildElement
	rotationEvent?: RotationSet | null
	disabled?: boolean
	debug?: boolean
}

const CubeRotationController: React.FC<IProps> = ({
	children,
	disabled,
	debug,
}) => {
	if (debug) console.log(':::: RotationController rendered')
	console.log('hello')

	const [rotation, setRotation] = useState<RotationSet>({
		x: 15,
		y: -30,
		z: 0,
	})

	const rotationRef = useRef(rotation)
	const wrapperRef = useRef<HTMLDivElement | null>(null)

	const setRotationCSS = (dimension: Dimension, value: number) => {
		setCSS(`--rotate-${dimension}`, `${value}deg`)
	}

	const applyRotationSetCSS = (rotationSet: RotationSet) => {
		setRotationCSS('x', rotationSet.x)
		setRotationCSS('y', rotationSet.y)
		setRotationCSS('z', rotationSet.z)
	}

	useEffect(() => {
		rotationRef.current = { ...rotation }
		applyRotationSetCSS(rotation)
	}, [rotation])

	const setCSS = (property: string, value: string) => {
		const element = wrapperRef.current
		element?.style.setProperty(property, value)
	}

	const applyRotationSet = (rotationSet: RotationArray) => {
		const [x, y, z] = rotationSet
		rotationRef.current = { x, y, z }
		DIMENSIONS.forEach((d, i) => setRotationCSS(d, rotationSet[i]))
	}

	const dragSpeed = 0.25

	const [isDragging, setIsDragging] = useState(false)
	const isDraggingRef = useRef(false)
	const previousX = useRef<number | null>(null)
	const previousY = useRef<number | null>(null)

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (disabled) return
		isDraggingRef.current = true
		previousX.current = e.clientX
		previousY.current = e.clientY

		setIsDragging(true)
	}

	const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (disabled) return
		if (isDraggingRef.current) {
			// to toggle 'smooth' class

			// Get difference from previous frame
			const diffX = e.clientX - previousX!.current!
			const diffY = e.clientY - previousY!.current!

			// Generate rotation
			const rotationSet: RotationArray = [
				rotationRef.current.x - diffY * dragSpeed,
				rotationRef.current.y + diffX * dragSpeed,
				rotationRef.current.z,
			]

			// Apply rotation
			applyRotationSet(rotationSet)

			// Reset difference to 0
			// i.e make previous catch up with current
			previousX!.current! = e.clientX
			previousY.current = e.clientY
		}
	}
	const onMouseUp = () => {
		if (disabled) return
		if (isDraggingRef.current) {
			isDraggingRef.current = false
			previousX.current = null
			previousY.current = null

			setRotation({ ...rotationRef.current })

			// to toggle 'smooth' class
			setIsDragging(false)
		}
	}

	const onMouseLeave = onMouseUp

	const dragEventListeners = {
		onMouseDown,
		onMouseMove,
		onMouseUp,
		onMouseLeave,
	}

	const style = {
		'--rotate-x': `${rotation.x}deg`,
		'--rotate-y': `${rotation.y}deg`,
		'--rotate-z': `${rotation.z}deg`,
	} as React.CSSProperties

	return (
		<>
			<div
				ref={wrapperRef}
				style={style}
				className={`rotation-controller  ${isDragging ? 'dragging' : ''}`}
				{...dragEventListeners}
			>
				{children}
			</div>
		</>
	)
}

export default CubeRotationController
