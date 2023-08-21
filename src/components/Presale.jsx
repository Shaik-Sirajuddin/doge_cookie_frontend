import React from "react";
import img from "../assets/img/presale.png";
import mask from "../assets/img/roadmap.png";
const Presale = () => {
	return (
		<section
			className="presale-section"
			style={{
				WebkitMask: `url(${mask}) no-repeat top center / cover`,
			}}
		>
			<div className="target-id" id="presale"></div>
			<div className="container">
				<h2 className="presale-title">Presale Stage</h2>
				<div className="row gx-0 gy-5 justify-content-center">
					{data?.map((item, i) => (
						<PresaleCard key={i} {...item} />
					))}
				</div>
			</div>
		</section>
	);
};

const PresaleCard = ({ title, ratio, dck, price }) => {
	return (
		<>
			<div className="col-sm-10 col-md-6 col-xl-4">
				<div
					className="presale-card"
					style={{
						background: `url(${img}) no-repeat center center / 100% 100%`,
					}}
				>
					<h5 className="title">{title}</h5>
					<div className="ratio">{ratio}</div>
					<div className="dck">{dck}</div>
					<div className="price">{price}</div>
				</div>
			</div>
		</>
	);
};

const data = [
	{
		title: "Presale stage 1",
		ratio: "30 Billion (30%)",
		dck: "0.0001$ = 1 DCK, 1$ = 10,000DCK",
		price: "Total stage 1 price = $3,000,000",
	},
	{
		title: "Presale stage 2",
		ratio: "25Billion (25%)",
		dck: "0.00018$ = 1DCK, 1$ = 5555DCK",
		price: "Total stage 2 price = $4,500,000",
	},
	{
		title: "Presale stage 3",
		ratio: "20 Billion (20%)",
		dck: "0.00022$ = 1 DCK, 1$ = 4,545DCK",
		price: 'Total stage 3 price = $4,400,000",',
	},
	{
		title: "Presale stage 4",
		ratio: "15 Billion (15%)",
		dck: "0.00026$ = 1 DCK, 1$=10,000DCK",
		price: 'Total stage 1 price =$3,000,000",',
	},
	{
		title: "Presale Stage 5",
		ratio: "10Billion (10%)",
		dck: "0.00030$ = 1DCK, 1$ =3,333DCK",
		price: "Total stage 5 price =$3,000,000",
	},
];

export default Presale;
