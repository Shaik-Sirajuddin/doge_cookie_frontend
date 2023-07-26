import React from "react";
import bg from "../assets/img/coming-soon-bg.png";
import nfttitle from "../assets/img/nft-marketplace.png";
const ComingSoon = () => {
	return (
		<section
			className="coming-soon-section"
			style={{ background: `url(${bg}) no-repeat top center / cover` }}
		>
			<div className="container">
				<div className="nft-coming-soon">
					<div>
						<img src={nfttitle} className="mw-100" alt="" />
					</div>
					<button className="coming-soon-btn">Coming Soon</button>
				</div>
			</div>
		</section>
	);
};

export default ComingSoon;
