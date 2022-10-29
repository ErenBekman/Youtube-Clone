export const state = () => ({
  theme: "light",
});

export const actions = {
  // async nuxtServerInit({ commit }, { req }) {
  //   let auth = null;
  //   if (req.headers.cookie) {
  //     console.log("req.headers :>> ", req.headers);
  //     try {
  //       // check data user login with cookie
  //       const { data } = await this.$axios.post("/api/auth/me");
  //       console.log("data :>> ", data);

  //       auth = data;
  //     } catch (err) {
  //       auth = null;
  //     }
  //   }
  //   this.$auth.setUser(auth);
  // },
  SET_THEME({ commit }, payload) {
    commit("SET_THEME", payload);
  },
};

export const mutations = {
  SET_THEME(state, payload) {
    state.theme = payload;
  },
};
