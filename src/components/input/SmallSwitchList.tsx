import React from "react";
import { SmallSwitchButton } from "./SmallSwitchButton";

export interface RadioOption<T = unknown> {
    value: T;
    label: string;
}
interface SwitchListProps {
    options: RadioOption[];
    selectedValue: string | number | null;
    handleClick: (option: RadioOption) => void;
}

export const SmallSwitchList: React.FC<SwitchListProps> = ({
    options,
    selectedValue,
    handleClick,
}) => {
    return (
        <>
            {options.map((option, index) => {
                return (
                    <SmallSwitchButton
                        key={index}
                        active={option.value === selectedValue}
                        handleClick={() => handleClick(option)}
                    >
                        {option.label}
                    </SmallSwitchButton>
                );
            })}
        </>
    );
};
