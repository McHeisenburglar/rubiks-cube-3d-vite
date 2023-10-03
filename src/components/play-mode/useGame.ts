import { useEffect, useMemo, useState } from "react";
import { CubeWithPos } from "../../ts/CubeClass3";
import { GuessLogEntry } from "../timer/TimerMain";
import { randomElement } from "../../ts/helper";

interface useGameOptions {
    cube: CubeWithPos;
    pieceType: PieceType;
    pieceTypes: PieceType[];
    onStickerChange?: (sticker: ISticker) => void;
    onCorrectGuess?: (sticker: ISticker) => void;
    onIncorrectGuess?: (sticker: ISticker) => void;
    onGameStart?: () => void;
    onGameStop?: () => void;
}

export const useGame = (options: useGameOptions) => {
    const { cube, pieceType, pieceTypes } = options;

    const [inProgress, setInProgress] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);

    const [guessLog, setGuessLog] = useState<GuessLogEntry[]>([]);

    const [currentSticker, setCurrentSticker] = useState<ISticker | null>(null);

    const availableStickers = useMemo(() => {
        return cube.getAllStickersInFilter((s) => pieceTypes.includes(s.type));
    }, [pieceType, pieceTypes]);

    const nextRandomSticker = () => {
        const newSticker = generateNextSticker(currentSticker);
        setCurrentSticker(newSticker);
    };

    const generateNextSticker = (prevSticker: ISticker | null): ISticker => {
        console.log("Got here");
        const newSticker = randomElement(availableStickers);
        if (prevSticker?.id === newSticker.id)
            return generateNextSticker(prevSticker);
        return newSticker;
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
            currentSticker!.type,
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
