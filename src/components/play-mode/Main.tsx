import React, { useEffect, useState } from "react";
import useCountdown from "../timer/useCountdown";
import Scoreboard from "../timer/Scoreboard";

import useKeypress from "../new/useKeypress";
import useGame from "./useGame";
import RotationContextWrapper from "../scene-refactor/RotationContextWrapper";
import HighlightContextWrapper from "../scene-refactor/HighlightContextProvider";
import { useSpotlightContext } from "../scene-refactor/useSpotlight";
import { GuessLogEntry } from "../timer/TimerMain";
import { useDocumentTitle } from "../ui/customize/useDocumentTitle";
import {
    CubeContext,
    useCube,
    useCubeContext,
} from "../new-structure/useCubeContext";
import { CubeView } from "../new-structure/CubeView";
import { NewButton } from "./NewButton";
import { GameOptionButtons } from "./GameOptionButtons";
import ScrambleControls from "./ScrambleControls";
import PauseOverlay from "./PauseOverlay";

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

export interface GameOptions {
    pieceTypes: PieceType[];
    seconds: number | null;
}

interface PlayModeProps {
    cubeSlot: React.ReactNode;
    onScramble: (scramble: string | null) => void;
}

const PlayModeComponent2: React.FC<PlayModeProps> = ({
    cubeSlot,
    onScramble,
}) => {
    const cube = useCubeContext();
    const [scramble, setScramble] = useState<string | null>(null);

    useEffect(() => {
        onScramble(scramble);
    }, [scramble]);

    const [gameOptions, setGameOptions] = useState<GameOptions>({
        pieceTypes: ["corner"],
        seconds: 60,
    });

    const { setSpotlight, clearSpotlight } = useSpotlightContext();

    const game = useGame({
        cube,
        pieceTypes: gameOptions.pieceTypes,
        onStickerChange: (sticker) => {
            setSpotlight(sticker);
        },
        onCorrectGuess: (sticker) => {
            logCorrectGuess(sticker);
        },
        onIncorrectGuess: (sticker) => {
            pulseSticker(sticker);
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

    const pulseSticker = (sticker: ISticker) => {
        const selector = `[data-sticker-id=${sticker.id}]`;
        const domElement = document.querySelector(selector);
        if (domElement) pulseAnimation(domElement, "error");
    };

    const pulseAnimation = (domElement: Element, className: string) => {
        domElement.classList.add(className);
        setTimeout(() => {
            domElement.classList.remove(className);
        }, 300);
    };

    useKeypress((e) => {
        e.preventDefault();
        if (!game.inProgress) {
            const sticker = cube.getStickerByLetter(e.key, "edge");
            if (sticker) setSpotlight(sticker);
            return;
        }
        if (timer.isRunning && !timer.isPaused && game.inProgress) {
            game.checkGuess(e.key);
        }
    });

    const timer = useCountdown({
        seconds: gameOptions.seconds!,
        onStart: () => {
            game.start();
        },
        onStop: () => {
            game.stop();
        },
        onCompletion() {
            game.stop();
            clearSpotlight();
        },
    });

    const logCorrectGuess = (sticker: ISticker) => {
        const ms = timer.newMarker();
        const logEntry: GuessLogEntry = {
            no: game.guessLog.length + 1,
            sticker: sticker.name,
            time: ms,
        };
        game.addGuessLogEntry(logEntry);
    };

    return (
        <div className="min-h-screen w-full bg-white">
            <div className="mx-auto max-w-[60rem] px-24 pb-8">
                <Scoreboard
                    correctGuesses={game.correct}
                    incorrectGuesses={game.incorrect}
                    secondsTotal={gameOptions.seconds || 60}
                    millisecondsLeft={timer.millisecondsLeft}
                />
                <div className="relative text-center duration-500 ease-out ">
                    <PauseOverlay active={timer.isPaused} />
                    {cubeSlot}
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
                        isPaused={timer.isPaused}
                        isRunning={timer.isRunning}
                        onClickStart={timer.start}
                        onClickPause={timer.togglePause}
                        onClickStop={timer.stop}
                    />
                </div>
            </div>
        </div>
    );
};

const PlayModeExport = () => {
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
