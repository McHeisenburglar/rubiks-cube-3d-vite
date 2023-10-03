import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { NewButton } from "../play-mode/NewButton";

export const ButtonGrid = () => {
    type sizeProp = Parameters<typeof NewButton>[0]["size"];
    type colorProp = Parameters<typeof NewButton>[0]["color"];
    type styleProp = Parameters<typeof NewButton>[0]["style"];
    return (
        <>
            {(["sm", "md", "lg"] as sizeProp[]).map((size) => {
                return (
                    <div className="mb-6">
                        {(["filled", "outline"] as styleProp[]).map((style) => {
                            return (
                                <div className="mb-2 flex gap-2">
                                    {(
                                        [
                                            "red",
                                            "green",
                                            "blue",
                                            "slate",
                                        ] as colorProp[]
                                    ).map((color) => {
                                        return (
                                            <NewButton
                                                onClick={() => {}}
                                                color={color}
                                                size={size}
                                                icon={faShuffle}
                                                style={style}
                                            >
                                                {color} {style}
                                            </NewButton>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
};
