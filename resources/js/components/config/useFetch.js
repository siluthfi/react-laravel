import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [IsPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const instance = axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            "x-requested-with": "XMLHttpRequest",
        },
        withCredentials: true,
    });

    useEffect(() => {
        const AbortCont = new AbortController();

        instance.get(url, { 
            signal: AbortCont.signal,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if(res.status !== 200) {
                throw Error('Could not fetch the resource');
            }
            setData(res);
            setIsPending(false);
        })
        .catch(err => {
            if( err.name === 'AbortError') {
                console.log('Fetch aborted')
            } else {
                setIsPending(false);
                setError(err.message);
                // console.log(err.message);
            }
        })

        return () => AbortCont.abort();

    }, [url]);

    return {data, IsPending, error}
}

export default useFetch;