import React, {useEffect, useState} from 'react';

function CheckConnection(){

    const [status, setStatus] = useState(true);

    useEffect(() => {
        function changeStatus(){
            setStatus(navigator.onLine);
        }

        window.addEventListener("online", changeStatus);
        window.addEventListener("offline", changeStatus);

        return () => {
            window.removeEventListener("online", changeStatus);
            window.removeEventListener("offline", changeStatus);
        }
    }, [])

    return status
}

export default CheckConnection;