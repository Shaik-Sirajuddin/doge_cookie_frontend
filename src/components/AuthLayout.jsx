import React from "react";
import Layout from "./Layout";

const AuthLayout = ({ title, children }) => {
	return (
		<>
			<Layout>
				<section className="auth-section">
					<div className="container">
						<div className="form-wrapper">
							<h5 className="title">{title}</h5>
							{children}
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default AuthLayout;
