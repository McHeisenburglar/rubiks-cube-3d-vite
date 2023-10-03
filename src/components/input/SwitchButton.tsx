import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface SwitchButtonProps {
    active: boolean;
    handleClick?: () => void;
    showCheckmark?: boolean;
    children: ChildElement;
}
export const SwitchButton: React.FC<SwitchButtonProps> = ({
    active,
    handleClick = () => {},
    children,
    showCheckmark,
}) => {
    const activeClass: CSSClass =
        "px-4 py-2 text-sm font-medium rounded-lg border-blue-700 shadow-lg shadow-blue-700/20 border bg-blue-700 text-white font-semi-bold  active:scale-90 transition duration-500 ease-[cubic-bezier(.17,.67,.28,1.21)] mr-2";
    const defaultClass: CSSClass =
        "px-4 py-2 text-sm rounded-lg border-slate-200 bg-white border text-slate-700 mr-2 font-semi-bold active:scale-90 hover:shadow-sm transition hover:scale-110 duration-300 ease-out";

    return (
        <button
            className={active ? activeClass : defaultClass}
            type="button"
            onClick={(e) => {
                handleClick();
                e.currentTarget.blur();
            }}
        >
            {children}
            {showCheckmark && (
                <FontAwesomeIcon
                    icon={faCheck}
                    className={
                        active
                            ? "ml-2 w-auto scale-100 text-white  opacity-100 duration-200 ease-out"
                            : "w-0 text-white opacity-0 duration-200 ease-out"
                    }
                />
            )}
        </button>
    );
};
