const state = {
  theme: "fuck this"
}

const actions = {
  changeTheme({ commit }, themeName) {
    commit("setTheme", themeName)
  }
}

const mutations = {
  setTheme(state, themeName) {
    state.theme = themeName
  }
}

export default { namespace: true, state, actions, mutations }
