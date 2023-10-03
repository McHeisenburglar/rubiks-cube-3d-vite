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
                ? "bg-slate-200 text-slate-700"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-500"
        }
        squeeze-click
        [transition:transform_.3s_cubic-bezier(.17,.67,.28,1.21),background-color_.3s_ease-out,color_.3s_ease-out] 
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
