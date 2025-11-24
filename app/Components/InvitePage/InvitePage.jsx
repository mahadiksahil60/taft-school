import React, {useState} from 'react';
import styles from "./InvitePage.module.css"
import EmailInput from "@/app/Components/EmailInput/EmailInput.jsx";
import Footer from "@/app/Components/Footer/Footer.jsx";
import Image from "next/image.js";
import logo from "@/public/images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import Loader from "@/app/Components/Loader/Loader.jsx";
import {sendInvite} from "@/app/redux/Coordinator/CoordinatorThunk.js";
import {toast} from "react-toastify";


export default function InvitePage() {

    const dispatch = useDispatch();
    const {isLoading} = useSelector((state) => state.coordinator);
    const [value, setValue] = useState("");
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleReset = () => {
        setValue("")
    }

    const handleSubmit = () => {
        dispatch(sendInvite({email: value, type: "Interpreter"})).then((e) => {
            if (e.meta.requestStatus === "fulfilled") {
                toast.success("Request successfully created!", {
                    autoClose: 300
                })
            } else {
                toast.error("Error sending invite", {
                    autoClose: 300
                })
            }
        }).catch((e) => {
            toast.error("Internal Server Error", {
                autoClose: 300
            })

        }) //hardcode type

        handleReset();
    }

    return (
        <>
            {isLoading && <Loader/>}
            <div className={styles.parentContainer}>

                <div className={styles.innerContainer}>
                    <div className={styles.logoAndHeader}>
                        <Image src={logo} width={70} height={100} alt="logo"/>
                        <span className={styles.heading}>
                Taft Charter
                <br/> High School
              </span>
                    </div>
                    <div className={styles.title}>
                        Invite Interpreter
                    </div>
                    <div className={styles.emailInput}>
                        <EmailInput value={value} onChange={(e) => handleChange(e)}
                                    placeholder={"Enter email you want to invite"}/>
                    </div>

                </div>
                <Footer handleReset={handleReset} handleSubmit={handleSubmit} disable={isLoading}/>
            </div>
        </>
    )
}