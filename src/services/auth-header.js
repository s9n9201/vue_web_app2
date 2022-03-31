export default function authHeader() {
    let user=JSON.parse(localStorage.getItem("user"));
    let Auth={};
    if (user && user.Token) {
        Auth={
            Authorization: "Bearer "+user.Token
        };
    }
    return Auth;
}