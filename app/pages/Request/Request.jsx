import Header from "@/app/Components/Header/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./Request.module.css";
import logo from "@/public/images/logo.png";
import Footer from "@/app/Components/Footer/Footer";
import dynamic from "next/dynamic";
import { InputLabel, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  MobileDatePicker,
  MobileDateTimePicker,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Sidebar from "@/app/Components/Sidebar/Sidebar";

const Request = () => {
  const [open, setOpen] = useState(false);

  const [isClient, setIsClient] = useState(false);

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
        console.log("Coordinator clicked");
      },
    },
    {
      text: "Interpreter",
      onclick: () => {
        console.log("Admin clicked");
      },
    },
  ];

  return (
    <>
      <div className={clsx(styles.parentContainer)}>
        <Header
          title={"Interpreter Request Form"}
          menuOnClick={menuOnClick}
          open={open}
        />
        <Sidebar options={userButtons} open={open} setOpen={setOpen} />
        <div className={clsx(styles.pageBody, open ? styles.blurEffect : "")}   tabIndex={open ? -1 : 0}
        >
          <div className={styles.innerDiv}>
            <div className={styles.logoAndHeader}>
              <Image src={logo} width={70} height={100} alt="logo" />
              <span className={styles.heading}>
                Taft Charter
                <br /> High School
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
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className={styles.timecell}>
                  <MobileDatePicker
                    label={"Enter event date"}
                    sx={{
                      width: "48.5%",
                    }}
                  />
                  <MobileTimePicker
                    label={"Enter event time"}
                    openTo="minutes"
                    sx={{
                      width: "48.5%",
                    }}
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
                />
              </div>
            </div>
          </div>
        </div>
        <Footer open={open} />
      </div>
    </>
  );
};

export default Request;
