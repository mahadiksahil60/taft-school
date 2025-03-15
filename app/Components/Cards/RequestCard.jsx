import React from "react";
import styles from "./RequestCard.module.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteIcon from "@mui/icons-material/Delete";
import RequestCardImg from "@/public/images/requestcard.png"
import secondRequestImg from "@/public/images/RequestCardImg2.png"
import Image from "next/image";

const RequestCard = ({ RequestObject, type }) => {
  const role = "interpreter";

  const giveLayout = () => {
    switch (role) {
      case "interpreter":
        return (
          <>
            <section className={styles.textualInfo}>
              <section className={styles.row}>
                <span className={styles.cell}>
                  {RequestObject.student_name}
                </span>
                <span className={styles.cell}>
                  Event: {RequestObject.name_of_event}
                </span>
              </section>
              <section className={styles.row}>
                <span className={styles.cell}>
                  {RequestObject.student_email}
                </span>
                <span className={styles.cell}>{RequestObject.location}</span>
              </section>
              <section className={styles.row}>
                <span className={styles.cell}>
                  Date: {RequestObject.date_of_event}{" "}
                  {RequestObject.time_of_event}
                </span>
              </section>
            </section>
            <section className={styles.buttons}>
              {type === "Request" ? (
                <AddTaskIcon
                  sx={{
                    color: "var(--red-color)",
                    height: "70%",
                    width: "70%",
                  }}
                />
              ) : (
                <DeleteIcon
                  sx={{
                    color: "var(--red-color)",
                    height: "70%",
                    width: "70%",
                  }}
                />
              )}
            </section>
          </>
        );
      default:
        return (
          <>
            <section className={styles.textualInfo}>
              <section className={styles.row}>
                <span className={styles.cell}>
                  {RequestObject.student_name}
                </span>
                <span className={styles.cell}>
                  Event: {RequestObject.name_of_event}
                </span>
              </section>
              <section className={styles.row}>
                <span className={styles.cell}> </span>
                <span className={styles.cell}>{RequestObject.location}</span>
              </section>
              <section className={styles.row}>
                <span className={styles.cell}>
                  Date: {RequestObject.date_of_event}{" "}
                  {RequestObject.time_of_event}
                </span>
              </section>
            </section>
            <section className={styles.buttons}>
              {type === "Request" ? (
                <DeleteIcon
                  sx={{
                    color: "var(--red-color)",
                    height: "70%",
                    width: "70%",
                  }}
                />
              ) : (
                <DeleteIcon
                  sx={{
                    color: "var(--red-color)",
                    height: "70%",
                    width: "70%",
                  }}
                />
              )}
            </section>
          </>
        );
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.icon}>
        <Image 
        src={secondRequestImg}
        alt="Request"
        />
        {/* <PersonAddIcon
          sx={{
            color: "var(--red-color)",
            height: "100%",
            width: "100%",
          }}
        /> */}
      </div>
      <div className={styles.info}>{giveLayout()}</div>
    </div>
  );
};

export default RequestCard;
