import axiosInstance from "@/services/axios-instance";
import TokenService from "@/services/token.service";

class AuthService {
    login(user) {
        return axiosInstance
            .post("/api/signin", {
                orgName: user.orgName,
                password: user.password
            })
            .then(response=>{
                if (response.data.Token) {
                    TokenService.setUser(response.data);
                }
                return response.data;
            });
    }

    logout() {
        TokenService.removeUser();
    }

    register(user) {
        return axiosInstance
            .post("/api/signup", {
                    orgName: user.orgName,
                    email: user.email,
                    password: user.password,
                }
            );
    }
}

export default new AuthService()