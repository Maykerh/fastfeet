const initialState = {
    deliveryman: null,
    signed: false,
    loading: false,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case '@auth/SIGN_IN_REQUEST':
            return { ...state, loading: true };
        case '@auth/SIGN_IN_SUCCESS':
            return {
                ...state,
                deliveryman: action.payload,
                signed: true,
                loading: false,
            };
        case '@auth/SIGN_FAILURE':
            return { ...state, loading: false };
        default:
            return state;
    }
}
