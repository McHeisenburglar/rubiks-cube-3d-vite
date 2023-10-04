import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button } from "../play-mode/Button";

export const ButtonGrid = () => {
    type sizeProp = Parameters<typeof Button>[0]["size"];
    type colorProp = Parameters<typeof Button>[0]["color"];
    type styleProp = Parameters<typeof Button>[0]["style"];
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
                                            <Button
                                                onClick={() => {}}
                                                color={color}
                                                size={size}
                                                icon={faShuffle}
                                                style={style}
                                            >
                                                {color} {style}
                                            </Button>
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
