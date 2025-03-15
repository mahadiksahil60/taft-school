"use client";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import styles from "./Header.module.css";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import BellIcon from "@/public/images/BellIcon.png"
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = ({ menuOnClick, open, title, scheduleMode }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={clsx(styles.parentContainer, open ? styles.blurEffect : "")}
      >
        {!scheduleMode  ? <MenuIcon
          onClick={() => menuOnClick()}
          sx={{
            fontSize: "30px",
            color: "white",
          }}
        /> : 
        <div style={{fontSize: "30px", width: "30px"}}>
          
        </div>
        }
        <div className={styles.innerText}>{title}</div>
        <div className={styles.bellIcon}>
       
          {!scheduleMode ? <Image
          src={BellIcon}
          alt="bell icon logo"
          onClick={() => router.push("/schedule")}
          
          /> :
           <ExitToAppRoundedIcon sx={{
            height: "90%",
            width: "100%",
            color: "whitesmoke",
            }} 
            onClick={() => router.push("/")}
            /> 
           }
        </div>
      </div>
    </>
  );
};

export default Header;

