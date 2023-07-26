import React from "react";
import dog1 from "../assets/img/dog-5.png";
import dog2 from "../assets/img/dog-6.png";
import mask from "../assets/img/roadmap.png";
const WhyDocCookie = () => {
	return (
		<section
			className="why-doge-cookie-section"
			style={{
				WebkitMask: `url(${mask}) no-repeat top center / 100% 100%`,
			}}
		>
			<div className="overflow-hidden">
				<div className="container text-center">
					<div className="why-content">
						<h2 className="title">Why Doge Cookie?</h2>
						<img src={dog1} alt="" className="why-dog-1" />
						<img src={dog2} alt="" className="why-dog-2" />
						<div className="content">
							<p>
								Today, there are hundreds of meme coin tokens out there,
								but most of these tokens are worthless because they do
								not have utility (use cases). On this note, many of
								these tokens are used primarily for speculations and
								trading, thus making them subjected to extreme
								volatility.
							</p>
							<p>
								In the case of DogeCookie, our team of crypto expert,
								has put in place some exceptional use cases that will
								help the token fulfil the law of demand. The higher the
								demand, the higher the price. These use cases would help
								the token price soar.
							</p>
							<p>
								Community members can participate in vote to earn, where
								weekly winners are rewarded. Also, Community Networking
								where members can take advantage of the refer and earn
								system, Participant gets some certain percentage of what
								their invitee purchases.
							</p>
							<p>
								All these and many more are the KPIs that would help
								sustain our token and help us maintain the 1000X nature
								in our genes. Dogecookie is certainly set for greater
								things. We are not just a meme token; we are a meme
								token with a purpose.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyDocCookie;
