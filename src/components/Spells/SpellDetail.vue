<template>
    <md-card class="card-expansion">
        <!--всегда открытая часть-->
        <md-card-actions md-alignment="space-between">

            <div class="md-layout md-gutter">

                <!--spell._id-->
                <div class="md-layout-item ">
                    <p>Id: {{spell._id}}</p>
                </div>

                <!--spell.name-->
                <div class="md-layout-item ">
                    <md-field>
                        <md-input

                                v-model="spell.name"
                                type="string"
                                @change="onChangeSpell($event, 'name')"
                        ></md-input>
                    </md-field>
                </div>

                <!--Сохранить-->
                <div class="md-layout-item ">


                    <md-button
                            class="md-dense md-primary"
                            v-if="needSaveSpell"
                            @click="updateSpell()"
                    >
                        <small style="margin-left: -13px;">Сохранить</small>
                    </md-button>
                </div>

            </div>

            <!--показать детально-->
            <md-button
                    class="md-icon-button"
                    @click="arrow_down_click()"
            >
                <md-icon>{{keyboard_arrow}}</md-icon>
                <!--<md-icon>keyboard_arrow_down</md-icon>-->
            </md-button>

        </md-card-actions>

        <!--скрытая часть-->
        <md-card-content v-if="detail">
            <!-- ряд с кнопкой spellParams -->
            <div class="md-layout md-gutter" style="margin-top: -20px">

                <p style="margin-top: 15px; margin-left: 20px; margin-right: 5px">{{spell.spellParams}}</p>
                <md-button
                        class="md-dense md-success"
                        @click="spellParamsEditorOpen()"
                >
                    <small style="font-size: 10px">Успешные тапы</small>
                </md-button>


                <p style="margin-top: 15px; margin-left: 20px; margin-right: 5px">{{spell.valuesConfig}}</p>
                <md-button
                        class="md-dense md-success"
                        @click="spellPowersEditorOpen()"
                >
                    <small style="font-size: 10px">spell Powers</small>
                </md-button>

                <p style="margin-top: 15px; margin-left: 20px; margin-right: 5px">{{spell.levelsConfig}}</p>
                <md-button
                        class="md-dense md-success"
                        @click="spellLevelsEditorOpen()"
                >
                    <small style="font-size: 10px">spell Levels</small>
                </md-button>

            </div>

            <!-- ряд с кнопкой "+Эффект"-->
            <div class="md-layout md-gutter" style="margin-top: -20px">

                <!--Активное/пассивное-->
                <div class="md-layout-item md-size-55">

                    <md-field>
                        <strong style="color: gray">Активное/пассивное &#8194 &#8194 &#8194 &#8194</strong>
                        <md-select
                                v-model="spell_type"
                                name="spellType"
                                id="spellType"
                                placeholder="spellType"

                        >
                            <md-option value="active_spell">&#8194 Активное заклинание</md-option>
                            <md-option value="spell_parametric">&#8194 Пассивное заклинание</md-option>

                        </md-select>
                    </md-field>

                </div>

                <!--Стоимость маны-->
                <div class="md-layout-item md-size-30">

                    <md-field>
                        <strong style="color: gray">Стоимость маны</strong>

                        <md-input style="padding-left: 20px; max-width: 60px"
                                  v-model="spell.mana_cost"
                                  type="number"
                                  step="1"
                                  @change="onChangeSpell($event, 'mana_cost')"
                        ></md-input>
                    </md-field>


                </div>

                <!--+Эффект-->
                <div class="md-layout-item md-size-10">

                    <md-button
                            class="md-dense md-success"
                            @click="addEffect()"
                    >
                        <p style="margin-left: -3px; margin-top: 9px">+Эффект</p>
                    </md-button>
                    <!--<md-button-->
                    <!--class="md-dense md-success"-->
                    <!--@click="updateControl()"-->
                    <!--&gt;-->
                    <!--<p style="margin-left: -3px; margin-top: 9px">updateControl</p>-->
                    <!--</md-button>-->
                </div>
            </div>

            <!--эффекты-->
            <md-list style="margin-top: 30px"
                     v-for="(eff, index) in spell.effects"
                     :key="index"
            >
                <md-list-item>
                    <effect
                            :eff="eff"
                            :updateEffect="updateEffect"
                            :showBackButton="showBackButton(index)"
                            :showForwardButton="showForwardButton(index)"
                            :spellId="spellId"
                            :spellType="spell.type"
                            :spellIsActive="spellIsActive"
                            :updateControl="updateControl"
                            ref="effects"
                    ></effect>
                </md-list-item>

            </md-list>


        </md-card-content>
    </md-card>
</template>

