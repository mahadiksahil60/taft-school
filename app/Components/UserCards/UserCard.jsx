import React from "react";
import styles from "./UserCard.module.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserCard = ({ RequestObject, type }) => {
  const role = "admin";
  const giveLayout = () => {
    switch (role) {
      case "interpreter":
        return (
          <>
            <section className={styles.textualInfo}>
              <section className={styles.row}>
                <span className={styles.cell}>
                  Name: {RequestObject.name}
                </span>
                {/* <span className={styles.cell}>
                  Event: {RequestObject.name_of_event}
                </span> */}
              </section>
              <section className={styles.row}>
                <span className={styles.cell}>
                  Email: {RequestObject.email}
                </span>
                {/* <span className={styles.cell}>{RequestObject.location}</span> */}
              </section>
              <section className={styles.row}>
                <span className={styles.cell}>
                  Role: {RequestObject.role}{" "}
                  {/* {RequestObject.time_of_event} */}
                </span>
              </section>
            </section>
            <section className={styles.buttons}>
              {/* {type === "Request" ? (
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
              )} */}
            </section>
          </>
        );
      default:
        return (
          <>
            <section className={styles.textualInfo}>
              <section className={styles.row}>
                <span className={styles.cell}>
                  Name: {RequestObject.name}
                </span>
            
              </section>
              <section className={styles.row}>
                <span className={styles.cell}>Email: {RequestObject.email} </span>
                {/* <span className={styles.cell}>{RequestObject.location}</span> */}
              </section>
              <section className={styles.row}>
                <span className={styles.cell}>
                  Role: {RequestObject.role}{" "}
                  {/* {RequestObject.time_of_event} */}
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
        <AccountCircleIcon
          sx={{
            color: "var(--red-color)",
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <div className={styles.info}>{giveLayout()}</div>
    </div>
  );
};

export default UserCard;
