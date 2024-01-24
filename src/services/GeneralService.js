import axios from "../utils/axios";

class GeneralService {
    
    constructor(path) {
        this.path = path;
        this.status = 0;
    }

    async post(data, params) {
        try {
            const response = await axios.post(this.path, data, {
                params
            });
            this.status = response.status;
            return response.data;
        } catch (e) {
            return e.response.data;
        }
    }

    async getList(params) {
        try {
            const response = await axios.get(this.path, {
                params,
            });
            this.status = response.status;
            return response.data;
        } catch (e) {
            return e.response.data;
        }
    }

    async getRequest(params) {
        try {
            const response = await axios.get(this.path, {
                params,
            });
            this.status = response.status;
            return response.data;
        } catch (e) {
            return e.response.data;
        }
    }

    async update(data) {
        try {
            const url = `${this.path}/${data.id}`;
            const response = await axios.put(url, data);
            this.status = response.status;
            return response.data;
        } catch (e) {
            return e.response.data;
        }
    }

    async delete(id, params) {
        try {
            const url = `${this.path}/${id}`;
            const response = await axios.delete(url, {
                params,
            });
            this.status = response.status;
            return response.data;
        } catch (e) {
            return e.response.data;
        }
    }
}

export default GeneralService;