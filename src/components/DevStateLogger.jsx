import React, { useState } from 'react';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

function DevStateLogger({ stateObject }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const keys = Object.keys(stateObject);
	console.log(stateObject);
	return (
		<div className="component__state-logger">
			<div className="state-header" onClick={() => setIsExpanded(!isExpanded)}>
				<h3 className="state-title">State object</h3>
				{isExpanded ? <MdOutlineExpandMore /> : <MdOutlineExpandLess />}
			</div>
			{isExpanded && (
				<div className="state-main">
					{keys.map((key) => {
						const value = stateObject[key];
						const classes = [];

						classes.push(typeof value);
						if (typeof value === 'object' && !value) classes.push('null');
						if (typeof value === 'boolean')
							classes.push(value ? 'true' : 'false');

						console.log('HELLO', typeof value);

						return (
							<p class="state-row">
								<span className="state-key">{key}: </span>
								<span className={`state-value ${classes.join(' ')}`}>
									{String(stateObject[key])}
								</span>
							</p>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default DevStateLogger;
