import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector(state => state.account.user);
    // console.log(user);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <h1>Home</h1>
                </div>
            </div>
        </div>
    );
}
 
export default Home;