import React from "react";

interface SmallSwitchButtonProps {
    active: boolean;
    handleClick?: () => void;
    children: ChildElement;
}
export const SmallSwitchButton: React.FC<SmallSwitchButtonProps> = ({
    active,
    children,
    handleClick = () => {},
}) => {
    return (
        <button
            className={`slate-500 rounded-md border border-transparent px-2 py-0.5 text-sm duration-300 ease-out
        ${
            active
                ? "border-slate-500 text-slate-700"
                : "text-slate-400 hover:border-slate-200 hover:text-slate-500"
        }
        squeeze-click
        `}
            type="button"
            onClick={(e) => {
                handleClick();
                e.currentTarget.blur();
            }}
        >
            {children}
        </button>
    );
};
