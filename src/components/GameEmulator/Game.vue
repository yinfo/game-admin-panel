<template >
    <div class="content" >

        <div class="md-layout">
                <md-checkbox v-model="is_Server">Server</md-checkbox>
            <!--<md-button-->
                    <!--class=" md-raised md-success md-small disable"-->
                    <!--v-on:click.native="send_current_json()"-->
                    <!--style="margin-top: 14px"-->
            <!--&gt;-->
                <!--Update Cash-->
                <!--<md-icon>play_arrow</md-icon>-->
            <!--</md-button>-->
        </div>

        <!--updateRules-->
        <div class="md-layout md-gutter" style="margin-top: -8px;">
                <div class="md-layout-item cl44">
                    <user-game
                            class="user-game"
                            number=1

                            :is_Server="is_Server"
                    ></user-game>
                </div>
                <div class="md-layout-item cl44">
                    <user-game
                            class="user-game"
                            number=2

                            :is_Server="is_Server"
                    ></user-game>
                </div>
        </div>

    </div>
</template>

<script>
    import UserGame from "./UserGame";

    export default {
        data() {
            return {
                text: '',
                is_Server: true,
            };
        },
        components: {
            UserGame
        },
        methods: {},
        watch: {
            is_Server: function (val) {
                this.$store.commit('set_is_Server', val)
            },
        },
    };
</script>

<style>
    .content{
        margin-left: 0px; margin-top: -20px;
    }
    .md-layout-item.cl44{
        border-radius: 2px;
        /*overflow: hidden;*/
        border: 2px;
        border-style: outset;
        border-color: #dddddd;
        margin-right: 5px;
        margin-left: 5px;
        max-width: 47%;
    }

</style>
