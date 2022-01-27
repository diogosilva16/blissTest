import React, {useEffect, useState} from 'react';

function BuildModal(props) {

    const [email, setEmail] = useState('');
    const [errorText, setErrorText] = useState('');

    const url = props.url;

    const updateInput = (e) => {
        e.preventDefault();
        setEmail(e.target.value);

    }

    useEffect(() => {
        isEmail(email) ? setErrorText('Valid email adress') : setErrorText('Please enter a valid email address');
    }, [email])

    const share = async (email, url) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }
        try {
            let res = await fetch(`https://private-anon-38eb41df49-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=localhost:3000${url}`, requestOptions);
            if (!res.ok) {
                throw new Error(res.error.statusText);
            }
        } catch (error) {
            throw error;
        }
    }

    const handleClick = async () => {
        try {
            await share(email, url);
        } catch (error) {
            setErrorText(error);
        }
    }

    const isEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className="share-wrap">
                    <span className='close' onClick={() => {
                        props.openPortal()
                    }}>&times;</span>
                    <h2>Share this page!</h2>
                    <div className="form">
                        <input type="email" placeholder="E-mail" name="email" value={email} onChange={updateInput}
                               required/>
                        <button onClick={handleClick} disabled={!isEmail(email)}>Share</button>
                    </div>
                    {!errorText.length ? <div className="error-message centerInfo">{errorText}</div> :
                        <div className="error-message centerInfo">{errorText}</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BuildModal;