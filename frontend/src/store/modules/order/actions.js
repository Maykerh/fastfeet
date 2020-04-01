export function orderRegisterRequest(data) {
    return {
        type: "@order/REGISTER_REQUEST",
        payload: data,
    };
}

export function orderUpdateRequest(data) {
    return {
        type: "@order/UPDATE_REQUEST",
        payload: data,
    };
}

export function orderDeleteRequest(id, callback) {
    return {
        type: "@order/DELETE_REQUEST",
        payload: { id, callback },
    };
}
