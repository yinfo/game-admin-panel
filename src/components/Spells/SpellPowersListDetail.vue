<template>
    <div>



        <!--Main toolbar -->
        <md-toolbar class="md-accent md-success" md-elevation="1">

            <div class="md-toolbar-section-start">
                <h3 class="md-title" style="flex: 1">Мощность заклинаний от уровня</h3>
            </div>

            <div class="md-toolbar-section-end">

            </div>

        </md-toolbar>

        <!--основной блок-->
        <div class="md-layout">

            <!-- список элементов -->
            <div class="md-layout-item md-size-30">

                <!-- ряд с кнопкой Выбрать -->
                <div class="md-layout">
                    <md-button
                            class="md-dense md-warning"
                            @click="onClickChooseButton()"
                    >
                        <small style="font-size: 10px">Выбрать</small>
                    </md-button>
                    <md-button
                            class="md-dense md-success"
                            @click="onClickCopyButton()"
                    >
                        <small style="font-size: 10px">Копировать</small>
                    </md-button>
                </div>
                <!--<div class="md-layout">-->

                <!--</div>-->
                <!-- список элементов -->
                <div class="md-layout">
                    <md-table

                            v-if="listData"
                            v-model="listData"
                            md-card
                            @md-selected="onSelectingItemOfList"
                            :md-selected-value.sync="selectedElementInList"
                            md-fixed-header

                    >
                        <md-table-row

                                slot="md-table-row"
                                slot-scope="{ item }"
                                md-selectable="single"
                        >
                            <!--<md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>-->
                            <md-table-cell md-label="Имя настройки">{{ item.name }}</md-table-cell>
                        </md-table-row>
                    </md-table>
                </div>


            </div>

            <!--табличная часть-->
            <div class="md-layout-item md-size-70">

                <!--панель инструментов и поле ввода-->
                <div class="md-layout">

                    <div class="md-layout-item md-size-55 ">

                        <md-button style="margin-right: 5px; margin-left: -1px;"
                                   class="md-raised md-danger"
                                   @click="$emit('close')"
                        >Закрыть
                        </md-button>

                        <md-button
                                v-if="showSaveButton"
                                class="md-raised md-success"
                                @click="onClickSaveButton()"
                        >Сохранить
                        </md-button>

                    </div>

                    <div class="md-layout-item md-size-25"
                         v-if="selectedRowInTable"
                    >
                        <md-field style="padding-left:  20px;">
                            <md-input
                                    v-model="selectedRowInTable.val"
                                    type="number"
                                    step="0.1"
                                    @change="onChangeCurrentValueInInput()"
                            ></md-input>
                        </md-field>


                    </div>


                </div>

                <!--таблица-->
                <div class="md-layout">
                    <md-table
                            v-if="tableData"
                            v-model="tableData"
                            md-card
                            @md-selected="onSelectingItemOfTable"
                            :md-selected-value.sync="selectedRowInTable"
                            md-fixed-header
                    >
                        <md-table-row
                                slot="md-table-row"
                                slot-scope="{ item }"
                                md-selectable="single">

                            <md-table-cell md-label="Уровень" md-numeric>{{ item.key }}</md-table-cell>
                            <md-table-cell md-label="Мощность" md-numeric>{{ item.val }}</md-table-cell>
                            <md-table-cell v-show="false"  md-numeric>0</md-table-cell>
                        </md-table-row>
                    </md-table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: [
            'initialName',
            'callback',
        ],
        data() {
            return {
                showSaveButton: false,
                // showDialog: false,

                selectedElementInList: null,
                selectedRowInTable: null,
                tempVal: 0,
            }
        },
        methods: {



            onSelectingItemOfList(item) {
                this.selectedElementInList = item
                this.selectedRowInTable = null
            },

            onSelectingItemOfTable(item) {
                if (item) {
                    this.selectedRowInTable = item
                    this.tempVal = item.val
                }
            },

            onChangeCurrentValueInInput: function () {
                this.showSaveButton = true
            },

            onClickSaveButton: function () {

                const spellPowerConfig = this.selectedElementInList
                for (let row of this.tableData) {
                    spellPowerConfig.data[row.key] = Number(row.val)
                }

                this.$store.dispatch('saveSpellPowerConfig', spellPowerConfig).then(response => {
                    this.showSaveButton = false
                }, error => {
                    console.error(error.message)
                })

            },

            onClickChooseButton() {
                if (this.selectedElementInList && this.selectedElementInList.name) {
                    this.callback({newValuesConfig: this.selectedElementInList.name})
                    this.$emit('close')
                }
            },
            onClickCopyButton() {
                if (this.selectedElementInList && this.selectedElementInList.name) {
                    const  newName = prompt('Копирование - введите новое имя для настройки', this.selectedElementInList.name +  '2')
                    if(newName && newName!==this.selectedElementInList.name){
                        const newPowerConfig = Object.assign({}, this.selectedElementInList)
                        newPowerConfig.name = newName
                        this.$store.dispatch('copySpellPowerConfig', newPowerConfig).then(response => {
                            //this.showSaveButton = false
                        }, error => {
                            console.error(error.message)
                        })
                    }

                }
            },

        },
        mounted: function () {

            if (!this.$store.getters.spellPowers) {
                this.$store.dispatch('spellPowers')
            }
        },

        computed: {

            showDialog: function () {
                return this.$store.getters.user === null

            },

            listData: function () {

                const _listData = this.$store.getters.spellPowers
                // инициализация строки в списке по ранее выбранному имени (входной параметр)
                if (_listData && this.initialName && !this.selectedElementInList) {
                    for (let item of _listData) {
                        if (item.name === this.initialName) {
                            this.selectedElementInList = item
                            break
                        }
                    }
                }

                return _listData
            },

            tableData: function () {
                if (!this.selectedElementInList || !this.selectedElementInList.data) return null

                const resArr = []
                const data = this.selectedElementInList.data
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        resArr.push({
                            key,
                            val: data[key],
                        })
                    }
                }

                return resArr
            },
        },
    }
</script>

<style>

</style>
