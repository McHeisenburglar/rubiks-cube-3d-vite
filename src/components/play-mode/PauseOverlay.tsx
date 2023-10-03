import React from "react";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PauseOverlayProps {
    active: boolean;
}
const PauseOverlay: React.FC<PauseOverlayProps> = ({ active }) => {
    const baseClasses =
        "l-0 t-0 absolute h-full w-full flex items-center justify-center transition-all duration-200 ease-out";

    const activeClasses = "z-10 bg-white/50 backdrop-blur-xl";
    const inactiveClasses = "-z-10 opacity-0";

    return (
        <div
            className={`${baseClasses} ${
                active ? activeClasses : inactiveClasses
            }`}
        >
            <FontAwesomeIcon icon={faPause} size="5x" color={"white"} />
        </div>
    );
};

export default PauseOverlay;
