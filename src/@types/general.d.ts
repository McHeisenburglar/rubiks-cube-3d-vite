type ChildElement =
	| string
	| JSX.Element
	| JSX.Element[]
	| (() => JSX.Element)
	| ReactNode

interface LooseObject {
	[key: string]: unknown
}

type SceneParts = 'rotation' | 'highlight'
