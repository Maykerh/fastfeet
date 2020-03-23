export function signInRequest(email, password) {
    return {
        type: "@auth/SIGN_IN_REQUEST",
        payload: { email, password },
    };
}

export function signInSuccess(token, user) {
    console.log(["action"], user);
    return {
        type: "@auth/SIGN_IN_SUCCESS",
        payload: { token, user },
    };
}

export function signFailure() {
    return {
        type: "@auth/SIGN_FAILURE",
    };
}

export function logout() {
    return {
        type: "@auth/LOGOUT",
    };
}
