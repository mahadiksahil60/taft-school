import React from 'react';
import styles from './UserCard.module.css';

const UserCard = ({user, onRevoke}) => {
    return (
        <div className={styles.card}>
            <img
                src={user.image}
                alt="profile"
                className={styles.profileImage}
            />
            <div className={styles.userInfo}>
                <div className={styles.username}>{user.username}</div>
                <div className={styles.email}>{user.email}</div>
            </div>
            <button
                className={styles.revokeButton}
                onClick={() => onRevoke(user.id)}
            >
                Revoke
            </button>
        </div>
    );
};

export default UserCard;
