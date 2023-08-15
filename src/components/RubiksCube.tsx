// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useRef, useEffect, useContext, useMemo } from 'react'

import { SIDES, cubeStyles, rotationsToPos } from '../ts/helper.js'
import { CubeWithPos, Sticker as StickerData } from '../ts/CubeClass2.js'
import { FaPalette } from 'react-icons/fa'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SwitchBar, { Switch } from './Switch'
import RotationController from './RotationController'
import CustomizeCube from './CustomizeCube'
import PlayPanel from './PlayPanel'
import ViewPanel from './ViewPanel'
import DevStateLogger from './DevStateLogger'

import { useKeyhold } from '../hooks/useKeyhold'

import '../scss/cube-v1.scss'

interface LooseObject {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export const CubeContext = React.createContext<LooseObject>({})
export const UserInputContext = React.createContext<LooseObject>({})
export const setCSS = (property: string, value: string) => {
	document.documentElement.style.setProperty(property, value)
}

function MainComponent() {
	// ------------------
	// Mounted
	// ------------------

	const [latestKeyPress, setLatestKeyPress] = useState<KeyboardEvent | null>(
		null
	)

	useEffect(() => {
		document.removeEventListener('keypress', handleKeyPress2)
		document.addEventListener('keypress', handleKeyPress2)
		console.clear()
	}, [])

	const handleKeyPress2 = (e: KeyboardEvent) => {
		// console.log(e)
		setLatestKeyPress(e)
	}

	useEffect(() => {
		console.log(
			'Latestkeypress changed to',
			latestKeyPress ? latestKeyPress.key : null
		)
		return () => setLatestKeyPress(null)
	}, [latestKeyPress])

	// ------------------
	// Component Render
	// ------------------
	const [forceRender, setForceRender] = useState(false)
	const rerender = () => {
		setForceRender(!forceRender)
	}

	// ------------------
	// Cube options
	// ------------------
	const cube = useMemo(() => new CubeWithPos(), [])

	useEffect(() => {
		importLocalStorage()
		applyCubeCSS()
		rerender()
	}, [])

	const applyCubeCSS = () => {
		const colors = cube.colors
		const style = cube.cubeStyle
		if (style) {
			const { color, stickerPadding, sideRadius, stickerCornerRadius } =
				cubeStyles[style]
			setCSS('--cube-color', color)
			setCSS('--sticker-padding', stickerPadding)
			setCSS('--sticker-radius', sideRadius)
			setCSS('--sticker-corner-radius', stickerCornerRadius)
		}
		if (colors) {
			SIDES.forEach((side) => {
				const val = colors[side]
				setCSS(`--color-${side}`, val)
			})
		}
	}

	useEffect(() => {
		// console.log('Cube changed!')
	}, [cube, cube.state])

	// ------------------
	// Modes
	// ------------------
	const appModes = ['VIEW', 'PLAY', 'EDIT']
	const [appMode, setAppMode] = useState('PLAY')
	const appModeRef = useRef(appMode)
	// let CURRENT_MODE = MODES[appMode;
	useEffect(() => {
		// console.log('changing mode.')
		appModeRef.current = appMode
		setEditingStickerId(null)
		SCENE.clearSpotlight()
		// console.log(MODES[appMode])
		setLatestKeyPress(null)
		setHighlightedSide(null)
		if (appMode === 'EDIT') {
			cube.reset()
			rerender()
		}
		// console.log('me and junco', latestKeyPress)
	}, [appMode])

	const isViewing = () => appMode === 'VIEW'
	const isPlaying = () => appMode === 'PLAY'
	const isEditing = () => appMode === 'EDIT'

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const isViewingRef = () => appModeRef.current === 'VIEW'
	const isPlayingRef = () => appModeRef.current === 'PLAY'
	const isEditingRef = () => appModeRef.current === 'EDIT'

	const MODES: LooseObject = {}

	MODES.VIEW = {}
	MODES.VIEW = MODES.VIEW as LooseObject

	MODES.PLAY = {}
	MODES.PLAY = MODES.PLAY as LooseObject

	MODES.EDIT = {}
	MODES.EDIT = MODES.EDIT as LooseObject

	const STYLE: LooseObject = {}

	STYLE.pulseAnimation = (
		domElement: Element,
		cssClass: string = 'error',
		timeout = 300
	) => {
		domElement.classList.add(cssClass)
		setTimeout(() => {
			domElement.classList.remove(cssClass)
		}, timeout)
	}

	// ------------------
	// Editing (renaming stickers)
	// ------------------

	const [editingStickerId, setEditingStickerId] = useState<string | null>(null)
	const editingStickerRef = useRef(editingStickerId)

	useEffect(() => {
		editingStickerRef.current = editingStickerId
		if (isEditingRef() && !editingStickerId) SCENE.clearSpotlight()
		rerender()
	}, [editingStickerId])

	// ------------------
	// EVENT LISTENERS
	// ------------------

	// const CURRENT_MODE = () => MODES[appModeRef.current];

	const handleChildEvent = (event: string, ...args: unknown[]) => {
		if (event === 'handleStickerClick') handleStickerClick(args[0] as StickerId)
		if (event === 'handleSideHighlight') handleSideHighlight(args[0] as Side)
	}

	const handleSideHighlight = (side: Side) => {
		setHighlightedSide(side)
	}

	// stickerClick
	const handleStickerClick = (stickerId: StickerId) => {
		MODES[appModeRef.current].handleStickerClick(stickerId)
	}

	const setNewOrientation = (stickerId: StickerId) => {
		const sticker = cube.getStickerById(stickerId)

		if (sticker && sticker.type === 'edge') {
			cube.setOrientationToSticker(stickerId)
			resetRotation()
			applyCubeColorsCSS()
			rerender()
		}
	}

	const [editMode, setEditMode] = useState('colors')

	useEffect(() => {
		if (editMode === 'orientation') resetRotation()
		setHighlightedSide(null)
		setEditingStickerId(null)
	}, [editMode])

	MODES.PLAY.handleStickerClick = (stickerId: StickerId) => {}
	MODES.VIEW.handleStickerClick = (stickerId: StickerId) => {
		SCENE.spotlight(stickerId)
	}
	MODES.EDIT.handleStickerClick = (stickerId: StickerId) => {
		MODES.EDIT[editMode.toUpperCase()].handleStickerClick(stickerId)
	}

	MODES.EDIT.STICKERS = {}
	MODES.EDIT.ORIENTATION = {}
	MODES.EDIT.COLORS = {}

	MODES.EDIT.STICKERS.handleStickerClick = (stickerId: StickerId) => {
		setEditingStickerId(stickerId)
		SCENE.spotlight(stickerId)
	}
	MODES.EDIT.ORIENTATION.handleStickerClick = (stickerId: StickerId) => {
		setNewOrientation(stickerId)
	}
	MODES.EDIT.COLORS.handleStickerClick = (stickerId: StickerId) => {
		const { side } = cube.getStickerById(stickerId) as StickerData
		setHighlightedSide(side)
	}

	// clickOutside
	const handleClickOutside = () => {
		MODES[appModeRef.current].handleClickOutside()
	}

	MODES.VIEW.handleClickOutside = () => {
		SCENE.clearSpotlight()
	}
	MODES.PLAY.handleClickOutside = () => {}
	MODES.EDIT.handleClickOutside = () => {
		SCENE.clearSpotlight()
		setEditingStickerId(null)
	}

	// ------------------
	// Rotation
	// ------------------
	const [rotation, setRotation] = useState({ x: -15, y: -30, z: 0 })

	const resetRotation = () => setRotation({ x: -15, y: -30, z: 0 })

	const rotateToSticker = (sticker: StickerData) => {
		const { side, index } = sticker.currentPosition
		const [x, y, z] = rotationsToPos[side][index]
		setRotation({ x, y, z })
	}

	// ------------------
	// Highlighting
	// ------------------
	const showCubeButton = ' '
	const [isSpaceHeld] = useKeyhold(showCubeButton, [])

	const [highlightedStickerId, setHighlightedStickerId] = useState<
		string | null
	>(null)
	const [highlightedNeighborIds, setHighlightedNeighborIds] = useState<
		string[] | null
	>(null)

	const SCENE = {
		spotlight: (stickerId: string) => {
			if (!stickerId) return SCENE.clearSpotlight()
			const sticker = cube.getStickerById(stickerId)
			setHighlightedStickerId(stickerId)
			if (sticker) rotateToSticker(sticker)
		},
		clearSpotlight: () => {
			setHighlightedStickerId(null)
		},
	}

	useEffect(() => {
		if (highlightedStickerId) {
			const sticker = cube.getStickerById(highlightedStickerId)
			if (sticker) setHighlightedNeighborIds(sticker.neighbors.map((n) => n.id))
		} else {
			setHighlightedNeighborIds(null)
		}
	}, [highlightedStickerId])

	const [highlightedSide, setHighlightedSide] = useState<Side | null>(null)
	useEffect(() => {
		if (highlightedSide) {
			const sticker = cube.getStickerByPosition(highlightedSide, 2)
			if (sticker) rotateToSticker(sticker)
		}
	}, [highlightedSide])

	// ------------------
	// Piece types
	// ------------------
	const [pieceType, setPieceType] = useState('edge')
	const pieceTypeRef = useRef(pieceType)
	useEffect(() => {
		pieceTypeRef.current = pieceType
	}, [pieceType])
	// let availableLetters = cube.getAvailableLetters(pieceType)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function changePieceType(type: PieceType) {
		setPieceType(type)
	}

