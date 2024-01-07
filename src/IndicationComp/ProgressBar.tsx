import "./ProgressBar.css"
import React, { useEffect, useState } from "react";

const ProgressBar: React.FC<{ finished: number; total: number }> = ({
    finished,
    total,
}) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        setProgress((finished / total) * 100);
    }, [finished, total]);
    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
};

export default ProgressBar;