import axios from "axios";

class Spell {

    constructor(_id, type) {
        this._id = _id
        this.name = 'NewSpell'
        this.type = type
        this.mana_cost = 15
        this.spell_type = 'active_spell'
        this.levelsConfig = 'default'
        this.valuesConfig = 'HpRegenerationLike'
        this.default_enable = false
        this.spellParams = [
            0,
            1,
            2,
            3,
            4
        ]
        this.effects = []
    }
}

export default {
    state: {
        spells: {},
        spellsById: {},
        effectTypes: [

            {
                id: 'immediate_hp_damage',
                title: 'Непосредственный урон на HP',
                desc: `
                Непосредственный урон на HP.
                Только на противника. Время эффекта - 0.`,
                active: true,
            },
            {
                id: 'immediate_mana_damage',
                title: 'Непосредственный урон на mana',
                desc: `
                Непосредственный урон на mana.
                Только на противника. Время эффекта - 0.`,
                active: true,
            },
            {
                id: 'hp_poisoning',
                title: 'Отравление на HP',
                desc: `
                Отравление на HP. Только на противника. 
                Время эффекта указано в "разах". Обычно 5 раз. 
                `
                ,
                active: true,
            },
            {
                id: 'mana_poisoning',
                title: 'Отравление на Mana',
                desc: `
                Отравление на Mana. Только на противника. 
                Время эффекта указано в "разах". Обычно 5 раз. 
                `
                ,
                active: true,
            },
            {
                id: 'hp_regeneration',
                title: 'Регенерация HP',
                desc: `
                Восстановление HP. Только на себя. 
                Время эффекта указано в "разах". Обычно 5 раз.                 
                `,
                active: true,
            },
            {
                id: 'mana_regeneration',
                title: 'Регенерация маны',
                desc: `
                Восстановление Mana. Только на себя. 
                Время эффекта указано в "разах". Обычно 5 раз.                 
                `,
                active: true,
            },

            {
                id: 'max_health',
                title: 'Максимальный уровень жизни (пассивное)',
                desc: `
                Повышает перед боем максимальное значение HP
                `,
                active: false,
            },
            {
                id: 'max_mana',
                title: 'Максимальный уровень mana (пассивное)',
                desc: `
                Повышает перед боем максимальное значение Mana (пассивное)`,
                active: false,
            },
            {
                id: 'max_attack',
                title: 'Максимальный атаки (пассивное)',
                desc: `
                Повышает перед боем максимальное значение Атаки (пассивное)`,
                active: false,
            },
            {
                id: 'max_armor',
                title: 'Максимальный уровень защиты (пассивное)',
                desc: `
                Повышает перед боем максимальное значение Защиты (пассивное)`,
                active: false,
            },

            {
                id: 'affect_attack',
                title: 'Влияет на атаку',
                desc: `
                Увеличивает атаку применительно к себе (На себя, Коэффициент > 0),
                или уменьшает атаку противника  ( Коэффициент < 0)
                `,
                active: true,
            },
            {
                id: 'affect_attack_once',
                title: 'Влияет на атаку (однократно)',
                desc: `
                Дает сильное кратковременное усиление атаки на следующее заклинание.
                `,
                active: true,
            },


            {
                id: 'affect_armor',
                title: 'Влияет на защиту',
                desc: `
                Увеличивает защиту применительно к себе (На себя, Коэффициент > 0),
                или уменьшает защиту противника  (Коэффициент < 0)            
                `,
                active: true,
            },
            {
                id: 'affect_shield',
                title: 'Действует на Щит',
                desc: `
                Ставит щит себе (флажок На себя),
                или снимает щит с противника.
                `,
                active: true,
            },

            {
                id: 'affect_hp',
                title: 'Влияние на HP (Только Пироп <=> blood)',
                desc: `
                Со знакоми минус - отнимает у Пиропа немного жизни для заклинания,
                со знаком плюс - добавляет Пиропу немного жизни, отнимая ее у противника
                `,
                active: true,
                onlyForElements: ['blood'],
            },
            {
                id: 'affect_mana',
                title: 'Влияние на Mana ',
                desc: `
                Отнимает ману у противника (коэффициент отрицательный, галочка "на себя" снята),
                либо добавляет ману себе (коэффициент положительный, галочка "на себя")
                `,
                active: true,
            },

            {
                id: 'remove_negative',
                title: 'Снимает негативные эффекты',
                desc: `
                Снимает негативные эффекты, применяется только На себя.
                Действует мгновенно, поэтому Время действия = 0.
                Коэффициент ни на что не влияет, так как снимаются Все негативные эффекты.                
                `,
                active: true,
            },
            {
                id: 'remove_positive',
                title: 'Снимает позитивные эффекты',
                desc: `
                Снимает позитивные эффекты, применяется только к противнику.
                Действует мгновенно, поэтому Время действия = 0.
                Коэффициент ни на что не влияет, так как снимаются Все позитивные эффекты.                
                `,
                active: true,
            },
            {
                id: 'get_random_essences',
                title: 'Дает случайную эссенцию',
                desc: `
                Дает случайную эссенцию              
                `,
                active: true,
            },
            {
                id: 'get_random_buff',
                title: 'Дает случайный бафф',
                desc: `
                Дает случайный бафф              
                `,
                active: true,
            },
            {
                id: 'stunning',
                title: 'Оглушение',
                desc: `
                Оглушение              
                `,
                active: true,
            },

            // {
            //     id: 'increase_mana_cost',
            //     title: '',
            //     desc: `
            //
            //     `,
            //     active: true,
            //     onlyForElements: ['blood'],
            // },
            //
            //
            // {
            //     id: 'slow_skillcheck',
            //     title: '',
            //     desc: `
            //
            //     `,
            //     active: true,
            //     onlyForElements: ['blood'],
            // },
            //
            // {
            //     id: 'critical_spell_protection',
            //     title: '',
            //     desc: `
            //
            //     `,
            //     active: true,
            //     onlyForElements: ['blood'],
            // },
            //
            // {
            //     id: 'count_negative_damage',
            //     title: '',
            //     desc: `
            //
            //     `,
            //     active: true,
            //     onlyForElements: ['blood'],
            // },
            //
            // {
            //     id: 'affect_negative_time',
            //     title: '',
            //     desc: `
            //
            //     `,
            //     active: true,
            //     onlyForElements: ['blood'],
            // },
            //
            // {
            //     id: 'mix_spells',
            //     title: '',
            //     desc: `
            //
            //     `,
            //     active: true,
            //     onlyForElements: ['blood'],
            // },


        ],
    },
    mutations: {
        spellsByType(state, payload) {
            // alert(payload.spells[0]._id)
            state.spells[payload.element] = payload.spells

            if (payload.spells && payload.spells.length > 0) {
                for (let spell of payload.spells) {
                    state.spellsById[spell._id] = spell
                }
            }

        },

        setSpellById(state, {_id, spell}) {
            state.spellsById[_id] = spell
        },

        addEffect(state, {spellId}) {
            const spell = state.spellsById[spellId]
            const id = spell.effects.length
            spell.effects.push({
                id,
                self: true,
                type: '',
                valueKoeff: 0,
                life_time: 0,
            })
        },

        moveEffect(state, {spellId, effId, step}) {
            const effects = [...state.spellsById[spellId].effects]
            if (step === -1 && effId > 0) {
                let temp = effects[effId]
                effects[effId] = effects[effId - 1]
                effects[effId - 1] = temp
            } else if (step === 1 && effId < effects.length - 1) {
                let temp = effects[effId]
                effects[effId] = effects[effId + 1]
                effects[effId + 1] = temp
            }
            state.spellsById[spellId].effects = effects

        },
        deleteEffect(state, {spellId, effId}) {
            const effects = [...state.spellsById[spellId].effects]
            effects.splice(effId, 1)
            state.spellsById[spellId].effects = effects

        },
        newSpell(state, {elementName, lastSpellId}) {

            const newSpell = new Spell(lastSpellId, elementName)
            state.spellsById[lastSpellId] = newSpell
            state.spells[elementName].unshift(newSpell)

        },
    },
    actions: {

        async saveSpell({commit, getters}, spell) {
            return new Promise((resolve, reject) => {
                const user = getters.user
                if (user && user.sessionId) {
                    const uriApi = getters.adminURI + '/updateSpell'
                    // const uriApi = getters.is_Server ? 'http://192.168.110.9:5000/admin/updateSpell' : 'http://localhost:5000/admin/updateSpell'

                    // spell.sessionId = user.sessionId
                    axios
                        .post(uriApi, {spell, sessionId: user.sessionId})
                        .then(response => {
                            // commit('spellsByType', response.data)
                            resolve(true)
                        })
                        .catch(error => {
                            console.error('error saveSpell', error.message)
                            resolve(error)
                        })
                }
            })
        },

        async spellsByType({commit, getters}, {element}) {

            return new Promise((resolve, reject) => {

                const user = getters.user
                if (user && user.sessionId) {
                    const uriApi = getters.adminURI + '/getSpellsByElement'
                    axios
                        .post(uriApi, {
                            sessionId: user.sessionId,
                            element,
                        })
                        .then(response => {
                            commit('spellsByType', response.data)
                            resolve(true)
                        })
                        .catch(error => {
                            console.error('error spellsByType', error.message)
                            reject(false)
                        })
                }
            })


        },
        async newSpell({commit, getters}, {elementName}) {

            return new Promise((resolve, reject) => {

                const user = getters.user
                if (user && user.sessionId) {
                    const uriApi = getters.adminURI + '/getMaxSpellId'
                    axios
                        .post(uriApi, {
                            sessionId: user.sessionId,
                        })
                        .then(response => {

                            if (response.data && response.data.lastSpellId) {
                                const lastSpellId = response.data.lastSpellId + 1
                                commit('newSpell', {elementName, lastSpellId})
                                resolve(true)
                            }
                        })
                        .catch(error => {
                            console.log(JSON.stringify(error))
                            reject(false)
                        })
                }
            })


        },

    },
    getters: {
        spellsByType: state => type => {
            return state.spells[type]
        },
        spellById: state => id => {
            return state.spellsById[id]
        },
        effectTypes: state => {
            return state.effectTypes
        },
        effectTypesByType: (state) => ({type, spellIsActive}) => {
            return state.effectTypes
                .filter(effectType => {

                    if (!effectType.hasOwnProperty('onlyForElements')) {
                        return effectType.active === spellIsActive //без фильтра - значит подходит везде
                    } else if (effectType.onlyForElements.indexOf(type) > -1) {
                        return effectType.active === spellIsActive
                    } else {
                        return false
                    }


                })
        },
    }
}
