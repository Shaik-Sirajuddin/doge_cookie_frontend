import React from "react";
import mask from "../../assets/img/shapes-bg-2.png";
import { Desktop, Mobile } from "../../components/Icon";
import Layout from "../../components/Layout";

const HowTo = () => {
	return (
		<Layout>
			<section className="page-header">
				<div className="container">
					<h1 className="title">How to Buy</h1>
					<p>Learn how to buy DogeCookie by following the steps below.</p>
				</div>
			</section>
			<section
				className="how-to-section"
				style={{
					WebkitMask: `url(${mask}) no-repeat top center / 100% 100%`,
				}}
			>
				<div className="container">
					<div className="row g-4" style={{ rowGap: "10px" }}>
						<div className="col-lg-6">
							<div className="how-to-card mb-4">
								<div className="serial serial-1">1</div>
								<h3 className="title">Connect Your Wallet</h3>
								<div className="item">
									<h5 className="subtitle">
										<span>Mobile</span>
										<Mobile />
									</h5>
									<p>
										Open “MetaMask” or “Trust Wallet App” on your
										phone, visit our website using the integrated
										browser and click connect. Select the app from
										“Connect Wallet” and click “Approve”.
									</p>
								</div>
								<div className="item">
									<h5 className="subtitle">
										<span>Desktop</span>
										<Desktop />
									</h5>
									<p>
										Open your “Google Chrome” browser, click “Connect
										Wallet” and approve in your “MetaMask” extension.
									</p>
								</div>
							</div>
							<div className="alert alert-danger">
								<div className="alert-body">
									<h5 className="title">Note </h5>
									<p>
										Keep your wallet safe from scammers, DogeCookie
										team would never request for them.
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="how-to-card mb-5">
								<div className="serial serial-2">2</div>
								<h3 className="title">Select payment method</h3>
								<div className="item">
									<p>
										<p>
											Select your method of purchase (ETH or BSC) and
											input the amount of currency you want to spend
											or the amount of tokens you want to receive.
										</p>
										<p>
											Click "Buy Now” button. It will ask you to
											approve, confirm it. You should get a success
											message.
										</p>
									</p>
								</div>
							</div>
							<div className="how-to-card">
								<div className="serial serial-3">3</div>
								<h3 className="title">Balance & Claim</h3>
								<div className="item">
									<p>
										<p>
											Once the transactions has been completed and
											confirmed, your total token would be available
											at the top menu when you connect your wallet.
										</p>
										{/* <p>
											When the presale ends you will be able to
											connect your wallet and claim your tokens.
											Click “Claim tokens” button and accept the
											transaction in Metamask.
										</p> */}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default HowTo;
