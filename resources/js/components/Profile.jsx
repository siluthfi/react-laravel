function Profile() {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(user)
    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <h1>Profile</h1>
                    <p>Name: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Name: {user.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile