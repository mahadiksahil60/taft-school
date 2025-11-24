"use client"
import Header from "@/app/Components/Header/Header";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./Request.module.css";
import logo from "@/public/images/logo.png";
import Footer from "@/app/Components/Footer/Footer";
import dynamic from "next/dynamic";
import {InputLabel, TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {
    MobileDatePicker,
    MobileDateTimePicker,
    MobileTimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {createRequests} from "@/app/redux/Requests/RequestThunk.js";
import {toast} from "react-toastify";
import Loader from "../../Components/Loader/Loader.jsx"

const Request = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const {isLoading} = useSelector((state) => state.requests);
    const [formData, setFormData] = useState({
        student_name: "",
        student_email: "",
        name_of_event: "",
        time_of_event: null,
        location_of_event: "",
        date: null
    })

    useEffect(() => {
        setIsClient(true);
    }, []);


    const menuOnClick = () => {
        setOpen(!open);
    };

    if (!isClient) {
        return null;
    }

    const userButtons = [
        {
            text: "Admin",
            onclick: () => {
                console.log("admin clicked");
            },
        },
        {
            text: "Coordinator",
            onclick: () => {
                router.push("/coordinator-sign-in");
            },
        },
        {
            text: "Interpreter",
            onclick: () => {
                router.push("/interpreter-sign-in");
            },
        },
    ];

    const handleFormChange = (value, field) => {
        setFormData({...formData, [field]: value});
    }

    const handleSubmit = () => {
        dispatch(createRequests(formData)).then(() => {
            toast.success("Request successfully created!", {
                autoClose: 200
            });
        }).catch((error) => {
            toast.error("Failed to create request!", {
                autoClose: 200
            });
        })
        handleReset()
    }

    const handleReset = () => {
        setFormData({
            student_name: "",
            student_email: "",
            name_of_event: "",
            time_of_event: null,
            location_of_event: "",
            date: null
        })
    }

    return (
        <>
            {isLoading && <Loader/>}
            <div className={clsx(styles.parentContainer)}>
                <Header
                    title={"Interpreter Request Form"}
                    menuOnClick={menuOnClick}
                    open={open}
                />
                <Sidebar options={userButtons} open={open} setOpen={setOpen} sidebarHeading={"Log In "}/>
                <div
                    className={clsx(styles.pageBody, open ? styles.blurEffect : "")}
                    tabIndex={open ? -1 : 0}
                >
                    <div className={styles.innerDiv}>
                        <div className={styles.logoAndHeader}>
                            <Image src={logo} width={70} height={100} alt="logo"/>
                            <span className={styles.heading}>
                Taft Charter
                <br/> High School
              </span>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.cell}>
                                <TextField
                                    id="outlined-basic"
                                    label="Student Name"
                                    fullWidth
                                    variant="outlined"

                                    // InputLabelProps={{ shrink: true }}
                                    placeholder="Enter your name"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    value={formData.student_name}
                                    onChange={(e) => handleFormChange(e.target.value, "student_name")}
                                />
                            </div>
                            <div className={styles.cell}>
                                <TextField
                                    id="outlined-basic"
                                    label="Student Email"
                                    variant="outlined"
                                    fullWidth
                                    // InputLabelProps={{ shrink: true }}
                                    placeholder="Enter your email"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    value={formData.student_email}
                                    onChange={(e) => handleFormChange(e.target.value, "student_email")}
                                />
                            </div>
                            <div className={styles.cell}>
                                <TextField
                                    id="outlined-basic"
                                    label="Name of event"
                                    variant="outlined"
                                    fullWidth
                                    // InputLabelProps={{ shrink: true }}
                                    placeholder="Enter name of event"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    value={formData.name_of_event}
                                    onChange={(e) => handleFormChange(e.target.value, "name_of_event")}
                                />
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className={styles.timecell}>
                                    <MobileDatePicker
                                        label={"Enter event date"}
                                        sx={{
                                            width: "48.5%",
                                        }}
                                        value={formData.date}
                                        onChange={(value) => handleFormChange(value, "date")}
                                    />
                                    <MobileTimePicker
                                        label={"Enter event time"}
                                        openTo="minutes"
                                        sx={{
                                            width: "48.5%",
                                        }}
                                        value={formData.time_of_event}
                                        onChange={(value) => handleFormChange(value, "time_of_event")}
                                    />
                                </div>
                            </LocalizationProvider>
                            <div className={styles.cell}>
                                <TextField
                                    id="outlined-basic"
                                    label="Location"
                                    fullWidth
                                    variant="outlined"
                                    // InputLabelProps={{ shrink: true }}
                                    placeholder="Enter Location of event"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    value={formData.location_of_event}
                                    onChange={(e) => handleFormChange(e.target.value, "location_of_event")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer open={open} handleReset={handleReset} handleSubmit={handleSubmit}/>
            </div>
        </>
    );
};

export default Request;
