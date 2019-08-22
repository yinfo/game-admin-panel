import axios from "axios";


export default {
    state: {
        elements: null,
    },
    mutations: {
        setElements(state, payload) {
            state.elements = payload
        },
    },
    actions: {

        async setElements({commit, getters}) {
            const user = getters.user
            // console.log(JSON.stringify(user))
            if (user && user.sessionId) {
                const uriApi = getters.adminURI + '/getElements'
                axios
                    .post(uriApi, {
                        sessionId: user.sessionId,
                    })
                    .then(response => {
                        const responseData = response.data
                        commit('setElements', responseData)

                    })
                    .catch(error => {
                        console.log('error')
                    })
            }
        },

    },
    getters: {
        elements: state => {
            return state.elements
        },
        elementById: state => id => {

            for (let item of state.elements){
                if(item.id == id){
                    return item
                }
            }

            // return state.elements[id]
        },
    }
}
