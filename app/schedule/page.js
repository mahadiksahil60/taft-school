"use client";
import Header from "@/app/Components/Header/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Button, InputLabel, TextField } from "@mui/material";
import Professional from "@/public/images/Professional.png";
import Regular from "@/public/images/Regular.png";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import axios from "axios";
import { makeApiCall } from "../utils/commonApiFunction";
import styles from "./schedule.module.css";
import { motion } from "framer-motion";

const Schedule = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const menuOnClick = () => {
    setOpen(!open);
  };

  console.log("this is gf");

  if (!isClient) {
    return null;
  }

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", selectedImage ? "regular" : "professional");
      const response = await makeApiCall(
        "POST",
        "/api/upload-schedule/",
        formData,
        { "Content-Type": "multipart/form-data" }
      );
      // api link
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Store the uploaded file
  };

  // const giveSchedule = () => {
  //   if (selectedImage) {
  //     return <Image src={Regular} alt="Regular Schedule" />;
  //   } else {
  //     return <Image src={Professional} alt="Professional Schedule" />;
  //   }
  // };

  return (
    <>
      <div className={clsx(styles.parentContainer)}>
        <Header
          title={"Schedule"}
          scheduleMode={true}
          //   menuOnClick={menuOnClick}
          //   open={open}
        />
        // NOTE : not here
        {/* <Sidebar options={userButtons} open={open} setOpen={setOpen} /> */}
        <div
          className={clsx(styles.pageBody, open ? styles.blurEffect : "")}
          tabIndex={open ? -1 : 0}
        >
          <div className={styles.innerDiv}>
            <div
              className={styles.schedule}
              onClick={() => setSelectedImage(!selectedImage)}
            >
              <motion.div
                className={styles.cardInner}
                animate={{ rotateY: selectedImage ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className={styles.cardFront}>
                  {/* {giveSchedule()} */}
                  <Image src={Professional} alt="Professional Schedule" />
                </div>
                <div className={styles.cardBack}>
                  <Image src={Regular} alt="Regular Schedule" />
                </div>
              </motion.div>
            </div>
            <div className={styles.scheduleText}>
              <span>
                {selectedImage
                  ? "Regular Schedule"
                  : "Professional Development"}
              </span>
            </div>
            <div className={styles.mediaPicker}>
              {selectedFile ? (
                <p style={{ padding: "0", margin: "0" }}>{selectedFile.name}</p>
              ) : (
                <p style={{ padding: "0", margin: "0" }}>&nbsp;&nbsp;</p>
              )}
              {selectedFile === null ? (
                <>
                  <input
                    type="file"
                    id="file-upload"
                    style={{ display: "none" }} // Hide the default input
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      variant="contained"
                      component="span"
                      sx={{
                        width: "100%",

                        color: "white",
                      }}
                    >
                      Upload Image &nbsp;&nbsp;
                      <CloudUploadRoundedIcon />
                    </Button>
                  </label>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      color: "white",
                    }}
                    onClick={handleFileUpload}
                  >
                    Save &nbsp;&nbsp;
                    <CloudUploadRoundedIcon />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <Footer open={open} /> */}
      </div>
    </>
  );
};

export default Schedule;
