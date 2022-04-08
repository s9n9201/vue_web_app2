import axios from "axios"

const instance=axios.create({
    baseURL: "http://localhost:1015",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;