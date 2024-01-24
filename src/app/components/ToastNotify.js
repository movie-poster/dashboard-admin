import { useSelector } from "react-redux";

const ToastNotify = () => {
    const { dataToast } = useSelector(state => state.toastSlice);

    return (
        <div className={`alert ${dataToast.type} rounded-pill toast-custom`} role="alert">
            <div className="row m-0 p-0">
                <div className="col-1 abs-center">
                    {
                        dataToast.type === 'alert-success'
                            ?
                            <i className="fas fa-check d-block mr-3"></i>
                            :
                            dataToast.type === 'alert-danger'
                                ?
                                <i className="fas fa-times d-block mr-3"></i>
                                :
                                <i className="fas fa-exclamation d-block mr-3"></i>
                    }

                </div>
                <div className="col">
                    {dataToast.message}
                </div>
            </div>
        </div>
    );
}

export default ToastNotify;