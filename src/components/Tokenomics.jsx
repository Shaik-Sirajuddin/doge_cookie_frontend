import React from "react";
import img from "../assets/img/tokenomics.png";
import CopyAddress from "./CopyAddress";
const Tokenomics = () => {
	return (
		<section className="tokenomics-section">
			<div className="container">
				<div className="tokenomics-content">
					<div className="content">
						<h3 className="title">Tokenomics</h3>
						<p>
							$DCK is a deployed on ETH and BNB Blockchain. The total
							supply of $DCK token is 120 Billion (120,000,000,000).
						</p>
					</div>
					<img src={img} className="mw-100" alt="" />
				</div>
				<div className="token-statistics mt-4 mt-md-5">
					<div className="token-statistics-info">
						<div className="item">
							<span>Token Name</span>
							<h5 className="text-base">Dogecookie</h5>
						</div>
						<div className="item">
							<span>Token Symbol</span>
							<h5 className="text-base">$DCK</h5>
						</div>
						<div className="item">
							<span>Presale Price</span>
							<h5 className="text-base">$0.0001</h5>
						</div>
						<div className="item">
							<span>Token in Circulation</span>
							<h5 className="text-base">120 Billion</h5>
						</div>
						<div className="item">
							<span>Blockchain</span>
							<h5 className="text-base">ETH, BNB</h5>
						</div>
					</div>
					<div className="row mt-4 pt-2">
						<div className="col-lg-6">
							<CopyAddress
								title="ETH Blockchain Address"
								value="0x21D5AF064600f06F45B05A68FddC2464A5dDaF87"
							/>
						</div>
						<div className="col-lg-6">
							<CopyAddress
								title="BNB Blockchain Address"
								value="0x21D5AF064600f06F45B05A68FddC2464A5dDaF87"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tokenomics;
