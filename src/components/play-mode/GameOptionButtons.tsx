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
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface GameOptionButtonsProps {
    gameOptions: GameOptions;
    setGameOptions: (value: React.SetStateAction<GameOptions>) => void;
}

export const GameOptionButtons: React.FC<GameOptionButtonsProps> = ({
    gameOptions,
    setGameOptions,
}) => {
    const handleRadioClick = (key: keyof GameOptions) => {
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
            <GameOptionsList
                options={pieceOptions}
                selectedValue={gameOptions.pieceTypes}
                icon={faCube}
                tooltipLabel="Piece type"
                handleOptionClick={handleRadioClick("pieceTypes")}
            />
            <GameOptionsList
                options={timeOptions}
                selectedValue={gameOptions.seconds}
                icon={faStopwatch}
                tooltipLabel="Seconds in game"
                handleOptionClick={handleRadioClick("seconds")}
            />
        </div>
    );
};

interface GameOptionsListProps {
    options: RadioOption[];
    selectedValue: unknown;
    icon: IconProp;
    tooltipLabel: string;
    handleOptionClick: (option: RadioOption) => void;
}

// TODO: Abstract out and rename
const GameOptionsList: React.FC<GameOptionsListProps> = ({
    options,
    selectedValue,
    handleOptionClick,
    tooltipLabel,
    icon,
}) => {
    return (
        <div className="inline-flex items-center gap-2">
            <TooltipWrapper content={tooltipLabel}>
                <FontAwesomeIcon
                    icon={icon}
                    size="lg"
                    className="-mt-[2px] text-slate-500 duration-200 hover:text-slate-600"
                />
            </TooltipWrapper>
            <ul className="flex gap-1">
                <SmallRadioList
                    options={options}
                    selectedValue={selectedValue}
                    handleClick={handleOptionClick}
                />
            </ul>
        </div>
    );
};
