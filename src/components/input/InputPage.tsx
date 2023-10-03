import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NewButton } from "../play-mode/NewButton";
import { ButtonGrid } from "./ButtonGrid";
import { RadioOption, SwitchList } from "./SwitchList";
import { SmallSwitchList } from "./SmallSwitchList";

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

    const pieceOptions = [
        {
            label: "Corners",
            value: "corners",
        },
        {
            label: "Edges",
            value: "edges",
        },
    ];

    const timeOptions = [
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
            label: <FontAwesomeIcon icon={faInfinity} />,
            value: "infinite",
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
                <div className="flex items-center gap-3 py-8">
                    <FontAwesomeIcon
                        icon={faStopwatch}
                        size="lg"
                        className="-mt-[2px] text-slate-500 duration-200 hover:text-slate-600"
                    />
                    <ul className="flex gap-1">
                        <SmallSwitchList
                            options={timeOptions}
                            selectedValue={gameOptions.seconds}
                            handleClick={handleRadioClick("seconds")}
                        />
                    </ul>
                </div>
                <div className="mt-8">
                    <TooltipWrapper>
                        <FontAwesomeIcon
                            icon={faStopwatch}
                            size="lg"
                            className="-mt-[2px] text-slate-500 duration-200 hover:text-slate-600"
                        />
                    </TooltipWrapper>
                </div>
            </div>
        </>
    );
};

interface TooltipProps {
    content: string;
    children: ChildElement;
}

const TooltipWrapper: React.FC<TooltipProps> = ({ children }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showTooltipClass, setShowTooltipClass] = useState(false);
    const bgColor = "bg-slate-800";

    const onMouseEnter = () => {
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltipClass(true);
        }, 10);
    };

    const onMouseLeave = () => {
        setShowTooltipClass(false);
        setTimeout(() => {
            if (!showTooltipClass) setShowTooltip(false);
        }, 200);
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <FontAwesomeIcon icon={faStopwatch} />
            {showTooltip && (
                <span
                    className={`absolute left-1/2 top-0 inline-flex max-w-xl -translate-x-1/2 -translate-y-full flex-col items-center text-center ${
                        showTooltipClass
                            ? "opacity-1 z-10"
                            : "pointer-events-none invisible translate-y-[-90%] opacity-0"
                    } duration-300`}
                >
                    <span
                        className={`inline-block rounded-md ${bgColor} text-medium w-max max-w-xs px-3 py-2 text-xs text-white`}
                    >
                        Seconds in game
                    </span>
                    <span className="-m-[1px] w-[16px] border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-slate-800"></span>
                </span>
            )}
        </div>
    );
    // border-l-[50px] border-l-transparent
};

export default Main;
