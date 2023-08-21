import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Pen } from "../../components/Icon";
import InputControl from "../../components/InputControl";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { errorToast, succesToast } from "../../utls/toast/toast";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const [users, setUsers] = useState({});
  const { user, logOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user.email === "admin@gmail.com") {
      setIsLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/admin/users`,
          {
            securityCode: 909,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => setUsers(res.data))
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      errorToast("UnAuthorized !");
    }
  }, [token, user]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [badgetText, setBadgeText] = useState("");

  const navigate = useNavigate();

  const updateBadge = (userId) => {
    if (badgetText.length || badgetText === "Select") {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/admin/users/${userId}/badge`,
          {
            badge: badgetText,
            securityCode: 909,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message === "User badge updated successfully") {
            succesToast("Badge changed succesfully!");
            setTimeout(() => {
              navigate(0);
            }, 500);
          }
        })
        .catch((err) => {
          errorToast();
        });
    } else {
      errorToast("Select badge name.");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout>
          <section className="account-section">
            <div className="container">
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-32">
                <h4 className="title m-0">All Users</h4>
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
                    {users?.length > 0 ? (
                      users.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <div className="d-flex align-items-center">
                              {item?.badge}
                              <button
                                type="button"
                                className="no-gutter edit-badge-button ms-2"
                                data-bs-toggle="modal"
                                data-bs-target="#change-badge"
                                onClick={() => setSelectedUser(item)}
                              >
                                <Pen />
                              </button>
                            </div>
                          </td>
                          <td>{item?.email}</td>
                          <td>{item?.packageId}</td>
                          <td>{item?.referralCode}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={12} className="border border-base">
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

          <div
            className="modal fade"
            id="change-badge"
            tabindex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content __modal-content mx-auto"
                style={{ maxWidth: "472px" }}
              >
                <div className="modal-header align-items-center border-0 mb-2">
                  <h5 className="modal-title m-0">Change Customer Badge</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-20">
                    <span className="me-2">{selectedUser?.email}</span>
                    <span className="badge bg-base">{selectedUser?.badge}</span>
                  </div>
                  <div className="mb-20">
                    <InputControl
                      label="Select New badge"
                      select={selectData}
                      onChange={(e) => setBadgeText(e.target.value)}
                    />
                  </div>
                  {/* <div className="mb-20">
                    <InputControl
                      onChange={(e) => setBadgeText(e.target.value)}
                      placeholder="Ex : default"
                      label="Enter Badge name"
                    />
                  </div> */}
                  <div className="pt-2"></div>
                  <button
                    type="submit"
                    className="cmn-btn style-2"
                    /*                     data-bs-dismiss="modal" */
                    onClick={() => updateBadge(selectedUser._id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

const selectData = [
  {
    value: "Select",
    text: "Select",
  },
  {
    value: "Sponge",
    text: "Sponge",
  },
  {
    value: "Shrimp",
    text: "Shrimp",
  },
  {
    value: "Crab",
    text: "Crab",
  },
  {
    value: "Octopus",
    text: "Octopus",
  },
  {
    value: "Fish",
    text: "Fish",
  },
  {
    value: "Dolphin",
    text: "Dolphin",
  },
  {
    value: "Shark",
    text: "Shark",
  },
  {
    value: "Whale",
    text: "Whale",
  },
  {
    value: "Blue whale",
    text: "Blue whale",
  },
  {
    value: "Timekeeper",
    text: "Timekeeper",
  },
  {
    value: "DogeStars",
    text: "DogeStars",
  },
];

export default MyAccount;
