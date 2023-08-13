// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState, useContext, useRef } from 'react'
import { CubeContext, UserInputContext } from './RubiksCube'
import { SIDES, cubeStyles, availableColors } from '../ts/helper'
import SwitchBar from './Switch'
import { CubeWithPos } from '../ts/CubeClass2'
import { setCSS } from './RubiksCube'
import { SketchPicker } from 'react-color'

const ColorSwatch = (props) => {
	const {
		isOpen,
		activeColor,
		colors,
		handleClick,
		handleChange,
		handleChangeComplete,
	} = props

	const style = {
		background: activeColor,
	}

	return (
		<>
			<div className="color-picker-container">
				<div
					className={`color-box ${isOpen ? 'open' : ''}`}
					style={style}
					onClick={handleClick}
				></div>
				{isOpen && (
					<div className="swatch-container">
						<SketchPicker
							color={activeColor}
							colors={colors}
							presetColors={colors}
							onChange={handleChange}
							onChangeComplete={handleChangeComplete}
						></SketchPicker>
					</div>
				)}
			</div>
		</>
	)
}

function RenameSticker({ cube, stickerId }) {
	const { setEditingSticker, handleChildEvent, rerender } =
		useContext(CubeContext)

	const [error, setError] = useState('')
	const onRenameSticker = (sticker, newName) => {
		if (
			newName &&
			cube
				.getStickersByType([sticker.type])
				.some((s) => s.name.toLowerCase() === newName.toLowerCase())
		) {
			// console.log('Name already taken. Replace?')
			setError('Name already taken. Please pick a different name.')
			return
		}
		cube.renameSticker(sticker.id, newName)
		setEditingSticker(null)
		handleChildEvent('handleRenameSticker', sticker.id)
	}
	const onCancelRename = () => {
		setEditingSticker(null)
	}
	const sticker = cube.getStickerById(stickerId)
	const inputRef = useRef(null)
	const [inputValue, setInputValue] = useState(sticker.name.toUpperCase())
	useEffect(() => {
		inputRef.current.focus({ preventScroll: true })
		setInputValue(sticker.name.toUpperCase())
	}, [stickerId])

	const onInput = (e) => {
		setError('')
		setInputValue(e.target.value.toUpperCase())
	}

	const onReplaceName = (e) => {
		const stickerToReplace = cube.getStickerByLetter(inputValue, sticker.type)
		cube.renameSticker(stickerToReplace.id, '')
		onRenameSticker(sticker, inputValue)
		e.target.blur()
	}

	const disabled = sticker.name.toLowerCase() === inputValue.toLowerCase()
	return (
		<div>
			<h4>Rename sticker {sticker.name}</h4>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					onRenameSticker(sticker, inputValue)
				}}
			>
				<input
					ref={inputRef}
					value={inputValue}
					type="text"
					maxLength="1"
					onChange={onInput}
				/>
				<button
					type="submit"
					className="btn"
					disabled={disabled}
					onSubmit={(e) => {
						e.preventDefault()
						onRenameSticker(sticker, inputValue)
					}}
				>
					{inputValue ? 'Rename' : 'Clear name'}
				</button>
				<button className="btn" onClick={onCancelRename}>
					Cancel
				</button>
				{error && (
					<p className="error">
						{error}{' '}
						<span className="clickable" onClick={onReplaceName}>
							Replace?
						</span>
					</p>
				)}
			</form>
		</div>
	)
}

