import { hideToast, showToast } from "../reducers/main/toastReducer";
import { ALERT_SUCCESS } from "../constant/constant";

/** Shows a toast message
 * @param sender is a useDispatch instance
 * @param type by default is ALERT_SUCCESS
 */
export const toast = (sender, message = "", type = ALERT_SUCCESS) => {
    sender(showToast({
        type,
        message,
    }));
    setTimeout(() => {
        sender(hideToast());
    }, 3000);
}