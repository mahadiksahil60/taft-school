"use client";
import React from "react";
import Button from "@mui/material/Button";
import clsx from "clsx";
import styles from "./Footer.module.css";

const Footer = ({ open }) => {
  return (
    <>
      <div
        className={clsx(styles.parentContainer, open ? styles.blurEffect : "")}
      >
        <div className={styles.innerText}>
          <Button
            variant="outlined"
            sx={{
              //   backgroundColor: "#d94171",
              backgroundColor: "#6C7C74",
              color: "white",
              width: "40%",
              height: "100%",
              fontFamily: "Arial",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            RESET
          </Button>
          <Button
            sx={{
              backgroundColor: "var(--red-color)",
              color: "white",
              width: "40%",
              height: "100%",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </>
  );
};

export default Footer;
