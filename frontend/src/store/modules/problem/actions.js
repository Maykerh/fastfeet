export function cancelDeliveryRequest(id) {
    return {
        type: "@recipient/CANCEL_DELIVERY_REQUEST",
        payload: id,
    };
}
