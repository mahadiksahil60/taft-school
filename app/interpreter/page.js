"use client";
import Header from "@/app/Components/Header/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./Interpreter.module.css";
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
import RequestCard from "../Components/Cards/RequestCard";
import { Requests, Assignments, Users } from "../utils/SampleConstants";
import UserCard from "../Components/UserCards/UserCard";

const Interpreter = () => {
  const [open, setOpen] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const menuOnClick = () => {
    setOpen(!open);
  };

  useEffect(() => {}, [selectedOption]);

  const giveData = () => {
    switch (selectedOption) {
      case 0:
        return {
          title: "Requests",
          data: Requests,
          type: "Request",
        };
      case 1:
        return {
          title: "Assignments",
          data: Assignments,
          type: "Assignment",
        };

      case 2:
        return {
          title: "Users",
          data: Users,
          type: "User",
        };
      default:
        break;
    }
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
      text: "Users",
      onclick: () => {
        setSelectedOption(2);
        setOpen(false);
      },
    },
  ];

  const cards = [
    {
      title: "request 1",
    },
    {
      title: "request 1",
    },
    {
      title: "request 1",
    },
    {
      title: "request 1",
    },
  ];

  return (
    <>
      <div className={clsx(styles.parentContainer)}>
        <Header
          title={giveData().title}
          menuOnClick={menuOnClick}
          open={open}
        />
        <Sidebar options={userButtons} open={open} setOpen={setOpen} />
        <div className={clsx(styles.pageBody, open ? styles.blurEffect : "")}>
          <div className={styles.innerDiv}>
            <div className={styles.cards}>
              {giveData().data?.map((card, index) => {
                return (
                  <React.Fragment key={index}>
                    {selectedOption === 2 ? (
                      <UserCard RequestObject={card} />
                     
                    ) : (
                      <RequestCard
                      RequestObject={card}
                      type={giveData().type}
                    />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interpreter;
