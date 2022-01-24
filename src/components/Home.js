import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import CheckHealth from "./CheckHealth";

function Home(props) {

    const [isLoading, setLoading] = useState(false);

    const fetchServerHealth = async () => {
        setLoading(true);
        let res = await fetch(`https://private-anon-9ef6ff4cd7-blissrecruitmentapi.apiary-mock.com/health`);
        let health = await res.json();
        if (!health.status) {
            setLoading(false);
        } else {
            props.history.push('/questions');
        }
    }

    useEffect(() => {
        fetchServerHealth();
    }, [])

    return (
        <div>
            {isLoading && <CheckHealth/>}
            {!isLoading && (
                <p>teste</p>
            )}
        </div>
    )
}

export default Home;