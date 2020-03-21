const initialState = {
    token: null,
    signed: null,
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "@auth/SIGN_IN_REQUEST":
            return { ...state, loading: true };
        case "@auth/SIGN_IN_SUCCESS":
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                signed: true,
                loading: false,
            };
        case "@auth/SIGN_FAILURE":
            return {
                ...state,
                loading: false,
            };
        case "@auth/LOGOUT":
            return {
                ...state,
                signed: false,
            };
        default:
            return state;
    }
};
