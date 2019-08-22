<template>
    <div>

        <!--код Логин диалога -->
        <md-dialog :md-active.sync="showDialog">
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
                <md-button class="md-default" @click="showDialog = false;"
                >Close
                </md-button
                >
                <md-button class="md-primary" @click="loginServer()"
                >Login
                </md-button
                >
            </md-dialog-actions>
        </md-dialog>

        <!--кнопка Логин и состояние подключения-->
        <div class="md-layout" style="margin-top: 8px; margin-bottom: -24px">

            <!--кнопка логин-->
            <md-button
                    v-bind:class="classLoginButton"
                    v-on:click.native="showLoginDialog()"
                    style="margin-top: -2px; height: 24px; width: 22px;"
            >
                <md-icon>person</md-icon>
            </md-button>

            <strong style="color: #8e24aa">&#8194 HP:</strong>
            <strong style="color: forestgreen ">&#8194 {{hp}}</strong>

            <strong style="color: #8e24aa">&#8194 mana:</strong>
            <strong style="color: forestgreen">&#8194 {{mana}}</strong>

            <strong style="color: #8e24aa">&#8194 shield:</strong>
            <strong style="color: forestgreen">&#8194 {{shield}}</strong>

            <strong style="color: #FF8C00">&#8194 {{skill_check_string}}</strong>


        </div>

        <!--ряд sessionId charId-->
        <div class="md-layout">
            <md-field>
                <small style="color: #8e24aa">sessionId</small>
                <md-input v-model="sessionId"></md-input>

                <small style="color: #8e24aa">charId</small>
                <md-input v-model="charId"></md-input>

            </md-field>
        </div>

        <!--панель больших кнопок горизонтальная-->
        <div class="md-layout" style="margin-top: -20px">
            <div class="md-layout-item">
                <md-bottom-bar class="md-accent">
                    <!--<md-bottom-bar class="md-accent" md-type="shift">-->

                    <md-bottom-bar-item :md-label="createBidButtonLabelText" md-icon="gavel"
                                        v-on:click.native="create_cancel_bid()"></md-bottom-bar-item>

                    <!--<md-bottom-bar-item md-label="Отмена" md-icon="highlight_off"-->
                    <!--v-on:click.native="cancel_bid()"></md-bottom-bar-item>-->
                    <!--<md-bottom-bar-item md-label="Заявка" md-icon="gavel"-->
                    <!--v-on:click.native="create_bid()"></md-bottom-bar-item>-->


                    <md-bottom-bar-item md-label="Ok" md-icon="thumb_up"
                                        v-on:click.native="start_battle()"></md-bottom-bar-item>


                    <!--<md-bottom-bar-item md-label="Заклинание" md-icon="wb_iridescent"-->
                    <!--v-on:click.native="spell_start()"></md-bottom-bar-item>-->

                    <!--<md-bottom-bar-item md-label="Скиллчек" md-icon="redo"-->
                    <!--v-on:click.native="spell_step()"></md-bottom-bar-item>-->

                    <md-bottom-bar-item md-label="preset_change" md-icon="redo"
                                        v-on:click.native="preset_change()"></md-bottom-bar-item>


                    <!--<md-bottom-bar-item md-label="start_turn" md-icon="help_outline"-->
                    <!--v-on:click.native="start_turn()"></md-bottom-bar-item>-->


                    <!--<md-bottom-bar-item md-label="Pages" md-icon="pages"></md-bottom-bar-item>-->
                    <!--<md-bottom-bar-item md-label="Favorites" md-icon="favorite"></md-bottom-bar-item>-->
                    <!--<md-bottom-bar-item md-label="Home" md-icon="home"></md-bottom-bar-item>-->


                </md-bottom-bar>
            </div>

        </div>

        <!--панель маленьких кнопок горизонтальная 2-->
        <div class="md-layout " style="margin-top: 12px">


            <!--water-->
            <h1 class="md-title" style="font-size: 12px">water</h1>

            <md-button
                    class="md-icon-button  md-raised md-primary "
                    v-on:click.native="spell_start(60,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">60<br>-&#8194HP<br>stunn</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(61,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">61<br>+&#8194attack<br>-&#8194Negative</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(62,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">62<br>+&#8194Щит<br>-&#8194Negative</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(63,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">63<br>+&#8194Mana<br>-&#8194Атака</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(65,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">65<br>random<br>essences</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(66,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">66<br>mana_reg<br>hp_reg</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-danger "
                    v-on:click.native="spell_start(68,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">68<br>-&#8194HP</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(69,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">69 &#8194 +&#8194 HP<br>+след<br>&#8194Атака</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-primary "
                    v-on:click.native="spell_start(71,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">71<br>stunn<br>poison</small>
            </md-button>



            <!--earth-->
            <h1 class="md-title" style="font-size: 12px">earth</h1>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(41,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">41<br>-&#8194HP</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(42,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">42<br>+&#8194Щит</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(44,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">44<br>HP regen<br>Mana regen</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(45,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">45<br>-&#8194Negative</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(46,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">46<br>random<br>essences</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(47,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">47<br>+&#8194Атака<br>-&#8194HP</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(48,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">48<br>affect<br>buffs</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-danger "
                    v-on:click.native="spell_start(49,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">49<br>-&#8194Защита<br>-&#8194HP</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(50,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">50&#8194+Щит<br>+&#8194Мана<br>+&#8194Броня</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-primary "
                    v-on:click.native="spell_start(52,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">52&#8194-HP<br>hp_poisn<br>stunning</small>
            </md-button>



            <!--plasma-->
            <h1 class="md-title" style="font-size: 12px">plasma</h1>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(100,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">100 &#8194 -HP<br>+ &#8194 essences</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-primary "
                    v-on:click.native="spell_start(101,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">101 &#8194 -Mana<br>mana_pois<br>-&#8194attack</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(103,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">103<br> + &#8194 Mana<br>+ &#8194 essences</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(104,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">104<br>-&#8194Mana<br>-&#8194HP</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-primary "
                    v-on:click.native="spell_start(105,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">105<br>blocking<br>essences</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-primary "
                    v-on:click.native="spell_start(108,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">108<br>- &#8194 Атака<br>- &#8194 Защита</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-danger "
                    v-on:click.native="spell_start(109,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">109<br>- &#8194 Mana<br>+ &#8194 Mana</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(110,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">110<br>+ &#8194 turn <br>time</small>
            </md-button>



            <!--metal-->
            <h1 class="md-title" style="font-size: 12px">metal</h1>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(160,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">160<br>+&#8194Щит<br>-&#8194HP</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(161,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">161<br> - &#8194 Щит<br> stunning</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(162,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">162<br>+ &#8194 Атака</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(163,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">163<br> - &#8194 HP<br> stunning</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(165,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">165<br> + &#8194 attack<br>once </small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(166,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">166<br>  stunning</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(168,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 7px">168<br> + &#8194 attack<br>+ &#8194 armor </small>
            </md-button>





            <!--air-->
            <h1 class="md-title" style="font-size: 12px">air</h1>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(121,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">121<br>+ &#8194 Щит</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(122,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">122<br>-&#8194Mana<br>-&#8194HP</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(123,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">123<br>- &#8194 HP<br>- &#8194 positive</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(124,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">124<br>affect<br>essences</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-success "
                    v-on:click.native="spell_start(126,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 8px">126<br>+ &#8194 turn <br>time</small>
            </md-button>
            <md-button
                    class="md-icon-button  md-raised md-warning "
                    v-on:click.native="spell_start(127,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">127<br>- &#8194 Щит</small>
            </md-button>




            <!--plant-->
            <h1 class="md-title" style="font-size: 12px">plant</h1>
            <md-button
                    class="md-icon-button  md-raised md-primary "
                    v-on:click.native="spell_start(145,true)"
            >
                <!--<md-icon>offline_bolt</md-icon>-->
                <small style="font-size: 9px">145<br>poison<br>-&#8194Атака</small>
            </md-button>


            <div id="blood">
                <!--<h1 class="md-title" style="font-size: 12px">blood</h1>-->

                <!--<md-button-->
                <!--class="md-icon-button  md-raised md-danger "-->
                <!--v-on:click.native="spell_start(80,true)"-->
                <!--&gt;-->
                <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
                <!--<small style="font-size: 9px">80<br>Вамп</small>-->
                <!--</md-button>-->

                <!--<md-button-->
                <!--class="md-icon-button  md-raised md-success "-->
                <!--v-on:click.native="spell_start(81,true)"-->
                <!--&gt;-->
                <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
                <!--<small style="font-size: 9px">81<br>+ &#8194 HP</small>-->
                <!--</md-button>-->

                <!--<md-button-->
                <!--class="md-icon-button  md-raised md-success "-->
                <!--v-on:click.native="spell_start(82,true)"-->
                <!--&gt;-->
                <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
                <!--<small style="font-size: 9px">82<br>+ &#8194 Щит</small>-->
                <!--</md-button>-->

                <!--<md-button-->
                <!--class="md-icon-button  md-raised md-success "-->
                <!--v-on:click.native="spell_start(83,true)"-->
                <!--&gt;-->
                <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
                <!--<small style="font-size: 8px">83<br>+ &#8194 Броня<br>HP regen</small>-->
                <!--</md-button>-->

                <!--<md-button-->
                <!--class="md-icon-button  md-raised md-warning "-->
                <!--v-on:click.native="spell_start(85,true)"-->
                <!--&gt;-->
                <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
                <!--<small style="font-size: 8px">85<br>+ &#8194 Атака<br>- &#8194 Атака</small>-->
                <!--</md-button>-->

                <!--<md-button-->
                <!--class="md-icon-button  md-raised md-primary "-->
                <!--v-on:click.native="spell_start(92,true)"-->
                <!--&gt;-->
                <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
                <!--<small style="font-size: 8px">92<br>- &#8194 Броня</small>-->
                <!--</md-button>-->

                <!--<md-button-->
                <!--class="md-icon-button  md-raised md-success "-->
                <!--v-on:click.native="spell_start(93,true)"-->
                <!--&gt;-->
                <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
                <!--<small style="font-size: 8px">93 &#8194 + HP  <br>+ &#8194 Броня  <br>+ &#8194 Атака  </small>-->
                <!--</md-button>-->
            </div>

        </div>

        <!--текст запроса и вертикальная панель кнопок-->
        <div class="md-layout ">
            <!--reqText-->
            <div class="md-layout-item">
                <md-field>
                    <md-textarea
                            v-model="reqText"
                            class="reqText"
                    ></md-textarea>
                </md-field>
            </div>
            <!-- вертикальная панель кнопок-->
            <div class="md-layout-item md-size-10">

                <md-button style=" margin-left: 20px"
                           class="md-icon-button md-dense md-raised md-primary"
                           v-on:click.native="send_current_json()"
                >
                    <md-icon>play_arrow</md-icon>
                </md-button>

                <md-button style=" margin-left: 20px"
                           class="md-icon-button md-dense md-raised md-danger"
                           v-on:click.native="reconnect()"
                >
                    <md-icon>autorenew</md-icon>
                </md-button>
            </div>

            <div class="md-layout-item md-size-10">

                <md-button style=" margin-left: 10px"
                           class="md-icon-button md-dense md-raised md-primary"
                           v-on:click.native="getCharInfo()"
                >
                    <md-icon>help</md-icon>
                </md-button>

                <md-button style=" margin-left: 10px"
                           class="md-icon-button md-dense md-raised md-default"
                           v-on:click.native="useDefaultEssence()"
                >
                    <md-icon>wb_incandescent</md-icon>
                </md-button>
            </div>

        </div>
        <!--Ответ json-->
        <div class="md-layout">
            <!--<md-field>-->
            <vue-json-pretty
                    :data="json"
                    :path="path"
                    :deep="deep"
                    :show-length="showLength"
                    :path-checked="['res', 'res.c']"
                    :path-selectable="((path, data) => typeof data !== 'number')"
                    :selectable-type="selectableType"
            >
            </vue-json-pretty>
        </div>

    </div>


    <!--&lt;!&ndash;sand&ndash;&gt;-->
    <!--<h1 class="md-title" style="font-size: 12px">sand</h1>-->

    <!--<md-button-->
    <!--class="md-icon-button  md-raised md-primary "-->
    <!--v-on:click.native="spell_start(20,true)"-->
    <!--&gt;-->
    <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
    <!--<small style="font-size: 9px">20<br>-&#8194HP<br>poison</small>-->
    <!--</md-button>-->

    <!--<md-button-->
    <!--class="md-icon-button  md-raised md-primary "-->
    <!--v-on:click.native="spell_start(21,true)"-->
    <!--&gt;-->
    <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
    <!--<small style="font-size: 9px">21<br>-&#8194атака<br>-&#8194броня</small>-->
    <!--</md-button>-->

    <!--<md-button-->
    <!--class="md-icon-button  md-raised md-success"-->
    <!--v-on:click.native="spell_start(22,true)"-->
    <!--&gt;-->
    <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
    <!--<small style="font-size: 9px">22<br>+&#8194Щит<br>+&#8194Атака</small>-->
    <!--</md-button>-->

    <!--<md-button-->
    <!--class="md-icon-button  md-raised md-primary "-->
    <!--v-on:click.native="spell_start(26,true)"-->
    <!--&gt;-->
    <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
    <!--<small style="font-size: 9px">26<br>-&#8194Щит<br>-&#8194броня</small>-->
    <!--</md-button>-->

    <!--<md-button-->
    <!--class="md-icon-button  md-raised md-success"-->
    <!--v-on:click.native="spell_start(27,true)"-->
    <!--&gt;-->
    <!--&lt;!&ndash;<md-icon>offline_bolt</md-icon>&ndash;&gt;-->
    <!--<small style="font-size: 8px">27<br>+&#8194Броня<br>HP regen</small>-->
    <!--</md-button>-->


</template>

<script>
    // import {socketStates} from '../../enums'
    import VueJsonPretty from 'vue-json-pretty'
    import axios from 'axios'

    const socketStates = {
        undef: "undef",
        opened: "opened",
        closed: "closed",
        victory: "victory",
        start_battle: "start_battle",
        start_battle_success: "start_battle_success",
        battle_active: "battle_active",
        battle_wait: "battle_wait",
    }
    export default {
        name: "user-game",
        components: {
            VueJsonPretty
        },
        props: {
            number: null,
            is_Server: Boolean,
        },
        data() {
            return {
                loginButtonStates: {
                    logout: "logout",
                    login: "login",
                    battle_active: "battle_active",
                    battle_wait: "battle_wait",
                },
                skill_check_string: '',
                movie: 'godfather',
                sessionId: '',
                charId: '',
                ws: null,
                wsURI: 'ws://localhost:8080?session_id=',
                wsURI_server: 'ws://192.168.110.9:8080?session_id=',
                socketState: socketStates.undef,
                reqText: '',
                resText: '',
                ws_string: '',
                state: 'undef',
                playerTurn: false,

                val: '',//json pretty begin
                data: {},
                selectableType: 'tree',//enum: both, checkbox, tree
                showLength: true,
                path: 'res',
                deep: 4,
                itemData: {},
                itemPath: '',//json pretty end

                bidCreated: false,

                showDialog: false,//dialog showLoginDialog begin
                login: '12345',
                password: '12345',

                autoReload: true,
                hp: 0,
                mana: 0,
                shield: 0,

                useDefEssence: false,
            }
        },
        methods: {
            showLoginDialog: function () {
                this.showDialog = true
            },
            loginServer: function () {
                this.showDialog = false

                const uriApi = this.$store.getters.apiURI + '/login'
                axios
                    .post(uriApi, {
                        login: this.login,
                        password: this.password,
                    })
                    .then(response => {
                        // console.log(response.data.sessionId)
                        this.sessionId = response.data.sessionId
                        this.localStorageSet('login', this.login)
                        this.localStorageSet('password', this.password)
                        this.localStorageSet('sessionId', this.sessionId)
                        this.reconnect()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            connect_socket: function (URI) {
                this.bidCreated = false
                this.ws_string = URI
                this.ws = new WebSocket(URI + this.sessionId);
                this.ws.onopen = () => {
                    this.socketState = socketStates.opened
                }
                this.ws.onclose = () => {
                    this.socketState = socketStates.closed
                    // console.log('соеденение закрыто')

                    if (this.autoReload) {
                        // console.log('попробуем открыть... ')
                        this.connect_socket(this.is_Server ? this.wsURI_server : this.wsURI)
                    }

                }
                this.ws.onmessage = (msg) => {
                    try {

                        let msgObj = JSON.parse(msg.data)
                        this.on_message(msgObj)
                    } catch (e) {
                        console.log('let msgObj = JSON.parse(msg.data)', e.message)
                    }
                }
            },
            reconnect: function () {
                this.skill_check_string = ''
                this.bidCreated = false
                this.ws.close()
                this.ws = null
                // this.autoReload = false
                this.connect_socket(this.is_Server ? this.wsURI_server : this.wsURI)
            },
            on_message: function (msg) {

                // if ((msg.scr === 'victory'
                //     ||msg.scr === 'defeat'
                //     ||msg.hasOwnProperty('damageInfo')
                // )) {
                //
                //      console.log(JSON.stringify(msg))
                //     this.data = msg
                // }
                if (msg.scr === 'questProgress') {

                }
                // console.log(JSON.stringify(msg))
                if (!(msg.scr === 'next_turn'
                    || msg.errorId === "player_is_not_started_spell"
                    || msg.errorId === "start_battle_cancel"
                    // || msg.scr === "enemy_spell_step"
                    // || msg.scr === "spell_step"
                )) {
                    this.data = msg
                }


                if (msg.state) {
                    this.state = msg.state
                    switch (msg.state) {
                        case 'battle_active':
                            this.socketState = socketStates.battle_active
                            break
                        case 'battle_wait':
                            this.socketState = socketStates.battle_wait
                            break
                        case 'opened':
                            this.socketState = socketStates.opened
                            break
                        case 'closed':
                            this.socketState = socketStates.closed
                            break
                        case 'start_battle':
                            this.socketState = socketStates.start_battle

                            if (msg.hasOwnProperty('isPlayerBegin')) {
                                if (msg['isPlayerBegin']) {
                                    this.socketState = socketStates.battle_active
                                } else {
                                    this.socketState = socketStates.battle_wait
                                }
                            }
                            break
                        case 'victory':
                            this.socketState = socketStates.opened
                            break
                        case 'start_battle_success':
                            // this.socketState = socketStates.start_battle
                            break
                        default:
                            this.socketState = socketStates.undef
                    }
                }
                if (msg.hasOwnProperty('playerTurn')) this.playerTurn = msg.playerTurn

                if (msg.hasOwnProperty('hp')) {
                    this.hp = msg.hp
                } else {
                    if (msg.hasOwnProperty('PlayerData')) {
                        // alert(msg.PlayerData.hp)
                        this.hp = msg.PlayerData.hp
                    }
                }


                if (msg.hasOwnProperty('mana')) {
                    this.mana = msg.mana
                } else {
                    if (msg.hasOwnProperty('PlayerData')) {
                        this.mana = msg.PlayerData.mana
                    }
                }

                if (msg.hasOwnProperty('shield')) {
                    this.shield = msg.shield
                } else {
                    if (msg.hasOwnProperty('PlayerData')) {
                        this.shield = msg.PlayerData.shield
                    }
                }

            },
            send_msg: function (msg, updateReqText = true) {

                this.localStorageSet('sessionId', this.sessionId)
                this.localStorageSet('charId', this.charId)

                const msgString = JSON.stringify(msg)
                if (updateReqText) this.reqText = msgString

                try {
                    this.ws.send(msgString)
                } catch (e) {
                    this.reconnect()
                }

            },
            localStorageSet: function (itemName, itemValue) {
                localStorage.setItem(itemName + '_' + String(this.number), itemValue)
            },
            localStorageGet: function (itemName) {
                return localStorage.getItem(itemName + '_' + String(this.number))
            },
            send_current_json: function () {
                this.send_msg(JSON.parse(this.reqText), false)
            },
            create_cancel_bid: function () {
                this.skill_check_string = ''
                this.bidCreated = !this.bidCreated
                if (this.bidCreated) {
                    this.create_bid()
                } else {
                    this.cancel_bid()
                }
            },
            create_bid: function () {
                this.send_msg({
                    scr: "create_bid",
                    sessionId: this.sessionId,
                    charId: this.charId,
                    debug: true,
                })
            },
            cancel_bid: function () {
                this.send_msg({
                    scr: "cancel_bid",
                    sessionId: this.sessionId,
                    charId: this.charId,
                    debug: true,
                })
            },
            start_battle: function () {
                this.send_msg({
                    scr: "start_battle",
                    sessionId: this.sessionId,
                    charId: this.charId,
                    debug: true,
                })
            },
            spell_step: function () {
                this.send_msg({
                    scr: "spell_step",
                    sessionId: this.sessionId,
                    charId: this.charId,
                    spellId: 1,
                    status: 'success',
                    statuses: 'fail, success, super',
                })
            },
            preset_change: function (updateReqText = true) {


                const msgString = JSON.stringify({
                    scr: "presetChange",
                    sessionId: this.sessionId,
                    charId: this.charId,
                    Presets: [
                        {
                            Index: 0,
                            Selected: true,
                            PresetSpells: [9, 1, 2, 6, 7, 8],
                        },

                    ]
                })
                this.reqText = msgString
                // this.send_msg({
                //     scr: "presetChange",
                //     sessionId: this.sessionId,
                //     charId: this.charId,
                //     Presets: [
                //         {
                //             Index: 0,
                //             PresetSpells: [-1, -1, 2, -1, 0, -1],
                //         },
                //         {
                //             Index: 1,
                //             Selected: true,
                //             PresetSpells: [0, 1, 6, 2, 7, -1],
                //         }
                //     ]
                // }, updateReqText)
            },

            spell_start: function (spellId, auto_spell_step = false) {


                this.skill_check_string = ''
                this.send_msg({
                    scr: "spell_start",
                    sessionId: this.sessionId,
                    charId: this.charId,
                    spellId,
                })

                if (auto_spell_step) {
                    console.clear()

                    let isFailed = false
                    let timeK = 3000

                    setTimeout((spellStatus) => {

                        this.send_msg({
                            scr: "spell_step",
                            sessionId: this.sessionId,
                            charId: this.charId,
                            spellId,
                            status: spellStatus,
                            statuses: 'fail, success, super',
                            essence: getEssence(),
                        })

                        isFailed = spellStatus === 'fail' ? true : isFailed
                        this.skill_check_string = this.skill_check_string + ' ' + spellStatus
                        console.log(spellStatus)
                    }, 100, 'success')

                    setTimeout((spellStatus) => {


                        this.send_msg({
                            scr: "spell_step",
                            sessionId: this.sessionId,
                            charId: this.charId,
                            spellId,
                            status: spellStatus,
                            statuses: 'fail, success, super',
                            essence: getEssence(),
                        })

                        isFailed = spellStatus === 'fail' ? true : isFailed
                        this.skill_check_string = this.skill_check_string + ' ' + spellStatus
                        console.log(spellStatus)
                    }, 1000, 'success')

                    setTimeout((spellStatus) => {

                        this.send_msg({
                            scr: "spell_step",
                            sessionId: this.sessionId,
                            charId: this.charId,
                            spellId,
                            status: spellStatus,
                            statuses: 'fail, success, super',
                            essence: getEssence(),
                        })

                        isFailed = spellStatus === 'fail' ? true : isFailed
                        this.skill_check_string = this.skill_check_string + ' ' + spellStatus
                        console.log(spellStatus)
                    }, 2000, 'success')

                    setTimeout((spellStatus) => {

                        this.send_msg({
                            scr: "spell_step",
                            sessionId: this.sessionId,
                            charId: this.charId,
                            spellId,
                            status: spellStatus,
                            statuses: 'fail, success, super',
                            essence: getEssence(),
                        })

                        isFailed = spellStatus === 'fail' ? true : isFailed
                        this.skill_check_string = this.skill_check_string + ' ' + spellStatus
                        console.log(spellStatus)
                    }, 3000, 'success')

                    // setTimeout((spellStatus) => {
                    //
                    //     this.send_msg({
                    //         scr: "spell_step",
                    //         sessionId: this.sessionId,
                    //         charId: this.charId,
                    //         spellId,
                    //         status: spellStatus,
                    //         statuses: 'fail, success, super',
                    //     })
                    //
                    //     isFailed = spellStatus === 'fail' ? true : isFailed
                    //     this.skill_check_string = this.skill_check_string + ' ' + spellStatus
                    //     console.log(spellStatus)
                    // }, 2000, getRandomSpellStatus())
                    //
                    //
                    // setTimeout((spellStatus) => {
                    //
                    //     if (!isFailed) {
                    //         this.send_msg({
                    //             scr: "spell_step",
                    //             sessionId: this.sessionId,
                    //             charId: this.charId,
                    //             spellId,
                    //             status: spellStatus,
                    //             statuses: 'fail, success, super',
                    //         })
                    //         isFailed = spellStatus === 'fail' ? true : isFailed
                    //         this.skill_check_string = this.skill_check_string + ' ' + spellStatus
                    //         console.log(spellStatus)
                    //     }
                    //
                    // }, 4000, getRandomSpellStatus())
                    //
                    //
                    // setTimeout((spellStatus) => {
                    //
                    //     if (!isFailed) {
                    //         this.send_msg({
                    //             scr: "spell_step",
                    //             sessionId: this.sessionId,
                    //             charId: this.charId,
                    //             spellId,
                    //             status: spellStatus,
                    //             statuses: 'fail, success, super',
                    //         })
                    //         isFailed = spellStatus === 'fail' ? true : isFailed
                    //         this.skill_check_string = this.skill_check_string + ' ' + spellStatus
                    //         console.log(spellStatus)
                    //     }
                    //
                    // }, 6000, getRandomSpellStatus())
                    //
                    // setTimeout((spellStatus) => {
                    //
                    //     if (!isFailed) {
                    //         this.send_msg({
                    //             scr: "spell_step",
                    //             sessionId: this.sessionId,
                    //             charId: this.charId,
                    //             spellId,
                    //             status: spellStatus,
                    //             statuses: 'fail, success, super',
                    //         })
                    //         isFailed = spellStatus === 'fail' ? true : isFailed
                    //         this.skill_check_string = this.skill_check_string + ' ' + spellStatus
                    //         console.log(spellStatus)
                    //     }
                    //
                    // }, 8000, getRandomSpellStatus())
                }

                function getRandomSpellStatus() {
                    //let arr = ["success", "super"]
                    let arr = ["fail", "success", "super"]
                    let rand = Math.floor(Math.random() * arr.length)
                    return arr[rand]
                }

                const getEssence = () => {
                    if (this.useDefEssence && (
                        this.login === 'earth'
                        || this.login === 'water'
                        || this.login === 'plasma'
                        || this.login === 'air'
                        || this.login === 'metal'
                        || this.login === 'plant'

                    )) {
                        this.useDefEssence = false
                        // console.log(JSON.stringify({elementType:this.login, slot:1}))

                        return {elementType:'water', slot:2}
                        // return {elementType:this.login, slot:0}
                    } else {
                        return null
                    }
                }
            },
            getCharInfo: function () {
                this.send_msg({
                    scr: "get_user_info",
                    sessionId: this.sessionId,
                    charId: this.charId,

                })
            },
            useDefaultEssence: function () {
                this.useDefEssence = true
            },
        },

        mounted: function () {

            const sessionId_saved = this.localStorageGet('sessionId')
            if (sessionId_saved) this.sessionId = sessionId_saved

            const charId_saved = this.localStorageGet('charId')
            if (charId_saved) this.charId = charId_saved

            const login_saved = this.localStorageGet('login')
            if (login_saved) this.login = login_saved

            const password_saved = this.localStorageGet('password')
            if (password_saved) this.password = password_saved

            this.connect_socket(this.is_Server ? this.wsURI_server : this.wsURI)
        },
        watch: {
            is_Server: function (val) {
                this.reconnect()
            },
        },
        computed: {
            json() {
                try {
                    this.cache = JSON.parse(this.val)
                    return this.cache
                } catch (err) {
                    return this.cache || this.data
                }
            },
            createBidButtonLabelText() {
                return this.bidCreated ? 'Отмена' : 'Заявка'
            },
            classLoginButton: function () {
                let clsObj
                switch (this.socketState) {
                    case socketStates.undef:
                        clsObj = {'md-default': true}
                        break
                    case socketStates.opened:
                        clsObj = {'md-success': true}
                        break
                    case socketStates.battle_active:
                        clsObj = {'md-danger': true}
                        break
                    case socketStates.battle_wait:
                        clsObj = {'md-warning': true}
                        break
                    case socketStates.closed:
                        clsObj = {'md-default': true}
                        break
                    case socketStates.start_battle:
                        clsObj = {'md-warning': true}
                        break
                    case socketStates.start_battle_success:
                        clsObj = {'md-warning': true, 'md-default': false}
                        break
                    case socketStates.victory:
                        clsObj = {'md-success': true, 'md-default': false}
                        break

                    default:
                        clsObj = {'md-success': true}
                }

                clsObj['md-icon-button'] = true
                clsObj['md-raised'] = true
                clsObj['md-just-icon'] = true

                return clsObj
            },
        },
    }
</script>

<style>

    .md-button {
        width: 7em;
    }

    .md-button.md-small {
        width: 2em;
        max-width: 2px;
        height: 23px;
        line-height: 15px;
        min-height: 15px;
        vertical-align: top;
        font-size: 8px;
        padding: 0 0;
    }

    .md-button.md-panel {
        width: 3px;
        height: 23px;
        line-height: 20px;
        min-height: 20px;
        vertical-align: top;
        font-size: 10px;
        padding: 0 0;
        margin: 0;
    }

    .md-textarea {
        min-height: 300px;
        height: 300px;
    }

    .reqText {
        min-height: 300px;
        height: 300px;
    }

    .height300 {
        min-height: 300px;
        height: 300px;
    }

    .toolbar-column {
        width: 10%;
    }

    md-toolbar {
        min-height: 16px !important;
    }

    md-toolbar md-toolbar-row {
        height: 16px !important;
    }

    md-input {
        font-size: small;
    }
</style>
