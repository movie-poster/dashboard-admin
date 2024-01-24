import { app } from "../firebase/firebase-config";
import { getStorage, ref, getBytes, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { isURL } from "./isUrl";

const storage = getStorage(app);

// Downloads the content from firebase
export const downloadFile = async (url = "") => {
    if (!isURL(url)) return "";

    const obj = await getBytes(ref(storage, url));
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(obj);

    return enc.decode(arr);
}

// Upload files to firebase
export const uploadFilesFirebase = async (files, id_empresa, id_usuario) => {
    try {
        const listUpload = [];
        const path = `carpeta-prueba/business_id_${id_empresa}/user_id_${id_usuario}`;
        for (let i = 0; i < files.length; i++) {
            const identifier = uuidv4();
            const storageRef = ref(storage, `${path}/${identifier}`);
            const uploaded = await uploadBytes(storageRef, files[i]);
            uploaded.metadata.name = files[i].name;
            listUpload.push(uploaded);
        }
        return { is_ok: true, listUpload };
    } catch (e) {
        return { is_ok: false, message: "Error al subir archivo(s) a firebase" };
    }
}

// Delete file from firebase
export const deleteFilesFirebase = async (path) => {
    try {
        await deleteObject(ref(storage, path));
        return true;
    } catch (error) {
        console.log('Ha ocurriudo un error al eliminar el archivo', error);
        return false;
    }
}
