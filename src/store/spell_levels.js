import axios from "axios"
export default {
    state: {
        spellLevels: null,
    },
    mutations: {

        spellLevels(state, spellLevels) {
            state.spellLevels = spellLevels
        },
        addSpellLevelsConfig(state, spellLevelsConfig) {
            state.spellLevels.push(spellLevelsConfig)
        },
    },
    actions: {

        async spellLevels({commit, getters}) {
            const user = getters.user
            if (user && user.sessionId) {
                const uriApi = getters.adminURI +  '/spellLevels'
                axios
                    .post(uriApi, {
                        sessionId: user.sessionId,
                    })
                    .then(response => {

                        if (response.data ) {

                            commit('spellLevels', response.data)
                            // resolve(true)
                        }
                    })
                    .catch(error => {
                        console.log(JSON.stringify(error))
                        // reject(false)
                    })
            }
        },

        async saveSpellLevelsConfig({commit, getters}, spellLevelsConfig) {

            return new Promise((resolve, reject) => {

                const user = getters.user
                if (user && user.sessionId) {
                    const uriApi = getters.adminURI + '/updateSpellLevelsConfig'

                    // spellLevelsConfig.sessionId = user.sessionId
                    axios
                        .post(uriApi, {spellLevelsConfig, sessionId:user.sessionId})
                        .then(response => {
                            resolve(true)
                        })
                        .catch(error => {
                            console.error('error saveSpellLevelsConfig', error.message)
                            reject(error)
                        })
                }
            })
        },

        async copySpellLevelsConfig({commit, getters}, spellLevelsConfig) {

            return new Promise((resolve, reject) => {

                const user = getters.user
                if (user && user.sessionId) {
                    const uriApi = getters.adminURI + '/copySpellLevelsConfig'

                    // spellPowerConfig.sessionId = user.sessionId
                    axios
                        .post(uriApi, {spellLevelsConfig, sessionId:user.sessionId})
                        .then(response => {
                            if(!response.data.hasOwnProperty('errorId')){
                                commit('addSpellLevelsConfig', response.data.data)
                                resolve(response.data)
                            }else{
                                reject(response.data)
                            }

                        })
                        .catch(error => {
                            console.error('error copyLevelsPowerConfig', error.message)
                            reject(error)
                        })
                }
            })
        },

    },
    getters: {
        spellLevels: (state) =>  {
            return state.spellLevels
        },
    }
}
