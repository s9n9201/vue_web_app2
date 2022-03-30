import axios from "axios"
const API_URL="http://localhost:1015/api/"

class AuthService {
    login(user) {
        return axios
            .post(API_URL+"signin", {
                orgName: user.orgName,
                password: user.password
            })
            .then(response=>{
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(user) {
        return axios
            .post(API_URL+"signup", {
                    orgName: user.orgName,
                    email: user.email,
                    password: user.password,
                }
            );
    }
}

export default new AuthService()