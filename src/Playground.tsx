import { useEffect, useRef } from "react";

interface PlaygroundProps {
    percentage: number;
    reverse: boolean;
}

export const Playground: React.FC<PlaygroundProps> = ({
    percentage = 0.124,
    reverse = false,
}) => {
    const styleRef = useRef<HTMLDivElement>(null);
    const style = {
        "--progress-angle": "90deg",
        "--progress-color-1": "transparent",
        "--progress-color-2": "#ddd",
    } as React.CSSProperties;

    const setCSS = (property: string, value: string) => {
        if (!styleRef.current) return null;
        styleRef.current.style.setProperty(property, value);
    };

    useEffect(() => {
        const newAngle = 360 * percentage;
        setCSS("--progress-angle", newAngle + "deg");
    }, [percentage]);

    return (
        <div className="flex h-96 w-full items-center justify-center">
            <div style={style} ref={styleRef}>
                <div>
                    <div className="progress-gradient mt-96 h-80 w-80 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

interface ProgressCircleProps {
    percentage: number;
    reverse?: boolean;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
    percentage = 0.5,
    reverse = false,
}) => {
    const myRef = useRef<HTMLDivElement>(null);
    const style = {
        "--progress-angle": "90deg",
        "--progress-color-1": "transparent",
        "--progress-color-2": "#f3f4f6",
    } as React.CSSProperties;

    const setCSS = (property: string, value: string) => {
        if (!myRef.current) return null;
        myRef.current.style.setProperty(property, value);
    };

    const angle = percentage * 360;
    setCSS("--progress-angle", angle + "deg");

    return (
        <div
            ref={myRef}
            style={style}
            className="progress-gradient h-96 w-96 rounded-full"
        ></div>
    );
};

export default Playground;
