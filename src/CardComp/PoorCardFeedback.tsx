import { useState} from "react";

const PoorCardFeedback: React.FC<{transformStyles: string}> = ({transformStyles}) => {
    console.log('poor card feedback');
    return (
        <div id="poorcard-feedback" style={{ transform: transformStyles, width: '80%', height: '50%', backgroundColor: 'red' }}>
        
        </div>
    );
};

export default PoorCardFeedback;