<script>
    import Effect from './Effect'
    import spellParamsEditor from './SpellParamsEditor'
    import SpellPowers from './SpellPowersListDetail'
    import SpellLevels from './SpellLevelsListDetail'

    export default {
        props: [
            'spellId',
        ],
        data() {
            return {
                needSaveSpell: false,
                detail: false,
                forceUpdateCounter: 0,
                _spellIsActive: true,
                counter33: 0,
            };
        },
        methods: {

            forceUpdate: function () {
                this.forceUpdateCounter++
            },

            spellParamsEditorOpen: function () {
                this.$modal.show(spellParamsEditor,
                    {
                        spellParams: this.spell.spellParams,
                        callback: this.spellParamsEditorCallback,
                    },
                    {
                        width: 800,
                        height: 550
                    })
            },
            spellParamsEditorCallback: function (spellParams) {

                if (!(JSON.stringify(this.spell.spellParams) === JSON.stringify(spellParams))) {
                    this.needSaveSpell = true
                }


                const newArr = []
                for (let item of spellParams){
                    newArr.push(Number(item))
                }

                this.spell.spellParams = newArr
                console.log('spellParams = ',JSON.stringify(this.spell.spellParams))

                this.forceUpdate()
            },

            spellPowersEditorOpen: function () {
                this.$modal.show(SpellPowers,
                    {
                        initialName: this.spell.valuesConfig,
                        callback: this.spellPowersEditorCallback,
                    },
                    {
                        width: 800,
                        height: 800
                    }
                    ,)
            },
            spellPowersEditorCallback: function ({newValuesConfig}) {

                const needSave = this.spell.valuesConfig !== newValuesConfig
                this.spell.valuesConfig = newValuesConfig
                this.needSaveSpell = needSave
                this.forceUpdate()
            },

            spellLevelsEditorOpen: function () {
                this.$modal.show(SpellLevels,
                    {
                        initialName: this.spell.levelsConfig,
                        callback: this.spellLevelsEditorCallback,
                    },
                    {
                        width: 800,
                        height: 550
                    }
                    ,)
            },
            spellLevelsEditorCallback: function ({newLevelsConfig}) {

                const needSave = this.spell.levelsConfig !== newLevelsConfig
                this.spell.levelsConfig = newLevelsConfig
                this.needSaveSpell = needSave
                this.forceUpdate()
            },


            showBackButton: function (index) {

                return index > 0
            },
            showForwardButton: function (index) {
                return index < this.spell.effects.length - 1
            },

            addEffect: function () {
                this.$store.commit('addEffect', {spellId: this.spellId})
                this.forceUpdate()
                this.needSaveSpell = true
            },

            updateControl: function (needSave = false) {

                this.forceUpdate()

                if (!this.needSaveSpell && needSave) this.needSaveSpell = true
            },

            onChangeSpell: function (event, spellProp) {
                this.needSaveSpell = true
            },

            updateSpell: function () {
                this.$store.dispatch('saveSpell', {
                    id: this.spell._id,
                    name: this.spell.name,
                    mana_cost: this.spell.mana_cost,
                    spell_type: this._spellIsActive ? 'active_spell' : 'spell_parametric',
                    effects: this.spell.effects,

                    spellParams: this.spell.spellParams,
                    levelsConfig: this.spell.levelsConfig,
                    valuesConfig: this.spell.valuesConfig,
                    default_enable: this.spell.default_enable,

                }).then(response => {
                    this.needSaveSpell = false
                }, error => {
                    console.error(error.message)
                })
            },
            updateEffect: function (effect) {
                this.needSaveSpell = true
                this.spell.effects[effect.id] = effect
            },

            arrow_down_click: function () {
                this.detail = !this.detail
            },

        },
        computed: {

            spell: {
                get() {
                    // принудительное обновление
                    this.forceUpdateCounter

                    if (this.spellId) {
                        const _spell = this.$store.getters.spellById(this.spellId)
                        if (_spell) {
                            for (let i = 0; i < _spell.effects.length; i++) {
                                let effect = _spell.effects[i]
                                effect.id = i
                            }
                            return _spell
                        } else {
                            return null
                        }
                    } else {
                        return null
                    }
                }
            },
            spellIsActive: {
                get() {
                    // принудительное обновление
                    this.counter33

                    if (this._spellIsActive === undefined) {
                        if (!(this.spell === null)) {
                            if (this.spell.spell_type === 'spell_parametric') {
                                this._spellIsActive = false
                            } else {
                                this._spellIsActive = true
                            }
                        }
                    }
                    return this._spellIsActive
                },
            },
            spell_type: {
                get() {
                    return this.spell.spell_type
                },
                set(val) {
                    // this.spell_type = val
                    // console.log('set(val) ',val)
                    this.spell.spell_type = val
                    this._spellIsActive = (val === 'active_spell' ? true : false)
                    // console.log('666_spellIsActive', this._spellIsActive)
                    this.counter33++
                    this.needSaveSpell = true
                }
            },
            keyboard_arrow: {
                get() {
                    return this.detail ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                }
            }

        },
        components: {
            effect: Effect
        },
    }
</script>

<style lang="scss" scoped>
    .md-list {
        /*width: 320px;*/
        max-width: 48%;
        display: inline-block;
        vertical-align: top;
        border: 2px solid rgba(152, 251, 152, 1);
        margin-left: 5px;
        border-radius: 20px 20px 20px 20px;
    }

    .card-expansion {

        margin-left: 10px;
        padding-bottom: 0px;
    }

    .md-checkbox {
        display: flex;
    }
</style>

