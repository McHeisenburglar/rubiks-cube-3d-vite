import React from "react";
import { SwitchButton } from "./SwitchButton";

export interface RadioOption<T = unknown> {
    value: T;
    label: string;
}
interface SwitchListProps {
    options: RadioOption[];
    selectedValue: string | number | null;
    handleClick: (option: RadioOption) => void;
}

export const SwitchList: React.FC<SwitchListProps> = ({
    options,
    selectedValue,
    handleClick,
}) => {
    return (
        <>
            {options.map((option, index) => {
                return (
                    <SwitchButton
                        key={index}
                        active={option.value === selectedValue}
                        handleClick={() => handleClick(option)}
                        showCheckmark
                    >
                        {option.label}
                    </SwitchButton>
                );
            })}
        </>
    );
};
