const Dimensions = ['x', 'y', 'z'] as const

type RotationDimension = (typeof Dimensions)[number]

type RotationSet = {
	[dimension in RotationDimension]: number
}
