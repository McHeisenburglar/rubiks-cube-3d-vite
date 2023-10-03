type ChildElement =
    | string
    | JSX.Element
    | JSX.Element[]
    | (() => JSX.Element)
    | ReactNode;

interface LooseObject {
    [key: string]: unknown;
}

type ChildrenProps = {
    children: ChildElement;
};

type CSSClass = React.ComponentProps<"div">["className"];

type SceneParts = "rotation" | "highlight";
