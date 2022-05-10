const initState = {
    islogged: false,
    account: {
        id: null,
        name: null,
        email: null,
        token: null,
    }
};

const accountReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                islogged: true,
                account: {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                    token: action.payload.token,
                }
            };
        case 'LOGOUT':
            return {
                ...state,
                islogged: false,
                account: {
                    id: null,
                    name: null,
                    email: null,
                    token: null,
                }
            };
        default:
            return state;
    }
}

export default accountReducer;