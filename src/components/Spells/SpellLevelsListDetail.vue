<template>
    <div>

        <!--Main toolbar -->
        <md-toolbar class="md-accent md-success" md-elevation="1">

            <div class="md-toolbar-section-start">
                <h3 class="md-title" style="flex: 1">Уровни прогресса заклинаний</h3>
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
                    <!--кнопки Закрыть и Сохранить-->
                    <div class="md-layout-item md-size-40 ">

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

                    <!--cur_progress-->
                    <div class="md-layout-item md-size-30"
                         v-if="selectedRowInTable"
                    >
                        <md-field style="padding-left:  -5px;">
                            <!--<small>cur_progress</small>-->
                            <md-input
                                    v-model="selectedRowInTable.cur_progress"
                                    type="number"
                                    step="0.1"
                                    @change="onChangeCurrentValueInInput()"
                            ></md-input>
                        </md-field>
                    </div>

                    <!--max_progress-->
                    <div class="md-layout-item md-size-30"
                         v-if="selectedRowInTable"
                    >
                        <md-field style="padding-right:  3px;" >
                            <!--<small>max_progress</small>-->
                            <md-input
                                    md-numeric
                                    v-model="selectedRowInTable.max_progress"
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
                                md-selectable="single"                        >

                            <md-table-cell md-label="level"  md-numeric>{{ item.level }}</md-table-cell>
                            <md-table-cell md-label="cur_progress" md-numeric>{{ item.cur_progress }}</md-table-cell>
                            <md-table-cell md-label="max_progress" md-numeric>{{ item.max_progress }}</md-table-cell>
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
                // delDialogIsActive: false,

                selectedElementInList: null,
                selectedRowInTable: null,
                tempVal: 0,
            }
        },
        methods: {

            // onConfirmDelete: function () {
            //     this.delDialogIsActive = !this.delDialogIsActive
            // },

            onSelectingItemOfList(item) {
                this.selectedElementInList = item
                this.selectedRowInTable = null
            },

            onSelectingItemOfTable(item) {
                if (item){
                    this.selectedRowInTable = item
                    this.tempVal = item.val
                }
            },

            onChangeCurrentValueInInput: function () {
                this.showSaveButton = true
            },

            onClickSaveButton: function () {

                const spellLevelsConfig = this.selectedElementInList
                // for (let row of this.tableData){
                //     spellLevelsConfig.data[row.key] = Number(row.val)
                // }

                this.$store.dispatch('saveSpellLevelsConfig', spellLevelsConfig).then(response => {
                    this.showSaveButton = false
                }, error => {
                    console.error(error.message)
                })

            },

            onClickChooseButton(){
                if(this.selectedElementInList && this.selectedElementInList.name){
                    this.callback({newLevelsConfig:this.selectedElementInList.name})
                    this.$emit('close')
                }
            },

            onClickCopyButton() {
                if (this.selectedElementInList && this.selectedElementInList.name) {
                    const  newName = prompt('Копирование - введите новое имя для настройки', this.selectedElementInList.name +  '2')
                    if(newName && newName!==this.selectedElementInList.name){
                        const newPowerConfig = Object.assign({}, this.selectedElementInList)
                        newPowerConfig.name = newName
                        this.$store.dispatch('copySpellLevelsConfig', newPowerConfig).then(response => {
                            //this.showSaveButton = false
                        }, error => {
                            console.error(error.message)
                        })
                    }

                }
            },

        },
        mounted: function () {

            if (!this.$store.getters.spellLevels) {
                this.$store.dispatch('spellLevels')
            }
        },

        computed: {

            showDialog: function () {
                return this.$store.getters.user === null

            },

            listData: function () {

                const _listData = this.$store.getters.spellLevels
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
                if (!this.selectedElementInList || !this.selectedElementInList.levels) return null


                const data = this.selectedElementInList.levels
                // const resArr = []
                // for (let key in data) {
                //     if (data.hasOwnProperty(key)) {
                //         resArr.push({
                //             key,
                //             val: data[key],
                //         })
                //     }
                // }

                return data
            },
        },
    }
</script>

<style>

</style>
