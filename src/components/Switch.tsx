// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
function SwitchBar({ items, activeItem, onSwitch }) {
	return (
		<>
			{items.map((item, index) => {
				const isActive = activeItem === item
				return (
					<Switch key={index} active={isActive} onSwitch={() => onSwitch(item)}>
						{item}
					</Switch>
				)
			})}
		</>
	)
}

export function Switch({ children, active, onSwitch }) {
	return (
		<button
			className={`btn btn-switch ${active && 'active'}`}
			onClick={(e) => {
				onSwitch()
				e.target.blur()
			}}
		>
			{children.toString()}
		</button>
	)
}

export default SwitchBar
