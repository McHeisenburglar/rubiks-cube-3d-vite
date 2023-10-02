import { useContext, createContext, useMemo } from "react";
import { CubeWithPos } from "../../ts/CubeClass3";

export const CubeContext = createContext<null | CubeWithPos>(null);

export const useCubeContext = () => {
    const context = useContext(CubeContext);
    if (context === null) {
        throw new Error(
            "useCubeContext must be used within a CubeContextProvider"
        );
    }
    return context;
};

export const useCube = (scramble: string | null) => {
    const cube: CubeWithPos = useMemo(() => {
        const newCube = new CubeWithPos();
        if (scramble) newCube.performAlgorithm(scramble);
        return newCube;
    }, [scramble]);

    return cube;
};
