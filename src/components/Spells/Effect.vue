<template>
    <div>
        <md-checkbox style="margin-top: -45px">
            <small>(Self2)</small>
        </md-checkbox>

        <!-- Диалог - Удалить эффект?-->
        <md-dialog-confirm
                :md-active.sync="delDialogIsActive"
                md-title="Удалить эффект?"
                md-content="Для сохранения изменений в базе данных нажать кнопку 'Сохранить'"
                md-confirm-text="Удалить"
                md-cancel-text="Отмена"
                @md-confirm="onConfirmDelete"></md-dialog-confirm>

        <!-- Диалог - выбор типа эффекта  -->
        <md-dialog :md-active.sync="listOfSpellTypesDialogIsActive" style="min-width: 750px">

            <!--Описание эффекта кнопки Отмена и Выбрать-->
            <div class="md-layout md-gutter">

                <div class="md-layout-item md-size-45">
                    <md-dialog-title>Описание эффекта:</md-dialog-title>
                </div>
                <div class="md-layout-item md-size-45">
                    <div class="md-toolbar-section-end">
                        <md-button class="md-default" @click="listOfSpellTypesDialogIsActive = false;"
                        >Отмена
                        </md-button
                        >
                        <md-button class="md-primary" @click="onSelectTypeOnDialog()"
                        >Выбрать
                        </md-button
                        >

                    </div>
                </div>
                <!--Описание-->
                <div class="md-layout " style="height: 150px">
                    <div class="md-layout-item md-size-90">
                        <md-field>
                            <!--<label>Textarea</label>-->
                            <md-textarea
                                    v-model="descriptionForCurrent"
                                    style="height: 150px"
                            ></md-textarea>
                        </md-field>
                    </div>

                </div>
            </div>

            <!--md-table-->
            <md-dialog-content>
                <!--md-table-->
                <div class="md-layout" style="margin-top: 60px">
                    <md-table
                            v-model="effectTypes"
                            md-card
                            @md-selected="onSelectTypeOnTable"
                            :md-selected-value.sync="selected"
                            md-fixed-header

                    >
                        <md-table-row
                                slot="md-table-row"
                                slot-scope="{ item }"

                                md-selectable="single"
                        >
                            <!--<md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>-->
                            <md-table-cell md-label="ID эффекта" md-sort-by="id">{{ item.id }}</md-table-cell>
                            <md-table-cell md-label="Название эффекта" md-sort-by="title">{{ item.title }}
                            </md-table-cell>

                        </md-table-row>
                    </md-table>
                </div>

            </md-dialog-content>

        </md-dialog>

        <!--кнопки влево -вправо - удалить-->
        <md-card-actions>
            <div class="md-layout">
                <div class="md-layout-item md-size-65" style="margin-right: 0px">
                    <strong>Тип эффекта: &#8194 &#8194 &#8194 &#8194 &#8194 &#8194 &#8194</strong>
                </div>
                <!--кнопки влево -вправо - удалить-->
                <div class="md-layout-item md-size-30">
                    <!--arrow_back-->
                    <div v-if="showBackButton" style="margin-right: 2px">
                        <md-button @click="moveEffect(-1)" class="md-icon-button md-dense md-warning">
                            <md-icon>arrow_back_ios</md-icon>
                            <!--<md-icon>keyboard_arrow_left</md-icon>-->
                        </md-button>
                    </div>
                    <!--arrow_forward-->
                    <div v-if="showForwardButton" style="margin-right: 2px">
                        <md-button @click="moveEffect(1)" class="md-icon-button md-dense md-warning">
                            <md-icon>arrow_forward_ios</md-icon>
                        </md-button>
                    </div>
                    <!--delete-->
                    <div style="margin-right: 2px">
                        <md-button @click="delEffect()" class="md-icon-button md-dense md-danger">
                            <md-icon>delete_forever</md-icon>
                        </md-button>
                    </div>

                </div>
            </div>
        </md-card-actions>
        <!--выбор типа эффекта -->
        <div class="md-layout" style="margin-top: -20px">
            <!--eff.type-->
            <div class="md-layout-item md-size-60">

                <p style="margin-top: 15px; color:#1b5e20; font-weight: bold; font-size: 14px;">{{eff.type}}</p>
                <!--<p style="margin-top: 15px">{{eff.type}}</p>-->
            </div>
            <div>
                <!--<div class="md-layout-item md-size-90">-->
                <!---->
                <!---->
                <!--<md-field>-->
                <!--<md-select-->
                <!--v-model="type"-->
                <!--name="effectType"-->
                <!--id="effectType"-->
                <!--placeholder="effectType"-->
                <!--&gt;-->
                <!--<md-option value="immediate_hp_damage">&#8194 Непосредственный урон на HP</md-option>-->
                <!--<md-option value="immediate_mana_damage">&#8194 Непосредственный урон на mana</md-option>-->

                <!--<md-option value="hp_poisoning">&#8194 Отравление на HP</md-option>-->
                <!--<md-option value="hp_regeneration">&#8194 Регенерация HP</md-option>-->

                <!--<md-option value="affect_attack">&#8194 Атака</md-option>-->
                <!--<md-option value="affect_armor">&#8194 Защита</md-option>-->
                <!--<md-option value="affect_shield">&#8194 Щит</md-option>-->


                <!--<md-option value="affect_hp">&#8194 Влияние на HP(только Пироп)</md-option>-->
                <!--<md-option value="affect_mana">&#8194 Однократно увеличивает Mana(себе)</md-option>-->

                <!--<md-option value="remove_negative">&#8194 Снять негативные эффекты</md-option>-->
                <!--<md-option value="remove_positive">&#8194 Снять позитивные эффекты</md-option>-->

                <!--<md-option value="increase_mana_cost">&#8194 Cтоимость в мане заклинаний</md-option>-->

                <!--<md-option value="max_health">&#8194 Постоянное увеличение HP</md-option>-->
                <!--<md-option value="max_mana">&#8194 Постоянное увеличение Mana</md-option>-->
                <!--<md-option value="max_attack">&#8194 Постоянное увеличение атаки</md-option>-->
                <!--<md-option value="max_armor">&#8194 Постоянное увеличение защиты</md-option>-->


                <!--</md-select>-->
                <!--</md-field>-->
                <!--</div>-->
            </div>

            <!--Выбрать тип-->
            <div class="md-layout-item md-size-35">
                <md-button
                        @click.native="openTypeSelectionDialog()"
                        class="md-white md-dense"
                > &#8194 Выбрать тип &#8194
                </md-button>
            </div>

        </div>

        <!--Применяется к себе-->
        <md-checkbox style="margin-top: 30px"
                     v-model="self_effect"
                     @change="onChangeEffect"
        >
            <small>На себя</small>
        </md-checkbox>

        <div class="md-layout">
            <div class="md-layout-item md-size-45" style="margin-left: -10px">
                <!--Коэффициент усиления-->
                <md-field>
                    <p>Коэффициент</p>
                    <md-input style="padding-left: 10px; max-width: 50px"
                              v-model="valueKoeff"
                              type="number"
                              step="0.1"
                    ></md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-45" style="margin-left: 0px">

                <!--Время эффекта-->
                <md-field>
                    <p>Время эффекта</p>
                    <md-input style="padding-left: 10px; max-width: 50px"
                              v-model="life_time"
                              type="number"
                              step="0.1"
                    ></md-input>
                </md-field>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        props: [
            'spellId',
            'eff',
            'updateEffect',
            'showBackButton',
            'showForwardButton',
            'updateControl',
            'spellType',
            'spellIsActive',
        ],
        data() {
            return {
                effId: '',
                afterMounted: false,
                delDialogIsActive: false,
                listOfSpellTypesDialogIsActive: false,
                selectedType: '',
                selected: null,
                descriptionForCurrent: 'Выберите эффект из списка или нажмите Отмена',

            }
        },
        methods: {
            openTypeSelectionDialog: function () {

                if (!this.selected) {
                    if (this.eff && this.eff.type && this.effectTypes) {
                        for (let elemType of this.effectTypes) {
                            if (elemType.id === this.eff.type) {
                                this.selected = elemType
                                break
                            }
                        }
                    }
                }


                this.listOfSpellTypesDialogIsActive = true
            },

            onSelectTypeOnTable(item) {
                this.selected = item
                if (item && item.desc) {
                    this.descriptionForCurrent = item.desc
                }
            },

            onSelectTypeOnDialog: function () {
                if (this.selected) {
                    this.eff.type = this.selected.id
                }

                this.listOfSpellTypesDialogIsActive = false
            },

            onConfirmDelete: function () {
                this.$store.commit('deleteEffect', {spellId: this.spellId, effId: this.effId})
                this.updateControl(true)
            },

            delEffect: function () {
                this.delDialogIsActive = true
            },

            moveEffect: function (step) {
                this.$store.commit('moveEffect', {spellId: this.spellId, effId: this.effId, step})
                this.updateControl(true)
            },

            onChangeEffect: function () {
                // console.log('onChangeEffect')
                this.updateEffect({
                    id: this.effId,
                    self: this.eff.self,
                    type: this.eff.type,
                    valueKoeff: this.eff.valueKoeff,
                    life_time: this.eff.life_time,
                })
            },
        },
        mounted: function () {
            this.effId = this.eff.id
            // this.self = this.eff.self
            this.afterMounted = true
        },
        computed: {
            spell_IsActive: {
                get() {
                    console.log('this.spellIsAct', this.spellIsActive)
                    return this.spellIsActive
                },
                set(val) {
                    // this.eff.self = val
                    // this.onChangeEffect()
                }
            },

            self_effect: {
                get() {
                    return this.eff.self
                },
                set(val) {
                    this.eff.self = val
                    this.onChangeEffect()
                }
            },

            type: {
                get() {
                    return this.eff.type
                },
                set(val) {
                    this.eff.type = val
                    this.onChangeEffect()
                }
            },

            valueKoeff: {
                get() {
                    return this.eff.valueKoeff
                },
                set(val) {
                    this.eff.valueKoeff = val
                    this.onChangeEffect()
                }
            },

            life_time: {
                get() {
                    return this.eff.life_time
                },
                set(val) {
                    this.eff.life_time = val
                    this.onChangeEffect()
                }
            },

            effectTypes: function () {
                return this.$store.getters.effectTypesByType({
                    spellType: this.spellType,
                    spellIsActive: this.spellIsActive
                })
            }
        },

        watch: {


            spellIsActive: function (val) {
                console.log('!spellIsActive', val)
            },
            // 'item.someOtherProp'(newVal){
            //     //to work with changes in "myArray"
            // },
            // 'item.prop'(newVal){
            //     //to work with changes in prop
            // }
        },

    };
</script>

<style lang="scss" scoped>
    .md-card {
        /*width: 420px;*/
        margin: 8px;
        display: inline-block;
        vertical-align: top;
    }

    .md-checkbox {
        display: flex;
    }

</style>

