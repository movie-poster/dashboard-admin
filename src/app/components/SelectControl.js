import { useState } from "react";
import IconButton from "./IconButton";
import { hideToast, showToast } from "../../reducers/main/toastReducer";
import { useDispatch } from "react-redux";


const SelectControl = ({ fields = "", isFieldSelect = true, onChange }) => {
    const [optionSelect, setOptionSelect] = useState("");
    const dispatch = useDispatch();

    const toast = (message) => {
        dispatch(showToast({
            type: "alert-warning",
            message,
        }));
        setTimeout(() => {
            dispatch(hideToast());
        }, 3000);
    }

    const handleRegister = () => {
        if (!optionSelect) {
            toast(`${isFieldSelect ? "Opción" : "Columna"} vacía no permitida`);
            return;
        }
        if (fields.includes(optionSelect.toUpperCase()) && fields !== "") {
            toast(`La ${isFieldSelect ? "opción" : "columna"} ya se encuentra registrada`);
            return;
        }
        if (optionSelect) {
            onChange(`${fields}${optionSelect.toUpperCase()}*`);
            setOptionSelect("");
        }
    }

    const handleMove = async (item, currentIndex, order) => {
        let elementos = fields.split("*");
        elementos.pop();

        elementos.splice(currentIndex, 1);
        elementos.splice(order, 0, item);

        onChange(elementos.join("*") + "*");
    }

    return (
        <>
            <label>¿Cuáles serán las {isFieldSelect ? "opciones" : "columnas"}?<b><i className="text-red">*</i></b></label>
            <div className="style-form__select">
                {
                    fields.split("*")?.map((item, i) => {
                        if (item !== "") {
                            return (
                                <div className="row p-1 ps-2 mx-1 border-bottom" key={item}>
                                    <div className="col">
                                        {i + 1}. {item}
                                    </div>
                                    <div className="col-3 parent-actions">
                                        <IconButton
                                            icon="fa-solid fa-circle-xmark text-red"
                                            title="Eliminar"
                                            onClick={() => {
                                                const edited = fields.replace(item + "*", "");
                                                onChange(edited);
                                            }}
                                        />
                                        <div className="move-parameterization__select">
                                            <i title="Subir" className="fa-solid fa-circle-arrow-up text-green me-2" role='button' onClick={() => handleMove(item, i, (i - 1))}></i>
                                            <i title="Bajar" className="fa-solid fa-circle-arrow-down text-purple" role='button' onClick={() => handleMove(item, i, (i + 1))}></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return;
                    })
                }
                <div className="row p-1 mx-1 mt-1">
                    <div className="col">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Digite un nombre"
                            value={optionSelect}
                            onChange={(e) => setOptionSelect(e.target.value)}
                            onSubmitCapture={handleRegister}
                        />
                    </div>
                    <div className="col-1 pt-1">
                        <IconButton
                            icon="fa-solid fa-circle-plus text-green"
                            title="Agregar"
                            onClick={handleRegister}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectControl; 