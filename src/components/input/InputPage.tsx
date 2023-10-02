import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faShuffle } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { NewButton } from "../play-mode/NewButton";

interface IProps {}

const CheckmarkIcon = ({ className }: { className?: string }) => {
    return <FontAwesomeIcon className={className} icon={faCheck} />;
};

interface SwitchButtonProps {
    active: boolean;
    handleClick: () => void;
    showCheckmark?: boolean;
    children: ChildElement;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
    active,
    handleClick,
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
                <CheckmarkIcon
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

interface IProps {
    label: string;
    options: Array<string | number>;
}

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

export const SwitchRow: React.FC<IProps> = ({ label, options }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setSelectedOption(index);
    };
    return (
        <div className="m-auto flex max-w-xl items-center justify-center bg-white px-4 py-8">
            {/* <h3 className="wide text-xl">{label}</h3> */}
            <div className="options flex flex-wrap justify-center gap-2">
                {options.map((option, index) => {
                    return (
                        <SwitchButton
                            key={index}
                            active={selectedOption === index}
                            handleClick={() => handleClick(index)}
                            showCheckmark
                        >
                            {option}
                        </SwitchButton>
                    );
                })}
            </div>
        </div>
    );
};

interface ButtonProps {
    children: ChildElement;
    disabled: boolean;
    handleClick: () => void;
}

export const PlayButton: React.FC<ButtonProps> = ({
    children,
    handleClick,
    disabled,
}) => {
    const buttonClass =
        "px-4 py-2 text-sm font-semibold rounded-lg border-green-600 shadow-lg shadow-green-700/20 border bg-green-600 text-white font-semi-bold disabled:opacity-60  enabled:hover:scale-105 enabled: hover:translate enabled:hover:shadow-green-700/30 enabled:active:scale-90 transition duration-500 ease-[cubic-bezier(.17,.67,.28,1.21)] mr-2";

    return (
        <button
            type="button"
            className={buttonClass}
            disabled={disabled}
            onClick={() => {
                handleClick();
            }}
        >
            {children}
        </button>
    );
};

const Main = () => {
    interface GameOptions {
        pieceType: "corners" | "edges" | null;
        seconds: "60s" | "30s" | "infinite" | null;
    }

    const [gameOptions, setGameOptions] = useState<GameOptions>({
        pieceType: null,
        seconds: null,
    });

    const handleRadioClick = (key: "pieceType" | "seconds") => {
        return (option: RadioOption) => {
            setGameOptions((cur) => {
                return {
                    ...cur,
                    [key]: option.value,
                };
            });
        };
    };

    return (
        <>
            <div className="m-auto max-w-3xl bg-white p-4">
                <div className="flex items-center justify-between p-4">
                    <h3 className="wide text-xl">Piece types</h3>
                    <div className="flex items-center justify-center">
                        <SwitchList
                            options={[
                                {
                                    label: "Corners",
                                    value: "corners",
                                },
                                {
                                    label: "Edges",
                                    value: "edges",
                                },
                            ]}
                            selectedValue={gameOptions.pieceType}
                            handleClick={handleRadioClick("pieceType")}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between p-4">
                    <h3 className="wide text-xl">Seconds in game</h3>
                    <div className="flex items-center justify-center">
                        <SwitchList
                            options={[
                                {
                                    label: "30s",
                                    value: "30",
                                },
                                {
                                    label: "60s",
                                    value: "60",
                                },
                                {
                                    label: "120s",
                                    value: "120",
                                },
                                {
                                    label: "∞",
                                    value: "none",
                                },
                            ]}
                            selectedValue={gameOptions.seconds}
                            handleClick={handleRadioClick("seconds")}
                        />
                    </div>
                </div>
                <div className="flex justify-end p-4">
                    <PlayButton
                        disabled={
                            !gameOptions.pieceType || !gameOptions.seconds
                        }
                        handleClick={() => {}}
                    >
                        Start game
                    </PlayButton>
                </div>
                {["sm", "md", "lg"].map((size) => {
                    return (
                        <div className="mb-6">
                            {["filled", "outline"].map((style) => {
                                return (
                                    <div>
                                        {["red", "green", "blue", "slate"].map(
                                            (color) => {
                                                return (
                                                    <NewButton
                                                        onClick={() => {}}
                                                        color={color}
                                                        size={size}
                                                        icon={faShuffle}
                                                        style={style}
                                                    >
                                                        {color} {style}
                                                    </NewButton>
                                                );
                                            },
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Main;
