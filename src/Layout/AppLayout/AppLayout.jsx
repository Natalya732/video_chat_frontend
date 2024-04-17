import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import styles from "./AppLayout.module.scss";

function AppLayout() {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.root.user);

  useEffect(() => {
    if (!userDetails?._id && !window.location.href.includes("/auth"))
      navigate("/auth");
  }, [userDetails?._id]);

  return (
    <div className={styles.container}>
      {/* <Navbar /> */}
      {/* {bannerDetails.text && <Banner />} */}

      <div className={styles.inner}>
        <Outlet />

        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default AppLayout;
