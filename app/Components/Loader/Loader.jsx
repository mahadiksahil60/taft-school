import React from 'react';

const Loader = () => {
    return (
        <>
            <style jsx>{`
                .loader-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh; /* full viewport height */
                    background-color: #f9f9f9;
                }

                .loader {
                    border: 6px solid #e0e0e0;
                    border-top: 6px solid #1976d2; /* nice blue */
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                s

                /* Responsive for smaller mobile devices */
                @media (max-width: 400px) {
                    .loader {
                        width: 45px;
                        height: 45px;
                        border-width: 5px;
                    }
                }
            `}</style>

            <div className="loader-wrapper" role="status" aria-label="Loading">
                <div className="loader"/>
            </div>
        </>
    );
};

export default Loader;
