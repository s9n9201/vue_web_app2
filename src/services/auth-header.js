export default function authHeader() {
    let user=JSON.parse(localStorage.getItem("user"));
    let Auth={};
    if (user && user.token) {
        Auth={
            Authorization: "Bearer "+user.token
        };
    }
    return Auth;
}