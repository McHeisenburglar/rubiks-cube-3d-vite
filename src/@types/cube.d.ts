const SIDES = ['top', 'left', 'front', 'right', 'back', 'bottom'] as const

type Side = (typeof SIDES)[number]

type SideMap<T> = {
	[side in SIDES]: T
}

const PIECE_TYPES = ['corner', 'edge', 'center'] as const

type PieceType = (typeof PIECE_TYPES)[number] | 'unknown'

const MOVE_TYPES_2 = ['U', 'L', 'R', 'F', 'B', 'D'] as const

type MoveType = (typeof MOVE_TYPES_2)[number]

type MoveMap<T> = {
	[move in MOVE_TYPES_2]: T
}

type CubeStyleName = 'black' | 'white' | 'stickerless'
type CubeStyleConfig = {
	color: string
	stickerPadding: string
	sideRadius: string
	stickerCornerRadius: string
}

type StickerId = string
