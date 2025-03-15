"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button } from "@mui/material";

const Sidebar = ({ options, open, setOpen }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false); // Close sidebar
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      // document.body.style.filter = "blur(50px)";
    } else {
      // document.body.style.filter = "none";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.filter = "none";
    };
  }, [open, setOpen]);

  if (open) {
    return (
      <div className={styles.parentContainer} ref={sidebarRef}>
        <div className={styles.backButton}>
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "30px",
              height: "80%",
              fontWeight: "bold",
              color: "white",
            }}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={styles.headerText}>Log In </div>
        <div className={styles.buttons}>
          {options?.map((button, index) => {
            return (
              <React.Fragment key={index}>
                <button className={styles.login2} onClick={button.onclick}>
                  {button.text}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Sidebar;
