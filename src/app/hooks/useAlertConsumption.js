import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from 'socket.io-client';

import { showAlert } from "../../reducers/main/alertConsumption";

export const useAlertConsumption = () => {
    let socket;
    const dispatch = useDispatch();

    useEffect(() => {
        socket = io(process.env.REACT_APP_SOCKET_URL, {
            query: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token ?? ''}`
            },
        });

        socket.on('alert-consumption', (payload) => {
            dispatch(showAlert({ value: payload }));
        });

        return () => socket.disconnect();
    }, []);

    return {
        socket,
    }
}
