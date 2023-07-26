import React, { useEffect, useRef, useState } from "react";
import { CopyBtn } from "./Icon";

const CopyAddress = ({ title, value }) => {
	const ref = useRef();
	const [copy, setCopy] = useState(false);
	const [isScrollable, setIsScrollable] = useState(false);

	const handleCopy = () => {
		const input = ref.current;
		input.select();
		document.execCommand("copy");
		input.setSelectionRange(0, 0);
		setCopy(true);
		setTimeout(() => {
			setCopy(false);
		}, 1000);
	};

	useEffect(() => {
		const input = ref.current;
		setIsScrollable(input.scrollWidth > input.clientWidth);
	}, []);
	return (
		<>
			<div className="copy-grp">
				<div className="d-flex justify-content-between">
					<span>{title}</span>
					<button type="button" onClick={() => handleCopy()}>
						{copy ? "Copied" : <CopyBtn />}
					</button>
				</div>
				<input
					type="text"
					ref={ref}
					readOnly
					value={value}
					style={{ textOverflow: isScrollable ? "ellipsis" : "clip" }}
				/>
			</div>
		</>
	);
};

export default CopyAddress;
