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
                        active={option.value === selectedValue}
                        handleClick={() => handleClick(option)}
                    >
                        {option.label}
                    </SmallRadioButton>
                );
            })}
        </>
    );
};
