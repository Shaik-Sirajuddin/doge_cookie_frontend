import React from "react";
import Layout from "../../components/Layout";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <section className="account-section">
          <div className="container">
            <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-32">
              <h4 className="title m-0">My Account</h4>
              <button
                onClick={() => logOut(navigate)}
                className="logout-btn"
                type="button"
              >
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
                  <tr>
                    <td>{user?.badge}</td>
                    <td>{user?.email}</td>
                    <td>{user?.packageId}</td>
                    <td>{user?.referralCode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Dashboard;
