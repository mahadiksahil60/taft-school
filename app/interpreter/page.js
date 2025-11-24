"use client";

import Header from "@/app/Components/Header/Header";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Interpreter.module.css";
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
import RequestCard from "../Components/Cards/RequestCard";
import {Requests, Assignments, Users} from "../utils/SampleConstants";
import UserCard from "../Components/UserCards/UserCard";
import {
    acceptRequest,
    deleteRequest,
    fetchAcceptedRequests,
    fetchRequests,
    logout
} from "@/app/redux/interpreter/interpreterThunk.js";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import Loader from "../Components/Loader/Loader.jsx"


const Interpreter = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter();
    const {requests, isLoading} = useSelector((state) => state.interpreter)
    const [isClient, setIsClient] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (selectedOption === 0) {
            dispatch(fetchRequests());
        } else if (selectedOption === 2) {
            dispatch(fetchAcceptedRequests({past_assignment: true}));
        } else {
            dispatch(fetchAcceptedRequests({}));
        }
    }, [dispatch, selectedOption]);


    const menuOnClick = () => {
        setOpen(!open);
    };

    if (!isClient) {
        return null;
    }

    const userButtons = [
        {
            text: "Requests",
            onclick: () => {
                setSelectedOption(0);
                setOpen(false);
            },
        },
        {
            text: "Assignments",
            onclick: () => {
                console.log("clicked");
                setSelectedOption(1);
                setOpen(false);
            },
        },
        {
            text: "Past Assignments",
            onclick: () => {
                console.log("clicked");
                setSelectedOption(2);
                setOpen(false);
            },
        },
        {
            text: "Log out",
            onclick: () => {
                console.log("clicked");
                dispatch(logout())
                router.push("/")
            },
        }
    ];

    const handleAcceptRequests = (id) => {
        dispatch(acceptRequest({request_id: id})).then(() => {
            dispatch((fetchRequests()))
        })
        toast.success("request accepted", {
            autoClose: 200
        });
    }

    const handleDeleteRequests = (id) => {
        dispatch(deleteRequest({request_id: id})).then(() => {
            dispatch((fetchAcceptedRequests({})))
        })
        toast.success("request removed", {
            autoClose: 200
        });
    }


    const layout = () => {
        switch (selectedOption) {
            case 0:
                return {
                    title: "Request",
                    handleClick: handleAcceptRequests
                }

            case 1:
                return {
                    title: "Assignments",
                    handleClick: handleDeleteRequests
                }

            case 2:
                return {
                    title: "Past Assignments",
                    handleClick: handleDeleteRequests
                }
        }

    }

    return (
        <>
            {isLoading && <Loader/>}
            <div className={clsx(styles.parentContainer)}>
                <Header
                    title={layout().title}
                    menuOnClick={menuOnClick}
                    open={open}
                />
                <Sidebar options={userButtons} open={open} setOpen={setOpen} sidebarHeading={"Select Requests"}/>
                <div className={clsx(styles.pageBody, open ? styles.blurEffect : "")}>
                    <div className={styles.innerDiv}>
                        <div className={styles.cards}>
                            {requests && requests.length > 0 ? requests?.map((card, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <RequestCard
                                            RequestObject={card}
                                            type={layout().title}
                                            handleClick={() => layout().handleClick(card.id)}
                                        />

                                    </React.Fragment>
                                );
                            }) : <div className={styles.noRequestsFound}>No requests</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Interpreter;
