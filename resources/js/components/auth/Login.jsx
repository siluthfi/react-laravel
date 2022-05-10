import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { actionCreators } from "../data";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState({ error: false, message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const { loginUser } = bindActionCreators(actionCreators, dispatch);

    const instance = axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            "x-requested-with": "XMLHttpRequest",
        },
        withCredentials: true,
    });

    async function handleFetch() {
        instance.get('sanctum/csrf-cookie', {
            headers: {
                Accept: "application/json",
            }
        });

        const postlogin = await instance.post('api/login', {
            email: email,
            password: password,
        });
        const token = postlogin.data.access_token;
        // console.log('post login: ', postlogin.data.access_token);
        
        if (postlogin.data.error) {
            const user = postlogin.data.error;
            return { postlogin, user, token };
        }
        
        const user = await instance.get('api/user', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${postlogin.data.access_token}`,
            }
        });
        
        return { postlogin, user, token };
    }

    const localStore = (log, user, token) => {
        const d = new Date();
        const minute = 1000 * 60;
        const hour = minute * 60;
        const expires = d.getTime() + hour;
        
        if(!rememberMe) {
            localStorage.setItem("expires", expires);
        }

        localStorage.setItem("isLogged", log);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        window.location.reload();
    }

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const { user, token } = await handleFetch();
        if (user.code == 401) {
            setIsError({ error: true, message: user.message });
            setIsLoading(false);
        } else {
            // console.log(user)
            localStore(true, user.data.user, token);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md text-center">
                    <h1>Login</h1>
                </div>
            </div>
            
            { isError.error ? (
                <div className="row justify-content-center mt-3">
                    <div className="col-md-4">
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {isError.message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            ) : '' }

            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => setRememberMe(!rememberMe)} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Remember Me!
                            </label>
                        </div>
                        <button type="submit" className={`btn btn-primary mt-3 ${isLoading ? "disabled" : ""}`}>{isLoading ? "Loading..." : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Login;