import axios from "axios"

export default {
    state: {
        spellPowers: null,
    },
    mutations: {

        spellPowers(state, spellPowers) {
            state.spellPowers = spellPowers
        },
        addSpellPowersConfig(state, spellPowersConfig) {
            state.spellPowers.push(spellPowersConfig)
        },

    },
    actions: {

        async spellPowers({commit, getters}) {
            const user = getters.user
            if (user && user.sessionId) {
                const uriApi = getters.adminURI + '/spellPowers'
                axios
                    .post(uriApi, {
                        sessionId: user.sessionId,
                    })
                    .then(response => {

                        if (response.data) {

                            commit('spellPowers', response.data)
                            // resolve(true)
                        }
                    })
                    .catch(error => {
                        console.log(JSON.stringify(error))
                        // reject(false)
                    })
            }
        },

        async saveSpellPowerConfig({commit, getters}, spellPowerConfig) {

            return new Promise((resolve, reject) => {

                const user = getters.user
                if (user && user.sessionId) {
                    const uriApi = getters.adminURI + '/updateSpellPowerConfig'

                    // spellPowerConfig.sessionId = user.sessionId
                    axios
                        .post(uriApi, {spellPowerConfig, sessionId:user.sessionId})
                        .then(response => {
                            resolve(true)
                        })
                        .catch(error => {
                            console.error('error saveSpellPowerConfig', error.message)
                            reject(error)
                        })
                }
            })
        },
        async copySpellPowerConfig({commit, getters}, spellPowerConfig) {

            return new Promise((resolve, reject) => {

                const user = getters.user
                if (user && user.sessionId) {
                    const uriApi = getters.adminURI + '/copySpellPowerConfig'

                    // spellPowerConfig.sessionId = user.sessionId
                    axios
                        .post(uriApi, {spellPowerConfig, sessionId:user.sessionId})
                        .then(response => {
                            if(!response.data.hasOwnProperty('errorId')){
                                commit('addSpellPowersConfig', response.data.data)
                                resolve(response.data)
                            }else{
                                reject(response.data)
                            }

                        })
                        .catch(error => {
                            console.error('error copySpellPowerConfig', error.message)
                            reject(error)
                        })
                }
            })
        },


    },
    getters: {

        spellPowers: (state) => {
            return state.spellPowers
        },

    }
}
