import React from "react";
import styles from "./util.module.scss";

const UnauthorizedAccess = () => {
  return (
    <div className={styles.container}>
      <h2>You do not have permission to access this page.</h2>
    </div>
  );
};

export default UnauthorizedAccess;
