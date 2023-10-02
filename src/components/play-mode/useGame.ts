import { useEffect, useState } from "react";
import { CubeWithPos } from "../../ts/CubeClass3";
import { GuessLogEntry } from "../timer/TimerMain";

interface useGameOptions {
    cube: CubeWithPos;
    pieceType: PieceType;
    onStickerChange?: (sticker: ISticker) => void;
    onCorrectGuess?: (sticker: ISticker) => void;
    onIncorrectGuess?: (sticker: ISticker) => void;
    onGameStart?: () => void;
    onGameStop?: () => void;
}

export const useGame = (options: useGameOptions) => {
    const { cube, pieceType } = options;

    const [inProgress, setInProgress] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);

    const [guessLog, setGuessLog] = useState<GuessLogEntry[]>([]);

    const [currentSticker, setCurrentSticker] = useState<ISticker | null>(null);

    const nextRandomSticker = () => {
        const newSticker = cube.getRandomStickerInFilter(
            (sticker) =>
                sticker.type === pieceType && sticker.id !== currentSticker?.id
        );
        setCurrentSticker(newSticker);
    };

    const reset = () => {
        setCurrentSticker(null);
        setCorrect(0);
        setIncorrect(0);
        setGuessLog([]);
    };

    useEffect(() => {
        if (currentSticker) {
            options.onStickerChange?.(currentSticker);
        }
    }, [currentSticker]);

    const checkGuess = (e: KeyboardEvent) => {
        const guessedSticker = cube.getStickerByLetter(
            e.key.toLowerCase(),
            pieceType
        );
        if (!guessedSticker || !currentSticker) return;

        if (guessedSticker.id === currentSticker.id) {
            options.onCorrectGuess?.(currentSticker);
            onCorrectGuess();
        } else {
            options.onIncorrectGuess?.(guessedSticker);
            onIncorrectGuess();
        }
    };

    const onCorrectGuess = () => {
        setCorrect(correct + 1);
        nextRandomSticker();
    };

    const onIncorrectGuess = () => {
        setIncorrect(incorrect + 1);
    };

    const start = () => {
        setInProgress(true);
        reset();
        nextRandomSticker();

        options.onGameStart?.();
    };

    const stop = () => {
        setInProgress(false);

        options.onGameStop?.();
    };

    const skip = () => {
        nextRandomSticker();
    };

    const addGuessLogEntry = (entry: GuessLogEntry) => {
        setGuessLog((prev) => [...prev, entry]);
    };

    return {
        inProgress,
        start,
        stop,
        currentSticker,
        checkGuess,
        reset,
        correct,
        incorrect,
        skip,
        guessLog,
        addGuessLogEntry,
    };
};

export default useGame;
