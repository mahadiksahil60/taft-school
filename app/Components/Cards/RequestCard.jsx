import React from "react";
import styles from "./RequestCard.module.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import {isoToHumanReadableInEST} from "@/app/Common/CommonFunctions.js";

const RequestCard = ({RequestObject, type, handleClick}) => {
    return (
        <div className={styles.parentContainer}>
            {/*<div className={styles.imageWrapper}>*/}
            {/*    <Image*/}
            {/*        src={RequestObject?.image || "/images/requestcard.png"}*/}
            {/*        alt="request"*/}
            {/*        width={60}*/}
            {/*        height={60}*/}
            {/*        className={styles.avatar}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className={styles.detailsWrapper}>
                <h3 className={styles.name}>{RequestObject?.student_name}</h3>
                <p className={styles.description}>{RequestObject?.student_email}</p>
                <p className={styles.description}>{RequestObject?.name_of_event}</p>
                <p className={styles.time}>{RequestObject?.location_of_event}</p>
                <p className={styles.time}>
                    {isoToHumanReadableInEST(RequestObject?.eventDateTime)}
                </p>
            </div>

            <div className={styles.buttonWrapper}>
                {type === "add" && (
                    <button
                        onClick={() => handleClick(RequestObject)}
                        className={styles.addButton}
                    >
                        <PersonAddIcon fontSize="small"/> Add
                    </button>
                )}
                {type === "Request" && (
                    <button
                        onClick={() => handleClick()}
                        className={styles.approveButton}
                    >
                        <AddTaskIcon fontSize="small"/> Approve
                    </button>
                )}
                {type === "Assignments" && (
                    <button
                        onClick={() => handleClick()}
                        className={styles.deleteButton}
                    >
                        <DeleteIcon fontSize="small"/> Remove
                    </button>
                )}
            </div>
        </div>
    );
};

export default RequestCard;
