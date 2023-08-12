import { useState, useEffect, useRef } from 'react';

export function useKeyhold(key, dependencies) {
	const [isHeld, setIsHeld] = useState(false);
	const isHeldRef = useRef(isHeld);

	useEffect(() => {
		const handleDown = (e) => {
			if (!isHeldRef.current && e.key.toLowerCase() === key) {
				setIsHeld(true);
				isHeldRef.current = true; // prevents key repeat
			}
		};
		const handleUp = (e) => {
			if (isHeldRef.current && e.key.toLowerCase() === key) {
				setIsHeld(false);
				isHeldRef.current = false; // prevents key repeat
			}
		};

		document.addEventListener('keydown', handleDown);
		document.addEventListener('keyup', handleUp);
		return () => {
			document.removeEventListener('keydown', handleDown);
			document.removeEventListener('keyup', handleUp);
		};
	}, [...dependencies]);

	return [isHeld];
}