	// ------------------
	// User interface Interactions
	// ------------------

	const handleTurn = (side: Side) => {
		cube.turn(side)
		rerender()
	}

	const buttonMethods = {
		scramble: (e: MouseEvent) => {
			cube.scramble()
			rerender()
			MODES[appModeRef.current].reset()
			if (e.target && e.target instanceof HTMLElement) {
				e.target.blur()
			}
		},
		reset: (e: Event) => {
			cube.reset()
			rerender()
			MODES[appModeRef.current].reset()
			if (e.target && e.target instanceof HTMLElement) {
				e.target.blur()
			}
		},
		spotlight: (e: Event) => {
			if (highlightedStickerId) {
				SCENE.spotlight(highlightedStickerId)
			}
			if (e.target && e.target instanceof HTMLElement) {
				e.target.blur()
			}
		},
		play: (e: Event) => {
			// console.log('called play button')
			if (isPlayingRef()) {
				setAppMode('VIEW')
			} else {
				setAppMode('PLAY')
			}
			if (e.target && e.target instanceof HTMLElement) {
				e.target.blur()
			}
		},
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [forceShowingIndexes] = useState(false)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [forceShowingLetters] = useState(false)

	const cubeContextVal = {
		cube,
		appMode,
		highlightedStickerId,
		highlightedNeighborIds,
		editingStickerId,
		setEditingSticker: setEditingStickerId,
		handleStickerClick,
		handleChildEvent,
		editMode,
		setEditMode,
		rerender,
		highlightedSide,
		setHighlightedSide,
		spotlight: SCENE.spotlight,
	}

	const userInputContextValue = {
		latestKeyPress,
		setLatestKeyPress,
		isSpaceHeld,
	}

	const cubePropsOptions = {
		forceShowingIndexes,
		forceShowingLetters,
	}

	const showDevStateLogger = false
	const devStateLoggerProps = {
		pieceType,
		isPlaying: isPlaying(),
		isSpaceHeld,
	}

	const onCommitChanges = ({
		colors,
		cubeStyle,
	}: {
		colors: SideMap<string>
		cubeStyle: CubeStyleName
	}) => {
		cube.colors = colors
		cube.cubeStyle = cubeStyle
		localStorage.setItem('my-cube-colors', JSON.stringify(colors))
		localStorage.setItem('my-cube-style', JSON.stringify(cubeStyle))
		// console.log(cube.colors, cube.cubeStyle)
		rerender()
	}

	const getLocalStorage = () => {
		return {
			colors: JSON.parse(localStorage.getItem('my-cube-colors') as string),
			style: JSON.parse(localStorage.getItem('my-cube-style') as string),
		}
	}

	const importLocalStorage = () => {
		const { colors, style } = getLocalStorage()
		if (colors) cube.colors = { ...colors }
		if (style) cube.cubeStyle = style
	}

	const clearLocalStorage = () => {
		localStorage.removeItem('my-cube-colors')
		localStorage.removeItem('my-cube-style')
	}

	const handleClearLocalStorage = () => {
		clearLocalStorage()
		applyCubeCSS()
	}

	const applyCubeColorsCSS = () => {
		SIDES.forEach((side) => {
			const val = cube.colors[side]
			setSideColorCSS(side, val)
		})
	}

	const cubeBackgroundClass = 'cube-wrapper'

	const setSideColorCSS = (side: Side, val: string) =>
		setCSS(`--color-${side}`, val)

	const rotationControllerProps = {
		rotation,
		setRotation,
		handleClickOutside,
	}

	const showStickerCards = false

	const modeClassList = `mode-${appMode} ${
		isEditing() ? `edit-mode-${editMode}` : ''
	} cube-v1`.toLowerCase()

	return (
		<main className={modeClassList}>
			<UserInputContext.Provider value={userInputContextValue}>
				<CubeContext.Provider value={cubeContextVal}>
					{highlightedStickerId && showStickerCards && (
						<StickerCard
							cube={cube}
							sticker={cube.getStickerById(highlightedStickerId) as StickerData}
						/>
					)}
					<div className="splitter">
						<div className="split-left">
							<div className={cubeBackgroundClass}>
								<RotationController {...rotationControllerProps}>
									<Cube options={cubePropsOptions} />
								</RotationController>
							</div>
						</div>
						<div className="split-right">
							<div className="dev-stuff">
								<div>
									<SwitchBar
										items={appModes}
										activeItem={appMode}
										onSwitch={setAppMode}
									/>
								</div>
								{isViewing() && <ViewPanel spotlight={SCENE.spotlight} />}
								{isPlaying() && (
									<PlayPanel
										spotlight={SCENE.spotlight}
										pulseAnimation={STYLE.pulseAnimation}
									/>
								)}
								{isEditing() && (
									<CustomizeCube
										cube={cube}
										onCommitChanges={onCommitChanges}
									/>
								)}
								{showDevStateLogger && (
									<DevStateLogger stateObject={devStateLoggerProps} />
								)}
								{/* <div>
									<Switch
										active={forceShowingIndexes}
										onSwitch={() =>
											setForceShowingIndexes(!forceShowingIndexes)
										}
									>
										Show indexes
									</Switch>
									<Switch
										active={forceShowingLetters}
										onSwitch={() =>
											setForceShowingLetters(!forceShowingLetters)
										}
									>
										Show letters
									</Switch>
								</div> */}
							</div>
							{/* <button
								className="btn"
								onClick={buttonMethods.scramble}
								disabled={isPlayingRef()}
							>
								Scramble
							</button>
							<button
								className="btn"
								onClick={buttonMethods.reset}
								disabled={isPlayingRef()}
							>
								Reset
							</button>
							<button className="btn" onClick={buttonMethods.spotlight}>
								Focus on current
							</button>
							<button
								className={`btn play-btn ${
									isPlayingRef() ? 'playing' : 'idle'
								}`}
								onClick={buttonMethods.play}
							>
								{isPlayingRef() ? 'Stop' : 'Play'}
							</button> */}
							{/* <div>
								Turn:
								{SIDES.map((side, index) => {
									return (
										<button
											className="btn"
											key={index}
											onClick={() => handleTurn(side)}
										>
											{side}
										</button>
									)
								})}
							</div>
							<button className="btn" onClick={buttonMethods.reset}>
								Reset
							</button> */}
							{/* <div>Playing:</div> */}
							{/* <div>
								Piece type:
								<SwitchBar
									items={allPieceTypes}
									activeItem={pieceType}
									onSwitch={(type) => changePieceType(type)}
								></SwitchBar>
							</div> */}
							<div>
								<button
									className="btn destructive"
									onClick={handleClearLocalStorage}
								>
									Clear local storage
								</button>
							</div>
						</div>
					</div>
				</CubeContext.Provider>
			</UserInputContext.Provider>
		</main>
	)
}

const Cube = ({ options }: { options: LooseObject }) => {
	const { cube, appMode, editMode, highlightedSide } = useContext(CubeContext)
	// console.log('Rendered cube.', cube.colors.right)
	const { forceShowingIndexes, forceShowingLetters } = options

	const { isSpaceHeld } = useContext(UserInputContext)
	const showLetters = appMode !== 'PLAY'

	const hoverSide = appMode === 'EDIT' && editMode === 'colors'

	return (
		<div
			className={`cube cube-style-${cube.cubeStyle} ${showLetters && 'show'} ${
				isSpaceHeld && 'force-show'
			} ${forceShowingIndexes && 'always-show-sticker-index'} ${
				forceShowingLetters && 'always-show-sticker-letter'
			} cube-style-${cube.cubeStyle}`}
		>
			{SIDES.map((side, index) => (
				<div
					className={`side rotate-${side} ${
						highlightedSide === side ? 'highlight-side' : ''
					} ${hoverSide ? 'hover-side' : ''}`}
					key={index}
				>
					{cube.state[side].map((sticker: StickerData, index: number) => {
						return (
							<Sticker key={index} sticker={sticker} index={index}></Sticker>
						)
					})}
				</div>
			))}
		</div>
	)
}

const StickerCard = ({
	cube,
	sticker,
}: {
	cube: CubeWithPos
	sticker: StickerData
}) => {
	const { name } = sticker
	return (
		<div className="sticker-card">
			<CubeBlock cube={cube} sticker={sticker} />
			<h3 className="sticker-card-header">{name}</h3>
		</div>
	)
}

const CubeBlock = ({
	cube,
	sticker,
}: {
	cube: CubeWithPos
	sticker: StickerData
}) => {
	// console.log('Rendered cube.', cube.colors.right)

	const { type, side, neighbors } = sticker

	return (
		<div className="cube-block-container">
			<div
				className={`cube-block flex-center cube-style-${cube.cubeStyle} rotate-${type}`}
			>
				<div className="cube-block-side cube-block-side-top rotate-top">
					<div className={`cube-block-sticker side-top color-${side}`}></div>
				</div>
				{type === 'edge' && (
					<div className="cube-block-side cube-block-side-front rotate-front">
						<div
							className={`cube-block-sticker side-front color-${neighbors[0].side}`}
						></div>
					</div>
				)}
				{type === 'corner' && (
					<>
						<div className="cube-block-side cube-block-side-right rotate-right">
							<div
								className={`cube-block-sticker side-right color-${neighbors[0].side}`}
							></div>
						</div>
						<div className="cube-block-side  cube-block-side-front rotate-front">
							<div
								className={`cube-block-sticker side-front color-${neighbors[1].side}`}
							></div>
						</div>
					</>
				)}
				{/* <div className="cube-block-background"></div> */}
				{/* <Sticker sticker={sticker} index={sticker.index} /> */}
				{/* {SIDES.map((side, index) => (
				<div
					className={`cube-block-side color-${side} side ${side}`}
					key={index}
				>
					{cube.state[side].map((sticker, index) => {
						return (
							<Sticker key={index} sticker={sticker} index={index}></Sticker>
						);
					})}
				</div>
			))} */}
			</div>
		</div>
	)
}

interface StickerProps {
	sticker: StickerData
	index: number
}

const Sticker: React.FC<StickerProps> = ({ sticker, index }) => {
	// console.log('Renderd sticker')
	const { side, name, type, id } = sticker

	const {
		appMode,
		highlightedNeighborIds,
		highlightedStickerId,
		editingStickerId,
		handleChildEvent,
		editMode,
	} = useContext(CubeContext)

	const isHighlight = highlightedStickerId === sticker.id
	const isNeighbor =
		highlightedNeighborIds && highlightedNeighborIds.includes(sticker.id)
	const isEditing = editingStickerId && editingStickerId === sticker.id

	const dimSticker =
		highlightedStickerId && !(isHighlight && isNeighbor && isEditing)

	const showPalette =
		appMode === 'EDIT' && editMode === 'colors' && sticker.type === 'center'

	const showArrow = appMode === 'EDIT' && editMode === 'orientation'
	const highlightArrow = showArrow && side === 'front' && index === 1

	const showLetters =
		appMode !== 'EDIT' || (editMode !== 'orientation' && editMode !== 'colors')

	const arrowToShow = () => {
		if (index === 1) return '⬆'
		if (index === 3) return '⬅'
		if (index === 5) return '➡'
		if (index === 7) return '⬇'
		return ''
	}

	return (
		<div
			onClick={() => {
				handleChildEvent('handleStickerClick', id)
			}}
			className={`sticker side-${name} color-${side} ${name} letter-${name.toLowerCase()} type-${type} index-${index} id-${id} ${
				isHighlight || highlightArrow ? 'highlight' : ''
			} ${isNeighbor ? 'adjacent' : ''} ${isEditing ? 'editing' : ''} ${
				showPalette ? 'color-picker' : ''
			}, ${dimSticker ? 'dim' : ''}`}
		>
			{showArrow && <span className="sticker-arrow">{arrowToShow()}</span>}
			{showPalette && <FaPalette />}
			{showLetters && (
				<span className="sticker-letter">
					{type === 'corner' ? name.toUpperCase() : name}
				</span>
			)}
			<span className="sticker-index">{index}</span>
		</div>
	)
}

export default MainComponent
