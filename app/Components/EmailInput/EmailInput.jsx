import React from 'react';
import styles from './EmailInput.module.css';

const EmailInput = ({value, onChange, placeholder = "Enter your email"}) => {
    return (
        <div className={styles.inputWrapper}>
            <input
                type="email"
                value={value}
                onChange={onChange}
                className={styles.emailInput}
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default EmailInput;
