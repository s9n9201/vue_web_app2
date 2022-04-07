import AuthService from "@/services/auth.service";
const user=JSON.parse(localStorage.getItem("user"))
const initialState=user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null }

initialState.url="http://localhost:1015/";

export const auth={
    namespaced: true,
    state: initialState,
    actions: {
        login( { commit }, user) {
            return AuthService.login(user).then(
                user=>{
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error=>{
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout( { commit } ) {
            AuthService.logout();
            commit('logout');
        },
        register( { commit }, user) {
            return AuthService.register(user).then(
                user=>{
                    commit("registerSuccess");
                    return Promise.reslove(user);
                },
                error=>{
                    commit("registerFailure");
                    return Promise.reject(error);
                }
            );
        },
        refreshToken({ commit }, token) {
            commit("refreshToken", token);
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn=true;
            state.user=user;
        },
        loginFailure(state) {
            state.status.loggedIn=false;
            state.user=null;
        },
        logout(state) {
            state.status.loggedIn=false;
            state.user=null;
        },
        registerSuccess(state) {
            state.status.loggedIn=false;
        },
        registerFailure(state) {
            state.status.loggedIn=false;
        },
        refreshToken(state, token) {
            state.status.loggedIn=true;
            state.user={ ...state.user, Token: token };
        },
    }
}