/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

const Dropdown = ({ data }) => {
	const [index, setIndex] = useState(0);

	return (
		<div className="dropdown __dropdown">
			<a
				href="#"
				role="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<img src={data[index]?.img} alt="" /> {data[index]?.name}
			</a>

			<ul className="dropdown-menu">
				{data?.map((item, index) => (
					<li onClick={() => setIndex(index)}>
						<button>
							<img src={item?.img} alt="" /> {item?.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dropdown;
