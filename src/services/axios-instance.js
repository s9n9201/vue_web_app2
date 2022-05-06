import axios from "axios"
let serverAddress=["localhost", "114.46.147.253"];

serverAddress=serverAddress.filter((ip)=>{
    return location.host.indexOf(ip)>-1;
});

const instance=axios.create({
    baseURL: "http://"+serverAddress[0]+":1015",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;