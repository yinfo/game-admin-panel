<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <!--<mobile-menu slot="content"></mobile-menu>-->

      <sidebar-link to="/game">
        <md-icon>dashboard</md-icon>
        <p>Эмулятор</p>
      </sidebar-link>

      <sidebar-link to="/settings">
        <md-icon>settings</md-icon>
        <p>Настройки</p>
      </sidebar-link>

      <sidebar-link to="/elements">
        <md-icon>security</md-icon>
        <p>Заклинания</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <!--<content-footer v-if="!$route.meta.hideFooter"></content-footer>-->
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
};
</script>
