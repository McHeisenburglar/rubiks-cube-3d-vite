import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewButtonProps {
    children: ChildElement;
    icon?: IconDefinition;
    iconPlacement?: "left" | "right";
    color?: "slate" | "blue" | "green" | "red";
    style?: "filled" | "outline";
    onClick: () => void;
}

export const NewButton: React.FC<NewButtonProps> = ({
    children,
    icon,
    iconPlacement = "left",
    color = "grey",
    style = "outline",
    onClick,
}) => {
    const handleClick = (e: React.MouseEvent) => {
        (e.currentTarget as HTMLButtonElement).blur();
        onClick();
    };

    const styleClasses: Record<typeof style, string> = {
        filled: "shadow-md text-white font-medium",
        outline: "border",
    };

    const colorClasses: Record<typeof style, Record<typeof color, string>> = {
        filled: {
            slate: "border-slate-600  shadow-green-700/15 border bg-slate-700",
            blue: "border-blue-600  shadow-blue-700/20 border bg-blue-600",
            red: "border-red-600  shadow-red-700/20 border bg-red-600",
            green: "border-green-600  shadow-green-700/20 border bg-green-600",
        },
        outline: {
            slate: "border border-slate-300  text-slate-700",
            blue: "border border-blue-500  text-blue-700",
            red: "border border-red-600  text-red-700",
            green: "border border-green-600  text-green-700",
        },
    };

    const typography = "text-sm";
    const spacing = "relative rounded-lg mb-4 mr-2 px-3 py-2 rounded-lg";
    const transition = "squeeze-click";

    return (
        <button
            className={`${spacing}  ${typography} ${transition} ${styleClasses[style]} ${colorClasses[style][color]}`}
            onClick={handleClick}
        >
            {icon && iconPlacement === "left" && (
                <FontAwesomeIcon icon={icon} className="mr-2" />
            )}
            {children}
            {icon && iconPlacement === "right" && (
                <FontAwesomeIcon icon={icon} className="ml-2" />
            )}
        </button>
    );
};
