import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "@/Components/Button/Button";

import authGirl from "@/assets/images/authentication-girl.svg";

import styles from "./AuthPage.module.scss";

function AuthPage() {
  const googleSignInButtonRef = useRef();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.root.user);
  const isMobileView = useSelector((state) => state.root.mobileView);
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);

  const initializeGsi = (fallback = "") => {
    if (!window.google) return;

    const href = window.location.href;
    const queryParams = href.split("?")[1] || "";

    const googleRedirectUrl = `${
      import.meta.env.VITE_BACKEND_URL
    }/user/google-login?origin=${
      window.location.origin
    }&fallback=${fallback}&query=${queryParams}`;

    setTimeout(() => setLoading(false), 1200);

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      ux_mode: "redirect",
      login_uri: googleRedirectUrl,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("g_id_signin"),
      { theme: "outline", size: "large", width: 390 }
    );
  };

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const fallback = searchParams.get("fallback");
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("v-c-token", accessToken);

      if (fallback && fallback !== "null") window.location.replace(fallback);
      else window.location.replace(query ? `/?${query}` : "/");
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => initializeGsi(fallback);
    script.async = true;
    script.id = "google-client-script";
    document.body.appendChild(script);

    return () => {
      if (window.google) window.google.accounts.id.cancel();

      document.getElementById("google-client-script")?.remove();
    };
  }, []);

  useEffect(() => {
    if (userDetails._id) navigate("/");
  }, [userDetails]);

  const googleLoginButton = (
    <Button
      className={styles.googleButton}
      onClick={() =>
        googleSignInButtonRef.current
          ? googleSignInButtonRef.current.click()
          : ""
      }
      disabled={loading}
      useSpinnerWhenDisabled
      withArrow
    >
      <div
        className={styles.actualGoogleButton}
        ref={googleSignInButtonRef}
        id="g_id_signin"
        data-width={isMobileView ? 350 : 410}
      />
      Google login
    </Button>
  );

  return (
    <div className={`${styles.container} blur-`}>
      <div className={styles.left}>
        <img src={authGirl} alt="Login" />

        <div className={`blurry-ball ${styles.ball}`} />
        <div
          className={`blurry-ball ${styles.ball2}`}
          style={{ animationDelay: "6s" }}
        />
      </div>

      <div className={styles.right}>
        <div className={styles.box}>
          <p className="heading-big">Login into app </p>
          <p className="desc">Quickly get started by logging via google </p>
          {googleLoginButton}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
