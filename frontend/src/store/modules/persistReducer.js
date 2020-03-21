export default (state = {}, action) => {
    switch (action.type) {
        case "@auth/SIGN_IN_SUCCESS":
            localStorage.setItem(
                "fastfeet",
                JSON.stringify({
                    token: action.payload.token,
                    user: action.payload.user,
                })
            );
            return state;
        case "@auth/LOGOUT":
            localStorage.removeItem("fastfeet");
            return state;
        default:
            return state;
    }
};
