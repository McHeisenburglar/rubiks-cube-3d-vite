import React, { useContext, useEffect } from 'react';
import { CubeContext, UserInputContext } from './RubiksCube';

function ViewPanel({ spotlight }) {
	const { cube } = useContext(CubeContext);
	const { latestKeyPress } = useContext(UserInputContext);

	useEffect(() => {
		if (latestKeyPress) {
			handleKeyPress(latestKeyPress);
		}
	}, [latestKeyPress]);

	const handleKeyPress = (e) => {
		e.preventDefault();
		const letter = e.key.toLowerCase();
		const pieceType = e.shiftKey ? 'corner' : 'edge';
		const sticker = cube.getStickerByLetter(letter, pieceType);
		if (sticker) spotlight(sticker.id);
		// setLatestKeyPress(null);
	};

	return (
		<div className="view-panel">
			<h2>View panel</h2>
			<p>Hit any key to focus on the sticker.</p>
		</div>
	);
}

export default ViewPanel;
