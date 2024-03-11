import { createStore} from 'vuex';

interface AuthState {
  loggedIn: boolean;
}

interface AuthLoginData {
  username: string;
  password: string;
}

const state: AuthState = {
  loggedIn: localStorage.getItem('loggedIn') === 'true',
};

const mutations = {
  setLoggedIn(state: AuthState, value: boolean) {
    state.loggedIn = value;
    localStorage.setItem('loggedIn', value.toString());
  },
};

const actions = {
  login({ commit }: { commit: any }, loginData: AuthLoginData) {
    const validUsername = 'user';
    const validPassword = 'password';

    const isValidLogin =
      loginData.username === validUsername && loginData.password === validPassword;

    if (isValidLogin) {
      commit('setLoggedIn', true);
      return true;
    } else {
      commit('setLoggedIn', false);
      console.log('Unauthorized');
      return false;
    }
  },
};

const getters = {
  isLoggedIn: (state: AuthState) => state.loggedIn,
};

export default createStore<AuthState>({
  state,
  mutations,
  actions,
  getters,
});
