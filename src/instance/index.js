import axios from "axios";

const instance = axios;

instance.defaults.baseURL = "http://localhost:8888/api";

instance.defaults.withCredentials = true;

export default instance;
