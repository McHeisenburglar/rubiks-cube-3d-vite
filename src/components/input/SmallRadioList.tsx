import React from "react";
import { SmallRadioButton } from "./SmallRadioButton";

export interface RadioOption<T = unknown> {
    value: T;
    label: ChildElement;
}
interface SwitchListProps {
    options: RadioOption[];
    selectedValue: unknown;
    handleClick: (option: RadioOption) => void;
}

const isMatch = (a: unknown, b: unknown): boolean => {
    return Array.isArray(a) && Array.isArray(b)
        ? a.sort().toString() === b.sort().toString()
        : a === b;
};

export const SmallRadioList: React.FC<SwitchListProps> = ({
    options,
    selectedValue,
    handleClick,
}) => {
    return (
        <>
            {options.map((option, index) => {
                return (
                    <SmallRadioButton
                        key={index}
                        active={isMatch(option.value, selectedValue)}
                        handleClick={() => handleClick(option)}
                    >
                        {option.label}
                    </SmallRadioButton>
                );
            })}
        </>
    );
};
