import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewButtonProps {
    children: ChildElement;
    icon?: IconDefinition;
    onClick: () => void;
}
export const NewButton: React.FC<NewButtonProps> = ({
    children,
    icon,
    onClick,
}) => {
    const handleClick = (e: React.MouseEvent) => {
        (e.currentTarget as HTMLButtonElement).blur();
        onClick();
    };
    return (
        <button
            className="squeeze-click relative mb-4 mr-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
            onClick={handleClick}
        >
            {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
            {children}
        </button>
    );
};
