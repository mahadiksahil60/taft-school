"use client";
import react, { use, useEffect, useState } from "react";
import styles from "./interpreter-sign-up.module.css";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Footer from "../Components/Footer/Footer";
import { Button, TextField } from "@mui/material";
import PasswordField from "../Components/PasswordField/PasswordField";
import { CheckBox } from "@mui/icons-material";
import { z } from "zod";
import { makeApiCall } from "../utils/commonApiFunction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const InterpreterSignIn = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    code: "",
    receive_email: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const registerSchema = z.object({
    username: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Minimum 6 characters" }),
    code: z.string().min(1, { message: "Registration Code is required" }),
  });

  const validateForm = (data) => {
    const result = registerSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formattedErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])
      );
      setErrors(formattedErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleOnChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      receive_email: checked,
    }));
  };

  const handleReset = () => {
    setFormData(() => ({
      username: "",
      email: "",
      password: "",
      code: "",
      receive_email: false,
    }));
    setErrors({});
  };

  const handleSubmit = async () => {
    const isValid = validateForm(formData);
    if (!isValid) return;
    try {
      const response = await makeApiCall(
        "POST",
        "/api/interpreter-sign-up",
        formData
      );
      console.log(response, "response");
      toast.success(response?.message);
      router.push("/");
    } catch (error) {
      console.log(error, "error");
      toast.error(error);
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.header}>
        <Image src={logo} width={70} height={90} alt="logo" />
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
            value={formData.name}
            onChange={(e) => handleOnChange(e, "username")}
            // InputLabelProps={{ shrink: true }}
            placeholder="Enter your name"
            error={!!errors.username}
            helperText={errors.username}
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
            value={formData.email}
            onChange={(e) => handleOnChange(e, "email")}
            // InputLabelProps={{ shrink: true }}
            placeholder="Enter your email"
            error={!!errors.email}
            helperText={errors.email}
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
            value={formData.password}
            onChange={(e) => handleOnChange(e, "password")}
            error={!!errors.password}
            helperText={errors.password}
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
            value={formData.code}
            onChange={(e) => handleOnChange(e, "code")}
            // InputLabelProps={{ shrink: true }}
            placeholder="Enter the registration code"
            error={!!errors.code}
            helperText={errors.code}
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className={styles.checkboxdiv}>
          <input
            type="checkbox"
            value={formData.receive_email}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <span className={styles.question}>
            Receive email notification for new requests
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.innerText}>
          <Button
            variant="outlined"
            onClick={handleReset}
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
            onClick={handleSubmit}
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
