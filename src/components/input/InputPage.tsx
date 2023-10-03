import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCube,
    faInfinity,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NewButton } from "../play-mode/NewButton";
import { ButtonGrid } from "./ButtonGrid";
import { RadioOption, SwitchList } from "./SwitchList";
import { SmallSwitchList } from "./SmallSwitchList";

interface GameOptions {
    pieceType: "corner" | "edge" | null;
    seconds: number | null;
}

const Main = () => {
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

    const pieceOptions = [
        {
            label: "Corners",
            value: "corner",
        },
        {
            label: "Edges",
            value: "edge",
        },
    ];

    const timeOptions = [
        {
            label: "30s",
            value: 30,
        },
        {
            label: "60s",
            value: 30,
        },
        {
            label: "120s",
            value: 120,
        },
        {
            label: <FontAwesomeIcon icon={faInfinity} />,
            value: 0,
        },
    ];

    return (
        <>
            <div className="m-auto max-w-3xl bg-white p-4">
                <div className="flex items-center justify-between p-4">
                    <h3 className="wide text-xl">Piece types</h3>
                    <div className="flex items-center justify-center">
                        <SwitchList
                            options={pieceOptions}
                            selectedValue={gameOptions.pieceType}
                            handleClick={handleRadioClick("pieceType")}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between p-4">
                    <h3 className="wide text-xl">Seconds in game</h3>
                    <div className="flex items-center justify-center">
                        <SwitchList
                            options={timeOptions}
                            selectedValue={gameOptions.seconds}
                            handleClick={handleRadioClick("seconds")}
                        />
                    </div>
                </div>
                <div className="flex justify-end p-4">
                    <NewButton
                        disabled={
                            !gameOptions.pieceType || !gameOptions.seconds
                        }
                        onClick={() => {}}
                        style={"filled"}
                        color={"green"}
                    >
                        Start game
                    </NewButton>
                </div>
                <ButtonGrid />
                <GameOptionButtons
                    gameOptions={gameOptions}
                    setGameOptions={setGameOptions}
                />
            </div>
        </>
    );
};

interface GameOptionButtonsProps {
    gameOptions: GameOptions;
    setGameOptions: (value: React.SetStateAction<GameOptions>) => void;
}

export const GameOptionButtons: React.FC<GameOptionButtonsProps> = ({
    gameOptions,
    setGameOptions,
}) => {
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

    const pieceOptions = [
        {
            label: "Corners",
            value: "corner",
        },
        {
            label: "Edges",
            value: "edge",
        },
    ];

    const timeOptions = [
        {
            label: "30s",
            value: 30,
        },
        {
            label: "60s",
            value: 60,
        },
        {
            label: "120s",
            value: 120,
        },
        {
            label: <FontAwesomeIcon icon={faInfinity} />,
            value: 0,
        },
    ];

    return (
        <div className="flex gap-6">
            <div className="inline-flex items-center gap-2">
                <TooltipWrapper content="Piece type">
                    <FontAwesomeIcon
                        icon={faCube}
                        size="lg"
                        className="-mt-[2px] text-slate-500 duration-200 hover:text-slate-600"
                    />
                </TooltipWrapper>
                <ul className="flex gap-1">
                    <SmallSwitchList
                        options={pieceOptions}
                        selectedValue={gameOptions.pieceType}
                        handleClick={handleRadioClick("pieceType")}
                    />
                </ul>
            </div>
            <div className="inline-flex items-center gap-2">
                <TooltipWrapper content="Game timer">
                    <FontAwesomeIcon
                        icon={faStopwatch}
                        size="lg"
                        className="-mt-[2px] text-slate-500 duration-200 hover:text-slate-600"
                    />
                </TooltipWrapper>
                <ul className="flex gap-1">
                    <SmallSwitchList
                        options={timeOptions}
                        selectedValue={gameOptions.seconds}
                        handleClick={handleRadioClick("seconds")}
                    />
                </ul>
            </div>
        </div>
    );
};

interface TooltipProps {
    content: string;
    color?: "slate" | "green";
    className?: CSSClass;
    children: ChildElement;
}

export const TooltipWrapper: React.FC<TooltipProps> = ({
    children,
    content,
    className = "",
    color = "slate",
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showTooltipClass, setShowTooltipClass] = useState(false);

    const bgColor = {
        slate: "bg-slate-800",
        green: "bg-green-700",
    };

    const borderColor = {
        slate: "border-slate-800",
        green: "border-green-700",
    };

    let enterTimeout: number;
    let exitTimeout: number;

    const onMouseEnter = () => {
        setShowTooltip(true);
        clearTimeout(exitTimeout);
        enterTimeout = setTimeout(() => {
            setShowTooltipClass(true);
        }, 100);
    };

    const onMouseLeave = () => {
        setShowTooltipClass(false);
        clearTimeout(enterTimeout);
        exitTimeout = setTimeout(() => {
            setShowTooltip(false);
        }, 200);
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
            {showTooltip && (
                <span
                    className={`absolute left-1/2 top-0 inline-flex max-w-xl -translate-x-1/2 translate-y-[calc(-100%-3px)] flex-col items-center text-center ${
                        showTooltipClass
                            ? "opacity-1 z-10"
                            : "pointer-events-none invisible top-1 opacity-0"
                    } duration-300`}
                >
                    <span
                        className={`inline-block rounded-md ${bgColor[color]} text-medium w-max max-w-xs px-3 py-2 text-xs text-white`}
                    >
                        {content}
                    </span>
                    <span
                        className={`-m-[1px] w-[16px] border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent ${borderColor[color]}`}
                    ></span>
                </span>
            )}
        </div>
    );
    // border-l-[50px] border-l-transparent
};

export default Main;
