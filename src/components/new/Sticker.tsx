import { FaPalette } from 'react-icons/fa'
import { useSceneEffect } from './useSceneEffect'
import useSpaceHold from './useSpaceHold'
// import { useKeyhold } from '../../hooks/useKeyhold'

/* STICKER */
interface StickerProps {
	sticker: ISticker
	position: string
	index: number
	debug?: boolean
	onClick?: (sticker: ISticker) => void
}

const Sticker: React.FC<StickerProps> = ({
	sticker,
	index,
	position,
	onClick,
	debug,
}) => {
	if (debug) console.log('::::: Rendered Sticker.')

	const { side, name, type, id } = sticker
	// const mode = useSpaceHold() ? 'letter' : 'none'
	const mode = 'letter'

	const classList = ['sticker', 'dim']
	const dataAttributes = {
		'data-sticker-color': side,
		'data-sticker-name': name,
		'data-sticker-id': id,
		'data-piece-type': type,
		'data-sticker-position': position,
	}

	const highlight = useSceneEffect('highlight')
	if (highlight && id === highlight.value) classList.push('highlight')

	const handleClick = () => onClick && onClick(sticker)

	return (
		<div
			className={classList.join(' ')}
			onClick={handleClick}
			{...dataAttributes}
		>
			<StickerContent mode={mode} sticker={sticker} index={index} />
		</div>
	)
}

/* STICKER CONTENT */
interface StickerContentProps {
	mode: 'letter' | 'arrow' | 'edit-colors' | 'none'
	sticker: ISticker
	index: number
}

const StickerContent: React.FC<StickerContentProps> = ({
	mode,
	sticker,
	index,
}) => {
	const { name, type } = sticker

	if (mode === 'none') {
		return <></>
	}

	if (mode === 'letter') {
		return (
			<span className="sticker-letter">
				{type === 'corner' ? name.toUpperCase() : name}
			</span>
		)
	}

	if (mode === 'arrow') {
		if (type === 'edge') {
			let direction = ''

			if (index === 1) direction = 'up'
			if (index === 3) direction = 'left'
			if (index === 5) direction = 'right'
			if (index === 7) direction = 'down'

			return (
				<span className={`sticker-arrow sticker-arrow-${direction}`}>⬆</span>
			)
		}
	}

	if (mode === 'edit-colors') {
		if (type === 'center') return <FaPalette />
	}

	return <></>
}

export default Sticker
