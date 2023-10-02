import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewButtonProps {
    children: ChildElement;
    icon?: IconDefinition;
    color?: "slate" | "blue" | "green" | "red";
    style?: "filled" | "outline";
    onClick: () => void;
}

type CSSMap<A extends string, B extends string> = {
    [keyA in A]: {
        [keyB in B]: string;
    };
};

export const NewButton: React.FC<NewButtonProps> = ({
    children,
    icon,
    color = "grey",
    style = "outline",
    onClick,
}) => {
    // const style = "filled";
    // const color = "grey";

    const handleClick = (e: React.MouseEvent) => {
        (e.currentTarget as HTMLButtonElement).blur();
        onClick();
    };

    type MyType = Record<typeof style, string>;

    const defaultStyles: MyType = {
        filled: "shadow-md text-white font-semibold",
        outline: "border",
    };

    const colors: CSSMap<typeof style, typeof color> = {
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
            className={`${spacing}  ${typography} ${transition} ${defaultStyles[style]} ${colors[style][color]}`}
            onClick={handleClick}
        >
            {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
            {children}
        </button>
    );
};
