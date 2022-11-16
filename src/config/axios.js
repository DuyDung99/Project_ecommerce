import axios from "axios";

const instance = axios.create({
    baseURL: 'https://tiki.thaihm.site',
});

export default instance;
