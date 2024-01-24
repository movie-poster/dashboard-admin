import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

const LoadingCustom = () => {
    const { show } = useSelector(state => state.loadingStateSlice);

    return (
        <Modal show={show} onHide={() => {}} centered size='sm'>
            <Modal.Header className='bg-green pe-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <h4 className='text-center'>Un momento...</h4>
                        </div>
                    </div>
                </div>

            </Modal.Header>
            <Modal.Body>
                <div className='container-fluid'>
                    <div className="spinner-border text-success d-block mx-auto my-2" style={{width:"4rem", height:"4rem"}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default LoadingCustom;