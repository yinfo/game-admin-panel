import Vue from 'vue'
import Vuex from 'vuex'
import settings from './settings'
import elements from './elements'
import spells from './spells'
import spell_powers from './spell_powers'
import spell_levels from './spell_levels'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        is_Server: true,
        currentUrl: document.location.href,
        apiURI: document.location.href.indexOf('212.30') > -1 ? 'http://212.30.187.5:5000/api' : 'http://192.168.110.9:5000/api',
        adminURI: document.location.href.indexOf('212.30') > -1 ? 'http://212.30.187.5:5000/admin' : 'http://192.168.110.9:5000/admin',
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        set_is_Server(state, payload) {
            state.is_Server = payload
        },
    },
    getters: {
        user: state => {
            return state.user
        },
        is_Server: state => {
            return state.is_Server
        },

        apiURI: state => {
            const href = document.location.href
            if (href.indexOf('localhost') > -1) {
                return 'http://localhost:5000/api'
            } else if (href.indexOf('192.168') > -1) {
                return 'http://192.168.110.9:5000/api'
            } else if (href.indexOf('212.30') > -1) {
                return 'http://212.30.187.5:5000/api'
            }
        },
        adminURI: state => {
            const href = document.location.href
            if (href.indexOf('localhost') > -1) {
                return 'http://localhost:5000/admin'
            } else if (href.indexOf('192.168') > -1) {
                return 'http://192.168.110.9:5000/admin'
            } else if (href.indexOf('212.30') > -1) {
                return 'http://212.30.187.5:5000/admin'
            }
        },

    },
    modules: {
        settings,
        elements,
        spells,
        spell_powers,
        spell_levels,
    },
})
