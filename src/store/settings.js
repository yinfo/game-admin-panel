

export default {
    state: {
        sessionTime: 0,
        turnTime: 0,
        turnTimeBonusForSecond: 0,

        folios_time_length: 0,
        start_hp: 0,
        start_mana: 0,

        maximum_level_deviation: 0,
        waiting_time_for_duel: 0,
        waiting_time_for_click_button_ok: 0,

        mana_increment_per_second: 0,
        checkDateArrInterval: 0,
        time_step_when_using_periodic_buffs: 0,

        maxLevel:0,
    },
    mutations: {
        setSettings(state, payload) {
            state[payload.key] = payload.value
        },
        setAllSettings(state, responseData) {
            state['sessionTime'] = responseData.sessionTime
            state['turnTime'] = responseData.turnTime
            state['turnTimeBonusForSecond'] = responseData.turnTimeBonusForSecond

            state['folios_time_length'] = responseData.folios_time_length
            state['start_hp'] = responseData.start_hp
            state['start_mana'] = responseData.start_mana


            state['maximum_level_deviation'] = responseData.maximum_level_deviation
            state['waiting_time_for_duel'] = responseData.waiting_time_for_duel
            state['waiting_time_for_click_button_ok'] = responseData.waiting_time_for_click_button_ok


            state['mana_increment_per_second'] = responseData.mana_increment_per_second
            state['checkDateArrInterval'] = responseData.checkDateArrInterval
            state['time_step_when_using_periodic_buffs'] = responseData.time_step_when_using_periodic_buffs

            state['maxLevel'] = responseData.maxLevel
        },
    },
    getters: {
        sessionTime: state => {
            return state.sessionTime
        },
        turnTime: state => {
            return state.turnTime
        },
        turnTimeBonusForSecond: state => {
            return state.turnTimeBonusForSecond
        },

        folios_time_length: state => {
            return state.folios_time_length
        },
        start_hp: state => {
            return state.start_hp
        },
        start_mana: state => {
            return state.start_mana
        },

        maximum_level_deviation: state => {
            return state.maximum_level_deviation
        },
        waiting_time_for_duel: state => {
            return state.waiting_time_for_duel
        },
        waiting_time_for_click_button_ok: state => {
            return state.waiting_time_for_click_button_ok
        },

        mana_increment_per_second: state => {
            return state.mana_increment_per_second
        },
        checkDateArrInterval: state => {
            return state.checkDateArrInterval
        },
        time_step_when_using_periodic_buffs: state => {
            return state.time_step_when_using_periodic_buffs
        },

        maxLevel: state => {
            return state.maxLevel
        },
    }
}
