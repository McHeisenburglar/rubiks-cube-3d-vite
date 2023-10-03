// import { CubeWithPos } from '../../ts/CubeClass3'
import { useContext } from "react";
import CubePerspectiveWrapper from "../new/CubePerspectiveWrapper";
import CubeRotationController from "../new/CubeRotationWrapper";
import CubeStyleProvider from "../new/CubeStyleConfigWrapper";
import { GameContext } from "../play-mode/Main";
import Cube from "../scene-refactor/components/Cube";
import { useCubeContext } from "./useCubeContext";

interface CubeView {
    // cube: CubeWithPos
    debug?: boolean;
    onStickerClick?: (sticker: ISticker) => void;
}

export const CubeView: React.FC<CubeView> = ({ debug, onStickerClick }) => {
    if (debug) console.log("::::: Rendered CubeComponent.");

    const cube = useCubeContext();

    return (
        <div className="cube-v2 inline-block">
            <div className="cube-wrapper">
                <CubeRotationController>
                    <CubeStyleProvider config={cube.cubeConfig}>
                        <CubePerspectiveWrapper mode={"3d-fold"}>
                            <Cube
                                cube={cube}
                                onStickerClick={(s) => onStickerClick?.(s)}
                            />
                        </CubePerspectiveWrapper>
                    </CubeStyleProvider>
                </CubeRotationController>
            </div>
        </div>
    );
};

export default CubeView;
