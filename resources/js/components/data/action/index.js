export const loginUser = (value) => {
    return (dispatch) => {
        dispatch({
            type: "LOGIN",
            payload: {
                id: value.id,
                name: value.name,
                email: value.email,
                token: value.token,
            }
        });
    }
}