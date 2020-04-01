export function deliverymanRegisterRequest(data) {
    return {
        type: "@deliveryman/REGISTER_REQUEST",
        payload: data,
    };
}

export function deliverymanUpdateRequest(data) {
    return {
        type: "@deliveryman/UPDATE_REQUEST",
        payload: data,
    };
}

export function deliverymanDeleteRequest(id, callback) {
    return {
        type: "@deliveryman/DELETE_REQUEST",
        payload: { id, callback },
    };
}