function CustomizeCube({ onCommitChanges }) {
	// component state
	const {
		cube,
		editMode,
		setEditMode,
		spotlight,
		handleChildEvent,
		editingStickerId,
		setEditingSticker,
		highlightedSide,
		rerender,
	} = useContext(CubeContext)

	const { latestKeyPress } = useContext(UserInputContext)

	const [isExpanded, setIsExpanded] = useState(true)
	const [isEdited, setIsEdited] = useState(false)
	const isEditedRef = useRef(isEdited)
	useEffect(() => {
		isEditedRef.current = isEdited
	}, [isEdited])
	const [openColorPicker, setOpenColorPicker] = useState(null)

	// ensure revert changes
	useEffect(() => {
		return () => {
			if (isEditedRef.current) {
				applyCubeStyleCSS()
				applyCubeColorsCSS()
			}
		}
	}, [])

	// handle keypress

	const handleKeyPress = (e) => {
		e.preventDefault()
		const letter = e.key.toLowerCase()
		const pieceType = e.shiftKey ? 'corner' : 'edge'
		const sticker = cube.getStickerByLetter(letter, pieceType)
		if (sticker) spotlight(sticker.id)
		// setLatestKeyPress(null);
	}

	useEffect(() => {
		setLocalCubeStyle(cube.cubeStyle)
		setLocalCubeColors(cube.colors)
	}, [cube.cubeStyle, cube.colors])

	// style state
	const [localCubeStyle, setLocalCubeStyle] = useState(cube.cubeStyle)
	const [localCubeColors, setLocalCubeColors] = useState(cube.colors)

	useEffect(() => {
		// console.log('🔁 localCubeStyle changed.', localCubeStyle)
		applyCubeStyleCSS()
	}, [localCubeStyle])

	useEffect(() => {
		// console.log('🔁 localCubeColors changed.', localCubeColors)
		applyCubeColorsCSS()
	}, [localCubeColors])

	// apply CSS
	const applyCubeStyleCSS = () => {
		const { color, stickerPadding, sideRadius, stickerCornerRadius } =
			cubeStyles[localCubeStyle]
		setCSS('--cube-color', color)
		setCSS('--sticker-padding', stickerPadding)
		setCSS('--sticker-radius', sideRadius)
		setCSS('--sticker-corner-radius', stickerCornerRadius)
	}

	const applyCubeColorsCSS = () => {
		SIDES.forEach((side) => {
			const val = localCubeColors[side]
			setSideColorCSS(side, val)
		})
	}

	const setSideColorCSS = (side, val) => setCSS(`--color-${side}`, val)

	// Events

	const onCubeStyleChange = (newStyle) => {
		setLocalCubeStyle(newStyle)
		setIsEdited(true)
	}

	const onColorClick = (side) => {
		// console.log('onColorClick')
		const newVal = side === openColorPicker ? null : side
		setOpenColorPicker(newVal)
		// else setOpenColorPicker(side);
		handleChildEvent('handleSideHighlight', newVal)
	}

	useEffect(() => {
		setOpenColorPicker(highlightedSide)
	}, [highlightedSide])

	useEffect(() => {
		// if (highlightedSide !== openColorPicker)
		// 	setHighlightedSide(openColorPicker);
	}, [openColorPicker])

	const onColorChange = (side, val) => {
		setLocalCubeColors((arr) => {
			return { ...arr, [side]: val.hex }
		})
		setIsEdited(true)
	}

	const onColorChangeComplete = (side, val) => {
		onColorChange(side, val)
		setIsEdited(true)
	}

	const onResetAll = () => {
		const { colors, cubeStyle } = new CubeWithPos()
		onCommitChanges({ colors, cubeStyle })
	}

	const onResetColors = () => {
		const { colors } = new CubeWithPos()
		onCommitChanges({ colors, cubeStyle: localCubeStyle })
	}

	const onSave = () => {
		onCommitChanges({ colors: localCubeColors, cubeStyle: localCubeStyle })
		onColorClick(null)
		setIsEdited(false)
	}

	const onRevert = () => {
		setLocalCubeStyle(cube.cubeStyle)
		setLocalCubeColors(cube.colors)
		setIsEdited(false)
	}

	const clearAllNames = () => {
		cube.allStickers.forEach((sticker) => (sticker.name = ''))
		setEditingSticker(null)
		rerender()
	}

	return (
		<>
			<div className="customize-cube">
				<h3>
					Customize cube{' '}
					<span
						onClick={() => setIsExpanded(!isExpanded)}
						style={{ fontSize: '14px', color: 'blue', cursor: 'pointer' }}
					>
						{isExpanded ? 'hide' : 'show'}
					</span>
				</h3>
				{isExpanded && (
					<>
						<div>
							Edit mode:
							<SwitchBar
								items={['orientation', 'colors', 'stickers']}
								activeItem={editMode}
								onSwitch={(value) => setEditMode(value)}
							></SwitchBar>
						</div>
						{editMode === 'orientation' && (
							<h4>
								To set a new orientation, click on a new{' '}
								<strong>FU (front, up) sticker.</strong>
							</h4>
						)}
						{editMode === 'colors' && (
							<>
								<div>
									Cube style:
									<SwitchBar
										items={['white', 'black', 'stickerless']}
										activeItem={localCubeStyle}
										onSwitch={(value) => onCubeStyleChange(value)}
									></SwitchBar>
								</div>
								<div className="color-pickers">
									{SIDES.map((side, index) => {
										return (
											<div key={index}>
												<span>{side}</span>
												<ColorSwatch
													activeColor={localCubeColors[side]}
													isOpen={side === openColorPicker}
													colors={availableColors}
													handleClick={() => onColorClick(side)}
													handleChange={(val) => onColorChange(side, val)}
													handleChangeComplete={(val) =>
														onColorChangeComplete(side, val)
													}
												></ColorSwatch>
											</div>
										)
									})}
								</div>
								<div>
									<button className="btn destructive" onClick={onResetColors}>
										Reset colors
									</button>
								</div>
							</>
						)}

						{editMode === 'stickers' && (
							<>
								<h4>Click on any sticker to edit its name.</h4>
								{editingStickerId && (
									<RenameSticker cube={cube} stickerId={editingStickerId} />
								)}

								<button
									className="btn destructive"
									onClick={() => clearAllNames()}
								>
									Clear all names
								</button>
							</>
						)}

						{isEdited && (
							<div className="edit-buttons">
								<button className="btn" onClick={onRevert}>
									Revert
								</button>
								<button className="btn primary" onClick={onSave}>
									Save changes
								</button>
							</div>
						)}
						<div>
							<button className="btn destructive" onClick={onResetAll}>
								Reset all to defaults
							</button>
						</div>
					</>
				)}
			</div>
		</>
	)
}
export default CustomizeCube
