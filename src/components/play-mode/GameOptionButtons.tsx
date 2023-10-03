import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCube,
    faInfinity,
    faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { RadioOption } from "../input/SwitchList";
import { SmallRadioList } from "../input/SmallRadioList";
import { TooltipWrapper } from "../input/InputPage";
import { GameOptions } from "./Main";

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
            value: ["corner"],
        },
        {
            label: "Edges",
            value: ["edge"],
        },
        {
            label: "Both",
            value: ["edge", "corner"],
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
                    <SmallRadioList
                        options={pieceOptions}
                        selectedValue={gameOptions.pieceTypes}
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
                    <SmallRadioList
                        options={timeOptions}
                        selectedValue={gameOptions.seconds}
                        handleClick={handleRadioClick("seconds")}
                    />
                </ul>
            </div>
        </div>
    );
};
