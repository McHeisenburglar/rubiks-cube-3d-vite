type SpotlightContextType = {}
const SpotlightContext = createContext<SpotlightContextType | null>(null)

type SpotlightClass = 'highlight' | 'adjacent' | 'dim' | null

const useSpotlight = () => {
	const spotlightClass = (Sticker: ISticker) => {}
}
