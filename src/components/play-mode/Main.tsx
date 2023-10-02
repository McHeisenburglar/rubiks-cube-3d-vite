import React, { useEffect, useMemo, useState } from "react";
import useCountdown from "../timer/useCountdown";
import Scoreboard from "../timer/Scoreboard";
import {
    faShuffle,
    faArrowRotateLeft,
    faPause,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CubeComponent } from "../scene-refactor/Main";
import { CubeWithPos } from "../../ts/CubeClass3";
import useKeypress from "../new/useKeypress";
import useGame from "./useGame";

interface PlayModeControlsProps {
    debug?: boolean;
    isRunning: boolean;
    isPaused: boolean;
    onClickStart: () => void;
    onClickPause: () => void;
    onClickStop: () => void;
}

const PlayModeControls: React.FC<PlayModeControlsProps> = (props) => {
    if (props.debug) console.log("::::: Rendered PlayModeControls.");

    const { isRunning, isPaused, onClickStart, onClickPause, onClickStop } =
        props;

    if (!isRunning) {
        return (
            <div className="text-center">
                <button className="btn-primary success" onClick={onClickStart}>
                    Start game
                </button>
            </div>
        );
    } else {
        return (
            <div className="text-center">
                <NewButton onClick={onClickPause}>
                    {isPaused ? "Unpause" : "Pause"}
                </NewButton>
                <NewButton onClick={onClickStop}>End game</NewButton>
            </div>
        );
    }
};

const GameComponentDev: React.FC<{ game: ReturnType<typeof useGame> }> = ({
    game,
}) => {
    return (
        <>
            {game.inProgress && (
                <div className="text-left">
                    <h1 className="mb-2 text-lg font-bold">Game component</h1>
                    <ul>
                        <li>
                            Current letter to guess: {game.currentSticker?.name}
                        </li>
                        <li>Correct: {game.correct}</li>
                        <li>Incorrect: {game.incorrect}</li>
                    </ul>
                </div>
            )}
        </>
    );
};

import RotationContextWrapper from "../scene-refactor/RotationContextWrapper";
import HighlightContextWrapper from "../scene-refactor/HighlightContextProvider";
import { useSpotlightContext } from "../scene-refactor/useSpotlight";
import { CorrectGuessLog, GuessLogEntry } from "../timer/TimerMain";
import { useDocumentTitle } from "../ui/customize/useDocumentTitle";
import { PlayButton, RadioOption, SwitchList } from "../input/InputPage";
import {
    CubeContext,
    useCube,
    useCubeContext,
} from "../new-structure/useCubeContext";
import { CubeView } from "../new-structure/CubeView";
import { NewButton } from "./NewButton";

const SeparateTimerComponent = () => {
    const gameTimer = useCountdown({
        seconds: 10,
        onStart: () => {},
        onStop: () => {},
    });
    useEffect(() => {
        gameTimer.start();
    }, []);

    return (
        <>
            <div>{gameTimer.millisecondsLeft}</div>
        </>
    );
};

interface PlayModeProps {
    cubeSlot: React.ReactNode;
    onScramble: (scramble: string | null) => void;
}

