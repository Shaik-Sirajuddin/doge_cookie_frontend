import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div>
          <InfinitySpin width="200" color="#FFAC40" />
        </div>
      </div>
    </>
  );
};

export default Loader;
