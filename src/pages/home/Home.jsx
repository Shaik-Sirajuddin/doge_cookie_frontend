import React from "react";
import About from "../../components/About";
import Banner from "../../components/Banner";
import BecomeMember from "../../components/BecomeMember";
import ComingSoon from "../../components/ComingSoon";
import Layout from "../../components/Layout";
import Presale from "../../components/Presale";
import Roadmap from "../../components/Roadmap";
import StakeToEarn from "../../components/StakeToEarn";
import Tokenomics from "../../components/Tokenomics";
import VoteToEarn from "../../components/VoteToEarn";
import WhyDocCookie from "../../components/WhyDocCookie";

const Home = () => {
	return (
		<Layout>
			<Banner />
			<About />
			<VoteToEarn />
			<BecomeMember />
			<StakeToEarn />
			<WhyDocCookie />
			<Tokenomics />
			<Presale />
			<Roadmap />
			<ComingSoon />
		</Layout>
	);
};

export default Home;
