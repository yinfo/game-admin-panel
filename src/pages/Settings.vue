<template>
    <div class="content">
        <!--код Логин диалога -->
        <md-dialog
                :md-active.sync="showDialog"
                :md-click-outside-to-close=false
                :md-close-on-esc=false
        >

            <md-dialog-title>Авторизация</md-dialog-title>

            <!--<md-field> <md-input v-model="login"></md-input> </md-field>-->
            <md-field style="margin-left: 10px; margin-right: 10px">
                <label>Login</label>
                <md-textarea v-model="login" md-autogrow></md-textarea>
            </md-field>

            <md-field style="margin-left: 10px; margin-right: 10px">
                <label>Password</label>
                <md-textarea v-model="password" md-autogrow></md-textarea>
            </md-field>

            <md-dialog-actions>
                <md-button class="md-default" @click="goHome()"
                >Назад
                </md-button>

                <md-button class="md-primary" @click="loginServer()"
                >Login
                </md-button>
            </md-dialog-actions>

        </md-dialog>

        <!--Main toolbar -->
        <md-toolbar class="md-accent md-success" md-elevation="1">
            <h3 class="md-title" style="flex: 1">Настройки</h3>
            <!--<md-button>Refresh</md-button>-->
            <md-button
                    class="md-primary"
                    v-if="showSaveButton"
                    @click="update()"
            >Обновить
            </md-button>
        </md-toolbar>


        <div class="md-layout md-gutter" style="margin-top: 30px">

            <div class="md-layout-item md-size-30">
                <md-field>
                    <strong style="color: gray">Время сессии (секунд)</strong>

                    <md-input style="padding-left: 20px; max-width: 90px"
                              :value="this.$store.getters.sessionTime"
                              type="number"
                              step="60"
                              @change="updateSettings($event, 'sessionTime')"
                    ></md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-35">
                <md-field>
                    <strong style="color: gray">Время раунда (секунд)</strong>

                    <md-input style="padding-left: 20px; max-width: 60px"
                              :value="this.$store.getters.turnTime"
                              type="number"
                              step="1"
                              @change="updateSettings($event, 'turnTime')"
                    ></md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-25">
                <md-field>
                    <strong style="color: gray">Бонус второму игроку (секунд)</strong>

                    <md-input style="padding-left: 20px; max-width: 60px"
                              :value="this.$store.getters.turnTimeBonusForSecond"
                              type="number"
                              step="1"
                              @change="updateSettings($event, 'turnTimeBonusForSecond')"
                    ></md-input>
                </md-field>
            </div>


        </div>

        <div class="md-layout md-gutter" style="margin-top: 30px">

            <div class="md-layout-item md-size-30">
                <md-field>
                    <strong style="color: gray">Время изучения фолианта (секунд)</strong>

                    <md-input style="padding-left: 20px; max-width: 90px"
                              :value="this.$store.getters.folios_time_length"
                              type="number"
                              step="1"
                              @change="updateSettings($event, 'folios_time_length')"
                    ></md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-35">
                <md-field>
                    <strong style="color: gray">Стартовое значение HP</strong>

                    <md-input style="padding-left: 20px; max-width: 60px"
                              :value="this.$store.getters.start_hp"
                              type="number"
                              step="1"
                              @change="updateSettings($event, 'start_hp')"
                    ></md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-25">
                <md-field>
                    <strong style="color: gray">Стартовое значение Mana</strong>

                    <md-input style="padding-left: 20px; max-width: 60px"
                              :value="this.$store.getters.start_mana"
                              type="number"
                              step="1"
                              @change="updateSettings($event, 'start_mana')"
                    ></md-input>
                </md-field>
            </div>


        </div>

        <div class="md-layout md-gutter" style="margin-top: 30px">

            <div class="md-layout-item md-size-30">
                <md-field>
                    <strong style="color: gray">Возможное отклонение уровня при поиске противника</strong>

                    <md-input style="padding-left: 20px; max-width: 90px"
                              :value="this.$store.getters.maximum_level_deviation"
                              type="number"
                              step="1"
                              @change="updateSettings($event, 'maximum_level_deviation')"
                    ></md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-35">
                <md-field>
                    <strong style="color: gray">Время ожидания до битвы с ботом (секунд)</strong>

                    <md-input style="padding-left: 20px; max-width: 60px"
                              :value="this.$store.getters.waiting_time_for_duel"
                              type="number"
                              step="1"
                              @change="updateSettings($event, 'waiting_time_for_duel')"
                    ></md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-25">
                <md-field>
                    <strong style="color: gray">Время ожидания подтверждения боя (секунд)</strong>

                    <md-input style="padding-left: 20px; max-width: 60px"
                              :value="this.$store.getters.waiting_time_for_click_button_ok"
                              type="number"
                              step="1"
                              @change="updateSettings($event, 'waiting_time_for_click_button_ok')"
                    ></md-input>
                </md-field>
            </div>


        </div>


        <div class="md-layout md-gutter" style="margin-top: 50px">

            <div class="md-layout-item md-size-25">
                <md-field>
                    <strong style="color: gray">Максимальный уровень заклинаний</strong>

                    <md-input style="padding-left: 20px; max-width: 60px"
                              :value="this.$store.getters.maxLevel"
                              type="number"
                              step="1"
                              @change="updateSettings($event, 'maxLevel')"
                    ></md-input>
                </md-field>
            </div>

        </div>


        <md-snackbar
                :md-duration="4000"
                :md-active.sync="showErrorAlert"
                md-persistent>
            <span>Не удалось увеличить максимальный уровень, обратитесь к программистам!</span>
            <md-button class="md-primary" @click="showErrorAlert = false">Закрыть</md-button>
        </md-snackbar>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                // showDialog: null,
                showSaveButton: false,
                login: '',
                password: '',
                sessionId: '',
                showErrorAlert: false,

            };
        },
        methods: {

            goHome: function () {
                this.$router.push('Game')
            },

            loginServer: function () {

                const uriApi = this.$store.getters.apiURI + '/login'
                axios
                    .post(uriApi, {
                        login: this.login,
                        password: this.password,
                        admin: true,
                    })
                    .then(response => {

                        const responseData = response.data
                        if (responseData.sessionId) {

                            const user = {login: this.login, password: this.password, sessionId: responseData.sessionId}
                            this.$store.commit('setUser', user)

                            // console.log(responseData.sessionId)
                            this.sessionId = responseData.sessionId
                            localStorage.setItem('login', this.login)
                            localStorage.setItem('password', this.password)
                            localStorage.setItem('sessionId', this.sessionId)

                            this.$store.commit('setAllSettings', responseData)

                            if (!this.$store.getters.elements) {
                                this.$store.dispatch('setElements')
                            }
                        } else {
                            console.log(JSON.stringify(responseData))
                        }

                    })
                    .catch(error => {
                        console.log('loginServer',JSON.stringify(error))
                    })
            },

            update: function () {


                const user = this.$store.getters.user

                const uriApi = this.$store.getters.adminURI + '/setsettings'
                // const uriApi = this.is_Server ? 'http://192.168.110.9:5000/api/setsettings' : 'http://localhost:5000/api/setsettings'
                axios
                    .post(uriApi, {
                        login: user.login,
                        password: user.password,
                        sessionId: user.sessionId,
                        admin: true,

                        sessionTime: Number(this.$store.getters.sessionTime),
                        turnTime: Number(this.$store.getters.turnTime),
                        turnTimeBonusForSecond: Number(this.$store.getters.turnTimeBonusForSecond),

                        folios_time_length: Number(this.$store.getters.folios_time_length),
                        start_hp: Number(this.$store.getters.start_hp),
                        start_mana: Number(this.$store.getters.start_mana),

                        maximum_level_deviation: Number(this.$store.getters.maximum_level_deviation),
                        waiting_time_for_duel: Number(this.$store.getters.waiting_time_for_duel),
                        waiting_time_for_click_button_ok: Number(this.$store.getters.waiting_time_for_click_button_ok),

                        mana_increment_per_second: Number(this.$store.getters.mana_increment_per_second),
                        checkDateArrInterval: Number(this.$store.getters.checkDateArrInterval),
                        time_step_when_using_periodic_buffs: Number(this.$store.getters.time_step_when_using_periodic_buffs),

                        maxLevel: Number(this.$store.getters.maxLevel),
                    })
                    .then(response => {
                        if(response.data.hasOwnProperty('errorId')){
                            this.showSaveButton = true
                            this.showErrorAlert = true
                        } else {
                            this.showSaveButton = false
                        }


                    })
                    .catch(error => {
                        this.showErrorAlert = true
                    })
            },

            updateSettings: function (event, str) {

                this.showSaveButton = true
                this.$store.commit('setSettings', {key: str, value: event.target.value})
            }
        },
        mounted: function () {

            const login_saved = localStorage.getItem('login')
            if (login_saved) this.login = login_saved

            const password_saved = localStorage.getItem('password')
            if (password_saved) this.password = password_saved

        },

        computed: {

            showDialog: function () {
                return this.$store.getters.user === null

            },

        },
    }
</script>

<style>
    .content{
        margin-left: 5px;
    }
    /*.md-layout-item {*/
        /*height: 40px;*/
    /*}*/
</style>
