import React from "react";
import title from "../assets/img/become-member.png";
import img from "../assets/img/dog-3.png";
import mask from "../assets/img/roadmap.png";
import shapes1 from "../assets/img/shapes-1.png";
const BecomeMember = () => {
	return (
		<section
			className="become-member-section bg-base"
			style={{
				WebkitMask: `url(${mask}) no-repeat center center / 100% 100%`,
			}}
		>
			<img src={shapes1} alt="" className="shapes1" />
			<div className="container">
				<div className="member-content">
					<img src={img} alt="" className="main-img mw-100" />
					<img src={title} alt="" className="title" />
					<p>
						This is a form of referral system, it is another way to earn
						without having to stake or vote on Doge cookie platform. This
						will be accessible to existing members and newbies. To become
						a part of this, Membership registration must take place on
						Doge cookie web, Once registered, on every member dashboard
						contains a unique code which is set to be a referral code and
						proof of referral.
					</p>
					<p>
						When such code is being used, once all 10 or 5 referral phases
						are being completed, Such individual automatically earn
						certain percentage depending on the referral plan at the end
						of every referral stage. In a case where target have not been
						met, points acquired in such phase will be calculated in
						percentage or points. This is dependent on the referral plan.
					</p>
				</div>
			</div>
		</section>
	);
};

export default BecomeMember;
