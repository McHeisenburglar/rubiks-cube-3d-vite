// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import SceneController, { SceneContext } from './SceneController'

interface IProps {
	children: ChildElement
	rotationEvent?: RotationSet | null
	disabled?: boolean
	debug?: boolean
}

const RotationController: React.FC<IProps> = ({
	children,
	disabled,
	debug,
}) => {
	if (debug) console.log(':::: RotationController rendered')

	const [rotation, setRotation] = useState<RotationSet>({
		x: -15,
		y: -30,
		z: 0,
	})

	const rotationRef = useRef(rotation)
	const wrapperRef = useRef()

	let sceneRotation = null
	let sceneEvent = null

	const sceneContext = useContext(SceneContext)
	if (sceneContext) {
		sceneRotation = sceneContext.sceneRotation
		sceneEvent = sceneContext.sceneEvent
	}

	useUpdateEffect(() => {
		if (sceneRotation) setRotation({ ...sceneRotation })
	}, [sceneEvent])

	useEffect(() => {
		rotationRef.current = { ...rotation }
		;['x', 'y', 'z'].forEach((d) => {
			setRotationCSS(d, rotation[d])
		})
	}, [rotation])

	// useEffect(() => {
	// 	if (rotationEvent) {
	// 		console.log('reached here')
	// 		setRotation({ ...rotationEvent })
	// 	}
	// }, rotationEvent)

	const setCSS = (property, value) => {
		const element = wrapperRef.current
		element.style.setProperty(property, value)
	}

	const setRotationCSS = (dimension, value) => {
		setCSS(`--rotate-${dimension}`, `${value}deg`)
	}

	const applyRotationSet = (rotationSet) => {
		const [x, y, z] = rotationSet
		rotationRef.current = { x, y, z }
		;['x', 'y', 'z'].forEach((d, i) => setRotationCSS(d, rotationSet[i]))
	}

	const DRAG_CONTROLS = {}
	const dragSpeed = 0.25

	const [isDragging, setIsDragging] = useState(false)
	const isDraggingRef = useRef(false)
	const previousX = useRef(null)
	const previousY = useRef(null)

	DRAG_CONTROLS.eventListeners = {}

	DRAG_CONTROLS.eventListeners.onClick = () => {}

	DRAG_CONTROLS.eventListeners.onMouseDown = (e) => {
		isDraggingRef.current = true
		previousX.current = e.clientX
		previousY.current = e.clientY

		setIsDragging(true)
	}
	DRAG_CONTROLS.eventListeners.onMouseMove = (e) => {
		if (isDraggingRef.current) {
			// to toggle 'smooth' class

			// Get difference from previous frame
			const diffX = e.clientX - previousX.current
			const diffY = e.clientY - previousY.current

			// Generate rotation
			const rotationSet = [
				rotationRef.current.x - diffY * dragSpeed,
				rotationRef.current.y + diffX * dragSpeed,
				rotationRef.current.z,
			]

			// Apply rotation
			applyRotationSet(rotationSet)

			// Reset difference to 0
			// i.e make previous catch up with current
			previousX.current = e.clientX
			previousY.current = e.clientY
		}
	}

	DRAG_CONTROLS.eventListeners.onMouseUp =
		DRAG_CONTROLS.eventListeners.onMouseLeave = () => {
			if (isDraggingRef.current) {
				isDraggingRef.current = false
				previousX.current = null
				previousY.current = null

				setRotation({ ...rotationRef.current })

				// to toggle 'smooth' class
				setIsDragging(false)
			}
		}

	if (disabled) return children

	const style = {
		'--rotate-x': `${rotation.x}deg`,
		'--rotate-y': `${rotation.y}deg`,
		'--rotate-z': `${rotation.z}deg`,
	}

	return (
		<>
			<div
				ref={wrapperRef}
				style={style}
				className={`rotation-controller  ${isDragging ? 'dragging' : ''}`}
				{...DRAG_CONTROLS.eventListeners}
			>
				{children}
			</div>
		</>
	)
}

const RotationWithContext: React.FC<IProps> = ({ children }) => {
	return (
		<SceneController>
			<RotationController debug>{children}</RotationController>
		</SceneController>
	)
}

export default RotationWithContext
