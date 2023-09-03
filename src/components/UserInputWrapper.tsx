import React, { createContext, useState } from 'react'

type InteractionContextValue = {
	// keypress: KeyboardEvent | null
	stickerClick: StickerId | null
	setStickerClick: (id: StickerId | null) => void
}

export const InteractionContext =
	createContext<InteractionContextValue | null>()

interface IProps {
	children: ChildElement
}

const UserInputWrapper: React.FC<IProps> = ({ children }) => {
	const [stickerClick, setStickerClick] = useState<StickerId | null>(null)

	const value = {
		stickerClick,
		setStickerClick,
	}

	return (
		<InteractionContext.Provider value={value}>
			{children}
		</InteractionContext.Provider>
	)

	return <div></div>
}

export default UserInputWrapper
