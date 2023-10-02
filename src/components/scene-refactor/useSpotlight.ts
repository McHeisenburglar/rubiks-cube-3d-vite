import { useHighlightContext } from "./useHighlight";
import { useRotationContext } from "./useRotationEffect";

export const useSpotlightContext = () => {
    const { rotate, rotateToSticker } = useRotationContext();
    const { highlightSticker, clearHighlight } = useHighlightContext();

    const setSpotlight = (sticker: ISticker) => {
        highlightSticker(sticker);
        rotateToSticker(sticker);
    };

    const clearSpotlight = () => {
        clearHighlight();
        rotate({
            x: -15,
            y: -30,
            z: 0,
        });
    };

    return {
        setSpotlight,
        clearSpotlight,
    };
};
