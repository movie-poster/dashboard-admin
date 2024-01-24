export const showAnimateOrderItem = (item, showEffect) => {
    return showEffect.show && showEffect.id === item.id ? "show-effect" : "";
}
