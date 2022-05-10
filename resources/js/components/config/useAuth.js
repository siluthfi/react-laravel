import { useState, useEffect } from "react";

const useAuth = (url) => {
    const [name, setName] = useState('')
    useEffect(() => {
        setName(params);
        
    }, [params]);

    return { name };
}
 
export default useAuth;