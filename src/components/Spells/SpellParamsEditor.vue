<template>
    <md-card>

        <!--<md-card-header>-->
        <div class="md-title" style="margin-left: 25px">Сила заклинания от успешности тапов</div>
        <!--</md-card-header>-->

        <!--<md-card-content>-->
        <!--<p>{{spellParams}}</p>-->
        <!--</md-card-content>-->

        <!--<div class="example-modal-content">-->
        <!--<h1>This is a custom component</h1>-->
        <!--<p>{{ text }}</p>-->
        <!--<p>{{ numb }}</p>-->

        <!--</div>-->
        <md-card-content>
            <md-card-actions style="margin-top: 10px">
                <button @click="$emit('close')">Отменить</button>
                <button @click="onSubmit()">Применить</button>

            </md-card-actions>

            <div class="md-layout">
                <div class="md-layout-item">
                    <md-field>
                        <p>При промахе</p>
                        <md-input style="padding-left: 50px; max-width: 100px"
                                  v-model="spellParams[0]"
                                  type="number"
                                  step="0.1"
                        ></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item">
                    <md-field>
                        <p>1 успешный тап</p>
                        <md-input style="padding-left: 50px; max-width: 100px"
                                  v-model="spellParams[1]"
                                  type="number"
                                  step="0.1"
                        ></md-input>
                    </md-field>
                </div>
            </div>

            <div class="md-layout">
                <div class="md-layout-item">
                    <md-field>
                        <p>2 успешный тап</p>
                        <md-input style="padding-left: 50px; max-width: 100px"
                                  v-model="spellParams[2]"
                                  type="number"
                                  step="0.1"
                        ></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item">
                    <md-field>
                        <p>3 успешный тап</p>
                        <md-input style="padding-left: 50px; max-width: 100px"
                                  v-model="spellParams[3]"
                                  type="number"
                                  step="0.1"
                        ></md-input>
                    </md-field>
                </div>
            </div>

            <div class="md-layout">
                <div class="md-layout-item">
                    <md-field>
                        <p>4 успешный тап</p>
                        <md-input style="padding-left: 50px; max-width: 100px"
                                  v-model="spellParams[4]"
                                  type="number"
                                  step="0.1"
                        ></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item">
                    <md-field>
                        <p>5 успешный тап</p>
                        <md-input style="padding-left: 50px; max-width: 100px"
                                  v-model="spellParams[5]"
                                  type="number"
                                  step="0.1"
                        ></md-input>
                    </md-field>
                </div>
            </div>

            <div class="md-layout">
                <div class="md-layout-item">
                    <md-field>
                        <p>6 успешный тап</p>
                        <md-input style="padding-left: 50px; max-width: 100px"
                                  v-model="spellParams[6]"
                                  type="number"
                                  step="0.1"
                        ></md-input>
                    </md-field>
                </div>

                <div class="md-layout-item">
                    <md-field>
                        <p>7 успешный тап</p>
                        <md-input style="padding-left: 50px; max-width: 100px"
                                  v-model="spellParams[7]"
                                  type="number"
                                  step="0.1"
                        ></md-input>
                    </md-field>
                </div>
            </div>



        </md-card-content>


    </md-card>

</template>

<script>
    export default {
        data() {
            return {
                // result: [0, 0],

            };
        },
        props: [
            'spellParams',
            'callback'
        ],

        methods: {
            onSubmit() {

                const res = []
                for(let i=this.spellParams.length-1;i>=0;i--) {
                    let val = this.spellParams[i]
                    if(!(val === null) && !(val === undefined) && !(val === 0)){
                        res.unshift(Number(val))
                    }
                }

                this.$emit('close')
                this.callback(res)
            }
        },

        // mounted: function () {
        //     // this.result = [...this.spellParams]
        //
        //     // this.val0 = this.spellParams[0]
        //     // this.val1 = this.spellParams[1]
        // },
    }
</script>
