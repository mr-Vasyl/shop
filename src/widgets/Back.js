import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Back.module.css";

const Back = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)} className={styles.back}>
        Back
      </button>
    </>
  );
};

export default Back;
