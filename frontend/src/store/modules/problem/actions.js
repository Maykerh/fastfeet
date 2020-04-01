export function cancelDeliveryRequest(id, callback) {
    return {
        type: "@recipient/CANCEL_DELIVERY_REQUEST",
        payload: { id, callback },
    };
}
