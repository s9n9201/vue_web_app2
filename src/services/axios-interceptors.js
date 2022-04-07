import axiosInstance from "@/services/axios-instance";
import tokenService from "@/services/token.service";
import TokenService from "@/services/token.service";

const setup=(store)=>{
    axiosInstance.interceptors.request.use(
        (config)=>{
            const token=tokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"]="Bearer "+token;
            }
            return config;
        },
        (error)=>{
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res)=>{
            return res;
        },
        async (error)=>{
            const originalConfig=error.config;
            if (originalConfig.url!=="/api/signin" && error.response) {
                console.log(" retry > ", originalConfig._retry);
                if (error.response.status===401 && !originalConfig._retry) {
                    originalConfig._retry=true;
                    try {
                        const result=await axiosInstance.post("/api/refreshtoken", {
                            RefreshToken: tokenService.getLocalRefreshToken(),
                        });
                        const { Token }=result.data;
                        store.dispatch("auth/refreshToken", Token);
                        TokenService.updateLocalAccessToken(Token);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(error);
        }
    );

};

export default setup;