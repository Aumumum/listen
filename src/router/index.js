import Vue from "vue";
import VueRouter from "vue-router";
import  Home from "../pages/music/home";
import Discovery from '../pages/music/discovery';
import List from "../pages/music/list";
import Rank from "../pages/music/rank";
import Singer from "../pages/music/singer";
import Newest from "../pages/music/newest"; 
import Fm from '../pages/fm';
import Mv from '../pages/mv';
import Empty from '../pages/notFound'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "",
      component: Home,
       children: [
        {
          path: "/",
          component: Discovery,
        },
        {
          path: "/list",
          component: List,
        },
        {
          path: "/Rank",
          component: Rank,
        },
        {
          path: "/Singer",
          component: Singer,
        },
        {
          path: "/newest",
          component: Newest,
        },
      ], 
    },
    {
      path: "/fm",
      component:Fm,
    },
    {
      path: "/mv",
      component:Mv,
    },
    {
      path:'/*',
      component:Empty,
    }
  ],
});
