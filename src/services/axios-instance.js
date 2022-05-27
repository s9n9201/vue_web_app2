import axios from "axios"
let serverAddress=["http://localhost:1015", "https://charmierp.com/backend"];

serverAddress=serverAddress.filter((ip)=>{
    return ip.indexOf(location.hostname)>-1;
});

const instance=axios.create({
    baseURL: serverAddress[0],
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;