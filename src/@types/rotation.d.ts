const DIMENSIONS = ['x', 'y', 'z'] as const

type RotationDimension = (typeof DIMENSIONS)[number]

type Dimension = RotationDimension

type RotationSet = {
	[dimension in RotationDimension]: number
}

type RotationArray = [number, number, number]
