import React from "react";
import { SmallRadioButton } from "./SmallRadioButton";

export interface RadioOption<T = string | number | string[] | number[]> {
    value: T;
    label: ChildElement;
}
interface SwitchListProps {
    options: RadioOption[];
    selectedValue: string | number | string[] | number[] | null;
    handleClick: (option: RadioOption) => void;
}

export const SmallRadioList: React.FC<SwitchListProps> = ({
    options,
    selectedValue,
    handleClick,
}) => {
    return (
        <>
            {options.map((option, index) => (
                <SmallRadioButton
                    key={index}
                    active={
                        option.value.toString() === selectedValue?.toString()
                    }
                    handleClick={() => handleClick(option)}
                >
                    {option.label}
                </SmallRadioButton>
            ))}
        </>
    );
};
