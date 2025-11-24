"use client";
import react, {use, useEffect, useState} from "react";
import styles from "./Coordinator-sign-in.module.css";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Footer from "../Components/Footer/Footer";
import {Button, TextField} from "@mui/material";
import PasswordField from "../Components/PasswordField/PasswordField";
import {CheckBox} from "@mui/icons-material";
import {z} from "zod";
import {makeApiCall} from "../utils/commonApiFunction";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import Header from "../Components/Header/Header";

const InterpreterSignIn = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "Coordinators",
        remember: false,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const registerSchema = z.object({
        email: z.string().email({message: "Enter a valid email"}),
        password: z.string().min(6, {message: "Minimum 6 characters"}),
    });

    const handleCheckboxChange = (e) => {
        const {checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            remember: checked,
        }));
    };

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

    const handleReset = () => {
        setFormData((prev) => ({
            ...prev,
            email: "",
            password: "",
        }));
        setErrors({});
    };

    const handleSubmit = async () => {
        const isValid = validateForm(formData);
        if (!isValid) return;
        try {
            const response = await makeApiCall(
                "POST",
                "/api/coordinator/coordinator-sign-in",
                formData
            );
            toast.success(response?.message);
            router.push("/coordinator")
        } catch (error) {
            toast.error(error);
        }
    };

    const menuOnClick = () => {
        setOpen(!open);
    };

    return (
        <div className={styles.parentContainer}>
            <Header
                title={"Coordinator Sign In"}
                menuOnClick={menuOnClick}
                scheduleMode={true}
                open={open}
            />
            <div className={styles.logoAndHeader}>
                <Image src={logo} width={70} height={100} alt="logo"/>
                <span className={styles.heading}>
          Taft Charter
          <br/> High School
        </span>
            </div>
            <div className={styles.form}>
                <div className={styles.cell}>
                    <span className={styles.login}>Log In</span>
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
                <div className={styles.checkboxdiv}>
                    <input
                        type="checkbox"
                        value={formData.receive_email}
                        onChange={(e) => handleCheckboxChange(e)}
                    />
                    <span className={styles.question}>Remember me</span>
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
                        CLEAR
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
                        SIGN IN
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InterpreterSignIn;
