import React from "react";
import "./styles/BlockUI.css";
import CircularProgress from '@mui/material/CircularProgress';


const BlockUI = ({
    blocking = false
}) => {
    if (!blocking) {
        return null;
    } else {
        return (
            <div className="block-ui-container">
                <div className="block-ui-overlay" />
                <div className="block-ui-message-container">
                    <div className="block-ui-message">
                        <div className="loading-indicator">
                            <CircularProgress 
                                sx={{
                                    opacity: 0.5,
                                    color: '#02a17c'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default BlockUI;