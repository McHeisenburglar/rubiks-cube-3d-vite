import React, { useState } from "react";
import {
    faShuffle,
    faArrowRotateLeft,
    faCopy,
    faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "./Button";
import { TooltipWrapper } from "../input/InputPage";

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
                <Button
                    style="ghost"
                    color="slate"
                    icon={faPencil}
                    onClick={() => {}}
                >
                    Customize cube
                </Button>
                <Button
                    style="ghost"
                    color="slate"
                    icon={faShuffle}
                    onClick={onClickScramble}
                >
                    {scramble ? "Scramble again" : "Scramble cube"}
                </Button>
                {scramble && (
                    <Button
                        icon={faArrowRotateLeft}
                        style="ghost"
                        color="green"
                        onClick={onClickReset}
                    >
                        Reset
                    </Button>
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

export default ScrambleControls;
