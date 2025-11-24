"use client";
import react, { useEffect, useState } from "react";
import styles from "./interpreter-sign-up.module.css";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Footer from "../Components/Footer/Footer";
import { Button, TextField } from "@mui/material";
import PasswordField from "../Components/PasswordField/PasswordField";
import { CheckBox } from "@mui/icons-material";

const InterpreterSignIn = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={styles.parentContainer}>
      <div className={styles.header}>
        <Image src={logo} width={60} height={90} alt="logo" />
        <span style={{ fontSize: "1.3em" }}>Welcome</span>
        <span>You've been invited as an</span>
        <span style={{ fontSize: "1.1em", color: "var(--red-color)" }}>
          Interpreter
        </span>
      </div>
      <div className={styles.form}>
        <div className={styles.cell}>
          <TextField
            id="outlined-basic"
            label="Enter your name"
            fullWidth
            variant="outlined"
            // InputLabelProps={{ shrink: true }}
            placeholder="Enter your name"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className={styles.cell}>
          <TextField
            id="outlined-basic"
            label="Enter your email"
            variant="outlined"
            fullWidth
            // InputLabelProps={{ shrink: true }}
            placeholder="Enter your email"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className={styles.cell}>
          <PasswordField
            label="Enter your password"
            // InputLabelProps={{ shrink: true }}
            placeholder="Enter your password"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className={styles.cell}>
          <TextField
            id="outlined-basic"
            label="Enter the registration code"
            fullWidth
            variant="outlined"
            // InputLabelProps={{ shrink: true }}
            placeholder="Enter the registration code"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className={styles.checkboxdiv}>
          <input type="checkbox" />
          <span className={styles.question}>
            Want to get email notification for new requests ?
          </span>
        </div>
      </div>
      <div className={styles.footer}>
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
    </div>
  );
};

export default InterpreterSignIn;
