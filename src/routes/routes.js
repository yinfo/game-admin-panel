import DashboardLayout from "../pages/Layout/DashboardLayout.vue";

import Game from "../components/GameEmulator/Game.vue";
import Settings from "../pages/Settings.vue";
import Elements from "../components/Elements/Elements.vue";
import ElementDetail from "../components/Elements/ElementDetail.vue";
// import SpellLevels from "../components/Spells/SpellLevelsListDetail.vue";
// import SpellPowers from "../components/Spells/SpellPowersListDetail.vue";


const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/game",
    children: [
      {
        path: "settings",
        name: "Settings",
        component: Settings
      },
      {
        path: "game",
        name: "Game",
        component: Game
      },

      {
        path: "elements",
        name: "Elements",
        component: Elements
      },
      {
        path: '/element/:id',
        props: true,
        name: 'element',
        component: ElementDetail
      },

    ]
  }
];

export default routes;

