import { useState } from "react";
import { RotationContext } from "./useRotationEffect";

interface IProps {
    children: ChildElement;
}

export const RotationContextWrapper: React.FC<IProps> = ({ children }) => {
    const defaultRotation = {
        x: -15,
        y: -30,
        z: 0,
    };
    const [rotation, setRotation] = useState<RotationSet>(defaultRotation);

    return (
        <RotationContext.Provider
            value={{ value: rotation, update: setRotation }}
        >
            {children}
        </RotationContext.Provider>
    );
};

export default RotationContextWrapper;