const PlayModeComponent2: React.FC<PlayModeProps> = ({
    cubeSlot,
    onScramble,
}) => {
    // console.log("rendered");
    const [scramble, setScramble] = useState<string | null>(null);
    // const cube: CubeWithPos = useMemo<CubeWithPos>(() => {
    //     const cube = new CubeWithPos();
    //     if (scramble) cube.performAlgorithm(scramble);
    //     return cube;
    // }, [scramble]);

    const cube = useCubeContext();

    useEffect(() => {
        onScramble(scramble);
    }, [scramble]);

    interface GameOptions {
        pieceType: "corner" | "edge";
        seconds: number;
    }

    const [gameOptions, setGameOptions] = useState<GameOptions>({
        pieceType: "corner",
        seconds: 60,
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

    const { setSpotlight, clearSpotlight } = useSpotlightContext();

    const game = useGame({
        cube,
        pieceType: "edge",
        onStickerChange: (sticker) => {
            setSpotlight(sticker);
        },
        onCorrectGuess: (sticker) => {
            logCorrectGuess(sticker);
        },
        onIncorrectGuess: (sticker) => {
            const domElement = document.querySelector(
                `[data-sticker-id=${sticker.id}]`,
            );
            if (domElement) pulseAnimation(domElement);
        },
        onGameStop: () => {
            clearSpotlight();
        },
    });

    const handleScramble = () => {
        const scramble = cube.scramble();
        clearSpotlight();
        setScramble(scramble);
    };

    const handleResetScramble = () => {
        clearSpotlight();
        setScramble(null);
    };

    const pulseAnimation = (domElement: Element) => {
        domElement.classList.add("error");
        setTimeout(() => {
            domElement.classList.remove("error");
        }, 300);
    };

    useKeypress((e) => {
        e.preventDefault();
        if (e.key === " " && !game.inProgress) {
            return gameTimer.start();
        }
        if (!game.inProgress) {
            const sticker = cube.getStickerByLetter(e.key, "edge");
            if (sticker) setSpotlight(sticker);
            return;
        }
        if (gameTimer.isRunning && !gameTimer.isPaused && game.inProgress) {
            game.checkGuess(e);
        }
    });

    const gameTimer = useCountdown({
        seconds: gameOptions.seconds,
        onStart: () => {
            game.start();
        },
        onStop: () => {
            game.stop();
        },
        onUnpause: () => {
            if (game.currentSticker) setSpotlight(game.currentSticker);
        },
        onCompletion() {
            game.stop();
            clearSpotlight();
        },
    });

    const logCorrectGuess = (sticker: ISticker) => {
        const ms = gameTimer.newMarker();
        const logEntry: GuessLogEntry = {
            no: game.guessLog.length + 1,
            sticker: sticker.name,
            time: ms,
        };
        game.addGuessLogEntry(logEntry);
    };

    // const handleStickerClick = (sticker: ISticker) => {
    //     if (!game.inProgress) setSpotlight(sticker);
    // };

    return (
        <div className="mx-auto max-w-[60rem] bg-white px-24 pb-8">
            <Scoreboard
                correctGuesses={game.correct}
                incorrectGuesses={game.incorrect}
                secondsTotal={gameOptions.seconds}
                millisecondsLeft={gameTimer.millisecondsLeft}
            />
            <div className="relative text-center">
                <div
                    className={`l-0 t-0 absolute h-full w-full ${
                        gameTimer.isPaused
                            ? "z-10 bg-white/50 backdrop-blur-xl"
                            : "-z-10 opacity-0"
                    } flex items-center justify-center transition-all duration-200 ease-out`}
                >
                    <FontAwesomeIcon icon={faPause} size="5x" color={"white"} />
                </div>
                {cubeSlot}
            </div>
            {!game.inProgress && (
                <>
                    {scramble && (
                        <div className="relative -top-8 text-center">
                            <span className="text-xs">
                                Scramble: {scramble}
                            </span>
                        </div>
                    )}
                    <div className="text-center">
                        <NewButton icon={faShuffle} onClick={handleScramble}>
                            {scramble ? "Scramble again" : "Scramble cube"}
                        </NewButton>
                        {scramble && (
                            <NewButton
                                icon={faArrowRotateLeft}
                                onClick={handleResetScramble}
                            >
                                Reset
                            </NewButton>
                        )}
                    </div>
                </>
            )}
            {!game.inProgress && (
                <>
                    <div className="flex flex-row p-4">
                        <div className="flex flex-col items-start justify-between gap-3 p-4">
                            <h3 className="text-lg">Piece types</h3>
                            <div className="flex items-center justify-center">
                                <SwitchList
                                    options={[
                                        {
                                            label: "Corners",
                                            value: "corner",
                                        },
                                        {
                                            label: "Edges",
                                            value: "edge",
                                        },
                                    ]}
                                    selectedValue={gameOptions.pieceType}
                                    handleClick={handleRadioClick("pieceType")}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-between gap-3 p-4">
                            <h3 className="text-lg">Seconds in game</h3>
                            <div className="flex items-center justify-center">
                                <SwitchList
                                    options={[
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
                                    ]}
                                    selectedValue={gameOptions.seconds}
                                    handleClick={handleRadioClick("seconds")}
                                />
                            </div>
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
                </>
            )}
            <PlayModeControls
                isPaused={gameTimer.isPaused}
                isRunning={gameTimer.isRunning}
                onClickStart={gameTimer.start}
                onClickPause={gameTimer.togglePause}
                onClickStop={gameTimer.stop}
            />
            <div className="mt-16">
                <GameComponentDev game={game} />
            </div>
            {/* {!game.inProgress && game.guessLog.length > 0 && (
                <CorrectGuessLog log={game.guessLog} />
            )} */}
        </div>
    );
};

const PlayModeExport = () => {
    // const cube: CubeWithPos = useMemo<CubeWithPos>(() => {
    //     const cube = new CubeWithPos();
    //     // if (scramble) cube.performAlgorithm(scramble);
    //     return cube;
    // }, []);

    const [scramble, setScramble] = useState<string | null>(null);
    const cube = useCube(scramble);

    useDocumentTitle("Play Mode");
    return (
        <CubeContext.Provider value={cube}>
            <HighlightContextWrapper>
                <RotationContextWrapper>
                    <PlayModeComponent2
                        onScramble={setScramble}
                        cubeSlot={<CubeView debug />}
                    />
                </RotationContextWrapper>
            </HighlightContextWrapper>
        </CubeContext.Provider>
    );
};

export default PlayModeExport;
