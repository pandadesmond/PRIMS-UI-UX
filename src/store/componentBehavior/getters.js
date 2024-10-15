export const byLanguage = (state, rootState, rootGetters) => (arg) => {
    let data = {}
    if (state.language == 'EN') {
        data = rootGetters.dbFrontendEn.componentBehavior[arg]
    }
    return data
}