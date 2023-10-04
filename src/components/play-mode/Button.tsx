import React from "react";
import { IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonType = React.FC<ButtonProps>;
type ButtonTemplates = {
    Success: ButtonType;
    Danger: ButtonType;
    Confirm: ButtonType;
};
type ButtonBase = ButtonType & ButtonTemplates;

export interface ButtonProps {
    children?: ChildElement;
    disabled?: boolean;
    icon?: IconDefinition;
    iconPlacement?: "left" | "right";
    color?: "slate" | "blue" | "green" | "red";
    style?: "filled" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: CSSClass;
    onClick?: () => void;
}

const Button: ButtonBase = ({
    children = "",
    icon,
    disabled = false,
    iconPlacement = "left",
    color = "slate",
    style = "outline",
    size = "sm",
    className = "",
    onClick = () => {},
}) => {
    const handleClick = (e: React.MouseEvent) => {
        (e.currentTarget as HTMLButtonElement).blur();
        onClick();
    };

    const sizeClasses: Record<typeof size, string> = {
        sm: "text-sm px-3 py-2 rounded-lg",
        md: "text-base px-4 py-2 rounded-lg",
        lg: "text-lg px-4 py-2 rounded-lg",
    };

    const styleClasses: Record<typeof style, string> = {
        filled: "shadow-md text-white font-medium",
        outline: "border",
        ghost: "bordere",
    };

    const colorClasses: Record<typeof style, Record<typeof color, string>> = {
        filled: {
            slate: "border-slate-600  shadow-green-700/15 border bg-slate-700",
            blue: "border-blue-600  shadow-blue-700/20 border bg-blue-600",
            red: "border-red-600  shadow-red-700/20 border bg-red-600",
            green: "border-green-600  shadow-green-700/20 border bg-green-600",
        },
        outline: {
            slate: "border-slate-300 text-slate-700",
            blue: "border-blue-500 text-blue-700",
            red: "border-red-400 text-red-700",
            green: "border-green-600  text-green-700",
        },
        ghost: {
            slate: "text-slate-500 hover:text-slate-600",
            blue: "text-blue-500 hover:text-blue-700",
            red: "text-red-600 hover:text-red-700",
            green: "text-green-600 hover:text-green-700",
        },
    };

    const transition = "squeeze-click-cubic disabled:opacity-50";

    return (
        <button
            className={`${sizeClasses[size]} ${styleClasses[style]} ${colorClasses[style][color]} ${transition} ${className}`}
            onClick={handleClick}
            disabled={disabled}
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

Button.Success = (props) => {
    const myProps: ButtonProps = {
        ...props,
        style: "filled",
        color: "green",
        size: "md",
    };

    return <Button {...myProps} />;
};

Button.Danger = (props) => {
    const myProps: ButtonProps = {
        ...props,
        style: "filled",
        color: "red",
    };

    return <Button {...myProps} />;
};

Button.Confirm = (props) => {
    const myProps: ButtonProps = {
        ...props,
        style: "filled",
        color: "blue",
        icon: faCheck,
        iconPlacement: "right",
    };

    return <Button {...myProps} />;
};

export { Button };
