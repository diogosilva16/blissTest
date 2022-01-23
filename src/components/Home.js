import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function Home(props) {

    const [isLoading, setLoading] = useState(false);

    const fetchServerHealth = async () => {
        let res = await fetch(`https://private-anon-9ef6ff4cd7-blissrecruitmentapi.apiary-mock.com/health`);
        let health = await res.json();
        if (!health.status) {
            setLoading(true);
        } else {
            setLoading(false);
            props.history.push('/questions');
        }
    }

    useEffect(() => {
        fetchServerHealth();
    }, [isLoading])

    console.log(isLoading);
    return (
        <div>
            {isLoading && (
                <p>teste</p>
            )
            }
            {!isLoading && (
                <Link to='/questions'>Click moi</Link>
            )
            }
        </div>
    )
}

export default Home;