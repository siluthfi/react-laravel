import axios from "axios"
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useFetch from "./config/useFetch";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const { data, IsPending, error: errorFetch } = useFetch('api/posts');

    console.log(data)

    const allPosts = data ? data.data.map((post, index) => (
        <div className="col-md-4 my-3" key={index}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Created by: {post.user.name}</h6>
                    <p className="card-text">{post.body}.</p>
                    <NavLink to={`${post.id}/edit`} className="btn btn-warning">Edit</NavLink>
                </div>
            </div>
        </div>
    )) : (
        <h3>Loading...</h3>
    )

    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <h1>Posts</h1>
                    <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="row">
                {allPosts}
            </div>
        </div>
    )
}

export default Posts