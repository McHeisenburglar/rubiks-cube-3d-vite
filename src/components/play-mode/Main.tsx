import React, { useEffect, useMemo, useState } from "react";
import useCountdown from "../timer/useCountdown";
import Scoreboard from "../timer/Scoreboard";
import {
    faShuffle,
    faArrowRotateLeft,
    faPause,
    faPlay,
    faCopy,
    faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useKeypress from "../new/useKeypress";
import useGame from "./useGame";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
            <div className="w-full">
                <NewButton
                    key="start"
                    size="md"
                    color="green"
                    style="filled"
                    className="w-full"
                    onClick={onClickStart}
                >
                    Start game
                </NewButton>
            </div>
        );
    } else {
        return (
            <div className="text-center">
                <NewButton key="pause" onClick={onClickPause} className="mr-2">
                    {isPaused ? "Unpause" : "Pause"}
                </NewButton>
                <NewButton key="stop" onClick={onClickStop}>
                    End game
                </NewButton>
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
import { GuessLogEntry } from "../timer/TimerMain";
import { useDocumentTitle } from "../ui/customize/useDocumentTitle";
// import { PlayButton } from "../input/InputPage";
import { RadioOption } from "../input/SwitchList";
import {
    CubeContext,
    useCube,
    useCubeContext,
} from "../new-structure/useCubeContext";
import { CubeView } from "../new-structure/CubeView";
import { NewButton } from "./NewButton";
import { GameOptionButtons, TooltipWrapper } from "../input/InputPage";

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

interface GameOptions {
    pieceType: "corner" | "edge" | null;
    seconds: number | null;
}

export const GameContext = React.createContext<{ inProgress: boolean } | null>(
    null,
);

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

    const [gameOptions, setGameOptions] = useState<GameOptions>({
        pieceType: "corner",
        seconds: 60,
    });

    const { setSpotlight, clearSpotlight } = useSpotlightContext();

    const game = useGame({
        cube,
        pieceType: gameOptions.pieceType!,
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
        seconds: gameOptions.seconds!,
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
                secondsTotal={gameOptions.seconds || 60}
                millisecondsLeft={gameTimer.millisecondsLeft}
            />
            <div
                className={`relative text-center duration-500  ease-out ${
                    game.inProgress ? "" : ""
                }`}
            >
                <div
                    className={`l-0 t-0 absolute h-full w-full ${
                        gameTimer.isPaused
                            ? "z-10 bg-white/50 backdrop-blur-xl"
                            : "-z-10 opacity-0"
                    } flex items-center justify-center transition-all duration-200 ease-out`}
                >
                    <FontAwesomeIcon icon={faPause} size="5x" color={"white"} />
                </div>
                <GameContext.Provider value={{ inProgress: game.inProgress }}>
                    {cubeSlot}
                </GameContext.Provider>
            </div>
            {!game.inProgress && (
                <div className="relative z-20 -mt-6 py-2">
                    <ScrambleControls
                        scramble={scramble}
                        onClickScramble={handleScramble}
                        onClickReset={handleResetScramble}
                    />
                </div>
            )}
            <div className="mx-auto mt-12 flex w-fit flex-col items-center gap-6">
                {!game.inProgress && (
                    <GameOptionButtons
                        gameOptions={gameOptions}
                        setGameOptions={setGameOptions}
                    />
                )}
                <PlayModeControls
                    isPaused={gameTimer.isPaused}
                    isRunning={gameTimer.isRunning}
                    onClickStart={gameTimer.start}
                    onClickPause={gameTimer.togglePause}
                    onClickStop={gameTimer.stop}
                />
            </div>
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

interface ScrambleControlsProps {
    scramble: string | null;
    onClickScramble: () => void;
    onClickReset: () => void;
}

const ScrambleControls: React.FC<ScrambleControlsProps> = ({
    scramble,
    onClickScramble,
    onClickReset,
}) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <>
            <div className="text-center">
                <NewButton
                    style="ghost"
                    color="slate"
                    icon={faPencil}
                    onClick={() => {}}
                >
                    Customize cube
                </NewButton>
                <NewButton
                    style="ghost"
                    color="slate"
                    icon={faShuffle}
                    onClick={onClickScramble}
                >
                    {scramble ? "Scramble again" : "Scramble cube"}
                </NewButton>
                {scramble && (
                    <NewButton
                        icon={faArrowRotateLeft}
                        style="ghost"
                        color="green"
                        onClick={onClickReset}
                    >
                        Reset
                    </NewButton>
                )}
            </div>
            {scramble && (
                <div className="text-center text-sm text-slate-400">
                    <span>{scramble}</span>
                    <TooltipWrapper
                        content={isCopied ? "Copied" : "Click to copy"}
                        color={isCopied ? "green" : "slate"}
                        className="ml-2 cursor-pointer duration-200 hover:text-slate-500"
                    >
                        <CopyToClipboard text={scramble} onCopy={onCopy}>
                            <FontAwesomeIcon icon={faCopy} />
                        </CopyToClipboard>
                    </TooltipWrapper>
                </div>
            )}
        </>
    );
};

export default PlayModeExport;
