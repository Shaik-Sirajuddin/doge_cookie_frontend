import React from "react";
import Layout from "../../components/Layout";

const MyAccount = () => {
	return (
		<>
			<Layout>
				<section className="account-section">
					<div className="container">
						<div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-32">
							<h4 className="title m-0">My Account</h4>
							<button className="logout-btn" type="button">
								Log out
							</button>
						</div>
						<div className="table-responsive">
							<table className="table __table">
								<thead>
									<tr>
										<th>Badge</th>
										<th>Email</th>
										<th>Package ID</th>
										<th>Referral Code</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="p-0 h-8px" colSpan={12}></td>
									</tr>
									{data?.length > 0 ? (
										data.map((item, i) => (
											<tr key={i}>
												<td>{item?.badge}</td>
												<td>{item?.email}</td>
												<td>{item?.packageId}</td>
												<td>{item?.referral}</td>
											</tr>
										))
									) : (
										<tr>
											<td
												colSpan={12}
												className="border border-base"
											>
												<div className="empty-text text-center">
													None Yet!
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

const data = [
	{
		badge: "#402",
		email: "johndoe@dogecookie.com",
		packageId: "20491",
		referral: "JDOW1ne4X",
	},
	{
		badge: "#3244",
		email: "Peterdoe@dogecookie.com",
		packageId: "23424",
		referral: "POE49EO03",
	},
];

export default MyAccount;
