import { createStore} from 'vuex';
import { IUser } from '../api/user';


type UserState = {
  user: IUser | null;
  accessToken: string | null;
}

const store = createStore<UserState>({
  state: {
    user: null,
    accessToken: localStorage.getItem('accessToken'),
  } as UserState,
  getters: {
    getUserInfo: (state: UserState) => state.user,
  },
  mutations: {
    setUserInfo(state: UserState, user: IUser) {
      state.user = user;
      console.log(user);
    },
    setAccessToken(state: UserState, token: string) {
      state.accessToken = token;
      localStorage.setItem("accessToken", token);
    },
    logOut(state: UserState) {
      localStorage.removeItem("accessToken");
      state.accessToken = null;
      window.location.href = window.location.origin;
    },
  },
  actions: {
    setUserInfo({ commit } : { commit: Function}, user: IUser) {
      commit('setUserInfo', user);
    },
    setAccessToken({ commit } : { commit: Function}, token: string) {
      commit('setAccessToken', token);
    },
    logOut({ commit } : { commit: Function}) {
      commit('logOut');
    },
  },
});

export default store