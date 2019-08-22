<template>
    <div style="margin-top: 30px;margin-right: 20px">
        <md-card>
            <md-card-header data-background-color="green">
                <div class="md-layout">

                    <!--element.name-->
                    <div class="md-layout-item  md-size-85 ">
                        <div class="md-title  ">{{element.name}}</div>
                    </div>

                    <!--clickBack-->
                    <div class="md-layout-item">

                        <md-button class="md-raised md-warning"
                                   @click.native="clickBack()"
                        >Назад
                        </md-button>

                    </div>
                </div>
            </md-card-header>

            <md-card-content>
                {{element.desc}}
            </md-card-content>

            <!--newSpell resetChanges-->
            <md-card-actions>

                <md-button class="md-raised md-success"
                           @click.native="newSpell()"
                >
                    <small style="margin-left: -23px;">+ Заклинание</small>
                </md-button>

                <md-button class="md-raised md-warning"
                           @click.native="resetChanges()"
                >
                    <small style="margin-left: -23px;">Отменить</small>
                </md-button>

            </md-card-actions>

        </md-card>

        <!-- list spellDetail -->
        <md-list style="margin-top: -5px"
                 v-if="spells"
                 v-for="(row, index) in spells"
                 :key="row._id"
        >
            <spellDetail style="margin-bottom: -10px; margin-top: -5px"
                         class="spellDetail"
                         :spellId="row._id"
                         ref="spellDetail"
            ></spellDetail>
        </md-list>

    </div>
</template>

<script>
    import SpellDetail from '../Spells/SpellDetail'
    export default {
        props: ['id'],

        data() {
            return {
                forceUpdateCounter: 0,
            };
        },
        methods: {

            resetChanges: function(){
                // console.log('$refs.spellDetail', this.$refs.spellDetail)
                const element = this.$store.getters.elementById(this.id).name
                this.$store.dispatch('spellsByType', {element}).then(response => {
                    this.forceUpdateCounter++
                })
            },

            newSpell: function(){
                const elementName = this.$store.getters.elementById(this.id).name
                this.$store.dispatch('newSpell',{elementName}).then(response => {
                    console.log("Got some data, now lets show something in this component")
                    this.forceUpdateCounter++
                }, error => {
                    console.error("Got nothing from server. Prompt user to check internet connection and try again")
                })

            },

            clickBack: function () {
                this.$router.push('/elements')
            }
        },
        computed: {

            element: function () {

                try {
                    return this.$store.getters.elementById(Number(this.id))
                } catch (e) {
                    this.$router.push('/elements')
                }

            },

            spells: function () {
                if (this.element && this.element.name) {
                    this.forceUpdateCounter
                    return this.$store.getters.spellsByType(this.element.name)
                } else {
                    return null
                }
            },
        },
        components: {
            spellDetail: SpellDetail
        },
    };
</script>

<style lang="scss" scoped>
    .md-card {
        /*width: 420px;*/
        display: inline-block;
        vertical-align: top;
    }

    .phone-viewport {
        /*width: 322px;*/
        display: inline-flex;
        align-items: flex-end;
        overflow: hidden;
        border: 1px solid rgba(#000, .26);
        background: rgba(#000, .06);
    }

    .spellDetail {
        width: 98%;
        margin-left: 10px;
    }
</style>

