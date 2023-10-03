import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { NewButton } from "../play-mode/NewButton";
import { SmallSwitchButton } from "./SmallSwitchButton";
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
            label: <FontAwesomeIcon icon={faStopwatch} />,
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
                <div className="flex items-center gap-3 py-8 text-slate-500">
                    <FontAwesomeIcon
                        icon={faStopwatch}
                        size="lg"
                        className="-mt-[2px]"
                    />
                    <ul className="flex gap-1">
                        <SmallSwitchList
                            options={timeOptions}
                            selectedValue={gameOptions.seconds}
                            handleClick={handleRadioClick("seconds")}
                        />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Main;
