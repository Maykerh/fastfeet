export function recipientRegisterRequest(data) {
    return {
        type: "@recipient/REGISTER_REQUEST",
        payload: data,
    };
}

export function recipientUpdateRequest(data) {
    return {
        type: "@recipient/UPDATE_REQUEST",
        payload: data,
    };
}

export function recipientDeleteRequest(id) {
    return {
        type: "@recipient/DELETE_REQUEST",
        payload: id,
    };
}
