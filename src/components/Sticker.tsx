// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'

function Sticker({ sticker, index, isHighlighted, isNeighbor }) {
	const { side, name, type } = sticker
	return (
		<div
			className={`sticker side-${name} color-${side} ${name} type-${type} index-${index} ${
				isHighlighted ? 'highlight' : ''
			} ${isNeighbor ? 'adjacent' : ''}`}
		>
			<span className="sticker-index">{index}</span>
			<span className="sticker-letter">{name}</span>
		</div>
	)
}

export default Sticker
