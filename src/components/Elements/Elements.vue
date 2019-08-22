<template>
    <div style="margin-top: 10px;margin-right: 15px">

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

        <md-card
                v-if="elements"
                v-for="(row, index) in elements"
                :key="row.id"
                v-on:click.native="onClickRow(row)"
        >
            <div class="md-layout" style="margin-top: 15px">

                <md-card-header data-background-color="green">
                    <md-card-header-text>
                        <div class="md-title">{{row.name}}</div>
                        <div class="md-subhead">id:{{row.id}}</div>
                    </md-card-header-text>

                </md-card-header>

                <md-card-content>
                    {{row.desc.slice(0,150)}}
                </md-card-content>

            </div>
        </md-card>

    </div>
    <!--</div>-->
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                login: '',
                password: '',
                sessionId: '',
            };
        },
        methods: {
            goHome: function () {
                this.$router.push('Game')
            },

            loginServer: function () {
                console.log()
                const uriApi = this.$store.getters.apiURI + '/login'
                // const uriApi = this.is_Server ? 'http://192.168.110.9:5000/api/login' : 'http://localhost:5000/api/login'
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

            onClickRow: function ({id, name}) {
                this.$store.dispatch('spellsByType', {element:name})
                this.$router.push('/element/' + id)
            },

        },

        mounted: function () {

            const login_saved = localStorage.getItem('login')
            if (login_saved) this.login = login_saved

            const password_saved = localStorage.getItem('password')
            if (password_saved) this.password = password_saved

            if (!this.$store.getters.elements) {
                this.$store.dispatch('setElements')
            }

            // let currentUrl = document.location.href
            // console.log('currentUrl',currentUrl)
        },

        computed: {

            showDialog: function () {
                return this.$store.getters.user === null
            },

            elements: function () {
                return this.$store.getters.elements
            }
        },
    }
</script>


<style lang="scss" scoped>
    .md-card {
        width: 40%;
        margin: 8px;
        display: inline-block;
        vertical-align: top;

    }
</style>

