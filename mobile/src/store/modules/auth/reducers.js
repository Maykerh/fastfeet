const initialState = {
    deliveryman: {},
    signed: false,
    loading: false,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case '@auth/SIGN_IN_REQUEST':
            return { ...state, loading: true };
        case '@auth/SIGN_IN_SUCCESS':
            return {
                deliveryman: action.payload,
                signed: true,
                loading: false,
            };
        case '@auth/SIGN_FAILURE':
            return { ...state, loading: false };
        case '@auth/LOGOUT':
            return {
                deliveryman: {},
                signed: false,
                loading: false,
            };
        default:
            return state;
    }
}
