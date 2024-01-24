import axios from '../../../utils/axios';
const users = {};
const path = 'user';

users.getList = async () => {
    try {
        const urlList = `${path}?offset=${1000}`
        const response = await axios.get(urlList);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

users.save = async (data) => {
    try {
        const response = await axios.post(path, data);
        return response.data;
    } catch (e) {
        return e.response.data;
    }
}

users.getById = async (id) => {
    try {
        const urlGet = `${path}/${id}`;
        const response = await axios.get(urlGet);
        return response.data;
    } catch (e) {
        return e.response.data;
    }
}

users.update = async (data) => {
    try {
        const urlUpdate = `${path}/${data.id}`;
        const response = await axios.put(urlUpdate, data);
        return response.data;
    } catch (e) {
        return e.response.data;
    }
}

users.delete = async (id) => {
    try {
        const urlDelete = `${path}/${id}`;
        const response = await axios.delete(urlDelete);
        return response.data;
    } catch (e) {
        return e.response.data;
    }
}

export default users;