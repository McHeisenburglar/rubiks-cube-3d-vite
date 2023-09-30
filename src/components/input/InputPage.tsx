import React, { useState } from 'react'

interface IProps {}

type SwitchButtonProps = {
	active: boolean
	handleClick: () => void
} & ChildrenProps

const SwitchButton: React.FC<SwitchButtonProps> = ({
	active,
	handleClick,
	children,
}) => {
	const activeClass =
		'px-6 py-2 rounded-lg border-bg-blue-700 border bg-blue-700 text-white font-semi-bold active:scale-90 transition duration-150'
	const defaultClass =
		'px-6 py-2 rounded-lg border-slate-200 border text-slate-700 font-semi-bold active:scale-90 transition duration-150'

	return (
		<button
			className={active ? activeClass : defaultClass}
			type="button"
			onClick={handleClick}
		>
			{children}
		</button>
	)
}

interface IProps {
	label: string
	options: Array<string | number>
}
const SwitchRow: React.FC<IProps> = ({ label, options }) => {
	const [selectedOption, setSelectedOption] = useState<number | null>(null)

	const handleClick = (index: number) => {
		setSelectedOption(index)
	}
	return (
		<div className="bg-white max-w-xl px-4 py-2 m-auto flex justify-between items-center">
			<h3 className="wide text-xl">{label}</h3>
			<div className="options flex gap-2">
				{options.map((option, index) => {
					return (
						<SwitchButton
							key={index}
							active={selectedOption === index}
							handleClick={() => handleClick(index)}
						>
							{option}
						</SwitchButton>
					)
				})}
			</div>
		</div>
	)
}

const Main = () => {
	const optionSets = [
		{
			label: 'Piece type',
			options: ['Corners', 'Edges'],
		},
		{
			label: 'Timer',
			options: [15, 30, 60, '∞'],
		},
	]

	return (
		<>
			{optionSets.map((set, index) => (
				<SwitchRow label={set.label} key={index} options={set.options} />
			))}
		</>
	)
}

export default Main
