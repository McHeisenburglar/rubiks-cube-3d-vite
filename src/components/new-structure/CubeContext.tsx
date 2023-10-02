import { useMemo } from "react";
import { CubeWithPos } from "../../ts/CubeClass3";
import { CubeContext } from "./useCubeContext";

interface IProps {
    children: React.ReactNode;
}

export const CubeContextProvider: React.FC<IProps> = ({ children }) => {
    const cube = useMemo(() => new CubeWithPos(), []);
    return <CubeContext.Provider value={cube}>{children}</CubeContext.Provider>;
};
